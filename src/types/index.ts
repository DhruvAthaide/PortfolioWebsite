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
  
  // New fields for Detailed Project Page
  longDescription?: string;
  challenges?: string[];
  solutions?: string[];
  features?: string[];
  screenshots?: string[];
  category: ('Android' | 'Web' | 'Security' | 'Python' | 'Other')[];
  
  // New flag for Home page
  featured?: boolean;
}
