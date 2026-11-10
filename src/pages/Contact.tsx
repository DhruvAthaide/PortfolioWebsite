import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ContactForm from '../components/ui/ContactForm';
import SEO from '../components/utils/SEO';
import { contactSEO } from '../data/seoMeta';

const EMAIL = 'athaidedhruv@gmail.com';

const DETAILS = [
  { label: 'Based in', value: 'Mumbai, India' },
  { label: 'Currently', value: 'Cyber Analyst, DeepCytes Cyber Labs UK' },
  // Hidden for now: { label: 'Studying', value: 'M.S. Computer Science & Data Analytics, IIT Patna' },
];

const ELSEWHERE = [
  { label: 'GitHub', href: 'https://github.com/DhruvAthaide' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruvathaide' },
  { label: 'X', href: 'https://x.com/Dhruv_Athaide' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC-lcp7FoBrTefpw2q9qpQrg' },
];

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
    <div className="container-custom pt-32 pb-10">
      <SEO title={contactSEO.title} description={contactSEO.description} keywords={contactSEO.keywords} />

      <h1 className="text-4xl sm:text-5xl">Contact</h1>

      <div className="mt-10 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-lg leading-relaxed max-w-md">
            Email is the quickest way to reach me, whether it&apos;s about mobile security, a project or anything on
            this site.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${EMAIL}`} className="font-display text-2xl sm:text-3xl font-bold text-dark-900 dark:text-gray-50 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors break-all">
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-md text-dark-400 hover:text-dark-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
              aria-label="Copy email address"
            >
              {copyState === 'copied' ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <span className="text-sm" aria-live="polite">
              {copyState === 'copied' && 'Copied'}
              {copyState === 'failed' && "Couldn't copy. Please select the address instead."}
            </span>
          </div>

          <dl className="mt-12 space-y-4">
            {DETAILS.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-dark-400 dark:text-gray-400">{item.label}</dt>
                <dd className="text-dark-900 dark:text-gray-50 font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 text-lg mb-3">Elsewhere</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {ELSEWHERE.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="link">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 p-6 sm:p-8 h-fit">
          <h2 className="text-xl mb-1">Or leave a message here</h2>
          <p className="text-sm text-dark-400 dark:text-gray-400 mb-6">It goes straight to my inbox.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
