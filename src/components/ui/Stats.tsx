import React from 'react';
import { Award, Briefcase, Smartphone, BookOpen } from 'lucide-react';
import Reveal from './Reveal';

// Every figure here must be backed by the CVs in public/documents.
const STATS = [
  { icon: Briefcase, value: '2+', label: 'Years in Mobile Security' },
  { icon: Smartphone, value: '5', label: 'Apps on Google Play' },
  { icon: BookOpen, value: '1', label: 'Peer-reviewed Publication' },
  { icon: Award, value: '9.69', label: 'BCA CGPA (Silver Medal)' },
];

const Stats: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
    {STATS.map(({ icon: Icon, value, label }, index) => (
      <Reveal key={label} delay={index * 0.08}>
        <div className="h-full flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 dark:border-dark-600 bg-white/70 dark:bg-dark-700/70 hover:shadow-lg transition-shadow">
          <span className="p-3 mb-3 rounded-full bg-primary-50 dark:bg-secondary-900/10 text-primary-600 dark:text-secondary-900">
            <Icon size={22} aria-hidden="true" />
          </span>
          <p className="text-3xl font-bold text-dark-900 dark:text-white tabular-nums">{value}</p>
          <p className="text-sm font-medium text-dark-400 dark:text-gray-400">{label}</p>
        </div>
      </Reveal>
    ))}
  </div>
);

export default Stats;
