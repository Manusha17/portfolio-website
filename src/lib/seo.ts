import { Metadata } from 'next';
import { siteConfig, skillsData } from '@/data/config';
import { PersonStructuredData, Organization } from '@/types';

// Generate comprehensive metadata for pages
export function generateMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.title}`;
  const pageDescription = description || siteConfig.description;
  const pageUrl = `${siteConfig.url}${path}`;
  const pageOgImage = ogImage || siteConfig.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      ...siteConfig.keywords,
      ...skillsData.flatMap(category => category.skills.map(skill => skill.name.toLowerCase())),
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',

    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: `${siteConfig.name} - Portfolio`,
      images: [
        {
          url: pageOgImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.title}`,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageOgImage],
      creator: siteConfig.links.twitter
        ? `@${siteConfig.links.twitter.split('/').pop()}`
        : undefined,
    },

    // Additional meta tags
    other: {
      'theme-color': '#0a0a0a',
      'color-scheme': 'dark light',
    },

    // Verification tags (add your verification codes)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      },
    },

    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },
  };
}

// Generate JSON-LD structured data for Person schema
export function generatePersonStructuredData(): PersonStructuredData {
  const skills = skillsData.flatMap(category => category.skills.map(skill => skill.name));

  // Extract organizations from timeline data (would need to import timelineData)
  const organizations: Organization[] = [];

  const structuredData: PersonStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter].filter(
      Boolean
    ),
    knowsAbout: skills,
  };

  if (organizations.length > 0) {
    structuredData.worksFor = organizations;
  }

  return structuredData;
}

// Generate JSON-LD structured data for WebSite schema
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.name} - Portfolio`,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: siteConfig.title,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate JSON-LD structured data for Organization schema (if applicable)
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${siteConfig.name} - Software Engineering`,
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.links.email,
      contactType: 'professional',
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter].filter(
      Boolean
    ),
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
