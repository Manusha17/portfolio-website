import { siteConfig } from '@/data/config';

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Generate sitemap entries for the portfolio website
export function generateSitemapEntries(): SitemapEntry[] {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const entries: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}#about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}#projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}#articles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}#contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return entries;
}

// Generate XML sitemap content
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xmlEntries = entries
    .map(entry => {
      const lastmod = entry.lastModified ? entry.lastModified.toISOString().split('T')[0] : '';
      const changefreq = entry.changeFrequency || 'monthly';
      const priority = entry.priority || 0.5;

      return `  <url>
    <loc>${entry.url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  const baseUrl = siteConfig.url;

  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
}
