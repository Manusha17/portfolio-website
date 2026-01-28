'use client';

import { personalInfo, timelineData, skillsData } from '@/data/config';
import { AnimatedSection } from '@/components/atoms/AnimatedSection';
import { Timeline } from '@/components/organisms/Timeline';
import { SkillsShowcase } from '@/components/organisms/SkillsShowcase';

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative min-h-screen bg-white dark:bg-slate-900"
      aria-label="About section"
    >
      <div className="container mx-auto px-6 py-20">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-20">
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
        </div>

        {/* Career Timeline */}
        <div className="mb-20">
          <AnimatedSection direction="up" delay={0.4}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                My Journey
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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