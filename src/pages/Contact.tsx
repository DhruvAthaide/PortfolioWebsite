import React, { useState } from 'react';
import { m } from 'framer-motion';
import { MapPin, Mail, Briefcase, Languages, Copy, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import ContactForm from '../components/ui/ContactForm';
import SEO from '../components/utils/SEO';
import { contactSEO } from '../data/seoMeta';

const EMAIL = 'athaidedhruv@gmail.com';

const DETAILS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Briefcase, label: 'Current Role', value: 'Cyber Analyst, DeepCytes Cyber Labs UK' },
  { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
  { icon: Languages, label: 'Languages', value: 'English, Hindi and Spanish' },
  // Hidden for now: { icon: GraduationCap, label: 'Education', value: 'M.S. Computer Science & Data Analytics, IIT Patna' },
];

const SOCIALS = [
  { icon: FaGithub, href: 'https://github.com/DhruvAthaide', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/dhruvathaide', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com/Dhruv_Athaide', label: 'X' },
  { icon: FaYoutube, href: 'https://www.youtube.com/channel/UC-lcp7FoBrTefpw2q9qpQrg', label: 'YouTube' },
];

const iconBubble = 'p-3 rounded-full bg-primary-50 dark:bg-secondary-900/10 text-primary-600 dark:text-secondary-900 shrink-0';

const Contact: React.FC = () => {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState('copied');
    } catch {
      // Clipboard API is blocked (insecure context or permissions), so tell the user instead of failing silently
      setCopyState('failed');
    }
    setTimeout(() => setCopyState('idle'), 2500);
  };

  return (
    <div className="container-custom pt-28 pb-10">
      <SEO title={contactSEO.title} description={contactSEO.description} keywords={contactSEO.keywords} />

      <m.div className="text-center mb-14" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl sm:text-5xl mb-4">
          Get In <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Want to talk mobile security, a project or a collaboration? Email is the quickest way to reach me.
        </p>
      </m.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <m.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="relative h-64 mb-10 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-600 bg-black shadow-lg group">
            <img
              src="/images/india-map-stylized.webp"
              alt="Map of India with Mumbai highlighted"
              decoding="async"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            <span className="absolute top-[67%] left-[26%] flex items-center justify-center" aria-hidden="true">
              <span className="absolute w-3 h-3 rounded-full bg-secondary-900 animate-ping motion-reduce:animate-none" />
              <span className="relative w-2 h-2 rounded-full bg-secondary-900 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            </span>
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-secondary-900/30 text-white text-xs font-mono tracking-wider">
              <MapPin size={12} className="text-secondary-900" aria-hidden="true" /> MUMBAI, IN
            </span>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className={iconBubble}><Mail size={22} aria-hidden="true" /></span>
              <div className="min-w-0">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-dark-400 dark:text-gray-400">Email</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <a href={`mailto:${EMAIL}`} className="text-lg font-medium text-dark-900 dark:text-white hover:text-primary-600 dark:hover:text-secondary-900 transition-colors break-all">
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-md text-dark-400 hover:text-primary-600 dark:hover:text-secondary-900 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                    aria-label="Copy email address"
                  >
                    {copyState === 'copied' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                  <span className="text-xs font-medium" aria-live="polite">
                    {copyState === 'copied' && <span className="text-emerald-600 dark:text-emerald-400">Copied</span>}
                    {copyState === 'failed' && <span className="text-rose-600 dark:text-rose-400">Couldn&apos;t copy. Please select the address instead.</span>}
                  </span>
                </div>
              </div>
            </div>

            {DETAILS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <span className={iconBubble}><Icon size={22} aria-hidden="true" /></span>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-dark-400 dark:text-gray-400">{label}</h2>
                  <p className="text-lg font-medium text-dark-900 dark:text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl mt-12 mb-5">Connect With Me</h2>
          <div className="flex flex-wrap gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-4 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-500 dark:text-gray-300 shadow-sm hover:-translate-y-1 hover:text-white hover:bg-primary-600 dark:hover:bg-secondary-900 dark:hover:text-dark-900 transition-[transform,background-color,color]"
              >
                <Icon size={22} aria-hidden="true" />
              </a>
            ))}
          </div>
        </m.div>

        <m.div
          className="h-fit lg:sticky lg:top-24 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-dark-600 bg-white/70 dark:bg-dark-700/70 backdrop-blur-md shadow-xl"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl mb-1">Send a Message</h2>
          <p className="text-sm text-dark-400 dark:text-gray-400 mb-8">It goes straight to my inbox.</p>
          <ContactForm />
        </m.div>
      </div>
    </div>
  );
};

export default Contact;
