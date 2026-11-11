import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Github, Play, Globe, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

interface CardAction {
  label: string;
  href: string;
  icon: LucideIcon;
}

const cardActions = (project: Project): CardAction[] =>
  [
    project.playstore ? { label: 'Play Store', href: project.playstore, icon: Play } : null,
    project.website ? { label: 'Website', href: project.website, icon: Globe } : null,
    project.github ? { label: 'GitHub', href: project.github, icon: Github } : null,
    project.demo ? { label: 'Demo', href: project.demo, icon: ExternalLink } : null,
  ].filter((action): action is CardAction => action !== null);

/**
 * Project card with a cursor-following spotlight. The spotlight position is written to CSS
 * variables on the element, so moving the mouse never re-renders React.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, description, image, technologies, status, stat, role, playstore } = project;
  const detailPath = `/projects/${id}`;
  const actions = cardActions(project);
  const statusLabel = playstore ? 'Live' : status === 'completed' ? 'Completed' : 'In Development';

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <article
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary-400/60 dark:hover:border-secondary-900/50 hover:shadow-xl hover:shadow-primary-600/10 dark:hover:shadow-secondary-900/10"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(14,165,233,0.12),transparent_70%)] dark:bg-[radial-gradient(600px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(34,211,238,0.10),transparent_70%)]"
      />

      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-gray-100 dark:bg-dark-600">
        <Link to={detailPath} tabIndex={-1} aria-hidden="true" className="block h-full">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
        </Link>

        <span
          className={`absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${
            statusLabel === 'In Development'
              ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusLabel === 'In Development' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          {statusLabel}
        </span>

        {stat && (
          <span className="absolute bottom-3 left-3 right-3 z-20 flex">
            <span className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md bg-primary-600/90 text-white dark:bg-secondary-900/90 dark:text-dark-900">
              {stat}
            </span>
          </span>
        )}
      </div>

      <div className="relative z-20 p-6 flex flex-col flex-grow">
        <h3 className="text-2xl mb-2">
          <Link to={detailPath} className="group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors">
            {title}
          </Link>
        </h3>
        {role && <p className="mb-2 text-sm text-dark-400 dark:text-gray-400">My role: {role}</p>}
        <p className="text-sm leading-relaxed mb-5">{description}</p>

        <ul className="flex flex-wrap gap-2 mb-6 mt-auto">
          {technologies.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-gray-100 text-dark-500 border border-gray-200 dark:bg-dark-600 dark:text-gray-300 dark:border-dark-600"
            >
              {tech}
            </li>
          ))}
          {technologies.length > 4 && (
            <li className="px-2.5 py-1 text-[11px] font-semibold rounded-md text-dark-400 dark:text-gray-400">
              +{technologies.length - 4}
            </li>
          )}
        </ul>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-dark-600">
          {actions.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actions.length === 1 ? 'col-span-2' : ''} flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-gray-100 dark:bg-dark-600 text-dark-900 dark:text-gray-100 border border-transparent hover:border-primary-400/50 hover:text-primary-600 dark:hover:border-secondary-900/40 dark:hover:text-secondary-900 transition-colors`}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
