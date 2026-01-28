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
      className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col"
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Project header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
              {project.name}
            </h3>
            {/* Featured badge - show below title only if stars/forks exist */}
            {project.featured && 
             ((project.stars !== undefined && project.stars > 0) || 
              (project.forks !== undefined && project.forks > 0)) && (
              <div className="inline-block mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                Featured
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 flex-shrink-0">
            {/* Featured badge - show in top-right space if no stars/forks */}
            {project.featured && 
             !((project.stars !== undefined && project.stars > 0) || 
               (project.forks !== undefined && project.forks > 0)) && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                Featured
              </div>
            )}
            {project.stars !== undefined && project.stars > 0 && (
              <div className="flex items-center space-x-1 text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-medium">{project.stars}</span>
              </div>
            )}
            {project.forks !== undefined && project.forks > 0 && (
              <div className="flex items-center space-x-1 text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                <GitFork className="w-3.5 h-3.5" />
                <span className="font-medium">{project.forks}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Language indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            {project.language}
          </span>
        </div>
      </div>

      {/* Project description - limited to 2-3 lines */}
      <div className="mb-4">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Technologies - compact section */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-medium border border-slate-200 dark:border-slate-600"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-600">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action buttons - always at bottom */}
      <div className="flex flex-grow items-center gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg group/btn"
        >
          <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
          <span>Code</span>
        </a>
        
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 text-sm font-semibold group/btn"
          >
            <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
            <span>Demo</span>
          </a>
        ) : (
          <div className="flex-1 flex items-center justify-center px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg text-sm font-medium cursor-not-allowed">
            No Demo
          </div>
        )}
      </div>

      {/* Enhanced hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl" />
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}