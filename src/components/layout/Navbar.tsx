import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Download, Sun, Moon, FileText } from 'lucide-react';
import { m } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ResumeMenu from '../ui/ResumeMenu';
import { resumes } from '../../data/resumes';

const LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const themeLabel = `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled || isOpen
          ? 'bg-white/90 dark:bg-dark-800/90 backdrop-blur-md shadow-md dark:shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex justify-between items-center py-4">
        <NavLink to="/" className="text-2xl font-bold font-mono text-primary-900 dark:text-secondary-900">
          D.A
          <span className="sr-only"> Dhruv Athaide, home</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {LINKS.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-secondary-900 ${
                      isActive ? 'text-primary-600 dark:text-secondary-900' : 'text-dark-500 dark:text-gray-300'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-dark-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
            aria-label={themeLabel}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <ResumeMenu buttonClassName="btn btn-outline py-2" align="right">
            <Download size={16} />
            Resume
          </ResumeMenu>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-dark-500 dark:text-gray-300"
            aria-label={themeLabel}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 text-dark-900 dark:text-white"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Collapsed panel is hidden from the tab order and screen readers */}
      <m.div
        initial={false}
        animate={
          isOpen
            ? { height: 'auto', opacity: 1, visibility: 'visible' }
            : { height: 0, opacity: 0, transitionEnd: { visibility: 'hidden' } }
        }
        transition={{ duration: 0.25 }}
        className="md:hidden overflow-hidden"
      >
        <ul className="container-custom pb-5 flex flex-col gap-1">
          {LINKS.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `block py-2.5 text-lg font-medium ${
                    isActive ? 'text-primary-600 dark:text-secondary-900' : 'text-dark-500 dark:text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {resumes.map((resume) => (
            <li key={resume.id} className="mt-2">
              <a href={resume.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full">
                <FileText size={16} />
                {resume.label} CV
              </a>
            </li>
          ))}
        </ul>
      </m.div>
    </nav>
  );
};

export default Navbar;
