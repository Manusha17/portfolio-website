// Portfolio configuration and static data
import { TimelineItem } from '@/types';

export const siteConfig = {
  name: 'Your Name',
  title: 'Software Engineer',
  description: 'A passionate software engineer building modern web applications',
  url: 'https://yourusername.github.io',
  ogImage: '/og-image.jpg',
  profileImage: '', // Add your profile image path here, e.g., '/profile.jpg'
  links: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'your.email@example.com',
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
      'GPA: 3.8/4.0'
    ],
    technologies: ['Java', 'Python', 'JavaScript', 'SQL'],
    location: 'City, State',
    icon: 'graduation-cap',
    color: '#3B82F6'
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
      'Participated in agile development processes'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    achievements: [
      'Delivered 5+ successful projects',
      'Improved application performance by 30%'
    ],
    location: 'City, State',
    icon: 'briefcase',
    color: '#10B981'
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
      'Architect scalable solutions for high-traffic applications'
    ],
    technologies: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    achievements: [
      'Led team of 4 developers',
      'Reduced deployment time by 50%',
      'Implemented CI/CD pipeline'
    ],
    location: 'City, State',
    icon: 'code',
    color: '#8B5CF6'
  }
  // Add more timeline items as needed
];