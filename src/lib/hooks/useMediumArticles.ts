'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/types';
import { getCachedArticles, MediumAPIError } from '@/lib/medium';

interface UseMediumArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMediumArticles(): UseMediumArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedArticles = await getCachedArticles();
      setArticles(fetchedArticles);
    } catch (err) {
      console.error('Error fetching Medium articles:', err);

      if (err instanceof MediumAPIError) {
        setError(err.message);
      } else {
        setError('Failed to load articles. Please try again later.');
      }
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
  };
}
