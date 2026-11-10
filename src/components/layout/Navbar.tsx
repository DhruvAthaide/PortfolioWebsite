import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ResumeMenu from '../ui/ResumeMenu';
import { resumes } from '../../data/resumes';

const LINKS = [
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `text-[0.95rem] transition-colors ${
    isActive
      ? 'text-dark-900 dark:text-gray-50 underline underline-offset-8 decoration-2 decoration-primary-600 dark:decoration-secondary-900'
      : 'text-dark-400 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gray-50'
  }`;

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
      className={`fixed top-0 left-0 w-full z-50 transition-colors ${
        scrolled || isOpen
          ? 'bg-gray-50/95 dark:bg-dark-800/95 backdrop-blur border-b border-gray-200 dark:border-dark-600'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-custom flex justify-between items-center h-16">
        <NavLink to="/" className="font-display font-bold text-lg text-dark-900 dark:text-gray-50 whitespace-nowrap">
          Dhruv Athaide
        </NavLink>

        <div className="hidden md:flex items-center gap-7">
          <ul className="flex gap-7">
            {LINKS.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path} className={navLinkClass}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <ResumeMenu
            buttonClassName="inline-flex items-center text-[0.95rem] text-dark-400 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            align="right"
          >
            CV
          </ResumeMenu>
          <button
            onClick={toggleTheme}
            className="p-2 -mr-2 rounded-md text-dark-400 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            aria-label={themeLabel}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-dark-400 dark:text-gray-400"
            aria-label={themeLabel}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 -mr-2 text-dark-900 dark:text-gray-50"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu: collapsed panel is hidden from tab order and screen readers */}
      <motion.div
        initial={false}
        animate={
          isOpen
            ? { height: 'auto', opacity: 1, visibility: 'visible' }
            : { height: 0, opacity: 0, transitionEnd: { visibility: 'hidden' } }
        }
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden"
      >
        <ul className="container-custom pb-5 flex flex-col">
          {LINKS.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-3 text-lg border-b border-gray-200 dark:border-dark-600 ${
                    isActive ? 'text-dark-900 dark:text-gray-50 font-medium' : 'text-dark-400 dark:text-gray-400'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {resumes.map((resume) => (
            <li key={resume.id}>
              <a
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 text-lg text-dark-400 dark:text-gray-400 border-b border-gray-200 dark:border-dark-600"
              >
                <FileText size={16} />
                {resume.label} CV
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
