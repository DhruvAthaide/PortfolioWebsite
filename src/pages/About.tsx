import React from 'react';
import { motion } from 'framer-motion';
import { Download, User, MapPin, Mail, Languages, Globe } from 'lucide-react';
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h2 className="section-title text-left mb-6">Who Am I?</h2>
            <div className="space-y-4 text-lg text-dark-500 dark:text-gray-300 leading-relaxed">
              <p>
                I'm a <span className="text-primary-600 dark:text-secondary-900 font-semibold">Red Team Analyst</span> & <span className="text-primary-600 dark:text-secondary-900 font-semibold">Mobile App Developer</span> based in <span className="text-white font-medium">Mumbai, India</span>. 
              </p>
              <p>
                I don't just build applications, I break them to make them stronger. My passion lies at the intersection of <span className="text-white font-medium">software engineering</span> and <span className="text-white font-medium">offensive security</span>.
              </p>
              <p>
                With a deep understanding of network protocols, and secure coding practices, I create digital solutions that are as <span className="italic">resilient</span> as they are <span className="italic">performant</span>.
              </p>
            </div>
            
            <div className="mt-8">
              <a 
                href="/documents/DhruvAthaide_CV.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center gap-2 w-max group"
              >
                <Download size={18} className="group-hover:scale-110 transition-transform" />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Info Cards */}
            <div className="bg-white/50 dark:bg-dark-700/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-dark-600 hover:border-primary-500 dark:hover:border-secondary-900 transition-colors duration-300 group">
              <div className="mb-3 text-primary-600 dark:text-secondary-900">
                <User size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Name</h3>
              <p className="text-lg font-semibold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors">Dhruv Athaide</p>
            </div>

            <div className="bg-white/50 dark:bg-dark-700/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-dark-600 hover:border-primary-500 dark:hover:border-secondary-900 transition-colors duration-300 group">
              <div className="mb-3 text-primary-600 dark:text-secondary-900">
                <MapPin size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Location</h3>
              <p className="text-lg font-semibold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors">Mumbai, India</p>
            </div>

            <div className="bg-white/50 dark:bg-dark-700/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-dark-600 hover:border-primary-500 dark:hover:border-secondary-900 transition-colors duration-300 group sm:col-span-2">
              <div className="mb-3 text-primary-600 dark:text-secondary-900">
                <Mail size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Email</h3>
              <p className="text-lg font-mono font-medium text-dark-900 dark:text-white break-all hover:text-primary-600 dark:hover:text-secondary-900 transition-colors cursor-pointer" onClick={() => window.location.href = 'mailto:athaidedhruv@gmail.com'}>
                athaidedhruv@gmail.com
              </p>
            </div>

             <div className="bg-white/50 dark:bg-dark-700/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-dark-600 hover:border-primary-500 dark:hover:border-secondary-900 transition-colors duration-300 group">
              <div className="mb-3 text-primary-600 dark:text-secondary-900">
                <Globe size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Languages</h3>
              <div className="flex flex-col gap-1">
                <span className="text-base font-medium text-dark-900 dark:text-white">English <span className="text-xs text-gray-500 font-normal ml-1">(Fluent)</span></span>
                <span className="text-base font-medium text-dark-900 dark:text-white">Hindi <span className="text-xs text-gray-500 font-normal ml-1">(Native)</span></span>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-dark-700/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-dark-600 hover:border-primary-500 dark:hover:border-secondary-900 transition-colors duration-300 group">
              <div className="mb-3 text-primary-600 dark:text-secondary-900">
                <Languages size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Learning</h3>
              <p className="text-lg font-medium text-dark-900 dark:text-white">Spanish <span className="text-sm text-gray-500 font-normal ml-1">(Intermediate)</span></p>
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
                <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-dark-600">
                  <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    <span className="text-primary-600 dark:text-secondary-900">⚡</span> Technical Security
                  </h3>
                  {technicalSkills.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} percentage={skill.percentage} icon={skill.icon} color="bg-primary-600 dark:bg-secondary-900" />
                  ))}
                </div>
                <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-dark-600">
                  <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                    <span className="text-blue-500">💻</span> Programming
                  </h3>
                  {programmingSkills.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} percentage={skill.percentage} icon={skill.icon} color="bg-blue-500 dark:bg-blue-400" />
                  ))}
                </div>
                <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-dark-600">
                  <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                     <span className="text-green-500">🛠️</span> Tools
                  </h3>
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
          <div className="flex justify-center p-8 bg-white dark:bg-dark-700 rounded-xl shadow-lg border border-gray-100 dark:border-dark-600 overflow-x-auto">
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