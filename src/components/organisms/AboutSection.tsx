'use client';

import { personalInfo, timelineData, skillsData } from '@/data/config';
import { AnimatedSection } from '@/components/atoms/AnimatedSection';
import { AvailabilityBadge } from '@/components/molecules/AvailabilityBadge';
import { Timeline } from '@/components/organisms/Timeline';
import { SkillsShowcase } from '@/components/organisms/SkillsShowcase';
import { BookUser, MapPin } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-white dark:bg-slate-900"
      aria-label="About section"
    >
      <div className="container mx-auto px-6 py-20">
        {/* Introduction */}
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <AnimatedSection
            direction="up"
            delay={0}
            className="mb-6 flex items-center justify-center"
          >
            <BookUser className="mr-4 h-10 w-10 text-blue-600 md:h-12 md:w-12 dark:text-blue-400" />
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl dark:text-slate-100">
              About Me
            </h2>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="mx-auto max-w-3xl text-left text-lg text-slate-600 md:text-xl dark:text-slate-300">
              <p>{personalInfo.bio}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.3}>
            <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>{personalInfo.location}</span>
              </div>
              <AvailabilityBadge label={personalInfo.availability} color="green" />
            </div>
          </AnimatedSection>
        </div>

        {/* Career Timeline */}
        <div className="mb-20">
          <AnimatedSection direction="up" delay={0.4}>
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
                My Journey
              </h3>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                From university to current role - explore my career milestones and growth
              </p>
            </div>
          </AnimatedSection>

          <Timeline items={timelineData} />
        </div>

        {/* Skills Showcase */}
        <SkillsShowcase skillCategories={skillsData} />
      </div>
    </section>
  );
}
