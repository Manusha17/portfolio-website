// Portfolio configuration and static data
import { TimelineItem, SkillCategory, ProficiencyLevel } from '@/types';

export const siteConfig = {
  name: 'Your Name',
  title: 'Software Engineer',
  description:
    'A passionate software engineer building modern web applications with React, Next.js, and TypeScript. Explore my projects, articles, and professional journey.',
  url: 'https://yourusername.github.io',
  ogImage: '/og-image.jpg',
  profileImage: '', // Add your profile image path here, e.g., '/profile.jpg'
  keywords: [
    'software engineer',
    'web developer',
    'full stack developer',
    'react developer',
    'next.js developer',
    'typescript developer',
    'frontend developer',
    'backend developer',
    'javascript',
    'portfolio',
    'web development',
    'software development',
  ],
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    url: 'https://yourusername.github.io',
  },
  links: {
    github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://x.com/yourusername',
    email: 'your.email@example.com',
  },
  // GitHub integration settings
  github: {
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'yourusername',
    showForks: false,
    maxRepos: 6,
    featuredRepos: ['world_time_app'], // Add repository names you want to feature
    excludeRepos: ['yourusername', 'yourusername.github.io'], // Repos to exclude from display
    showPrivateRepos: false, // Only works with GitHub token
  },
  // Medium integration settings
  medium: {
    username: process.env.NEXT_PUBLIC_MEDIUM_USERNAME || 'yourusername',
    maxArticles: 6,
    featuredArticles: [], // Add article titles or URLs you want to feature
  },
  // SEO settings
  seo: {
    defaultTitle: 'Your Name - Software Engineer',
    titleTemplate: '%s | Your Name',
    defaultDescription:
      'A passionate software engineer building modern web applications with React, Next.js, and TypeScript. Explore my projects, articles, and professional journey.',
    siteUrl: 'https://yourusername.github.io',
    defaultImage: '/og-image.jpg',
    twitterUsername: '@yourusername',
    facebookAppId: '', // Add if you have one
    googleSiteVerification: '', // Add your Google verification code
    bingSiteVerification: '', // Add your Bing verification code
  },
};

export const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Articles', href: '#articles' },
  { name: 'Contact', href: '#contact' },
];

// This will be populated with actual data later
export const personalInfo = {
  name: siteConfig.name,
  title: siteConfig.title,
  bio: 'Add your professional biography here...',
  location: 'Your Location',
  availability: 'Available for new opportunities',
};

// Sample timeline data structure - replace with your actual career journey
export const timelineData: TimelineItem[] = [
  {
    id: '1',
    type: 'education',
    title: 'Bachelor of Computer Science',
    subtitle: 'University Name',
    date: new Date('2018-09-01'),
    endDate: new Date('2022-06-01'),
    description: 'Graduated with honors, focusing on software engineering and web development.',
    details: [
      'Relevant coursework: Data Structures, Algorithms, Web Development',
      'Senior project: Built a full-stack web application',
      'GPA: 3.8/4.0',
    ],
    technologies: ['Java', 'Python', 'JavaScript', 'SQL'],
    location: 'City, State',
    icon: 'graduation-cap',
    color: '#3B82F6',
  },
  {
    id: '2',
    type: 'work',
    title: 'Junior Software Developer',
    subtitle: 'First Company Name',
    date: new Date('2022-07-01'),
    endDate: new Date('2023-12-01'),
    description: 'Started career building web applications and learning industry best practices.',
    details: [
      'Developed responsive web applications using React and Node.js',
      'Collaborated with senior developers on code reviews',
      'Participated in agile development processes',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    achievements: ['Delivered 5+ successful projects', 'Improved application performance by 30%'],
    location: 'City, State',
    icon: 'briefcase',
    color: '#10B981',
  },
  {
    id: '3',
    type: 'work',
    title: 'Software Engineer',
    subtitle: 'Current Company Name',
    date: new Date('2024-01-01'),
    description: 'Currently working on complex web applications and leading technical initiatives.',
    details: [
      'Lead development of customer-facing applications',
      'Mentor junior developers and conduct code reviews',
      'Architect scalable solutions for high-traffic applications',
    ],
    technologies: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    achievements: [
      'Led team of 4 developers',
      'Reduced deployment time by 50%',
      'Implemented CI/CD pipeline',
    ],
    location: 'City, State',
    icon: 'code',
    color: '#8B5CF6',
  },
  // Add more timeline items as needed
];

// Sample skills data - replace with your actual skills
export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    skills: [
      {
        id: 'react',
        name: 'React',
        proficiency: ProficiencyLevel.ADVANCED,
        yearsOfExperience: 3,
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        proficiency: ProficiencyLevel.ADVANCED,
        yearsOfExperience: 2,
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        proficiency: ProficiencyLevel.ADVANCED,
        yearsOfExperience: 3,
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        proficiency: ProficiencyLevel.EXPERT,
        yearsOfExperience: 2,
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        proficiency: ProficiencyLevel.EXPERT,
        yearsOfExperience: 4,
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    skills: [
      {
        id: 'nodejs',
        name: 'Node.js',
        proficiency: ProficiencyLevel.ADVANCED,
        yearsOfExperience: 3,
      },
      {
        id: 'python',
        name: 'Python',
        proficiency: ProficiencyLevel.INTERMEDIATE,
        yearsOfExperience: 2,
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        proficiency: ProficiencyLevel.INTERMEDIATE,
        yearsOfExperience: 2,
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        proficiency: ProficiencyLevel.INTERMEDIATE,
        yearsOfExperience: 2,
      },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Technologies',
    skills: [
      {
        id: 'git',
        name: 'Git',
        proficiency: ProficiencyLevel.ADVANCED,
        yearsOfExperience: 4,
      },
      {
        id: 'docker',
        name: 'Docker',
        proficiency: ProficiencyLevel.INTERMEDIATE,
        yearsOfExperience: 1,
      },
      {
        id: 'aws',
        name: 'AWS',
        proficiency: ProficiencyLevel.INTERMEDIATE,
        yearsOfExperience: 1,
      },
      {
        id: 'figma',
        name: 'Figma',
        proficiency: ProficiencyLevel.INTERMEDIATE,
        yearsOfExperience: 2,
      },
    ],
  },
];
