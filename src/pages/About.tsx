import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import SkillBar from '../components/ui/SkillBar';
import TimelineItem from '../components/ui/TimelineItem';
import Stats from '../components/ui/Stats';

import SEO from '../components/utils/SEO';
import GlitchText from '../components/ui/GlitchText';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { technicalSkills, programmingSkills, toolsSkills, workExperience, education } from '../data/skills';

const About: React.FC = () => {
  return (
    <div className="relative pt-20">
      <SEO 
        title="About Me" 
        description="Learn more about Dhruv Athaide, a Red Team Analyst & Software Developer based in Mumbai, India."
        keywords={['About', 'Skills', 'Experience', 'Education', 'Resume', 'CV']}
      />

      
      <div className="container-custom py-10">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-primary-600 dark:text-secondary-900 inline-block"><GlitchText text="Me" /></span>
        </motion.h1>
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="section-title">Who Am I?</h2>
            <p className="text-lg text-dark-500 dark:text-gray-300 mb-6">
              I'm a Red Team Analyst & Software Developer based in Mumbai, India. With extensive experience in building secure applications and implementing robust security measures, I specialize in creating solutions that protect sensitive information from emerging threats.
            </p>
            <p className="text-lg text-dark-500 dark:text-gray-300 mb-8">
              My expertise spans network security, application security, cryptographic systems, and secure development practices. I'm committed to staying at the forefront of cybersecurity innovation.
            </p>
            
            <a 
              href="/documents/DhruvAthaide_CV.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2 w-max"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4">Personal Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="space-y-3">
                <li className="flex flex-col">
                  <span className="font-medium text-sm text-gray-500 dark:text-gray-400">Name</span>
                  <span className="text-dark-500 dark:text-gray-300">Dhruv Athaide</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium text-sm text-gray-500 dark:text-gray-400">Location</span>
                  <span className="text-dark-500 dark:text-gray-300">Mumbai, India</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium text-sm text-gray-500 dark:text-gray-400">Email</span>
                  <span className="text-dark-500 dark:text-gray-300 break-all">athaidedhruv@gmail.com</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex flex-col">
                  <span className="font-medium text-sm text-gray-500 dark:text-gray-400">English</span>
                  <span className="text-dark-500 dark:text-gray-300">Fluent</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium text-sm text-gray-500 dark:text-gray-400">Hindi</span>
                  <span className="text-dark-500 dark:text-gray-300">Native</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium text-sm text-gray-500 dark:text-gray-400">Spanish</span>
                  <span className="text-dark-500 dark:text-gray-300">Intermediate</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <Stats />

        {/* Tabbed Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <Tabs defaultValue="skills" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="w-full max-w-md">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-primary-600 dark:text-secondary-900">Technical Security</h3>
                  {technicalSkills.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} percentage={skill.percentage} icon={skill.icon} color="bg-primary-600 dark:bg-secondary-900" />
                  ))}
                </div>
                <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-blue-500">Programming</h3>
                  {programmingSkills.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} percentage={skill.percentage} icon={skill.icon} color="bg-blue-500 dark:bg-blue-400" />
                  ))}
                </div>
                <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-green-500">Tools</h3>
                  {toolsSkills.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} percentage={skill.percentage} icon={skill.icon} color="bg-green-500 dark:bg-green-400" />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience">
              <div className="max-w-3xl mx-auto">
                {workExperience.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    organization={item.organization}
                    period={item.period}
                    description={item.description}
                    certificate={item.certificate}
                    logo={item.logo}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education">
              <div className="max-w-3xl mx-auto">
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
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center mb-10">Coding Activity</h2>
          <div className="flex justify-center p-8 bg-white dark:bg-dark-700 rounded-xl shadow-lg overflow-x-auto">
            <GitHubCalendar 
              username="DhruvAthaide" 
              colorScheme="dark"
              blockSize={12}
              blockMargin={5}
              fontSize={14}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;