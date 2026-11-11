import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Play, Layers, Lock, Cpu, ZoomIn } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import Reveal from '../components/ui/Reveal';
import SEO from '../components/utils/SEO';
import { projects as projectsData } from '../data/projects';

const CATEGORY_SCHEMA: Record<string, string> = {
  Android: 'MobileApplication',
  Web: 'WebApplication',
  Security: 'SecurityApplication',
  Python: 'DesktopApplication',
};

interface DetailCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  tone: string;
  numbered: boolean;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, items, icon: Icon, tone, numbered }) => (
  <div className="h-full rounded-2xl border border-gray-200 dark:border-dark-600 bg-white/80 dark:bg-dark-700/80 p-7">
    <div className="flex items-center gap-3 mb-6">
      <span className={`p-3 rounded-lg ${tone}`}>
        <Icon size={22} aria-hidden="true" />
      </span>
      <h2 className="text-xl">{title}</h2>
    </div>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          {numbered ? (
            <span className="font-mono text-sm font-bold text-dark-300 shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
          ) : (
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-secondary-900 shrink-0" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <div className="container-custom min-h-screen flex flex-col items-center justify-center text-center">
        <SEO title="Project Not Found" description="This project does not exist or has been moved." />
        <h1 className="text-3xl mb-4">Project not found</h1>
        <p className="mb-6">This project doesn&apos;t exist or has been moved.</p>
        <Link to="/projects" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];
  const links = [
    project.playstore ? { label: 'Play Store', href: project.playstore, icon: Play } : null,
    project.website ? { label: 'Website', href: project.website, icon: ExternalLink } : null,
    project.github ? { label: 'Source Code', href: project.github, icon: Github } : null,
    project.demo ? { label: 'Live Demo', href: project.demo, icon: ExternalLink } : null,
  ].filter((link): link is { label: string; href: string; icon: LucideIcon } => link !== null);

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
    <article className="container-custom pt-28 pb-16">
      <SEO title={`${project.title} | Project Case Study`} description={project.description} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-dark-400 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to Projects
      </Link>

      <m.header
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="text-primary-600 dark:text-secondary-900 font-mono text-sm font-bold uppercase tracking-wider mb-4">
            Case study: {project.category.join(', ')}
          </p>
          <h1 className="text-4xl md:text-5xl mb-4">{project.title}</h1>
          {project.stat && <p className="font-semibold text-primary-600 dark:text-secondary-900 mb-2">{project.stat}</p>}
          {project.role && <p className="text-dark-400 dark:text-gray-400 mb-2">My role: {project.role}</p>}
          <p className="text-lg md:text-xl leading-relaxed mt-4 mb-8">{project.description}</p>

          {links.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {links.map(({ label, href, icon: Icon }, i) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`btn ${i === 0 ? 'btn-primary' : 'btn-outline'}`}>
                  <Icon size={18} aria-hidden="true" /> {label}
                </a>
              ))}
            </div>
          )}

          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200/70 dark:bg-dark-600 text-dark-500 dark:text-gray-300">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative group block w-full cursor-zoom-in"
          aria-label={`Enlarge image of ${project.title}`}
        >
          <span className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 dark:from-secondary-900 dark:to-primary-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <span className="relative block overflow-hidden rounded-xl border border-gray-200 dark:border-dark-600">
            <img src={project.image} alt={project.title} decoding="async" className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
              <span className="p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={24} aria-hidden="true" />
              </span>
            </span>
          </span>
        </button>
        <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={[{ src: project.image, alt: project.title }]} plugins={[Zoom]} />
      </m.header>

      {project.longDescription && (
        <Reveal delay={0} className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="section-title">Overview</h2>
          <p className="text-lg leading-relaxed text-left md:text-center">{project.longDescription}</p>
        </Reveal>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {project.features && (
          <Reveal delay={0} className="lg:col-span-1">
            <DetailCard title="Key Features" items={project.features} icon={Layers} tone="bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300" numbered={false} />
          </Reveal>
        )}
        {(project.challenges || project.solutions) && (
          <div className={`grid gap-8 ${project.features ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            {project.challenges && (
              <Reveal delay={0.1}>
                <DetailCard title="The Challenge" items={project.challenges} icon={Lock} tone="bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300" numbered />
              </Reveal>
            )}
            {project.solutions && (
              <Reveal delay={0.15}>
                <DetailCard title="The Solution" items={project.solutions} icon={Cpu} tone="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" numbered />
              </Reveal>
            )}
          </div>
        )}
      </div>

      <section className="mt-24 pt-12 border-t border-gray-200 dark:border-dark-600" aria-label="Next project">
        <p className="text-sm font-bold text-dark-400 dark:text-gray-400 uppercase tracking-wider mb-6">Next Project</p>
        <Link to={`/projects/${nextProject.id}`} className="group relative block h-48 rounded-2xl overflow-hidden shadow-lg">
          <img src={nextProject.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 flex flex-col justify-center px-8 sm:px-10 bg-dark-900/70 group-hover:bg-dark-900/55 transition-colors">
            <span className="text-2xl md:text-3xl font-bold text-white">{nextProject.title}</span>
            <span className="mt-2 inline-flex items-center gap-2 font-medium text-secondary-900">
              View case study <ArrowRight size={18} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
            </span>
          </span>
        </Link>
      </section>
    </article>
  );
};

export default ProjectDetail;
