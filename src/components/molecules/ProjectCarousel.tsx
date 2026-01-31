'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface ProjectCarouselProps {
  projects: Project[];
  itemsPerView?: number;
}

export function ProjectCarousel({ projects, itemsPerView = 3 }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemsPerView);
  const [isAnimating, setIsAnimating] = useState(false);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(itemsPerView);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, projects.length - visibleItems);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [maxIndex, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [maxIndex, isAnimating]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [currentIndex, isAnimating]
  );

  // Auto-advance carousel (paused on hover)
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (projects.length <= visibleItems || isPaused) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [projects.length, visibleItems, nextSlide, isPaused]);

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-300">No projects to display</p>
      </div>
    );
  }

  // Calculate card width and gap
  const cardGap = visibleItems === 1 ? 4 : visibleItems === 2 ? 16 : 32;
  const cardWidthPercent = 100 / visibleItems;

  return (
    <div
      className="relative mx-auto w-full max-w-7xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel container */}
      <div className="relative px-4 md:px-8 lg:px-12">
        {/* Cards container */}
        <div className="mx-auto max-w-6xl overflow-hidden py-4">
          <motion.div
            className="flex"
            style={{ gap: `${cardGap}px` }}
            animate={{
              opacity: 1,
              scale: 1,
              x: `calc(-${currentIndex * cardWidthPercent}% - ${currentIndex * cardGap}px)`,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex flex-shrink-0"
                style={{
                  width: `calc(${cardWidthPercent}% - ${(cardGap * (visibleItems - 1)) / visibleItems}px)`,
                }}
              >
                <div className="flex flex-grow justify-center">
                  <div className="h-full w-full max-w-md">
                    <ProjectCard project={project} priority={index < 3} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation arrows */}
        {projects.length > visibleItems && (
          <>
            <motion.button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute top-1/2 left-0 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 max-md:-translate-x-1 md:h-12 md:w-12 lg:-left-6 dark:border-slate-700 dark:bg-slate-800/95 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute top-1/2 right-0 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 max-md:translate-x-1 md:h-12 md:w-12 lg:-right-6 dark:border-slate-700 dark:bg-slate-800/95 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next projects"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
          </>
        )}
      </div>

      {/* Pagination dots */}
      {projects.length > visibleItems && (
        <div className="mt-10 flex items-center justify-center space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`relative transition-all duration-300 disabled:cursor-not-allowed ${
                index === currentIndex
                  ? 'h-3 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600'
                  : 'h-3 w-3 rounded-full bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500'
              }`}
              whileHover={{ scale: index === currentIndex ? 1 : 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                  layoutId="activeSlide"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Project counter with progress */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {Math.min(currentIndex + visibleItems, projects.length)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {projects.length}
            </span>{' '}
            projects
          </p>

          {/* Progress bar */}
          <div className="h-1 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
