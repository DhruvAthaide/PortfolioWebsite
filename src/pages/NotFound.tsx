import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/utils/SEO';

const NotFound: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="container-custom pt-40 pb-24">
      <SEO title="404: Page Not Found" description="The page you are looking for does not exist." />
      <p className="font-mono text-sm text-dark-400 dark:text-gray-400">
        GET {pathname} <span className="text-red-600 dark:text-red-400">404</span>
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-lg max-w-xl">
        The link may be old or mistyped. Everything on the site is reachable from the home page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-primary">Back to home</Link>
        <Link to="/projects" className="btn btn-outline">See projects</Link>
      </div>
    </div>
  );
};

export default NotFound;
