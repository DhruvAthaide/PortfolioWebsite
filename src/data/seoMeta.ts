export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
}

// Single source of truth for static-page SEO copy: read by the page components
// (via react-helmet-async at runtime) and by scripts/postbuild.mjs (to render
// matching static <head> tags per route at build time).
export const homeSEO: PageSEO = {
  title: 'Home',
  description:
    'Dhruv Athaide - Red Team Analyst & Software Developer. Specializing in cybersecurity, penetration testing, and secure software development.',
  keywords: ['Red Team', 'Penetration Testing', 'Cybersecurity', 'Software Developer'],
};

export const aboutSEO: PageSEO = {
  title: 'About Me',
  description: 'Learn more about Dhruv Athaide, a Red Team Analyst & Software Developer based in Mumbai, India.',
  keywords: ['About', 'Skills', 'Experience', 'Education', 'Resume', 'CV'],
};

export const projectsSEO: PageSEO = {
  title: 'Projects',
  description: 'Explore my portfolio of projects including Guardient, LockGuard, and various cybersecurity tools.',
  keywords: ['Projects', 'Portfolio', 'Android', 'Security Tools', 'Web Development'],
};

export const contactSEO: PageSEO = {
  title: 'Contact',
  description: "Get in touch with Dhruv Athaide for collaborations, projects, or just to say hello.",
  keywords: ['Contact', 'Email', 'Hire', 'Collaboration'],
};
