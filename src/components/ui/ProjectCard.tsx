import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Play, Globe } from 'lucide-react';

import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
  children?: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, className, children }) => {
  const { title, description, image, technologies, github, playstore, website, demo, status } = project;
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      className={`group relative flex flex-col h-full bg-slate-50 dark:bg-[#0a0a0a] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Animated Border Glow */}
       <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/5 dark:ring-white/10 group-hover:ring-sky-500/50 transition-colors duration-300 z-20 pointer-events-none" />

      {children}

      <div className="relative h-52 shrink-0 overflow-hidden cursor-pointer" onClick={() => document.getElementById(`link-${project.id}`)?.click()}>
         <Link to={`/projects/${project.id}`} id={`link-${project.id}`} className="block h-full">
            <motion.img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        </Link>

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-30">
          <div className={`
             backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5
             ${status === 'completed' 
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'}
          `}>
             <span className={`w-1.5 h-1.5 rounded-full ${status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
            {status}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <Link to={`/projects/${project.id}`}>
            <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 group-hover:from-sky-500 group-hover:to-indigo-500 transition-all duration-300 flex items-center gap-2">
            {title}
            </h3>
        </Link>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed line-clamp-3">
            {description}
        </p>
        
        {/* Technologies - Modern Pill Design */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {technologies.slice(0, 4).map((tech, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-md border border-slate-200 dark:border-white/10 group-hover:border-sky-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
           {technologies.length > 4 && (
             <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-md border border-slate-100 dark:border-white/5">
               +{technologies.length - 4}
             </span>
           )}
        </div>
        
        {/* Actions - Glassmorphic Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
           {playstore && (
            <a href={playstore} target="_blank" rel="noopener noreferrer" 
               className="col-span-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group/btn border border-transparent hover:border-emerald-500/30">
                <Play size={16} fill="currentColor" />
                <span className="text-xs font-bold">Play Store</span>
            </a>
           )}
           
           {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" 
               className="col-span-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 transition-all group/btn border border-transparent hover:border-sky-500/30">
                <Globe size={16} />
                <span className="text-xs font-bold">Website</span>
            </a>
           )}

           {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" 
               className={`col-span-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all group/btn border border-transparent hover:border-purple-500/30 ${(!playstore && !website) ? 'col-span-2' : ''}`}>
                <Github size={16} />
                <span className="text-xs font-bold">GitHub</span>
            </a>
           )}
           
           {demo && !website && (
            <a href={demo} target="_blank" rel="noopener noreferrer" 
               className="col-span-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all group/btn border border-transparent hover:border-rose-500/30">
                <ExternalLink size={16} />
                <span className="text-xs font-bold">Demo</span>
            </a>
           )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;