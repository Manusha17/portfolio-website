'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative flex h-full flex-grow flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-500 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      {/* Project header */}
      <div className="mb-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1 pr-2">
            <h3 className="text-xl leading-tight font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
              {project.name}
            </h3>
            {/* Featured badge - show below title only if stars/forks exist */}
            {project.featured &&
              ((project.stars !== undefined && project.stars > 0) ||
                (project.forks !== undefined && project.forks > 0)) && (
                <div className="mt-2 inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                  Featured
                </div>
              )}
          </div>
          <div className="flex flex-shrink-0 items-center space-x-2 text-slate-500 dark:text-slate-400">
            {/* Featured badge - show in top-right space if no stars/forks */}
            {project.featured &&
              !(
                (project.stars !== undefined && project.stars > 0) ||
                (project.forks !== undefined && project.forks > 0)
              ) && (
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                  Featured
                </div>
              )}
            {project.stars !== undefined && project.stars > 0 && (
              <div className="flex items-center space-x-1 rounded-full bg-slate-100 px-2 py-1 text-sm dark:bg-slate-800">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="font-medium">{project.stars}</span>
              </div>
            )}
            {project.forks !== undefined && project.forks > 0 && (
              <div className="flex items-center space-x-1 rounded-full bg-slate-100 px-2 py-1 text-sm dark:bg-slate-800">
                <GitFork className="h-3.5 w-3.5" />
                <span className="font-medium">{project.forks}</span>
              </div>
            )}
          </div>
        </div>

        {/* Language indicator */}
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {project.language}
          </span>
        </div>
      </div>

      {/* Project description - limited to 2-3 lines */}
      <div className="mb-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
      </div>

      {/* Technologies - compact section */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="rounded-full border border-slate-200 bg-gradient-to-r from-slate-100 to-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-600 dark:from-slate-800 dark:to-slate-700 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mb-2 flex flex-grow items-end gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn flex flex-1 items-center justify-center space-x-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-slate-800 hover:shadow-lg dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <Github className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
          <span>Code</span>
        </a>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex flex-1 items-center justify-center space-x-2 rounded-lg border-2 border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-slate-800"
          >
            <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
            <span>Demo</span>
          </a>
        ) : (
          <div className="flex flex-1 cursor-not-allowed items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            No Demo
          </div>
        )}
      </div>

      {/* Enhanced hover overlay effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

      {/* Subtle border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-blue-200 dark:group-hover:border-blue-800" />
    </motion.div>
  );
}
