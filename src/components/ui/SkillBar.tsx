import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ 
  name, 
  percentage, 
  color = 'bg-secondary-900'
}) => {
  const barRef = React.useRef(null);
  const isInView = useInView(barRef, { once: true, amount: 0.3 });
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage]);

  return (
    <div ref={barRef} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          style={{ width: `${width}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default SkillBar;