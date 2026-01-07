import React from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

import VisitorRecon from "../ui/VisitorRecon";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-900 py-12 mt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Dhruv Athaide</h3>
            <p className="text-dark-500 dark:text-gray-400 mb-4">
              A Red Team Analyst & Mobile Developer creating secure digital
              solutions and protecting data integrity.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/DhruvAthaide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/dhruvathaide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:athaidedhruv@gmail.com"
                className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/projects"
                  className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors">
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors">
                  Contact
                </NavLink>
              </li>
              <li>
                <a
                  href="\documents\DhruvAthaide_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="text-primary-600 dark:text-secondary-900 mt-1 flex-shrink-0"
                />
                <span className="text-dark-500 dark:text-gray-400">
                  Mumbai, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  size={20}
                  className="text-primary-600 dark:text-secondary-900 mt-1 flex-shrink-0"
                />
                <a
                  href="mailto:athaidedhruv@gmail.com"
                  className="text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                >
                  athaidedhruv@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-700 mt-10 pt-6 text-center">
          <p className="text-dark-500 dark:text-gray-400">
            &copy; {currentYear} Dhruv Athaide. All rights reserved.
          </p>
        </div>
        
        <VisitorRecon />
      </div>
    </footer>
  );
};

export default Footer;