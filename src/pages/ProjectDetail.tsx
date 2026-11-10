import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { projects as projectsData } from '../data/projects';
import SEO from '../components/utils/SEO';

const CATEGORY_SCHEMA: Record<string, string> = {
  Android: 'MobileApplication',
  Web: 'WebApplication',
  Security: 'SecurityApplication',
  Python: 'DesktopApplication',
};

interface ListSectionProps {
  title: string;
  items: string[];
}

const ListSection: React.FC<ListSectionProps> = ({ title, items }) => (
  <section>
    <h2 className="text-xl sm:text-2xl mb-4">{title}</h2>
    <ul className="space-y-3 list-disc pl-5 marker:text-dark-300">
      {items.map((item) => (
        <li key={item} className="leading-relaxed">{item}</li>
      ))}
    </ul>
  </section>
);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <div className="container-custom pt-40 pb-20">
        <SEO title="Project Not Found" description="This project does not exist or has been moved." />
        <h1 className="text-3xl mb-4">Project not found</h1>
        <p className="mb-6">This project doesn&apos;t exist or has been moved.</p>
        <Link to="/projects" className="link">Back to all projects</Link>
      </div>
    );
  }

  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];
  const links = [
    project.playstore ? { label: 'Google Play', href: project.playstore } : null,
    project.website ? { label: 'Website', href: project.website } : null,
    project.github ? { label: 'Source code', href: project.github } : null,
    project.demo ? { label: 'Live demo', href: project.demo } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    applicationCategory: CATEGORY_SCHEMA[project.category[0]] ?? 'SoftwareApplication',
    description: project.description,
    image: window.location.origin + project.image,
    author: { '@type': 'Person', name: 'Dhruv Athaide' },
    ...(project.playstore && { operatingSystem: 'Android', installUrl: project.playstore }),
  };

  return (
    <article className="container-custom pt-28 pb-10">
      <SEO title={`${project.title} | Project Case Study`} description={project.description} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
        <ArrowLeft size={16} aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <h1 className="text-4xl sm:text-5xl">{project.title}</h1>
          {project.stat && (
            <p className="mt-3 font-medium text-primary-600 dark:text-secondary-900">{project.stat}</p>
          )}
          {project.role && <p className="mt-2 text-dark-400 dark:text-gray-400">My role: {project.role}</p>}
          <p className="mt-6 text-lg leading-relaxed">{project.description}</p>

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${i === 0 ? 'btn-primary' : 'btn-outline'}`}
                >
                  {link.label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}

          <p className="mt-8 text-sm font-mono text-dark-400 dark:text-gray-400 leading-relaxed">
            {project.technologies.join(' / ')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block w-full overflow-hidden rounded-lg border border-gray-200 dark:border-dark-600 bg-gray-100 dark:bg-dark-700 cursor-zoom-in"
          aria-label={`Enlarge image of ${project.title}`}
        >
          <img src={project.image} alt={project.title} decoding="async" className="w-full h-auto" />
        </button>
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[{ src: project.image, alt: project.title }]}
          plugins={[Zoom]}
        />
      </header>

      {project.longDescription && (
        <section className="mt-20 max-w-3xl">
          <h2 className="text-xl sm:text-2xl mb-4">Overview</h2>
          <p className="text-lg leading-relaxed">{project.longDescription}</p>
        </section>
      )}

      {project.features && (
        <div className="mt-14 max-w-3xl">
          <ListSection title="What it does" items={project.features} />
        </div>
      )}

      {(project.challenges || project.solutions) && (
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {project.challenges && <ListSection title="Hard problems" items={project.challenges} />}
          {project.solutions && <ListSection title="How they were solved" items={project.solutions} />}
        </div>
      )}

      <nav className="mt-24 pt-8 border-t border-gray-200 dark:border-dark-600" aria-label="Next project">
        <Link to={`/projects/${nextProject.id}`} className="group inline-flex flex-col">
          <span className="text-sm text-dark-400 dark:text-gray-400">Next project</span>
          <span className="mt-1 font-display text-2xl font-bold text-dark-900 dark:text-gray-50 inline-flex items-center gap-2 group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors">
            {nextProject.title} <ArrowRight size={22} aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </article>
  );
};

export default ProjectDetail;
