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

  // Short glanceable proof point shown as a badge on the card (e.g. "Live on Play Store")
  stat?: string;
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
