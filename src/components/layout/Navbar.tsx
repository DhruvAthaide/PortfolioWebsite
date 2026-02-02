import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { playHover, playClick } = useSound();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const navbarClass = scrolled 
    ? 'bg-white dark:bg-dark-800 shadow-md' 
    : 'bg-transparent';

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClass}`}>
      <div className="container-custom flex justify-between items-center py-4">
        <NavLink to="/" className="text-xl font-bold flex items-center gap-2" onMouseEnter={playHover} onClick={playClick}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-mono text-primary-900 dark:text-secondary-900"
          >
            D.A
          </motion.div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink 
                  to={link.path}
                  onMouseEnter={playHover} 
                  onClick={playClick}
                  className={({ isActive }) => 
                    `text-sm font-medium transition-colors duration-300 relative hover:text-primary-600 dark:hover:text-secondary-900 ${
                      isActive ? 'text-primary-600 dark:text-secondary-900' : 'text-dark-700 dark:text-gray-300'
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
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <a 
            href="\documents\DhruvAthaide_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline flex items-center gap-2"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 text-dark-700 dark:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white dark:bg-dark-800"
      >
        <div className="container-custom py-4">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => 
                    `block py-2 text-lg font-medium transition-colors duration-300 ${
                      isActive ? 'text-primary-600 dark:text-secondary-900' : 'text-dark-700 dark:text-gray-300'
                    }`
                  }
                  onClick={closeMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <a 
                href="\documents\DhruvAthaide_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full justify-center mt-2"
                onClick={closeMenu}
              >
                <Download size={16} className="mr-2" />
                <span>Resume</span>
              </a>
            </li>
          </ul>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;