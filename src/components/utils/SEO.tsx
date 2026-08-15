import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// Keep in sync with scripts/postbuild.mjs
const SITE_URL = 'https://dhruvathaide.com';
const DEFAULT_IMAGE = '/images/home-DhruvAthaide.png';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = "Dhruv Athaide - Red Team Analyst & Software Developer",
  keywords = [],
  image = DEFAULT_IMAGE,
}) => {
  const { pathname } = useLocation();
  const url = pathname === '/' ? SITE_URL : `${SITE_URL}${pathname}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const siteTitle = `${title} | Dhruv Athaide`;
  const allKeywords = ['Dhruv Athaide', 'Red Team Analyst', 'Cybersecurity', 'Software Developer', ...keywords].join(', ');

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImage} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
