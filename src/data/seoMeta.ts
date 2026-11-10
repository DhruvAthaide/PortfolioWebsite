export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
}

// Single source of truth for static-page SEO copy: read by the page components
// (via react-helmet-async at runtime) and by scripts/postbuild.mjs (to render
// matching static <head> tags per route at build time).
export const homeSEO: PageSEO = {
  title: 'Mobile & Application Security Engineer',
  description:
    'Dhruv Athaide is a Mobile & Application Security Engineer with 5 Android security apps shipped to Google Play: mobile VAPT, OWASP MASVS/MASTG, applied cryptography and native anti-tamper hardening.',
  keywords: ['Mobile Security Engineer', 'Application Security', 'Android Developer', 'Mobile VAPT', 'OWASP MASVS'],
};

export const aboutSEO: PageSEO = {
  title: 'About',
  description:
    'Experience, skills, education and publications of Dhruv Athaide, a Mobile & Application Security Engineer based in Mumbai, India. Download the Mobile Engineering or Application Security CV.',
  keywords: ['About', 'Skills', 'Experience', 'Education', 'Resume', 'CV', 'Publication'],
};

export const projectsSEO: PageSEO = {
  title: 'Projects',
  description:
    'Case studies of production Android security apps including Guardient, NoSurveil, LockGuard+, SecureLine and Torch, plus personal projects.',
  keywords: ['Projects', 'Portfolio', 'Android', 'Mobile Security', 'Case Studies'],
};

export const contactSEO: PageSEO = {
  title: 'Contact',
  description: 'Get in touch with Dhruv Athaide about mobile security, projects or collaborations.',
  keywords: ['Contact', 'Email', 'Hire', 'Collaboration'],
};
