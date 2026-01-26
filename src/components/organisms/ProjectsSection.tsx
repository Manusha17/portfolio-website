'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/atoms/AnimatedSection';

export function ProjectsSection() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection direction="up" delay={0}>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Featured Projects
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                A showcase of my recent work and contributions to open source projects.
              </p>
            </AnimatedSection>
          </div>
          
          {/* Placeholder for project grid - will be implemented in task 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <AnimatedSection key={i} direction="up" delay={0.2 + i * 0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Project {i}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Project description will be loaded from GitHub API.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
                      TypeScript
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}