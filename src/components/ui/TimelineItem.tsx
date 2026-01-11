import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  title: string;
  organization: string;
  period: string;
  description: string;
  index: number;
  certificate?: string;
  logo?: string;
}

import { FileText, Building } from 'lucide-react';

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  organization,
  period,
  description,
  index,
  certificate,
  logo,
}) => {
  return (
    <motion.div 
      className="relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-dark-600 last:border-0 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-secondary-900" />
      <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">{period}</div>
      
      <div className="flex items-start gap-4 mb-2">
        <div className="flex-grow">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="text-primary-600 dark:text-secondary-900 font-medium">{organization}</div>
        </div>
        {logo ? (
            <img src={logo} alt={organization} className="w-12 h-12 object-contain rounded-md bg-white p-1 shadow-sm" />
        ) : (
            <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-dark-600 flex items-center justify-center text-gray-400">
                <Building size={24} />
            </div>
        )}
      </div>

      <p className="text-dark-500 dark:text-gray-300 mb-3">{description}</p>
      
      {certificate && (
        <a 
          href={certificate} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-secondary-900 hover:underline mt-2"
        >
          <FileText size={16} />
          <span>View Completion Letter</span>
        </a>
      )}
    </motion.div>
  );
};

export default TimelineItem;