import type { NextConfig } from 'next';

// GitHub Pages configuration
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Configure base path for GitHub Pages (when not using custom domain)
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  // SEO optimizations
  poweredByHeader: false,
  compress: true,
  // Generate sitemap and robots.txt
  generateBuildId: async () => {
    // Use timestamp for build ID to ensure fresh deployments
    return `build-${Date.now()}`;
  },
  // Optimize for static export
  experimental: {
    optimizeCss: true,
  },
  // GitHub Pages specific configurations
  ...(isGitHubPages && {
    // Ensure proper routing for GitHub Pages
    skipTrailingSlashRedirect: true,
  }),
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
};

export default nextConfig;
