import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ui/ProjectCard';

import SEO from '../components/utils/SEO';
import { projects } from '../data/projects';
import { useCTF } from '../context/CTFContext';

type Category = 'All' | 'Android' | 'Web' | 'Security' | 'Python';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const { unlocked, secretHidden, hideSecret } = useCTF();
  
  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'All') return true;
    return project.category === activeCategory;
  });

  const secretProject = {
    id: 'project-zero',
    title: 'Project Zero: Classified',
    description: 'A covert government surveillance tool that you were never supposed to see. Congratulations, Agent.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Matrix/Hacker style image
    technologies: ['Quantum Crypto', 'Zero Day', 'Black Ops'],
    github: '#',
    status: 'ongoing' as const,
    category: 'Security' as const
  };
  
  return (
    <div className="relative pt-20">
      <SEO 
        title="Projects" 
        description="Explore my portfolio of projects including Guardient, LockGuard, and various cybersecurity tools."
        keywords={['Projects', 'Portfolio', 'Android', 'Security Tools', 'Web Development']}
      />

      
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
          <div className="inline-flex flex-wrap justify-center gap-2 bg-gray-200 dark:bg-dark-700 rounded-lg p-2 max-w-full overflow-x-auto">
            {(['All', 'Android', 'Web', 'Security', 'Python'] as Category[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-secondary-900 shadow-sm scale-105'
                    : 'text-dark-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 hover:bg-gray-100 dark:hover:bg-dark-600/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {unlocked && !secretHidden && (
            <ProjectCard 
              project={secretProject} 
              index={0} 
              className="border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
            >
               <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 z-10">TOP SECRET</div>
               <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  hideSecret();
                }}
                className="absolute top-0 right-[85px] bg-dark-800 text-white hover:bg-red-600 p-1 rounded-bl-lg transition-colors z-20"
                title="Hide Classified Project"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
               </button>
            </ProjectCard>
          )}
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + (unlocked ? 1 : 0)} />
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