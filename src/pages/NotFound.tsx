import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { Home } from 'lucide-react';
import GlitchText from '../components/ui/GlitchText';
import SEO from '../components/utils/SEO';

const NotFound: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="container-custom min-h-[100svh] flex items-center justify-center text-center pt-20">
      <SEO title="404: Page Not Found" description="The page you are looking for does not exist." />
      <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <p className="relative inline-block font-mono font-bold text-8xl sm:text-9xl text-gradient">
          404
          <span aria-hidden="true" className="absolute -inset-2 -z-10 blur-2xl opacity-30 bg-primary-400 dark:bg-secondary-900 animate-pulse-slow motion-reduce:animate-none" />
        </p>
        <p className="mt-4 font-mono text-sm text-dark-400 dark:text-gray-400 break-all">GET {pathname}</p>
        <h1 className="mt-6 text-2xl sm:text-3xl">
          <GlitchText text="This page doesn't exist" />
        </h1>
        <p className="mt-4 max-w-md mx-auto">The link may be old or mistyped. Everything on the site is reachable from the home page.</p>
        <Link to="/" className="btn btn-primary mt-8">
          <Home size={18} aria-hidden="true" /> Back to Home
        </Link>
      </m.div>
    </div>
  );
};

export default NotFound;
