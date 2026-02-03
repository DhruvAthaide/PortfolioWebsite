import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Play, Globe } from 'lucide-react';

import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
  children?: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, className, children }) => {
  const { title, description, image, technologies, github, playstore, website, demo, status } = project;
  
  return (
    <motion.div 
      className={`card group relative flex flex-col h-full bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-dark-700 ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
      <div className="relative overflow-hidden h-52 shrink-0">
        <Link to={`/projects/${project.id}`} className="block h-full">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <div className="absolute top-3 right-3 pointer-events-none z-10">
          <span className={`inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm ${
            status === 'completed' 
              ? 'bg-green-500/90 text-white backdrop-blur-sm' 
              : 'bg-yellow-500/90 text-white backdrop-blur-sm'
          }`}>
            {status === 'completed' ? 'Completed' : 'Ongoing'}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <Link to={`/projects/${project.id}`} className="group/title">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors inline-flex items-center gap-2">
              {title}
              <ExternalLink size={16} className="opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300 text-primary-500" />
            </h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">{description}</p>
        </div>
        
        <div className="mb-6 flex flex-wrap gap-2 mt-auto">
          {technologies.slice(0, 4).map((tech, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium border border-gray-200 dark:border-dark-600"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2.5 py-1 bg-gray-50 dark:bg-dark-800 text-gray-500 dark:text-gray-400 rounded-md text-xs font-medium border border-gray-100 dark:border-dark-700">
              +{technologies.length - 4}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-dark-700">
          {playstore && (
            <a 
              href={playstore} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 min-w-[100px] inline-flex justify-center items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              aria-label={`View ${title} on Play Store`}
            >
              <Play size={16} fill="currentColor" />
              <span>App</span>
            </a>
          )}
          
          {website && (
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 min-w-[100px] inline-flex justify-center items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              aria-label={`Visit ${title} Website`}
            >
              <Globe size={16} />
              <span>Web</span>
            </a>
          )}
          
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex-1 min-w-[100px] inline-flex justify-center items-center gap-2 px-4 py-2 ${
                !playstore && !website 
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100' 
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-600'
              } rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5`}
              aria-label={`View ${title} on GitHub`}
            >
              <Github size={16} />
              <span>Code</span>
            </a>
          )}

          {demo && !website && (
             <a 
               href={demo} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex-1 min-w-[100px] inline-flex justify-center items-center gap-2 px-4 py-2 border border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-sm font-semibold transition-all"
               aria-label={`View live demo for ${title}`}
             >
               <ExternalLink size={16} />
               <span>Demo</span>
             </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;