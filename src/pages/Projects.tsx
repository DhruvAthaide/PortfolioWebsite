import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { X } from 'lucide-react';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectListItem from '../components/ui/ProjectListItem';
import Reveal from '../components/ui/Reveal';
import SEO from '../components/utils/SEO';
import { FilterCategory, Project } from '../types';
import { projects } from '../data/projects';
import { projectsSEO } from '../data/seoMeta';
import { useCTF } from '../context/CTFContext';

const FILTERS: FilterCategory[] = ['All', 'Android', 'Security', 'Web'];

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="h-px w-12 bg-primary-600 dark:bg-secondary-900" />
    <h2 className="text-primary-600 dark:text-secondary-900 font-mono font-medium tracking-wider uppercase text-sm">{children}</h2>
  </div>
);

interface ProjectGridProps {
  title: string;
  items: Project[];
  columns: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ title, items, columns }) => (
  <section className="mb-16">
    <SectionLabel>{title}</SectionLabel>
    <div className={`grid grid-cols-1 gap-8 ${columns}`}>
      {items.map((project, index) => (
        <Reveal key={project.id} delay={(index % 3) * 0.06} className="h-full">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  </section>
);

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const { unlocked, secretHidden, hideSecret } = useCTF();

  const filtered = projects.filter((p) => activeCategory === 'All' || p.category.includes(activeCategory));
  const featured = filtered.filter((p) => p.featured);
  const earlyWork = filtered.filter((p) => p.earlyWork);
  const others = filtered.filter((p) => !p.featured && !p.earlyWork);

  return (
    <div className="container-custom pt-32 pb-10">
      <SEO title={projectsSEO.title} description={projectsSEO.description} keywords={projectsSEO.keywords} />

      <m.div className="text-center mb-12" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl mb-5">
          My <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Production Android security apps from DeepCytes Cyber Labs UK, most of them on Google Play, followed by personal
          projects and older work.
        </p>
      </m.div>

      <div className="flex justify-center mb-14">
        <div
          className="flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-dark-600"
          role="group"
          aria-label="Filter projects"
        >
          {FILTERS.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary-600 text-white dark:bg-secondary-900 dark:text-dark-900 shadow-md'
                  : 'text-dark-400 hover:text-dark-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {unlocked && !secretHidden && (
        <div className="relative max-w-xl mx-auto mb-14 rounded-2xl border-2 border-secondary-900/60 bg-white dark:bg-dark-700 p-6 pr-12 shadow-[0_0_24px_rgba(34,211,238,0.2)]">
          <p className="font-mono text-xs text-primary-600 dark:text-secondary-900 mb-2">3/3 FLAGS CAPTURED</p>
          <h2 className="text-xl mb-2">You found all three flags.</h2>
          <p className="mb-4">Thanks for poking around. If you enjoyed it, come say hello.</p>
          <Link to="/contact" className="btn btn-primary">Say hello</Link>
          <button
            type="button"
            onClick={hideSecret}
            className="absolute top-3 right-3 p-1.5 rounded-md text-dark-300 hover:text-dark-900 dark:hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {featured.length > 0 && <ProjectGrid title="Featured Work" items={featured} columns="lg:grid-cols-2" />}
      {others.length > 0 && <ProjectGrid title="More Projects" items={others} columns="md:grid-cols-2 lg:grid-cols-3" />}

      {earlyWork.length > 0 && (
        <section className="mb-16">
          <SectionLabel>Earlier Work</SectionLabel>
          <ul className="rounded-xl border border-gray-200 dark:border-dark-600 divide-y divide-gray-200 dark:divide-dark-600 bg-white/60 dark:bg-dark-700/60 px-4">
            {earlyWork.map((project) => (
              <li key={project.id}>
                <ProjectListItem project={project} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {filtered.length === 0 && (
        <p className="py-20 text-center text-dark-400 dark:text-gray-400">No projects in this category yet.</p>
      )}
    </div>
  );
};

export default Projects;
