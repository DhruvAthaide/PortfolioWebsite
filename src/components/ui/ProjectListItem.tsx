import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Project } from '../../types';

interface ProjectListItemProps {
  project: Project;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => (
  <Link to={`/projects/${project.id}`} className="group flex items-center gap-4 py-3">
    <img
      src={project.image}
      alt=""
      loading="lazy"
      decoding="async"
      className="w-12 h-12 rounded-md object-cover shrink-0 border border-gray-200 dark:border-dark-600"
    />
    <div className="flex-1 min-w-0">
      <h3 className="text-base truncate group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-dark-400 dark:text-gray-400 truncate">{project.description}</p>
    </div>
    <span className="hidden sm:block text-xs font-mono text-dark-300 dark:text-dark-200 shrink-0">
      {project.technologies.slice(0, 2).join(' / ')}
    </span>
    <ArrowRight size={16} aria-hidden="true" className="text-dark-300 group-hover:text-dark-900 dark:group-hover:text-gray-50 shrink-0" />
  </Link>
);

export default ProjectListItem;
