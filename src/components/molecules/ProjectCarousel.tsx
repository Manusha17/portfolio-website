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
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [maxIndex, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [maxIndex, isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [currentIndex, isAnimating]);

  // Auto-advance carousel (paused on hover)
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (projects.length <= visibleItems || isPaused) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [projects.length, visibleItems, nextSlide, isPaused]);

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600 dark:text-slate-300 text-lg">No projects to display</p>
      </div>
    );
  }

  return (
    <div 
      className="relative max-w-7xl mx-auto py-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel container with improved spacing */}
      <div className="overflow-hidden px-4 py-3 md:px-8 relative">
        <motion.div
          className="flex gap-6 md:gap-8"
          animate={{
            x: `calc(-${currentIndex * (100 / visibleItems)}% - ${currentIndex * (32 / visibleItems)}px)`
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.8,
            duration: 0.6
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="flex-shrink-0"
              style={{ 
                width: `calc(${100 / visibleItems}% - ${(visibleItems - 1) * 32 / visibleItems}px)`,
                minHeight: '300px' // Reduced height for more compact cards
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <ProjectCard project={project} priority={index < 3} />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced navigation arrows - positioned relative to carousel container */}
        {projects.length > visibleItems && (
          <>
            <motion.button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:shadow-2xl transition-all duration-300 z-20 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm bg-white/95 dark:bg-slate-800/95"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:shadow-2xl transition-all duration-300 z-20 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm bg-white/95 dark:bg-slate-800/95"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next projects"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </div>

      {/* Enhanced pagination dots */}
      {projects.length > visibleItems && (
        <div className="flex justify-center items-center space-x-3 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`relative transition-all duration-300 disabled:cursor-not-allowed ${
                index === currentIndex
                  ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'
                  : 'w-3 h-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 rounded-full'
              }`}
              whileHover={{ scale: index === currentIndex ? 1 : 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  layoutId="activeSlide"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Enhanced project counter with progress */}
      <div className="text-center mt-6">
        <div className="flex items-center justify-center space-x-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {Math.min(currentIndex + visibleItems, projects.length)}
            </span>
            {' '}of{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {projects.length}
            </span>
            {' '}projects
          </p>
          
          {/* Progress bar */}
          <div className="w-24 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}