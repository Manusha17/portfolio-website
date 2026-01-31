import { siteConfig, timelineData, skillsData } from '@/data/config';
import { Project, Article } from '@/types';

// Generate structured data for a project
export function generateProjectStructuredData(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    url: project.liveUrl || project.githubUrl,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    programmingLanguage: project.technologies,
    codeRepository: project.githubUrl,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      url: siteConfig.url,
    },
    dateCreated: project.createdAt.toISOString(),
    dateModified: project.updatedAt.toISOString(),
    ...(project.imageUrl && { screenshot: project.imageUrl }),
  };
}

// Generate structured data for an article
export function generateArticleStructuredData(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: article.url,
    datePublished: article.publishedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Medium',
      url: 'https://medium.com',
    },
    ...(article.imageUrl && { image: article.imageUrl }),
    keywords: article.tags,
    wordCount: Math.ceil(article.readTime * 200), // Approximate word count
    timeRequired: `PT${article.readTime}M`,
  };
}

// Generate structured data for professional experience
export function generateWorkExperienceStructuredData() {
  const workExperience = timelineData
    .filter(item => item.type === 'work')
    .map(item => ({
      '@type': 'WorkExperience',
      name: item.title,
      description: item.description,
      startDate: item.date.toISOString().split('T')[0],
      ...(item.endDate && { endDate: item.endDate.toISOString().split('T')[0] }),
      employer: {
        '@type': 'Organization',
        name: item.subtitle,
        ...(item.location && { address: item.location }),
      },
      skills: item.technologies || [],
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    hasOccupation: workExperience,
  };
}

// Generate structured data for education
export function generateEducationStructuredData() {
  const education = timelineData
    .filter(item => item.type === 'education')
    .map(item => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.title,
      description: item.description,
      educationalLevel: 'Bachelor',
      credentialCategory: 'degree',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: item.subtitle,
        ...(item.location && { address: item.location }),
      },
      dateCreated: item.date.toISOString().split('T')[0],
      ...(item.endDate && { expires: item.endDate.toISOString().split('T')[0] }),
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    hasCredential: education,
  };
}

// Generate structured data for skills
export function generateSkillsStructuredData() {
  const allSkills = skillsData.flatMap(category => category.skills.map(skill => skill.name));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    knowsAbout: allSkills,
    hasOccupation: {
      '@type': 'Occupation',
      name: siteConfig.title,
      skills: allSkills,
      occupationLocation: {
        '@type': 'Place',
        name: 'Remote/Global',
      },
    },
  };
}

// Generate FAQ structured data for common questions
export function generateFAQStructuredData() {
  const faqs = [
    {
      question: `Who is ${siteConfig.name}?`,
      answer: `${siteConfig.name} is a ${siteConfig.title.toLowerCase()} with expertise in modern web development technologies including React, Next.js, TypeScript, and more.`,
    },
    {
      question: 'What technologies do you work with?',
      answer: `I work with ${skillsData
        .flatMap(cat => cat.skills.map(s => s.name))
        .slice(0, 5)
        .join(', ')} and many other modern web technologies.`,
    },
    {
      question: 'How can I contact you?',
      answer: `You can reach me via email at ${siteConfig.links.email} or connect with me on LinkedIn and GitHub.`,
    },
    {
      question: 'Are you available for new opportunities?',
      answer: 'Please check my current availability status on the contact section of my portfolio.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate comprehensive structured data for the homepage
export function generateHomepageStructuredData() {
  return [
    generateWorkExperienceStructuredData(),
    generateEducationStructuredData(),
    generateSkillsStructuredData(),
    generateFAQStructuredData(),
  ];
}
