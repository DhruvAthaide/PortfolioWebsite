import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

interface ExternalLink {
  label: string;
  href: string;
}

const externalLinks = (project: Project): ExternalLink[] =>
  [
    project.playstore ? { label: 'Google Play', href: project.playstore } : null,
    project.website ? { label: 'Website', href: project.website } : null,
    project.github ? { label: 'Source', href: project.github } : null,
    project.demo ? { label: 'Demo', href: project.demo } : null,
  ].filter((link): link is ExternalLink => link !== null);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, description, image, technologies, status, stat, role } = project;
  const detailPath = `/projects/${id}`;

  return (
    <article className="group flex flex-col h-full rounded-lg overflow-hidden border border-gray-200 bg-white dark:border-dark-600 dark:bg-dark-700 transition-colors hover:border-gray-400 dark:hover:border-dark-300">
      <Link to={detailPath} tabIndex={-1} aria-hidden="true" className="block aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-dark-600">
        <img src={image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </Link>

      <div className="flex flex-col flex-grow p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl">
            <Link to={detailPath} className="hover:text-primary-600 dark:hover:text-secondary-900 transition-colors">
              {title}
            </Link>
          </h3>
          {status === 'ongoing' && (
            <span className="text-xs text-dark-300 dark:text-dark-200 whitespace-nowrap">In development</span>
          )}
        </div>

        {stat && <p className="mt-1 text-sm font-medium text-primary-600 dark:text-secondary-900">{stat}</p>}
        {role && <p className="mt-1 text-sm text-dark-400 dark:text-gray-400">My role: {role}</p>}

        <p className="mt-3 text-[0.95rem] leading-relaxed">{description}</p>

        <p className="mt-4 text-xs font-mono text-dark-300 dark:text-dark-200">{technologies.slice(0, 5).join(' / ')}</p>

        <ul className="mt-auto pt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {externalLinks(project).map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-dark-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors whitespace-nowrap"
              >
                {link.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
