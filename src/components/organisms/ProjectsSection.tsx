'use client';

import { AnimatedSection } from '@/components/atoms/AnimatedSection';
import { ProjectCarousel } from '@/components/molecules/ProjectCarousel';
import { useGitHubProjects } from '@/lib/hooks/useGitHubProjects';
import { siteConfig } from '@/data/config';
import { Loader2, AlertCircle, RefreshCw, FolderGit2 } from 'lucide-react';
import { GitHubIcon } from '@/components/icons';

export function ProjectsSection() {
  const { projects, loading, error, refetch } = useGitHubProjects();

  return (
    <section
      id="projects"
      className="relative flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-800"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 text-center">
            <AnimatedSection direction="up" delay={0}>
              <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <FolderGit2 className="h-10 w-10 text-blue-600 sm:h-12 sm:w-12 dark:text-blue-400" />
                <h2 className="text-4xl font-bold text-slate-900 md:text-5xl dark:text-slate-100">
                  Featured Projects
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-300">
                A showcase of my recent work and contributions to open source projects,
                automatically synced from GitHub.
              </p>
            </AnimatedSection>
          </div>

          {/* Projects content */}
          <AnimatedSection direction="up" delay={0.4}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="mb-6 h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Loading projects from GitHub...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24">
                <AlertCircle className="mb-6 h-16 w-16 text-red-500" />
                <h3 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Unable to Load Projects
                </h3>
                <p className="mb-8 max-w-md text-center leading-relaxed text-slate-600 dark:text-slate-300">
                  {error}
                </p>
                <button
                  onClick={refetch}
                  className="flex items-center space-x-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Try Again</span>
                </button>
              </div>
            ) : projects.length > 0 ? (
              <ProjectCarousel projects={projects} itemsPerView={3} />
            ) : (
              <div className="py-24 text-center">
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  No projects found. Check back later!
                </p>
              </div>
            )}
          </AnimatedSection>

          {/* GitHub link */}
          <AnimatedSection direction="up" delay={0.6}>
            <div className="mt-12 text-center">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                <span>View all projects on GitHub</span>
                <GitHubIcon className="h-5 w-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
