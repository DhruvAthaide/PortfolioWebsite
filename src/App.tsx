import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { TerminalProvider, useTerminal } from './context/TerminalContext';
import { CTFProvider } from './context/CTFContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ParticleBackground from './components/ui/ParticleBackground';

const importHome = () => import('./pages/Home');
const importAbout = () => import('./pages/About');
const importProjects = () => import('./pages/Projects');
const importContact = () => import('./pages/Contact');
const importProjectDetail = () => import('./pages/ProjectDetail');

const Home = lazy(importHome);
const About = lazy(importAbout);
const Projects = lazy(importProjects);
const Contact = lazy(importContact);
const ProjectDetail = lazy(importProjectDetail);
const NotFound = lazy(() => import('./pages/NotFound'));
const Terminal = lazy(() => import('./components/ui/Terminal'));

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

/** Warm the other page chunks once the browser is idle, so navigation is instant without slowing first load. */
const usePrefetchPages = (): void => {
  useEffect(() => {
    const prefetch = () => {
      [importHome, importAbout, importProjects, importContact, importProjectDetail].forEach((load) => {
        load().catch((error: unknown) => console.warn('Page prefetch failed', { error }));
      });
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(prefetch, 2500);
    return () => clearTimeout(timer);
  }, []);
};

const TerminalToggle = () => {
  const { toggleTerminal } = useTerminal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return (
    <button
      onClick={toggleTerminal}
      className="hidden md:block fixed bottom-4 left-4 z-40 p-3 bg-black/80 text-green-400 rounded-full shadow-lg border border-green-500/30 hover:bg-black hover:scale-110 transition-transform group"
      aria-label="Toggle Terminal"
    >
      <TerminalIcon size={22} />
      <span className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-green-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-green-500/30">
        Ctrl + `
      </span>
    </button>
  );
};

/** Loads the terminal (logic, snake game, matrix effect) on first open, then keeps it mounted so history survives. */
const TerminalMount = () => {
  const { isOpen } = useTerminal();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setHasOpened(true);
  }, [isOpen]);

  if (!hasOpened) return null;
  return (
    <Suspense fallback={null}>
      <Terminal />
    </Suspense>
  );
};

// Blank placeholder keeps the footer from jumping while a page chunk loads
const LoadingFallback = () => <div className="min-h-screen" />;

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  usePrefetchPages();

  return (
    <ThemeProvider>
      <SoundProvider>
        <TerminalProvider>
          <CTFProvider>
            <LazyMotion features={loadMotionFeatures} strict>
              <MotionConfig reducedMotion="user">
                {/* isolate: own stacking context so the -z-10 particle layer sits above the body background */}
                <div className="flex flex-col min-h-screen relative isolate">
                  <ParticleBackground />
                  <Navbar />

                  <main className="flex-grow w-full">
                    <Suspense fallback={<LoadingFallback />}>
                      <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>

                  <Footer />
                  <TerminalMount />
                  <TerminalToggle />
                </div>
              </MotionConfig>
            </LazyMotion>
          </CTFProvider>
        </TerminalProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
