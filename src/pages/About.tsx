import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SkillBar from '../components/ui/SkillBar';
import TimelineItem from '../components/ui/TimelineItem';
import InteractiveBackground from '../components/three/InteractiveBackground';
import { technicalSkills, programmingSkills, toolsSkills, workExperience, education } from '../data/skills';

const About: React.FC = () => {
  return (
    <div className="relative pt-20">
      <InteractiveBackground />
      
      <div className="container-custom py-10">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-primary-600 dark:text-secondary-900">Me</span>
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="section-title">Who Am I?</h2>
            <p className="text-lg text-dark-500 dark:text-gray-300 mb-6">
              I'm a Red Team Analyst & Software Developer based in Mumbai, India. With extensive experience in building secure applications and implementing robust security measures, I specialize in creating solutions that protect sensitive information from emerging threats.
            </p>
            <p className="text-lg text-dark-500 dark:text-gray-300 mb-10">
              My expertise spans network security, application security, cryptographic systems, and secure development practices. I'm committed to staying at the forefront of cybersecurity innovation and applying cutting-edge techniques to solve complex security challenges.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div>
                <h3 className="text-xl font-bold mb-3">Personal Info</h3>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="font-medium w-20">Name:</span>
                    <span className="text-dark-500 dark:text-gray-300">Dhruv Athaide</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-20">Location:</span>
                    <span className="text-dark-500 dark:text-gray-300">Mumbai, India</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-20">Email:</span>
                    <span className="text-dark-500 dark:text-gray-300 break-all">athaidedhruv@gmail.com</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-20">Phone:</span>
                    <span className="text-dark-500 dark:text-gray-300">+91 9320693337</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Languages</h3>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="font-medium w-20">English:</span>
                    <span className="text-dark-500 dark:text-gray-300">Fluent</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-20">Hindi:</span>
                    <span className="text-dark-500 dark:text-gray-300">Native</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-20">Spanish:</span>
                    <span className="text-dark-500 dark:text-gray-300">Intermediate</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <a 
              href="\documents\DhruvAthaide_CV.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2 w-max"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </motion.div>
          
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="section-title">My Skills</h2>
            
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">Technical Security Skills</h3>
              {technicalSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  color="bg-primary-600 dark:bg-secondary-900"
                />
              ))}
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">Programming Languages</h3>
              {programmingSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  color="bg-blue-500 dark:bg-blue-400"
                />
              ))}
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Tools & Technologies</h3>
              {toolsSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  color="bg-green-500 dark:bg-green-400"
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Experience & Education */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="section-title">Work Experience</h2>
            <div className="mt-8">
              {workExperience.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  organization={item.organization}
                  period={item.period}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="section-title">Education & Certifications</h2>
            <div className="mt-8">
              {education.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  organization={item.organization}
                  period={item.period}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;