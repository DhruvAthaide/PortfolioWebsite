import React from "react";
import { resumes } from "../../data/resumes";

const EXTERNAL_LINKS = [
  { label: "GitHub", href: "https://github.com/DhruvAthaide" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruvathaide" },
];

const linkClass = "hover:text-dark-900 dark:hover:text-gray-50 transition-colors whitespace-nowrap";

const Footer: React.FC = () => (
  <footer className="mt-24 border-t border-gray-200 dark:border-dark-600">
    <div className="container-custom py-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-display font-bold text-dark-900 dark:text-gray-50">Dhruv Athaide</p>
        <p className="text-sm text-dark-400 dark:text-gray-400 mt-1">
          Mobile and application security engineer, Mumbai.{" "}
          <a href="mailto:athaidedhruv@gmail.com" className="link">athaidedhruv@gmail.com</a>
        </p>
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-dark-400 dark:text-gray-400">
        {EXTERNAL_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{link.label}</a>
          </li>
        ))}
        {resumes.map((resume) => (
          <li key={resume.id}>
            <a href={resume.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {resume.label} CV
            </a>
          </li>
        ))}
        <li>© {new Date().getFullYear()}</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
