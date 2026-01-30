// Core data interfaces for the portfolio website

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  stars?: number;
  forks?: number;
  language: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: Date;
  readTime: number;
  url: string;
  imageUrl?: string;
  tags: string[];
  featured: boolean;
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'work' | 'achievement' | 'milestone';
  title: string;
  subtitle: string; // University name, Company name, etc.
  date: Date;
  endDate?: Date;
  description: string;
  details?: string[];
  technologies?: string[];
  achievements?: string[];
  icon?: string;
  color?: string;
  location?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  proficiency: ProficiencyLevel;
  yearsOfExperience?: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface CTAButton {
  id: string;
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  external?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// GitHub API interfaces
export interface GitHubRepository {
  name: string;
  description: string;
  url: string;
  homepageUrl?: string;
  primaryLanguage: {
    name: string;
    color: string;
  };
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  topics: string[];
}

// GitHub API raw response interface (from GitHub REST API)
export interface GitHubAPIRepository {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

// Medium RSS interfaces
export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
  categories: string[];
  imageUrl?: string;
}

// SEO and metadata interfaces
export interface PersonStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  knowsAbout: string[];
  alumniOf?: Organization[];
  worksFor?: Organization[];
}

export interface Organization {
  '@type': 'Organization';
  name: string;
  url?: string;
}