// GitHub API integration utilities
import { siteConfig } from '@/data/config';
import { GitHubRepository, GitHubAPIRepository, Project } from '@/types';

// Configuration for GitHub API integration
export const GITHUB_CONFIG = {
  // GitHub username - from site config
  username: siteConfig.github.username,
  // Maximum number of repositories to fetch
  maxRepos: siteConfig.github.maxRepos,
  // Repositories to exclude from display (by name)
  excludeRepos: siteConfig.github.excludeRepos,
  // Repositories to prioritize (will be shown first if they exist)
  featuredRepos: siteConfig.github.featuredRepos as string[],
  // Whether to show forked repositories
  showForks: siteConfig.github.showForks,
  // GitHub API base URL
  apiUrl: 'https://api.github.com',
  // Rate limiting configuration
  rateLimitDelay: 1000, // 1 second between requests
  maxRetries: 3,
} as const;

// GitHub API error types
export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public rateLimitReset?: number
  ) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

// Rate limiting utility
class RateLimiter {
  private lastRequest = 0;

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;

    if (timeSinceLastRequest < GITHUB_CONFIG.rateLimitDelay) {
      const waitTime = GITHUB_CONFIG.rateLimitDelay - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.lastRequest = Date.now();
  }
}

const rateLimiter = new RateLimiter();

// Fetch repositories from GitHub API with error handling and rate limiting
export async function fetchGitHubRepositories(
  username: string = GITHUB_CONFIG.username
): Promise<GitHubRepository[]> {
  let retries = 0;

  while (retries < GITHUB_CONFIG.maxRetries) {
    try {
      await rateLimiter.waitIfNeeded();

      const response = await fetch(
        `${GITHUB_CONFIG.apiUrl}/users/${username}/repos?sort=updated&per_page=${GITHUB_CONFIG.maxRepos * 2}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-Website',
            // Add GitHub token if available for higher rate limits
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            }),
          },
          // Cache for 5 minutes in development, 1 hour in production
          next: {
            revalidate: process.env.NODE_ENV === 'development' ? 300 : 3600,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          const rateLimitReset = response.headers.get('X-RateLimit-Reset');
          throw new GitHubAPIError(
            'GitHub API rate limit exceeded',
            response.status,
            rateLimitReset ? parseInt(rateLimitReset) * 1000 : undefined
          );
        }

        if (response.status === 404) {
          throw new GitHubAPIError(`GitHub user '${username}' not found`, response.status);
        }

        throw new GitHubAPIError(
          `GitHub API request failed: ${response.status} ${response.statusText}`,
          response.status
        );
      }

      const repositories = await response.json();

      // Transform and filter GitHub API response
      const filteredRepos = repositories
        .filter((repo: GitHubAPIRepository) => {
          // Filter out forks if not wanted
          if (!GITHUB_CONFIG.showForks && repo.fork) return false;
          // Filter out excluded repos
          if (GITHUB_CONFIG.excludeRepos.includes(repo.name)) return false;
          // Only include repos with descriptions
          return repo.description;
        })
        .map(
          (repo: GitHubAPIRepository): GitHubRepository => ({
            name: repo.name,
            description: repo.description || '',
            url: repo.html_url,
            homepageUrl: repo.homepage || undefined,
            primaryLanguage: {
              name: repo.language || 'Unknown',
              color: getLanguageColor(repo.language),
            },
            stargazerCount: repo.stargazers_count || 0,
            forkCount: repo.forks_count || 0,
            updatedAt: repo.updated_at,
            topics: repo.topics || [],
          })
        );

      // Sort repositories: featured repos first, then by stars, then by update date
      const sortedRepos = filteredRepos.sort((a: GitHubRepository, b: GitHubRepository) => {
        const aIsFeatured = GITHUB_CONFIG.featuredRepos.includes(a.name);
        const bIsFeatured = GITHUB_CONFIG.featuredRepos.includes(b.name);

        // Featured repos come first
        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;

        // If both are featured, sort by the order in featuredRepos array
        if (aIsFeatured && bIsFeatured) {
          const aIndex = GITHUB_CONFIG.featuredRepos.indexOf(a.name);
          const bIndex = GITHUB_CONFIG.featuredRepos.indexOf(b.name);
          return aIndex - bIndex;
        }

        // For non-featured repos, sort by stars (descending), then by update date
        if (b.stargazerCount !== a.stargazerCount) {
          return b.stargazerCount - a.stargazerCount;
        }

        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });

      // Return only the requested number of repos
      return sortedRepos.slice(0, GITHUB_CONFIG.maxRepos);
    } catch (error) {
      retries++;

      if (error instanceof GitHubAPIError) {
        // If it's a rate limit error, wait until reset time
        if (error.status === 403 && error.rateLimitReset) {
          const waitTime = error.rateLimitReset - Date.now();
          if (waitTime > 0 && waitTime < 60000) {
            // Wait max 1 minute
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          }
        }

        // Don't retry for client errors (4xx)
        if (error.status && error.status >= 400 && error.status < 500) {
          throw error;
        }
      }

      if (retries >= GITHUB_CONFIG.maxRetries) {
        throw error;
      }

      // Exponential backoff for retries
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }

  throw new GitHubAPIError('Max retries exceeded');
}

// Convert GitHub repository data to Project interface
export function transformGitHubRepoToProject(repo: GitHubRepository): Project {
  return {
    id: repo.name,
    name: repo.name,
    description: repo.description,
    technologies: [repo.primaryLanguage.name, ...repo.topics].filter(Boolean),
    githubUrl: repo.url,
    liveUrl: repo.homepageUrl,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage.name,
    featured: GITHUB_CONFIG.featuredRepos.includes(repo.name),
    createdAt: new Date(repo.updatedAt),
    updatedAt: new Date(repo.updatedAt),
  };
}

// Get projects with fallback data
export async function getProjects(): Promise<Project[]> {
  try {
    const repositories = await fetchGitHubRepositories();
    return repositories.map(transformGitHubRepoToProject);
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);

    // Return fallback projects if GitHub API fails
    return getFallbackProjects();
  }
}

// Fallback project data for when GitHub API is unavailable
export function getFallbackProjects(): Project[] {
  return [
    {
      id: 'portfolio-website',
      name: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      githubUrl: 'https://github.com/yourusername/portfolio-website',
      liveUrl: 'https://yourusername.github.io',
      language: 'TypeScript',
      featured: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 'sample-project-1',
      name: 'Sample Project 1',
      description: 'A sample project demonstrating modern web development practices',
      technologies: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/yourusername/sample-project-1',
      language: 'JavaScript',
      featured: false,
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2023-06-01'),
    },
    {
      id: 'sample-project-2',
      name: 'Sample Project 2',
      description: 'Another sample project showcasing full-stack development',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      githubUrl: 'https://github.com/yourusername/sample-project-2',
      language: 'JavaScript',
      featured: false,
      createdAt: new Date('2023-03-01'),
      updatedAt: new Date('2023-03-01'),
    },
  ];
}

// Get programming language colors (GitHub-style)
function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#239120',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#1572B6',
    Vue: '#2c3e50',
    Svelte: '#ff3e00',
    Shell: '#89e051',
    Dockerfile: '#384d54',
  };

  return colors[language || ''] || '#6b7280';
}

// Utility to check if GitHub API is available
export async function checkGitHubAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${GITHUB_CONFIG.apiUrl}/rate_limit`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Website',
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}
