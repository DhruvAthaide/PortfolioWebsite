import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { TerminalProvider, useTerminal } from './context/TerminalContext';
import { CTFProvider } from './context/CTFContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import Terminal from './components/ui/Terminal';
import CustomCursor from './components/ui/CustomCursor';

import InteractiveBackground from './components/three/InteractiveBackground';

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

function App() {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <ThemeProvider>
      <TerminalProvider>
        <CTFProvider>
          <div className="flex flex-col min-h-screen cursor-none relative">
            <InteractiveBackground />
          <CustomCursor />
          <Navbar />
          
          <main className="flex-grow z-10">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />
            <Terminal />
            <TerminalToggle />
          </div>
        </CTFProvider>
      </TerminalProvider>
    </ThemeProvider>
  );
}

export default App;