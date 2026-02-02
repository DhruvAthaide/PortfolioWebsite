import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Loader2 } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { TerminalProvider, useTerminal } from './context/TerminalContext';
import { CTFProvider } from './context/CTFContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Terminal from './components/ui/Terminal';
import CustomCursor from './components/ui/CustomCursor';

import InteractiveBackground from './components/three/InteractiveBackground';

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
      className="fixed bottom-4 left-4 z-40 p-3 bg-black/80 text-green-500 rounded-full shadow-lg border border-green-500/30 hover:bg-black hover:scale-110 transition-all duration-300 group"
      aria-label="Toggle Terminal"
    >
      <TerminalIcon size={24} />
      <span className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-green-500 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-green-500/30">
        Ctrl + `
      </span>
    </button>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
      <span className="text-dark-500 dark:text-gray-400 font-mono text-sm animate-pulse">Initializing System...</span>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  
  // Scroll to top on route change
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);
  
  return (
    <ThemeProvider>
      <SoundProvider>
        <TerminalProvider>
          <CTFProvider>
            <div className="flex flex-col min-h-screen cursor-none relative">
              <InteractiveBackground />
              <CustomCursor />
              <Navbar />
              
              <main className="flex-grow z-10 w-full">
                <AnimatePresence mode="wait">
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
                </AnimatePresence>
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