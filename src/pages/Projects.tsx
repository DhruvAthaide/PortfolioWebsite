import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectListItem from '../components/ui/ProjectListItem';
import { Project, FilterCategory } from '../types';

import SEO from '../components/utils/SEO';
import { projects } from '../data/projects';
import { projectsSEO } from '../data/seoMeta';
import { useCTF } from '../context/CTFContext';

interface SectionLabelProps {
  children: React.ReactNode;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-2 mb-6"
  >
    <span className="h-px w-12 bg-primary-600 dark:bg-secondary-900"></span>
    <span className="text-primary-600 dark:text-secondary-900 font-mono font-medium tracking-wider uppercase text-sm">
      {children}
    </span>
  </motion.div>
);

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const { unlocked, secretHidden, hideSecret } = useCTF();

  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'All') return true;
    return project.category.includes(activeCategory);
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const earlyWorkProjects = filteredProjects.filter(p => p.earlyWork);
  const standardProjects = filteredProjects.filter(p => !p.featured && !p.earlyWork);

  const secretProject: Project = {
    id: 'project-zero',
    title: 'Project Zero: Classified',
    description: 'A covert government surveillance tool that you were never supposed to see. Congratulations, Agent.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Matrix/Hacker style image
    technologies: ['Quantum Crypto', 'Zero Day', 'Black Ops'],
    github: '#',
    status: 'ongoing' as const,
    category: ['Security']
  };

  return (
    <div className="relative pt-20 min-h-screen">
      <SEO title={projectsSEO.title} description={projectsSEO.description} keywords={projectsSEO.keywords} />

      <div className="container-custom py-10">
        <motion.h1
          className="text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Projects</span>
        </motion.h1>

        {/* Modern Filter Tabs */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100 dark:bg-dark-800 rounded-full border border-gray-200 dark:border-dark-700">
            {(['All', 'Android', 'Web', 'Security', 'Python'] as FilterCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10 ${
                  activeCategory === category
                    ? 'text-white dark:text-dark-900 font-semibold shadow-lg'
                    : 'text-gray-500 dark:text-gray-400 hover:text-dark-900 dark:hover:text-white'
                }`}
              >
                {activeCategory === category && (
                   <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary-600 dark:bg-secondary-900 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Classified Secret Project */}
        <AnimatePresence>
          {unlocked && !secretHidden && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto mb-16"
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tier 1: Featured Work */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <SectionLabel>Featured Work</SectionLabel>
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatePresence>
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} index={index} className="h-full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Tier 2: Standard Grid */}
        {standardProjects.length > 0 && (
          <div className="mb-16">
            {featuredProjects.length > 0 && <SectionLabel>More Projects</SectionLabel>}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {standardProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} index={index} className="h-full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Tier 3: Earlier Work (compact) */}
        {earlyWorkProjects.length > 0 && (
          <div className="mb-16">
            <SectionLabel>Earlier Work</SectionLabel>
            <div className="border border-gray-100 dark:border-dark-800 rounded-xl divide-y divide-gray-100 dark:divide-dark-800 px-3">
              {earlyWorkProjects.map((project, index) => (
                <ProjectListItem key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
             <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-dark-800 mb-4">
                 <span className="text-4xl">🔍</span>
             </div>
            <h3 className="text-xl font-medium text-dark-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
