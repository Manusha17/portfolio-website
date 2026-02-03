'use client';

import { SkillCategory, ProficiencyLevel } from '@/types';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';

interface SkillsShowcaseProps {
  skillCategories: SkillCategory[];
}

export function SkillsShowcase({ skillCategories }: SkillsShowcaseProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const getProficiencyColor = (proficiency: ProficiencyLevel) => {
    switch (proficiency) {
      case ProficiencyLevel.EXPERT:
        return 'bg-green-500';
      case ProficiencyLevel.ADVANCED:
        return 'bg-blue-500';
      case ProficiencyLevel.INTERMEDIATE:
        return 'bg-yellow-500';
      case ProficiencyLevel.BEGINNER:
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getProficiencyWidth = (proficiency: ProficiencyLevel) => {
    switch (proficiency) {
      case ProficiencyLevel.EXPERT:
        return '100%';
      case ProficiencyLevel.ADVANCED:
        return '80%';
      case ProficiencyLevel.INTERMEDIATE:
        return '60%';
      case ProficiencyLevel.BEGINNER:
        return '40%';
      default:
        return '20%';
    }
  };

  const getProficiencyValue = (proficiency: ProficiencyLevel) => {
    switch (proficiency) {
      case ProficiencyLevel.EXPERT:
        return 100;
      case ProficiencyLevel.ADVANCED:
        return 80;
      case ProficiencyLevel.INTERMEDIATE:
        return 60;
      case ProficiencyLevel.BEGINNER:
        return 40;
      default:
        return 20;
    }
  };

  const getProficiencyLabel = (proficiency: ProficiencyLevel) => {
    switch (proficiency) {
      case ProficiencyLevel.EXPERT:
        return 'Expert';
      case ProficiencyLevel.ADVANCED:
        return 'Advanced';
      case ProficiencyLevel.INTERMEDIATE:
        return 'Intermediate';
      case ProficiencyLevel.BEGINNER:
        return 'Beginner';
      default:
        return 'Unknown';
    }
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="mt-16"
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out 0.5s',
      }}
    >
      <div className="mb-12 text-center">
        <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
          Technical Skills
        </h3>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          A comprehensive overview of my technical expertise and proficiency levels
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={category.id}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800"
            style={{
              opacity: isIntersecting ? 1 : 0,
              transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease-out ${0.8 + categoryIndex * 0.1}s, transform 0.6s ease-out ${0.8 + categoryIndex * 0.1}s, background-color 0.3s ease ${categoryIndex * 0.05}s, border-color 0.3s ease ${categoryIndex * 0.05}s`,
            }}
          >
            <h4 className="mb-6 text-center text-xl font-semibold text-slate-900 dark:text-slate-100">
              {category.name}
            </h4>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.id} className="group">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {getProficiencyLabel(skill.proficiency)}
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProficiencyColor(skill.proficiency)}`}
                      style={{
                        width: isIntersecting ? getProficiencyWidth(skill.proficiency) : '0%',
                        transitionDelay: `${1.2 + categoryIndex * 0.1 + skillIndex * 0.05}s`,
                      }}
                      role="progressbar"
                      aria-valuenow={getProficiencyValue(skill.proficiency)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency: ${getProficiencyLabel(skill.proficiency)}`}
                    />
                  </div>

                  {skill.yearsOfExperience && (
                    <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      {skill.yearsOfExperience} year
                      {skill.yearsOfExperience !== 1 ? 's' : ''} experience
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skills legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-slate-600 dark:text-slate-400">
            {getProficiencyLabel(ProficiencyLevel.EXPERT)}
          </span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-slate-600 dark:text-slate-400">
            {getProficiencyLabel(ProficiencyLevel.ADVANCED)}
          </span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <span className="text-slate-600 dark:text-slate-400">
            {getProficiencyLabel(ProficiencyLevel.INTERMEDIATE)}
          </span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-gray-500"></div>
          <span className="text-slate-600 dark:text-slate-400">
            {getProficiencyLabel(ProficiencyLevel.BEGINNER)}
          </span>
        </div>
      </div>
    </div>
  );
}
