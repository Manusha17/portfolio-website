'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { TimelineItem as TimelineItemType } from '@/types';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { EducationIcon, WorkIcon, AchievementIcon, DefaultTimelineIcon } from '@/components/icons';

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
  isLast: boolean;
  onFocus?: (itemId: string) => void;
}

export function TimelineItem({ item, index, isLast, onFocus }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  const isLeft = index % 2 === 0;
  const animationDelay = index * 0.2;

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
    // Announce state change to screen readers
    const announcement = isExpanded ? 'Collapsed' : 'Expanded';
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.textContent = `${announcement} details for ${item.title}`;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  }, [isExpanded, item.title]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault();
          // Let parent handle navigation between timeline items
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleExpanded();
          break;
        case 'Escape':
          if (isExpanded) {
            e.preventDefault();
            setIsExpanded(false);
          }
          break;
        default:
          break;
      }
    };

    if (isFocused) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }

    return undefined;
  }, [isFocused, isExpanded, toggleExpanded]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.(item.id);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const formatDate = (date: Date, endDate?: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
    };
    const start = date.toLocaleDateString('en-US', options);
    if (endDate) {
      const end = endDate.toLocaleDateString('en-US', options);
      return `${start} - ${end}`;
    }
    return `${start} - Present`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <EducationIcon className="h-6 w-6" />;
      case 'work':
        return <WorkIcon className="h-6 w-6" />;
      case 'achievement':
        return <AchievementIcon className="h-6 w-6" />;
      default:
        return <DefaultTimelineIcon className="h-6 w-6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'education':
        return 'Education milestone';
      case 'work':
        return 'Work experience';
      case 'achievement':
        return 'Achievement';
      default:
        return 'Career milestone';
    }
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative mb-8 flex items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${animationDelay}s`,
      }}
      role="article"
      aria-labelledby={`timeline-item-${item.id}-title`}
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute top-16 left-1/2 hidden h-16 w-0.5 -translate-x-1/2 transform bg-gradient-to-b from-slate-300 to-transparent md:block dark:from-slate-600"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transition: `opacity 0.8s ease-out ${animationDelay + 0.3}s`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
        <div
          ref={cardRef}
          className={`cursor-pointer rounded-lg border-2 bg-white p-6 shadow-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-slate-800 dark:focus:ring-offset-slate-900 ${
            isFocused || isExpanded
              ? 'scale-105 transform border-blue-500 shadow-xl'
              : 'border-slate-200 hover:border-slate-300 hover:shadow-xl dark:border-slate-700 dark:hover:border-slate-600'
          } ${isLeft ? 'md:text-right' : 'md:text-left'}`}
          onClick={toggleExpanded}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-describedby={`timeline-item-${item.id}-description`}
          aria-label={`${getTypeLabel(item.type)}: ${item.title} at ${item.subtitle}. ${isExpanded ? 'Press Enter to collapse' : 'Press Enter to expand'} details.`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className={`flex items-center ${isLeft ? 'md:flex-row-reverse' : 'flex-row'}`}>
              <div
                className="mr-3 flex-shrink-0 rounded-full p-2 text-white md:mr-0"
                style={{ backgroundColor: item.color || '#3B82F6' }}
                aria-hidden="true"
              >
                {getIcon(item.type)}
              </div>
              <div className={`${isLeft ? 'md:mr-3' : 'md:ml-3'}`}>
                <h3
                  id={`timeline-item-${item.id}-title`}
                  className="text-lg font-semibold text-slate-900 dark:text-slate-100"
                >
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.subtitle}</p>
              </div>
            </div>
            <div
              className={`flex-shrink-0 text-sm text-slate-500 dark:text-slate-400 ${isLeft ? 'md:text-left' : 'md:text-right'}`}
            >
              <time dateTime={item.date.toISOString()}>{formatDate(item.date, item.endDate)}</time>
              {item.location && <div className="mt-1 text-xs">{item.location}</div>}
            </div>
          </div>

          <p
            id={`timeline-item-${item.id}-description`}
            className="mb-4 text-slate-700 dark:text-slate-300"
          >
            {item.description}
          </p>

          {/* Technologies */}
          {item.technologies && item.technologies.length > 0 && (
            <div
              className={`mb-4 flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'justify-start'}`}
            >
              {item.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Expandable details */}
          {(item.details || item.achievements) && (
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isExpanded}
            >
              {item.details && (
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                    Details:
                  </h4>
                  <ul
                    className={`space-y-1 text-sm text-slate-600 dark:text-slate-400 ${isLeft ? 'md:text-right' : 'text-left'}`}
                  >
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <span className="mr-2 text-slate-400" aria-hidden="true">
                          •
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.achievements && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                    Achievements:
                  </h4>
                  <ul
                    className={`space-y-1 text-sm text-slate-600 dark:text-slate-400 ${isLeft ? 'md:text-right' : 'text-left'}`}
                  >
                    {item.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start">
                        <span className="mr-2 text-green-500" aria-hidden="true">
                          ✓
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Expand/collapse indicator */}
          <div className={`flex ${isLeft ? 'md:justify-start' : 'justify-end'} mt-2`}>
            <span className="text-xs text-slate-400 dark:text-slate-500" aria-hidden="true">
              {isExpanded ? '▲ Click to collapse' : '▼ Click to expand'}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="absolute top-8 left-1/2 z-10 hidden -translate-x-1/2 transform md:block">
        <div
          className="h-4 w-4 rounded-full border-4 border-white dark:border-slate-900"
          style={{
            backgroundColor: item.color || '#3B82F6',
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? 'scale(1)' : 'scale(0.5)',
            transition: `all 0.5s ease-out ${animationDelay + 0.2}s`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
