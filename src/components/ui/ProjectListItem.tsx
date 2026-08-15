import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Project } from '../../types';

interface ProjectListItemProps {
  project: Project;
  index: number;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project, index }) => {
  const { id, title, description, image, technologies } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link
        to={`/projects/${id}`}
        className="group flex items-center gap-4 py-3 px-3 -mx-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-12 h-12 rounded-md object-cover shrink-0 border border-gray-200 dark:border-dark-700"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-secondary-400 transition-colors truncate">
            {title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{description}</p>
        </div>
        <div className="hidden sm:flex gap-1.5 shrink-0">
          {technologies.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <ArrowRight
          size={16}
          className="text-gray-400 group-hover:text-primary-600 dark:group-hover:text-secondary-400 group-hover:translate-x-1 transition-all shrink-0"
        />
      </Link>
    </motion.div>
  );
};

export default ProjectListItem;
