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
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Content */}
            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-secondary-600 dark:text-secondary-400 font-mono mb-4 text-lg">
                  Hi, my name is
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                <span className="text-primary-600 dark:text-secondary-900 inline-block">
                  <GlitchText text="Dhruv Athaide" />
                </span>
              </h1>

              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-dark-600 dark:text-gray-300 mb-6 h-12">
                <TypeAnimation
                  sequence={[
                    "Red Team Analyst",
                    1000,
                    "Android Developer",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>

              <p className="text-lg text-dark-500 dark:text-gray-300 mb-8 max-w-2xl">
                I'm an Android Developer and Cybersecurity Red Team Analyst, 
                constantly exploring new languages and expanding my coding skills while 
                developing secure software solutions and protecting digital assets. 
                Specializing in cybersecurity, penetration testing, and secure software development.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/projects" className="btn btn-primary">
                  <span>View Projects</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>

                <a 
                  href="/documents/DhruvAthaide_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Download CV
                </a>
              </div>

              <div className="flex gap-6 mt-10 justify-center md:justify-start">
                <a
                  href="https://github.com/DhruvAthaide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/dhruvathaide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:athaidedhruv@gmail.com"
                  className="text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="flex-1 max-w-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-secondary-900 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                <img
                  src="/images/home-DhruvAthaide.png"
                  alt="Dhruv Athaide"
                  className="relative rounded-full border-4 border-white dark:border-dark-700 w-full aspect-square object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <TechMarquee />

      {/* Featured Projects */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="section-title mb-2">Featured Projects</h2>
                <p className="text-dark-500 dark:text-gray-400 max-w-2xl">
                    A selection of my recent work in Android security and Red Teaming.
                </p>
            </div>
            <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary-600 dark:text-secondary-400 font-medium hover:underline">
                View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects
                .filter(p => p.id === 'dc-guardient' || p.id === 'dc-nosurveil')
                .map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
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