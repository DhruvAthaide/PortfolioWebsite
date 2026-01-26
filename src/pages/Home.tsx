import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import SEO from "../components/utils/SEO";
import GlitchText from "../components/ui/GlitchText";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import TechMarquee from "../components/ui/TechMarquee";
import { projects } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";

const Home: React.FC = () => {
  return (
    <div className="relative">
      <SEO 
        title="Home" 
        description="Dhruv Athaide - Red Team Analyst & Software Developer. Specializing in cybersecurity, penetration testing, and secure software development."
        keywords={['Red Team', 'Penetration Testing', 'Cybersecurity', 'Software Developer']}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Content */}
            <motion.div
              className="flex-1 text-center md:text-left z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-secondary-600 dark:text-secondary-400 font-mono mb-6 text-lg tracking-wide">
                  Hi, my name is
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                <span className="text-dark-900 dark:text-white">Dhruv</span>{' '}
                <span className="text-primary-600 dark:text-secondary-900 inline-block selection:bg-secondary-900 selection:text-dark-900">
                  <GlitchText text="Athaide" />
                </span>
              </h1>

              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-400 dark:text-gray-400 mb-8 h-20 sm:h-auto">
                I am a{' '}
                <span className="text-dark-900 dark:text-gray-100">
                    <TypeAnimation
                    sequence={[
                        "Red Team Analyst.",
                        1500,
                        "Android Developer.",
                        1500,
                        "Security Researcher.",
                        1500,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor={true}
                    />
                </span>
              </div>

              <p className="text-lg text-dark-500 dark:text-gray-300 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                I build things for the web and mobile, and then I break them. 
                My focus is on creating <span className="text-primary-600 dark:text-secondary-900 font-medium">secure</span>, <span className="text-primary-600 dark:text-secondary-900 font-medium">high-performance</span> software and exploring the depths of offensive security.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                <Link to="/projects" className="btn btn-primary px-8 py-3 text-lg shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all transform hover:-translate-y-1">
                  <span>View Work</span>
                  <ArrowRight size={20} className="ml-2" />
                </Link>

                <a 
                  href="/documents/DhruvAthaide_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline px-8 py-3 text-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-all transform hover:-translate-y-1"
                >
                  Download CV
                </a>
              </div>

               {/* Socials Dock */}
              <div className="flex gap-6 mt-12 justify-center md:justify-start items-center">
                <div className="h-px w-12 bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
                <div className="flex gap-5">
                    {[
                        { icon: Github, href: "https://github.com/DhruvAthaide", label: "GitHub" },
                        { icon: Linkedin, href: "https://linkedin.com/in/dhruvathaide", label: "LinkedIn" },
                        { icon: Mail, href: "mailto:athaidedhruv@gmail.com", label: "Email" }
                    ].map((item, idx) => (
                         <a
                            key={idx}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dark-400 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 transition-all transform hover:scale-110"
                            aria-label={item.label}
                        >
                            <item.icon size={26} />
                        </a>
                    ))}
                </div>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="flex-1 max-w-sm md:max-w-md"
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-secondary-900 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                <div className="relative rounded-full p-2 bg-white dark:bg-dark-800">
                     <img
                        src="/images/home-DhruvAthaide.png"
                        alt="Dhruv Athaide"
                        className="rounded-full w-full aspect-square object-cover object-center transition-all duration-500"
                    />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <TechMarquee />

      {/* Featured Projects */}
      <section className="py-24 bg-gray-50/50 dark:bg-dark-900/50 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 mb-3"
                >
                     <span className="h-px w-12 bg-primary-600 dark:bg-secondary-900"></span>
                     <span className="text-primary-600 dark:text-secondary-900 font-mono font-medium tracking-wider uppercase text-sm">Portfolio</span>
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold"
                >
                    Featured Projects
                </motion.h2>
            </div>
            <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary-600 dark:text-secondary-400 font-medium hover:underline group">
                View All Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects
                .filter(p => p.featured)
                .map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/projects" className="btn btn-outline inline-flex items-center gap-2">
                View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;