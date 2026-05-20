export type ProjectCategory = 'Android' | 'Web' | 'Security' | 'Python' | 'Other';
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
}
