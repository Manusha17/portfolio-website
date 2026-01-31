import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
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
};

export default nextConfig;
