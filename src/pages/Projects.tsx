import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectListItem from '../components/ui/ProjectListItem';
import SEO from '../components/utils/SEO';
import { FilterCategory, Project } from '../types';
import { projects } from '../data/projects';
import { projectsSEO } from '../data/seoMeta';
import { useCTF } from '../context/CTFContext';

const FILTERS: FilterCategory[] = ['All', 'Android', 'Security', 'Web'];

interface ProjectGroupProps {
  title: string;
  items: Project[];
  columns: string;
}

const ProjectGroup: React.FC<ProjectGroupProps> = ({ title, items, columns }) => (
  <section className="mb-16">
    <h2 className="text-xl sm:text-2xl mb-6">{title}</h2>
    <div className={`grid grid-cols-1 gap-6 ${columns}`}>
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </section>
);

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const { unlocked, secretHidden, hideSecret } = useCTF();

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category.includes(activeCategory),
  );
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const earlyWorkProjects = filteredProjects.filter((p) => p.earlyWork);
  const otherProjects = filteredProjects.filter((p) => !p.featured && !p.earlyWork);

  return (
    <div className="container-custom pt-32 pb-10">
      <SEO title={projectsSEO.title} description={projectsSEO.description} keywords={projectsSEO.keywords} />

      <h1 className="text-4xl sm:text-5xl">Projects</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">
        The first group is production work from DeepCytes Cyber Labs UK, most of it on Google Play. Further down are
        personal projects and a few older things from university.
      </p>

      <div className="mt-8 mb-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200 dark:border-dark-600" role="group" aria-label="Filter projects">
        {FILTERS.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={`-mb-px pb-3 text-sm border-b-2 transition-colors ${
              activeCategory === category
                ? 'border-primary-600 text-dark-900 dark:border-secondary-900 dark:text-gray-50 font-medium'
                : 'border-transparent text-dark-400 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {unlocked && !secretHidden && (
        <div className="relative mb-12 max-w-xl rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 p-6 pr-12">
          <p className="font-mono text-xs text-primary-600 dark:text-secondary-900 mb-2">3/3 flags captured</p>
          <h2 className="text-xl mb-2">You found all three flags.</h2>
          <p className="mb-4">Thanks for poking around. If you enjoyed it, come say hello.</p>
          <Link to="/contact" className="btn btn-primary">Say hello</Link>
          <button
            type="button"
            onClick={hideSecret}
            className="absolute top-3 right-3 p-1.5 rounded-md text-dark-300 hover:text-dark-900 dark:hover:text-gray-50 transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {featuredProjects.length > 0 && (
        <ProjectGroup title="Featured" items={featuredProjects} columns="md:grid-cols-2" />
      )}

      {otherProjects.length > 0 && (
        <ProjectGroup title="Other projects" items={otherProjects} columns="md:grid-cols-2 lg:grid-cols-3" />
      )}

      {earlyWorkProjects.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl mb-4">Older work</h2>
          <ul className="divide-y divide-gray-200 dark:divide-dark-600 border-y border-gray-200 dark:border-dark-600">
            {earlyWorkProjects.map((project) => (
              <li key={project.id}>
                <ProjectListItem project={project} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {filteredProjects.length === 0 && (
        <p className="py-20 text-dark-400 dark:text-gray-400">Nothing in this category yet.</p>
      )}
    </div>
  );
};

export default Projects;
