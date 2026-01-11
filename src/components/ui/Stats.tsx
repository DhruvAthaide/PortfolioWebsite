import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Code, Users } from 'lucide-react';

const stats = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    value: "4+",
    label: "Years Experience",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "60+",
    label: "Team Members Led",
  },
  {
    icon: <Code className="w-6 h-6" />,
    value: "4+",
    label: "Projects Completed",
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: "10+",
    label: "Tools Developed",
  },
];

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-dark-600 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
        >
          <div className="bg-primary-50 dark:bg-dark-600 p-3 rounded-full text-primary-600 dark:text-secondary-400 mb-3">
            {stat.icon}
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;
