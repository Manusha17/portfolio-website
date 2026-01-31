// Medium RSS/API integration utilities
import { siteConfig } from '@/data/config';
import { MediumArticle, Article } from '@/types';

// Configuration for Medium integration
export const MEDIUM_CONFIG = {
  // Medium username - from site config
  username: siteConfig.medium.username,
  // RSS feed URL pattern
  rssUrl: (username: string) => `https://medium.com/feed/@${username}`,
  // RSS to JSON conversion service (using rss2json.com as fallback)
  rssToJsonUrl: (rssUrl: string) =>
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
  // Maximum number of articles to fetch
  maxArticles: siteConfig.medium.maxArticles,
  // Articles to prioritize (will be shown first if they exist)
  featuredArticles: siteConfig.medium.featuredArticles,
  cacheTimeout: process.env.NODE_ENV === 'development' ? 300 : 3600, // 5 min dev, 1 hour prod
  // Rate limiting configuration
  rateLimitDelay: 1000, // 1 second between requests
  maxRetries: 3,
} as const;

export class MediumAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'MediumAPIError';
  }
}

// Rate limiting utility for Medium requests
class MediumRateLimiter {
  private lastRequest = 0;

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;

    if (timeSinceLastRequest < MEDIUM_CONFIG.rateLimitDelay) {
      const waitTime = MEDIUM_CONFIG.rateLimitDelay - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.lastRequest = Date.now();
  }
}

const mediumRateLimiter = new MediumRateLimiter();

// RSS2JSON API response interface
interface RSS2JSONResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: Array<{
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: Record<string, unknown>;
    categories: string[];
  }>;
}

// Parse RSS feed using RSS2JSON service
async function parseRSSFeed(rssUrl: string): Promise<RSS2JSONResponse> {
  const apiUrl = MEDIUM_CONFIG.rssToJsonUrl(rssUrl);

  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Portfolio-Website',
    },
    // Cache for configured timeout
    next: {
      revalidate: MEDIUM_CONFIG.cacheTimeout,
    },
  });

  if (!response.ok) {
    throw new MediumAPIError(
      `RSS2JSON API request failed: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  const data = await response.json();

  if (data.status !== 'ok') {
    throw new MediumAPIError(`RSS2JSON API returned error status: ${data.status}`, 400);
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

// Calculate estimated read time based on content length
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Extract image URL from HTML description
function extractImageFromDescription(description: string): string | undefined {
  try {
    const match = description.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : undefined;
  } catch {
    return undefined;
  }
}

// Transform RSS item to MediumArticle interface
function transformRSSItemToMediumArticle(item: RSS2JSONResponse['items'][0]): MediumArticle {
  return {
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: extractTextFromHTML(item.description),
    guid: item.guid,
    categories: item.categories || [],
    imageUrl: extractImageFromDescription(item.description),
  };
}

// Transform MediumArticle to Article interface
function transformMediumArticleToArticle(mediumArticle: MediumArticle, content?: string): Article {
  const plainTextContent = content || mediumArticle.description;
  return {
    id: mediumArticle.guid || mediumArticle.link,
    title: mediumArticle.title,
    excerpt:
      mediumArticle.description.length > 200
        ? mediumArticle.description.substring(0, 200) + '...'
        : mediumArticle.description,
    publishedAt: new Date(mediumArticle.pubDate),
    readTime: calculateReadTime(plainTextContent),
    url: mediumArticle.link,
    imageUrl: mediumArticle.imageUrl,
    tags: mediumArticle.categories,
    featured: MEDIUM_CONFIG.featuredArticles.some(
      (featured: string) =>
        mediumArticle.title.toLowerCase().includes(featured.toLowerCase()) ||
        mediumArticle.link.includes(featured)
    ),
  };
}

// Fetch articles from Medium RSS feed with error handling and rate limiting
export async function fetchMediumArticles(
  username: string = MEDIUM_CONFIG.username
): Promise<MediumArticle[]> {
  let retries = 0;

  while (retries < MEDIUM_CONFIG.maxRetries) {
    try {
      await mediumRateLimiter.waitIfNeeded();

      const rssUrl = MEDIUM_CONFIG.rssUrl(username);
      const rssData = await parseRSSFeed(rssUrl);

      // Transform RSS items to MediumArticle format
      const articles = rssData.items
        .slice(0, MEDIUM_CONFIG.maxArticles * 2) // Get more than needed for filtering
        .map(transformRSSItemToMediumArticle)
        .filter(article => {
          // Filter out articles without proper content
          return article.title && article.description && article.link;
        });

      // Sort articles: featured first, then by publication date
      const sortedArticles = articles.sort((a, b) => {
        const aIsFeatured = MEDIUM_CONFIG.featuredArticles.some(
          (featured: string) =>
            a.title.toLowerCase().includes(featured.toLowerCase()) || a.link.includes(featured)
        );
        const bIsFeatured = MEDIUM_CONFIG.featuredArticles.some(
          (featured: string) =>
            b.title.toLowerCase().includes(featured.toLowerCase()) || b.link.includes(featured)
        );

        // Featured articles come first
        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;

        // Sort by publication date (newest first)
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });

      // Return only the requested number of articles
      return sortedArticles.slice(0, MEDIUM_CONFIG.maxArticles);
    } catch (error) {
      retries++;

      if (error instanceof MediumAPIError) {
        // Don't retry for client errors (4xx)
        if (error.status && error.status >= 400 && error.status < 500) {
          throw error;
        }
      }

      if (retries >= MEDIUM_CONFIG.maxRetries) {
        throw error;
      }

      // Exponential backoff for retries
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }

  throw new MediumAPIError('Max retries exceeded');
}

// Get articles - throws error if fetch fails
export async function getArticles(): Promise<Article[]> {
  const mediumArticles = await fetchMediumArticles();
  return mediumArticles.map(article => transformMediumArticleToArticle(article));
}

// Utility to check if Medium RSS is available
export async function checkMediumRSSHealth(
  username: string = MEDIUM_CONFIG.username
): Promise<boolean> {
  try {
    const rssUrl = MEDIUM_CONFIG.rssUrl(username);
    const response = await fetch(rssUrl, {
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
export class MediumCache {
  private static cache = new Map<string, { data: Article[]; timestamp: number }>();

  static get(key: string): Article[] | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > MEDIUM_CONFIG.cacheTimeout * 1000;
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
  username: string = MEDIUM_CONFIG.username
): Promise<Article[]> {
  const cacheKey = `medium-articles-${username}`;

  // Try to get from cache first
  const cached = MediumCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch fresh data
  const articles = await getArticles();

  // Cache the results
  MediumCache.set(cacheKey, articles);

  return articles;
}
