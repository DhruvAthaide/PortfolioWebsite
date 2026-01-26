import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Play } from 'lucide-react';

import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
  children?: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, className, children }) => {
  const { title, description, image, technologies, github, playstore, demo, status } = project;
  
  return (
    <motion.div 
      className={`card relative ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
      <div className="relative overflow-hidden h-64">
        <Link to={`/projects/${project.id}`}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2 pointer-events-none">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            status === 'completed' 
              ? 'bg-green-500 text-white' 
              : 'bg-yellow-500 text-dark-800'
          }`}>
            {status === 'completed' ? 'Completed' : 'Ongoing'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors inline-flex items-center gap-2">
            {title}
            <ExternalLink size={14} className="opacity-50" />
          </h3>
        </Link>
        <p className="text-dark-500 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-gray-200 dark:bg-dark-600 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {playstore ? (
            <a 
              href={playstore} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2"
              aria-label={`View ${title} on Play Store`}
            >
              <Play size={16} />
              <span>Play Store</span>
            </a>
          ) : github ? (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2"
              aria-label={`View ${title} on GitHub`}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          ) : null}
          
          {demo && (
            <a 
              href={demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline flex items-center gap-2"
              aria-label={`View live demo for ${title}`}
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;