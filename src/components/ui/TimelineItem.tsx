import React from 'react';
import { FileText } from 'lucide-react';

interface TimelineItemProps {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string | string[];
  certificate?: string;
  logo?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  organization,
  location,
  period,
  description,
  certificate,
  logo,
}) => (
  <div className="relative pl-6 pb-10 border-l border-gray-300 dark:border-dark-600 last:border-transparent last:pb-0">
    <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-primary-600 dark:bg-secondary-900" />

    <div className="flex items-start gap-4">
      <div className="flex-grow min-w-0">
        <p className="text-sm text-dark-400 dark:text-gray-400">
          {period}
          {location ? `, ${location}` : ''}
        </p>
        <h3 className="mt-1 text-lg">{title}</h3>
        <p className="font-medium text-primary-600 dark:text-secondary-900">{organization}</p>
      </div>
      {logo && (
        <img
          src={logo}
          alt={`${organization} logo`}
          loading="lazy"
          className="w-10 h-10 object-contain rounded-md bg-white p-1 border border-gray-200 dark:border-dark-600 shrink-0"
        />
      )}
    </div>

    {Array.isArray(description) ? (
      <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-dark-300">
        {description.map((point) => (
          <li key={point} className="leading-relaxed">{point}</li>
        ))}
      </ul>
    ) : (
      <p className="mt-3 leading-relaxed">{description}</p>
    )}

    {certificate && (
      <a
        href={certificate}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm link"
      >
        <FileText size={14} aria-hidden="true" />
        Completion letter
      </a>
    )}
  </div>
);

export default TimelineItem;
