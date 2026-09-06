'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Article } from '@/types';
import { getCachedArticles as getMediumArticles, MediumAPIError } from '@/lib/medium';
import { getCachedArticles as getDevToArticles, DevToAPIError } from '@/lib/devto';
import { siteConfig } from '@/data/config';

export type ArticleSource = 'medium' | 'devto';

interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  sources: ArticleSource[];
}

// Add source metadata to articles
function addSourceToArticles(articles: Article[], source: ArticleSource): Article[] {
  return articles.map(article => ({
    ...article,
    source,
  }));
}

// Merge and sort articles from multiple sources
function mergeArticles(articlesBySource: Map<ArticleSource, Article[]>): Article[] {
  const allArticles: Article[] = [];

  // Collect all articles with their source
  articlesBySource.forEach((articles, source) => {
    allArticles.push(...addSourceToArticles(articles, source));
  });

  // Sort by publication date (newest first), then by featured status
  return allArticles.sort((a, b) => {
    // Featured articles come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Then sort by publication date (newest first)
    return b.publishedAt.getTime() - a.publishedAt.getTime();
  });
}

export function useArticles(): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine which sources are enabled - memoized to prevent re-renders
  const enabledSources = useMemo<ArticleSource[]>(() => {
    const sources: ArticleSource[] = [];
    if (siteConfig.articles?.sources?.medium !== false) {
      sources.push('medium');
    }
    if (siteConfig.articles?.sources?.devto !== false) {
      sources.push('devto');
    }
    return sources;
  }, []);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const articlesBySource = new Map<ArticleSource, Article[]>();
      const errors: string[] = [];

      // Fetch from Medium if enabled
      if (enabledSources.includes('medium') && siteConfig.medium?.username) {
        try {
          const mediumArticles = await getMediumArticles();
          articlesBySource.set('medium', mediumArticles);
        } catch (err) {
          console.error('Error fetching Medium articles:', err);
          if (err instanceof MediumAPIError) {
            errors.push(`Medium: ${err.message}`);
          } else {
            errors.push('Medium: Failed to load articles');
          }
        }
      }

      // Fetch from Dev.to if enabled
      if (enabledSources.includes('devto') && siteConfig.devto?.username) {
        try {
          const devtoArticles = await getDevToArticles();
          articlesBySource.set('devto', devtoArticles);
        } catch (err) {
          console.error('Error fetching Dev.to articles:', err);
          if (err instanceof DevToAPIError) {
            errors.push(`Dev.to: ${err.message}`);
          } else {
            errors.push('Dev.to: Failed to load articles');
          }
        }
      }

      // If we have articles from at least one source, show them
      if (articlesBySource.size > 0) {
        const mergedArticles = mergeArticles(articlesBySource);
        setArticles(mergedArticles);

        // If there were partial errors, show them but don't block the UI
        if (errors.length > 0 && errors.length < enabledSources.length) {
          console.warn('Partial article fetch errors:', errors);
        }
      } else {
        // All sources failed
        setError(
          errors.length > 0 ? errors.join('; ') : 'Failed to load articles. Please try again later.'
        );
        setArticles([]);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again later.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [enabledSources]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
    sources: enabledSources,
  };
}
