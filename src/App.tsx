import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Terminal as TerminalIcon } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { TerminalProvider, useTerminal } from './context/TerminalContext';
import { CTFProvider } from './context/CTFContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Terminal from './components/ui/Terminal';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
      className="hidden md:block fixed bottom-4 left-4 z-40 p-2.5 bg-dark-900 text-green-400 rounded-md border border-dark-600 hover:border-green-500/60 transition-colors group"
      aria-label="Toggle Terminal"
    >
      <TerminalIcon size={20} />
      <span className="absolute left-full ml-2 px-2 py-1 bg-dark-900 text-green-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-dark-600">
        Ctrl + `
      </span>
    </button>
  );
};

// Blank placeholder keeps the footer from jumping while a page chunk loads
const LoadingFallback = () => <div className="min-h-screen" />;

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <SoundProvider>
        <TerminalProvider>
          <CTFProvider>
            <div className="flex flex-col min-h-screen relative">
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
              <Terminal />
              <TerminalToggle />
            </div>
          </CTFProvider>
        </TerminalProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;