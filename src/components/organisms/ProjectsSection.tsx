'use client';

import { AnimatedSection } from '@/components/atoms/AnimatedSection';
import { ProjectCarousel } from '@/components/molecules/ProjectCarousel';
import { useGitHubProjects } from '@/lib/hooks/useGitHubProjects';
import { siteConfig } from '@/data/config';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export function ProjectsSection() {
  const { projects, loading, error, refetch } = useGitHubProjects();

  return (
    <section 
      id="projects" 
      className="relative flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-800"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <AnimatedSection direction="up" delay={0}>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Featured Projects
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                A showcase of my recent work and contributions to open source projects, 
                automatically synced from GitHub.
              </p>
            </AnimatedSection>
          </div>

          {/* Projects content */}
          <AnimatedSection direction="up" delay={0.4}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-400 mb-6" />
                <p className="text-slate-600 dark:text-slate-300 text-lg">Loading projects from GitHub...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24">
                <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Unable to Load Projects
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8 text-center max-w-md leading-relaxed">
                  {error}
                </p>
                <button
                  onClick={refetch}
                  className="flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Try Again</span>
                </button>
              </div>
            ) : projects.length > 0 ? (
              <ProjectCarousel projects={projects} itemsPerView={3} />
            ) : (
              <div className="text-center py-24">
                <p className="text-slate-600 dark:text-slate-300 text-xl">
                  No projects found. Check back later!
                </p>
              </div>
            )}
          </AnimatedSection>

          {/* GitHub link */}
          <AnimatedSection direction="up" delay={0.6}>
            <div className="text-center mt-12">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>View all projects on GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}