import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";



import SEO from "../components/utils/SEO";
import GlitchText from "../components/ui/GlitchText";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <SEO 
        title="Home" 
        description="Dhruv Athaide - Red Team Analyst & Software Developer. Specializing in cybersecurity, penetration testing, and secure software development."
        keywords={['Red Team', 'Penetration Testing', 'Cybersecurity', 'Software Developer']}
      />


      <div className="container-custom min-h-screen flex items-center justify-center py-32">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Hi, I'm{" "}
              <span className="text-primary-600 dark:text-secondary-900 inline-block">
                <GlitchText text="Dhruv Athaide" />
              </span>
            </h1>

            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-dark-600 dark:text-gray-300 mb-6 h-12">
              <TypeAnimation
                sequence={[
                  "Red Team Analyst",
                  2000,
                  "Android Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <p className="text-lg text-dark-500 dark:text-gray-300 mb-8 max-w-2xl">
              I'm an Android Developer and Cybersecurity Red Team Analyst,
              constantly exploring new languages and expanding my coding skills
              while developing secure software solutions and protecting digital
              assets. Specializing in cybersecurity, penetration testing, and
              secure software development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/projects" className="btn btn-primary">
                <span>View Projects</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>

              <Link to="/contact" className="btn btn-outline">
                Contact Me
              </Link>
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
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-900 rounded-full blur opacity-75 animate-pulse-slow"></div>
              <img
                src="/images/home-DhruvAthaide.png"
                alt="Dhruv Athaide"
                className="relative rounded-full border-4 border-white dark:border-dark-700 w-full aspect-square object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;