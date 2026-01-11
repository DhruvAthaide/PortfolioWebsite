import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiPython, SiKotlin, SiFlutter, SiTypescript, SiKalilinux, 
  SiWireshark, SiDocker, SiGit, SiReact, SiAndroidstudio
} from 'react-icons/si';
import { FaNetworkWired, FaUserSecret, FaBug, FaJava } from 'react-icons/fa';

const TechMarquee: React.FC = () => {
  const icons = [
    { Icon: SiPython, name: "Python", color: "#3776AB" },
    { Icon: SiKotlin, name: "Kotlin", color: "#7F52FF" },
    { Icon: SiAndroidstudio, name: "Android", color: "#3DDC84" },
    { Icon: SiKalilinux, name: "Kali Linux", color: "#557C94" },
    { Icon: FaUserSecret, name: "Red Teaming", color: "#D11013" },
    { Icon: SiReact, name: "React", color: "#61DAFB" },
    { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { Icon: SiDocker, name: "Docker", color: "#2496ED" },
    { Icon: SiWireshark, name: "Wireshark", color: "#1679A7" },
    { Icon: FaBug, name: "Pentesting", color: "#E03C31" },
    { Icon: FaJava, name: "Java", color: "#007396" },
    { Icon: SiFlutter, name: "Flutter", color: "#02569B" },
    { Icon: SiGit, name: "Git", color: "#F05032" },
    { Icon: FaNetworkWired, name: "Networking", color: "#4CAF50" },
  ];

  // Duplicate the array to ensure seamless looping
  const duplicatedIcons = [...icons, ...icons, ...icons];

  return (
    <div className="w-full bg-gray-50/50 dark:bg-dark-800/50 py-8 overflow-hidden border-y border-gray-100 dark:border-dark-700 backdrop-blur-sm">
        <div className="container-custom mb-4">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Technologies & Tools
            </h3>
        </div>
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap py-2"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedIcons.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 group cursor-default">
              <item.Icon 
                size={40} 
                className="text-gray-400 dark:text-gray-600 group-hover:text-primary-600 dark:group-hover:text-secondary-400 transition-colors duration-300 transform group-hover:scale-110" 
                style={{ fill: undefined }} // Let class hover handle color or use item.color on hover if simpler
              />
              <span className="text-sm font-medium text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors opacity-0 group-hover:opacity-100 absolute -bottom-6">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient fades for sides */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-dark-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-dark-900 to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};

export default TechMarquee;
