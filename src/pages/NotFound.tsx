import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import GlitchText from '../components/ui/GlitchText';
import SEO from '../components/utils/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <SEO 
        title="404: System Failure" 
        description="Page not found. System integrity compromised."
      />
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="text-center z-10 px-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="mb-8 relative inline-block"
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900 opacity-80" style={{ fontFamily: 'monospace' }}>
            404
          </h1>
          <div className="absolute -inset-1 blur-md bg-red-500/30 -z-10 animate-pulse"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6 text-red-500 font-mono">
            <AlertTriangle size={24} className="animate-pulse" />
            <span className="text-xl tracking-widest uppercase font-bold">System Failure</span>
            <AlertTriangle size={24} className="animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <GlitchText text="Target Location Not Found" />
          </h2>
          
          <p className="text-dark-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The requested resource has either been moved, deleted, or never existed. 
            Your digital footprint has been logged at this sector.
          </p>

          <Link to="/" className="btn btn-primary inline-flex items-center gap-2 group">
            <Home size={18} className="group-hover:-translate-y-1 transition-transform" />
            <span>Return to Base</span>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
    </div>
  );
};

export default NotFound;
