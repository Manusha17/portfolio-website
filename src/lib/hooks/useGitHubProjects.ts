'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { getProjects, GitHubAPIError } from '@/lib/github';

interface UseGitHubProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGitHubProjects(): UseGitHubProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (err) {
      console.error('Error fetching GitHub projects:', err);

      if (err instanceof GitHubAPIError) {
        setError(err.message);
      } else {
        setError('Failed to load projects. Please try again later.');
      }

      // Set empty array on error since getProjects() should handle fallbacks
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
}
