import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Play, ExternalLink, Layers, Shield, Cpu, Lock, ZoomIn } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { projects as projectsData } from '../data/projects';
import SEO from '../components/utils/SEO';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const project = projectsData.find(p => p.id === id);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
         <h2 className="text-2xl font-bold mb-4">Project Data Corrupted</h2>
         <Link to="/projects" className="btn btn-primary">
            <ArrowLeft size={16} className="mr-2" />
            Return to Projects
         </Link>
      </div>
    );
  }

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "operatingSystem": "Android",
    "applicationCategory": "SecurityApplication",
    "description": project.description,
    "image": window.location.origin + project.image,
    "author": {
      "@type": "Person",
      "name": "Dhruv Athaide"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="pt-20 min-h-screen pb-16">
      <SEO 
        title={`${project.title} | Project Case Study`}
        description={project.description}
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Hero Header */}
      <div className="container-custom">
        <Link to="/projects" className="inline-flex items-center text-dark-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-secondary-900 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 text-primary-600 dark:text-secondary-900 font-mono text-sm font-bold mb-4 uppercase tracking-wider">
               <Shield size={16} />
               <span>Case Study: {project.id}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-dark-500 dark:text-gray-300 mb-8 leading-relaxed">
              {project.longDescription || project.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
               {project.playstore && (
                 <a href={project.playstore} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex items-center gap-2">
                   <Play size={18} /> Play Store
                 </a>
               )}
               {project.github && (
                 <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex items-center gap-2">
                   <Github size={18} /> Source Code
                 </a>
               )}
               {project.demo && (
                 <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex items-center gap-2">
                   <ExternalLink size={18} /> Live Demo
                 </a>
               )}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1 bg-gray-200 dark:bg-dark-700 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div 
             className="relative group cursor-pointer"
             onClick={() => setOpen(true)}
           >
             <div className="absolute -inset-2 bg-gradient-to-tr from-primary-600 to-secondary-900 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
             <div className="relative overflow-hidden rounded-xl">
               <img 
                 src={project.image} 
                 alt={project.title}
                 className="w-full shadow-2xl border border-gray-200 dark:border-dark-700 transition-transform duration-500 group-hover:scale-[1.02]"
               />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                 <div className="bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-white backdrop-blur-sm">
                   <ZoomIn size={24} />
                 </div>
               </div>
             </div>
           </div>

           <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={[{ src: project.image, alt: project.title }]}
              plugins={[Zoom]}
            />
        </motion.div>

        {/* Deep Dive Sections */}
        {(project.challenges || project.features) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            
            {/* Features */}
            {project.features && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 lg:col-span-1 bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl border border-gray-100 dark:border-dark-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <Layers size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Key Features</h3>
                </div>
                <ul className="space-y-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                      <span className="text-dark-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Technical Challenges & Solutions */}
            {(project.challenges || project.solutions) && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="col-span-1 lg:col-span-2 space-y-8"
               >
                 {project.challenges && (
                   <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 dark:bg-red-900/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                     <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                           <Lock size={24} />
                        </div>
                        <h3 className="text-2xl font-bold">The Challenge</h3>
                     </div>
                     <ul className="space-y-4 relative z-10">
                        {project.challenges.map((challenge, i) => (
                           <li key={i} className="flex gap-4">
                              <span className="font-mono text-red-500 font-bold opacity-50">0{i+1}</span>
                              <p className="text-dark-600 dark:text-gray-300">{challenge}</p>
                           </li>
                        ))}
                     </ul>
                   </div>
                 )}

                 {project.solutions && (
                   <div className="bg-white dark:bg-dark-900 p-8 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 dark:bg-green-900/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                     <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                           <Cpu size={24} />
                        </div>
                        <h3 className="text-2xl font-bold">The Solution</h3>
                     </div>
                     <ul className="space-y-4 relative z-10">
                        {project.solutions.map((solution, i) => (
                           <li key={i} className="flex gap-4">
                              <span className="font-mono text-green-500 font-bold opacity-50">0{i+1}</span>
                              <p className="text-dark-600 dark:text-gray-300">{solution}</p>
                           </li>
                        ))}
                     </ul>
                   </div>
                 )}
               </motion.div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
