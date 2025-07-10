import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  title: string;
  organization: string;
  period: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  organization,
  period,
  description,
  index,
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
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="text-primary-600 dark:text-secondary-900 mb-2">{organization}</div>
      <p className="text-dark-500 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default TimelineItem;