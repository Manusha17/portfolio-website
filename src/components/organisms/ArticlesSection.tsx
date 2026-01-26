'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/atoms/AnimatedSection';

export function ArticlesSection() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection direction="up" delay={0}>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Latest Articles
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Thoughts on software development, technology trends, and lessons learned.
              </p>
            </AnimatedSection>
          </div>
          
          {/* Placeholder for articles grid - will be implemented in task 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <AnimatedSection key={i} direction="up" delay={0.2 + i * 0.1}>
                <article className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <time>Jan {i}, 2024</time>
                    <span className="mx-2">•</span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Article Title {i}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Article excerpt will be loaded from Medium RSS feed.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                      Web Development
                    </span>
                    <span className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                      React
                    </span>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}