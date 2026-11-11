import React from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, BookOpen, Smartphone, ShieldCheck } from 'lucide-react';
import SEO from '../components/utils/SEO';
import GlitchText from '../components/ui/GlitchText';
import TechMarquee from '../components/ui/TechMarquee';
import ProjectCard from '../components/ui/ProjectCard';
import ResumeMenu from '../components/ui/ResumeMenu';
import Reveal from '../components/ui/Reveal';
import { useTypewriter } from '../hooks/useTypewriter';
import { projects } from '../data/projects';
import { homeSEO } from '../data/seoMeta';

const ROLES = ['an Android engineer.', 'an AppSec engineer.', 'a mobile pentester.', 'a published researcher.'] as const;
const TYPE_TIMING = { typeMs: 55, deleteMs: 30, holdMs: 1600 };

const CREDENTIALS = [
  { icon: Smartphone, label: '5 apps on Google Play' },
  { icon: BookOpen, label: 'Peer-reviewed IGI Global chapter' },
  { icon: ShieldCheck, label: 'OWASP MASVS / MASTG' },
];

const SOCIALS = [
  { icon: Github, href: 'https://github.com/DhruvAthaide', label: 'GitHub', external: true },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dhruvathaide', label: 'LinkedIn', external: true },
  { icon: Mail, href: 'mailto:athaidedhruv@gmail.com', label: 'Email', external: false },
];

const featured = projects.filter((p) => p.featured);

const Home: React.FC = () => {
  const role = useTypewriter(ROLES, TYPE_TIMING);

  return (
    <div>
      <SEO title={homeSEO.title} description={homeSEO.description} keywords={homeSEO.keywords} />

      <section className="min-h-[100svh] flex items-center pt-24 pb-12">
        <div className="container-custom">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
            <m.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary-600 dark:text-secondary-900 font-mono mb-5 text-sm sm:text-base tracking-wider uppercase">
                Mobile &amp; Application Security Engineer
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                Dhruv{' '}
                <span className="text-primary-600 dark:text-secondary-900">
                  <GlitchText text="Athaide" />
                </span>
              </h1>

              <p className="text-2xl sm:text-3xl font-bold text-dark-400 dark:text-gray-400 mb-8 min-h-[2.5em] sm:min-h-[1.5em]">
                <span className="sr-only">I&apos;m an Android engineer, AppSec engineer, mobile pentester and published researcher.</span>
                <span aria-hidden="true">
                  I&apos;m <span className="text-dark-900 dark:text-white">{role}</span>
                  <span className="inline-block w-[3px] h-[0.9em] ml-1 align-[-0.1em] bg-primary-600 dark:bg-secondary-900 animate-pulse" />
                </span>
              </p>

              <p className="text-lg mb-6 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                I build Android security apps at DeepCytes Cyber Labs UK and attack them before they ship. Five are live on
                Google Play. Most of my code is Kotlin and C++ on the NDK, and most of my testing happens in Frida and Burp Suite.
                {/* Hidden for now. To restore, append: " I'm also doing an M.S. at IIT Patna." */}
              </p>

              <ul className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
                {CREDENTIALS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary-50 text-primary-700 border border-primary-100 dark:bg-secondary-900/10 dark:text-secondary-400 dark:border-secondary-900/20"
                  >
                    <Icon size={14} />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/projects"
                  className="btn btn-primary px-8 py-3 text-lg shadow-lg shadow-primary-600/30 dark:shadow-secondary-900/20 hover:-translate-y-0.5"
                >
                  View Projects <ArrowRight size={20} />
                </Link>
                <ResumeMenu buttonClassName="btn btn-outline w-full px-8 py-3 text-lg hover:-translate-y-0.5" align="left">
                  <Download size={20} />
                  Download CV
                </ResumeMenu>
              </div>

              <div className="flex gap-6 mt-10 justify-center md:justify-start items-center">
                <span className="h-px w-12 bg-gray-300 dark:bg-dark-600 hidden md:block" />
                {SOCIALS.map(({ icon: Icon, href, label, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="text-dark-400 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 hover:scale-110 transition-transform"
                    aria-label={label}
                  >
                    <Icon size={26} />
                  </a>
                ))}
              </div>
            </m.div>

            <m.div
              className="w-60 sm:w-72 md:flex-1 md:max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 dark:from-secondary-900 dark:to-primary-500 blur-2xl opacity-40 animate-pulse-slow motion-reduce:animate-none" />
                <div className="relative rounded-full p-2 bg-white dark:bg-dark-700 ring-1 ring-gray-200 dark:ring-dark-600">
                  <img
                    src="/images/home-DhruvAthaide.webp"
                    alt="Dhruv Athaide"
                    width={448}
                    height={448}
                    // React 18 has no typed fetchPriority prop; the lowercase DOM attribute passes through as-is
                    {...{ fetchpriority: 'high' }}
                    className="rounded-full w-full aspect-square object-cover"
                  />
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      <TechMarquee />

      <section className="py-24">
        <div className="container-custom">
          <Reveal delay={0} className="text-center mb-14">
            <p className="text-primary-600 dark:text-secondary-900 font-mono text-sm tracking-wider uppercase mb-3">Portfolio</p>
            <h2 className="text-4xl md:text-5xl">Featured Projects</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((project, index) => (
              <Reveal key={project.id} delay={(index % 2) * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/projects" className="btn btn-outline">
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
