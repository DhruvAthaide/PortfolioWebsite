import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';
import TimelineItem from '../components/ui/TimelineItem';
import Stats from '../components/ui/Stats';
import VulnerabilityReport from '../components/ui/VulnerabilityReport';
import SEO from '../components/utils/SEO';
import { skillGroups, education, publication, certifications, orcidUrl } from '../data/skills';
import { resumes } from '../data/resumes';
import { aboutSEO } from '../data/seoMeta';

const FACTS = [
  { label: 'Currently', value: 'Cyber Analyst, DeepCytes Cyber Labs UK' },
  { label: 'Based in', value: 'Mumbai, India' },
  { label: 'Languages', value: 'English, Hindi, some Spanish' },
];

const strong = 'text-dark-900 dark:text-gray-50 font-medium';

const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="container-custom pt-32 pb-10">
      <SEO title={aboutSEO.title} description={aboutSEO.description} keywords={aboutSEO.keywords} />

      <h1 className="text-4xl sm:text-5xl">About</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-5 text-lg leading-relaxed max-w-2xl">
          <p>
            I&apos;m a mobile and application security engineer in Mumbai, with a little over two years of building and
            securing Android apps that real people use.
          </p>
          <p>
            At <span className={strong}>DeepCytes Cyber Labs UK</span> I look after mobile security for our Android
            product line. In practice that means threat modelling, code review, OWASP MASVS testing before each release,
            and the native C++ hardening that makes the apps harder to tamper with. I also write offensive Android tooling
            for the red team.
          </p>
          <p>
            The work I&apos;ve enjoyed most so far was implementing the Signal protocol for SecureLine, and working out
            how to tell whether a Bluetooth tracker is actually following someone for NoSurveil. I also co-wrote a{' '}
            <a href={publication.href} target="_blank" rel="noopener noreferrer" className="link">peer-reviewed chapter</a>{' '}
            on Android vulnerability assessment for IGI Global.
          </p>
          {/* Hidden for now. To restore, add to the paragraph above:
              "I'm also doing an M.S. at IIT Patna." */}
        </div>

        <aside className="space-y-8">
          <dl className="space-y-4">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-dark-400 dark:text-gray-400">{fact.label}</dt>
                <dd className={strong}>{fact.value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-sm text-dark-400 dark:text-gray-400">Email</dt>
              <dd>
                <a href="mailto:athaidedhruv@gmail.com" className="link break-all">athaidedhruv@gmail.com</a>
              </dd>
            </div>
          </dl>

          <div>
            <h2 className="text-lg mb-3">CV</h2>
            <ul className="divide-y divide-gray-200 dark:divide-dark-600 border-y border-gray-200 dark:border-dark-600">
              {resumes.map((resume) => (
                <li key={resume.id}>
                  <a
                    href={resume.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-3"
                  >
                    <span>
                      <span className={`block ${strong} group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors`}>
                        {resume.label}
                      </span>
                      <span className="block text-sm text-dark-400 dark:text-gray-400">{resume.focus}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-dark-400 dark:text-gray-400 shrink-0">
                      PDF <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <Stats />

      <section className="mt-20">
        <VulnerabilityReport />
      </section>

      <section className="mt-20">
        <h2 className="section-title">Skills</h2>
        <dl className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <dt className={`${strong} mb-2`}>{group.title}</dt>
              <dd className="leading-relaxed">{group.skills.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Education</h2>
          {education.map((item) => (
            <TimelineItem
              key={item.title}
              title={item.title}
              organization={item.organization}
              period={item.period}
              description={item.description}
            />
          ))}
        </div>

        <div>
          <h2 className="section-title">Publication</h2>
          <p>
            <a href={publication.href} target="_blank" rel="noopener noreferrer" className={`${strong} hover:text-primary-600 dark:hover:text-secondary-900 transition-colors`}>
              {publication.title}
            </a>
          </p>
          <p className="mt-1 text-sm text-dark-400 dark:text-gray-400">{publication.issuer}</p>
          <p className="mt-2 flex gap-4 text-sm">
            <a href={publication.href} target="_blank" rel="noopener noreferrer" className="link">DOI</a>
            <a href={orcidUrl} target="_blank" rel="noopener noreferrer" className="link">ORCID</a>
          </p>

          <h2 className="section-title mt-12">Certifications</h2>
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
      </section>

      <section className="mt-20">
        <h2 className="section-title">GitHub activity</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 p-6">
          <GitHubCalendar
            username="DhruvAthaide"
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            blockSize={12}
            blockMargin={4}
            fontSize={13}
          />
        </div>
      </section>
    </div>
  );
};

export default About;
