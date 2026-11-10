import React from 'react';

// Every figure here must be backed by the CVs in public/documents.
const STATS = [
  { value: '2+', label: 'years in mobile security' },
  { value: '5', label: 'apps on Google Play' },
  { value: '1', label: 'peer-reviewed publication' },
  { value: '9.69', label: 'BCA CGPA, silver medal' },
];

const Stats: React.FC = () => (
  <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-y border-gray-200 dark:border-dark-600 py-8">
    {STATS.map((stat) => (
      <div key={stat.label} className="flex flex-col-reverse">
        <dt className="text-sm text-dark-400 dark:text-gray-400">{stat.label}</dt>
        <dd className="font-display text-3xl sm:text-4xl font-bold text-dark-900 dark:text-gray-50 tabular-nums">{stat.value}</dd>
      </div>
    ))}
  </dl>
);

export default Stats;
