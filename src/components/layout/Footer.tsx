import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { resumes } from '../../data/resumes';

const SOCIALS = [
  { icon: Github, href: 'https://github.com/DhruvAthaide', label: 'GitHub', external: true },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dhruvathaide', label: 'LinkedIn', external: true },
  { icon: Mail, href: 'mailto:athaidedhruv@gmail.com', label: 'Email', external: false },
];

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

const linkClass = 'text-dark-400 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors';

const Footer: React.FC = () => (
  <footer className="mt-16 border-t border-gray-200 dark:border-dark-600 bg-white/70 dark:bg-dark-900/70 backdrop-blur-sm">
    <div className="container-custom py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-xl mb-4">Dhruv Athaide</h3>
        <p className="text-dark-400 dark:text-gray-400 mb-4 max-w-xs">
          Mobile and application security engineer. I build Android apps and make them hard to break.
        </p>
        <div className="flex gap-4">
          {SOCIALS.map(({ icon: Icon, href, label, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={linkClass}
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl mb-4">Quick Links</h3>
        <ul className="space-y-2">
          {PAGES.map((page) => (
            <li key={page.path}>
              <NavLink to={page.path} className={linkClass}>{page.name}</NavLink>
            </li>
          ))}
          {resumes.map((resume) => (
            <li key={resume.id}>
              <a href={resume.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {resume.label} CV
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl mb-4">Contact</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <MapPin size={20} className="text-primary-600 dark:text-secondary-900 mt-0.5 shrink-0" />
            <span className="text-dark-400 dark:text-gray-400">Mumbai, India</span>
          </li>
          <li className="flex items-start gap-3">
            <Mail size={20} className="text-primary-600 dark:text-secondary-900 mt-0.5 shrink-0" />
            <a href="mailto:athaidedhruv@gmail.com" className={`${linkClass} break-all`}>athaidedhruv@gmail.com</a>
          </li>
        </ul>
      </div>
    </div>
    <p className="border-t border-gray-200 dark:border-dark-600 py-6 text-center text-sm text-dark-400 dark:text-gray-400">
      &copy; {new Date().getFullYear()} Dhruv Athaide. All rights reserved.
    </p>
  </footer>
);

export default Footer;
