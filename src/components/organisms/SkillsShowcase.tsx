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
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Technical Skills
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise and proficiency levels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={category.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700"
            style={{
              opacity: isIntersecting ? 1 : 0,
              transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease-out ${0.8 + categoryIndex * 0.1}s`,
            }}
          >
            <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">
              {category.name}
            </h4>
            
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.id} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {getProficiencyLabel(skill.proficiency)}
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
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
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
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
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-slate-600 dark:text-slate-400">{getProficiencyLabel(ProficiencyLevel.EXPERT)}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-slate-600 dark:text-slate-400">{getProficiencyLabel(ProficiencyLevel.ADVANCED)}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-slate-600 dark:text-slate-400">{getProficiencyLabel(ProficiencyLevel.INTERMEDIATE)}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
          <span className="text-slate-600 dark:text-slate-400">{getProficiencyLabel(ProficiencyLevel.BEGINNER)}</span>
        </div>
      </div>
    </div>
  );
}