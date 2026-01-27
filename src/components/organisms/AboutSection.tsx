'use client';

import { personalInfo } from '@/data/config';
import { AnimatedSection } from '@/components/atoms/AnimatedSection';

export function AboutSection() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up" delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-8">
              About Me
            </h2>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.2}>
            <div className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto">
              <p className="mb-6">
                {personalInfo.bio}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Currently based in {personalInfo.location} and {personalInfo.availability.toLowerCase()}.
              </p>
            </div>
          </AnimatedSection>
          
          {/* Placeholder for timeline - will be implemented in task 3.2 */}
          <AnimatedSection direction="up" delay={0.4}>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Career Timeline
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Interactive timeline will be implemented in the next task.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}