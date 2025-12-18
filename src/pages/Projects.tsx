import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ui/ProjectCard';
import InteractiveBackground from '../components/three/InteractiveBackground';
import SEO from '../components/utils/SEO';
import { projects } from '../data/projects';

type FilterStatus = 'all' | 'completed' | 'ongoing';

const Projects: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  
  const filteredProjects = projects.filter(project => {
    if (filterStatus === 'all') return true;
    return project.status === filterStatus;
  });
  
  return (
    <div className="relative pt-20">
      <SEO 
        title="Projects" 
        description="Explore my portfolio of projects including Guardient, LockGuard, and various cybersecurity tools."
        keywords={['Projects', 'Portfolio', 'Android', 'Security Tools', 'Web Development']}
      />
      <InteractiveBackground />
      
      <div className="container-custom py-10">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-primary-600 dark:text-secondary-900">Projects</span>
        </motion.h1>
        
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex bg-gray-200 dark:bg-dark-700 rounded-lg p-1">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-secondary-900 shadow-sm'
                  : 'text-dark-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-secondary-900 shadow-sm'
                  : 'text-dark-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterStatus('ongoing')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterStatus === 'ongoing'
                  ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-secondary-900 shadow-sm'
                  : 'text-dark-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900'
              }`}
            >
              Ongoing
            </button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-dark-500 dark:text-gray-300">
              No projects found matching the selected filter.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;