export type ProjectCategory = 'Android' | 'Web' | 'Security' | 'Python';
export type FilterCategory = 'All' | ProjectCategory;

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  playstore?: string;
  website?: string;
  demo?: string;
  status: 'completed' | 'ongoing';

  // Fields for Detailed Project Page
  longDescription?: string;
  challenges?: string[];
  solutions?: string[];
  features?: string[];
  category: ProjectCategory[];

  // Flag for Home page featured section
  featured?: boolean;

  // Shows a compact list row on the Projects page instead of a full card
  earlyWork?: boolean;

  // Short glanceable proof point shown as a badge on the card (e.g. "410 Automated Tests")
  stat?: string;

  // Personal contribution, e.g. "Sole developer, 6 months" or "Lead Android developer, team of 4"
  role?: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface EducationItem {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Credential {
  title: string;
  issuer: string;
  href?: string;
}

export interface WorkExperience {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string[];
  certificate?: string;
  logo?: string;
}
