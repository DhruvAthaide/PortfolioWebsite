import React, { Suspense, lazy, useState } from 'react';
import { m } from 'framer-motion';
import {
  Briefcase, MapPin, Mail, Globe, FileText, ExternalLink, Smartphone, ShieldCheck, KeyRound, Server, BookOpen, Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import TimelineItem from '../components/ui/TimelineItem';
import Stats from '../components/ui/Stats';
import VulnerabilityReport from '../components/ui/VulnerabilityReport';
import GlitchText from '../components/ui/GlitchText';
import Reveal from '../components/ui/Reveal';
import SEO from '../components/utils/SEO';
import { skillGroups, education, publication, certifications, orcidUrl } from '../data/skills';
import { resumes } from '../data/resumes';
import { aboutSEO } from '../data/seoMeta';

// The calendar fetches contribution data and pulls in a tooltip library, so it loads separately.
const GitHubActivity = lazy(() => import('../components/ui/GitHubActivity'));

type TabId = 'experience' | 'skills' | 'education';

const TABS: { id: TabId; label: string }[] = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
];

const SKILL_ICONS: Record<string, LucideIcon> = {
  'Mobile Engineering': Smartphone,
  'Application Security': ShieldCheck,
  Cryptography: KeyRound,
  'Backend & Tooling': Server,
};

const cardClass =
  'p-6 rounded-xl border border-gray-200 dark:border-dark-600 bg-white/70 dark:bg-dark-700/70 backdrop-blur-sm hover:border-primary-400/60 dark:hover:border-secondary-900/50 transition-colors';
const labelClass = 'text-xs font-semibold uppercase tracking-wider text-dark-400 dark:text-gray-400 mb-1';
const valueClass = 'text-lg font-semibold text-dark-900 dark:text-white';
const accent = 'text-primary-600 dark:text-secondary-900';
const strong = 'font-medium text-dark-900 dark:text-white';

const InfoCard: React.FC<{ icon: LucideIcon; label: string; className?: string; children: React.ReactNode }> = ({
  icon: Icon,
  label,
  className,
  children,
}) => (
  <div className={`${cardClass} ${className ?? ''}`}>
    <Icon size={26} strokeWidth={1.5} className={`mb-3 ${accent}`} aria-hidden="true" />
    <h3 className={labelClass}>{label}</h3>
    {children}
  </div>
);

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('experience');

  return (
    <div className="container-custom pt-28 pb-10">
      <SEO title={aboutSEO.title} description={aboutSEO.description} keywords={aboutSEO.keywords} />

      <m.h1
        className="text-4xl sm:text-5xl text-center mb-14"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About <span className={accent}><GlitchText text="Me" /></span>
      </m.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <m.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="section-title">Who Am I?</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              I&apos;m a <span className={`font-semibold ${accent}`}>Mobile &amp; Application Security Engineer</span> in{' '}
              <span className={strong}>Mumbai, India</span>, with over two years of building and securing Android apps that
              real people use.
            </p>
            <p>
              At <span className={strong}>DeepCytes Cyber Labs UK</span> I look after mobile security for our Android product
              line. That means threat modelling, code review, OWASP MASVS testing before each release, and native C++
              hardening that makes the apps harder to tamper with. I also write offensive Android tooling for the red team.
            </p>
            <p>
              Highlights so far: implementing the Signal protocol for SecureLine, and working out whether a Bluetooth tracker
              is actually following someone for NoSurveil. I also co-wrote a{' '}
              <a href={publication.href} target="_blank" rel="noopener noreferrer" className="link">peer-reviewed chapter</a>{' '}
              on Android vulnerability assessment for IGI Global.
            </p>
            {/* Hidden for now. To restore, add to the paragraph above: "I'm also doing an M.S. at IIT Patna." */}
          </div>
        </m.div>

        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InfoCard icon={Briefcase} label="Current Role">
            <p className={valueClass}>Cyber Analyst</p>
            <p className="text-sm text-dark-400 dark:text-gray-400">DeepCytes Cyber Labs UK</p>
          </InfoCard>
          <InfoCard icon={MapPin} label="Location">
            <p className={valueClass}>Mumbai, India</p>
          </InfoCard>
          <InfoCard icon={Mail} label="Email" className="sm:col-span-2">
            <a href="mailto:athaidedhruv@gmail.com" className={`${valueClass} font-mono break-all hover:text-primary-600 dark:hover:text-secondary-900 transition-colors`}>
              athaidedhruv@gmail.com
            </a>
          </InfoCard>
          <InfoCard icon={Globe} label="Languages" className="sm:col-span-2">
            <p className="font-medium text-dark-900 dark:text-white">
              English <span className="text-xs text-dark-400 font-normal">(Fluent)</span>, Hindi{' '}
              <span className="text-xs text-dark-400 font-normal">(Native)</span>, Spanish{' '}
              <span className="text-xs text-dark-400 font-normal">(Intermediate)</span>
            </p>
          </InfoCard>
        </m.div>
      </div>

      <Reveal delay={0} className="mb-20">
        <div className="text-center">
          <h2 className="section-title">Resumes</h2>
        </div>
        <p className="text-center max-w-2xl mx-auto mb-8">
          My CV in two versions, one focused on mobile engineering and one on application security.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resumes.map((resume) => (
            <a
              key={resume.id}
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-5 ${cardClass} hover:shadow-lg hover:-translate-y-0.5 transition-transform`}
            >
              <span className="p-4 rounded-lg bg-primary-50 dark:bg-secondary-900/10 text-primary-600 dark:text-secondary-900 shrink-0">
                <FileText size={28} aria-hidden="true" />
              </span>
              <span className="flex-1 min-w-0">
                <span className={`block text-lg font-bold text-dark-900 dark:text-white`}>{resume.label} CV</span>
                <span className="block text-sm text-dark-400 dark:text-gray-400">{resume.focus}</span>
              </span>
              <span className={`inline-flex items-center gap-1 text-sm font-medium shrink-0 ${accent}`}>
                PDF <ExternalLink size={14} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <Stats />

      <section className="mb-20">
        <div className="flex justify-center mb-10">
          <div
            className="flex w-full max-w-md gap-1 p-1 rounded-lg bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-dark-600"
            role="tablist"
            aria-label="About sections"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-dark-600 shadow-sm text-primary-600 dark:text-secondary-900'
                    : 'text-dark-400 dark:text-gray-400 hover:text-dark-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <m.div
          key={activeTab}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'experience' && <VulnerabilityReport />}

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillGroups.map((group) => {
                const Icon = SKILL_ICONS[group.title] ?? ShieldCheck;
                return (
                  <div key={group.title} className={cardClass}>
                    <h3 className="text-xl mb-4 flex items-center gap-2">
                      <Icon size={22} className={accent} aria-hidden="true" />
                      {group.title}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-dark-500 border border-gray-200 dark:bg-dark-600 dark:text-gray-200 dark:border-dark-600"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="max-w-3xl mx-auto">
              {education.map((item) => (
                <TimelineItem
                  key={item.title}
                  title={item.title}
                  organization={item.organization}
                  period={item.period}
                  description={item.description}
                />
              ))}

              <div className="mt-12 grid gap-4">
                <div className={cardClass}>
                  <h3 className="flex items-center gap-2 text-lg mb-2">
                    <BookOpen size={20} className={accent} aria-hidden="true" /> Publication
                  </h3>
                  <a href={publication.href} target="_blank" rel="noopener noreferrer" className={`${strong} hover:text-primary-600 dark:hover:text-secondary-900 transition-colors`}>
                    {publication.title}
                  </a>
                  <p className="text-sm text-dark-400 dark:text-gray-400 mt-1">{publication.issuer}</p>
                  <p className="flex gap-4 mt-3 text-sm">
                    <a href={publication.href} target="_blank" rel="noopener noreferrer" className="link">DOI</a>
                    <a href={orcidUrl} target="_blank" rel="noopener noreferrer" className="link">ORCID</a>
                  </p>
                </div>
                <div className={cardClass}>
                  <h3 className="flex items-center gap-2 text-lg mb-3">
                    <Award size={20} className={accent} aria-hidden="true" /> Certifications
                  </h3>
                  <ul className="space-y-2">
                    {certifications.map((cert) => (
                      <li key={cert.title}>
                        {cert.href ? (
                          <a href={cert.href} target="_blank" rel="noopener noreferrer" className="link">{cert.title}</a>
                        ) : (
                          <span className={strong}>{cert.title}</span>
                        )}
                        <span className="text-sm text-dark-400 dark:text-gray-400">, {cert.issuer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </m.div>
      </section>

      <Reveal delay={0}>
        <div className="text-center">
          <h2 className="section-title">Coding Activity</h2>
        </div>
        <div className="min-h-[190px] flex justify-center p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-dark-600 bg-white/70 dark:bg-dark-700/70 overflow-x-auto">
          <Suspense fallback={null}>
            <GitHubActivity />
          </Suspense>
        </div>
      </Reveal>
    </div>
  );
};

export default About;
