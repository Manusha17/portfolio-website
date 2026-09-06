// Dev.to API integration utilities
import { siteConfig } from '@/data/config';
import { Article } from '@/types';

// Dev.to Article interface matching API response structure
export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  published_timestamp: string;
  tag_list: string[];
  tags: string;
  cover_image: string | null;
  social_image: string;
  reading_time_minutes: number;
  slug: string;
}

// Configuration for Dev.to integration
export const DEVTO_CONFIG = {
  // Dev.to username - from site config
  username: siteConfig.devto?.username || '',
  // Dev.to API URL pattern - Public API: https://dev.to/api/articles?username=[username]
  apiUrl: (username: string) => `https://dev.to/api/articles?username=${username}`,
  // Maximum number of articles to fetch
  maxArticles: siteConfig.devto?.maxArticles || 6,
  // Articles to prioritize (will be shown first if they exist)
  featuredArticles: siteConfig.devto?.featuredArticles || [],
  cacheTimeout: process.env.NODE_ENV === 'development' ? 300 : 3600, // 5 min dev, 1 hour prod
  // Rate limiting configuration
  rateLimitDelay: 1000, // 1 second between requests
  maxRetries: 3,
} as const;

export class DevToAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'DevToAPIError';
  }
}

// Rate limiting utility for Dev.to requests
class DevToRateLimiter {
  private lastRequest = 0;

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;

    if (timeSinceLastRequest < DEVTO_CONFIG.rateLimitDelay) {
      const waitTime = DEVTO_CONFIG.rateLimitDelay - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.lastRequest = Date.now();
  }
}

const devtoRateLimiter = new DevToRateLimiter();

// Fetch articles from Dev.to API
async function fetchFromAPI(apiUrl: string): Promise<DevToArticle[]> {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Portfolio-Website',
    },
    // Cache for configured timeout
    next: {
      revalidate: DEVTO_CONFIG.cacheTimeout,
    },
  });

  if (!response.ok) {
    throw new DevToAPIError(
      `Dev.to API request failed: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new DevToAPIError('Dev.to API returned invalid data format', 400);
  }

  return data;
}

// Extract plain text from HTML content
function extractTextFromHTML(html: string): string {
  // Remove HTML tags and decode HTML entities
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Transform Dev.to API response to Article interface
function transformDevToArticleToArticle(devtoArticle: DevToArticle): Article {
  // Create excerpt from description
  const excerpt =
    devtoArticle.description.length > 200
      ? devtoArticle.description.substring(0, 200) + '...'
      : devtoArticle.description;

  return {
    id: devtoArticle.id.toString(),
    title: devtoArticle.title,
    excerpt: extractTextFromHTML(excerpt),
    publishedAt: new Date(devtoArticle.published_timestamp || devtoArticle.published_at),
    readTime: devtoArticle.reading_time_minutes || 5, // Default to 5 min if not provided
    url: devtoArticle.url,
    imageUrl: devtoArticle.cover_image || devtoArticle.social_image || undefined,
    tags: devtoArticle.tag_list || devtoArticle.tags.split(', '),
    featured: DEVTO_CONFIG.featuredArticles.some(
      (featured: string) =>
        devtoArticle.title.toLowerCase().includes(featured.toLowerCase()) ||
        devtoArticle.url.includes(featured) ||
        devtoArticle.slug.includes(featured)
    ),
  };
}

// Fetch articles from Dev.to API with error handling and rate limiting
export async function fetchDevToArticles(
  username: string = DEVTO_CONFIG.username
): Promise<DevToArticle[]> {
  let retries = 0;

  while (retries < DEVTO_CONFIG.maxRetries) {
    try {
      await devtoRateLimiter.waitIfNeeded();

      const apiUrl = DEVTO_CONFIG.apiUrl(username);
      const articles = await fetchFromAPI(apiUrl);

      // Filter and validate articles
      const validArticles = articles
        .filter(article => {
          // Filter out articles without proper content
          return article.title && article.description && article.url;
        })
        .slice(0, DEVTO_CONFIG.maxArticles * 2); // Get more than needed for filtering

      // Sort articles: featured first, then by publication date
      const sortedArticles = validArticles.sort((a, b) => {
        const aIsFeatured = DEVTO_CONFIG.featuredArticles.some(
          (featured: string) =>
            a.title.toLowerCase().includes(featured.toLowerCase()) ||
            a.url.includes(featured) ||
            a.slug.includes(featured)
        );
        const bIsFeatured = DEVTO_CONFIG.featuredArticles.some(
          (featured: string) =>
            b.title.toLowerCase().includes(featured.toLowerCase()) ||
            b.url.includes(featured) ||
            b.slug.includes(featured)
        );

        // Featured articles come first
        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;

        // Sort by publication date (newest first)
        return (
          new Date(b.published_timestamp || b.published_at).getTime() -
          new Date(a.published_timestamp || a.published_at).getTime()
        );
      });

      // Return only the requested number of articles
      return sortedArticles.slice(0, DEVTO_CONFIG.maxArticles);
    } catch (error) {
      retries++;

      if (error instanceof DevToAPIError) {
        // Don't retry for client errors (4xx)
        if (error.status && error.status >= 400 && error.status < 500) {
          throw error;
        }
      }

      if (retries >= DEVTO_CONFIG.maxRetries) {
        throw error;
      }

      // Exponential backoff for retries
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }

  throw new DevToAPIError('Max retries exceeded');
}

// Get articles - throws error if fetch fails
export async function getArticles(): Promise<Article[]> {
  const devtoArticles = await fetchDevToArticles();
  return devtoArticles.map(article => transformDevToArticleToArticle(article));
}

// Utility to check if Dev.to API is available
export async function checkDevToAPIHealth(
  username: string = DEVTO_CONFIG.username
): Promise<boolean> {
  try {
    const apiUrl = DEVTO_CONFIG.apiUrl(username);
    const response = await fetch(apiUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Portfolio-Website',
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}

// Cache management utilities
export class DevToCache {
  private static cache = new Map<string, { data: Article[]; timestamp: number }>();

  static get(key: string): Article[] | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > DEVTO_CONFIG.cacheTimeout * 1000;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  static set(key: string, data: Article[]): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  static clear(): void {
    this.cache.clear();
  }
}

// Get articles with caching
export async function getCachedArticles(
  username: string = DEVTO_CONFIG.username
): Promise<Article[]> {
  const cacheKey = `devto-articles-${username}`;

  // Try to get from cache first
  const cached = DevToCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch fresh data
  const articles = await getArticles();

  // Cache the results
  DevToCache.set(cacheKey, articles);

  return articles;
}
