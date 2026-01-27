'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/config';

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = siteConfig.name;

  // Typewriter effect for the name
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [currentIndex, fullText]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              {/* Animated Name with Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4 sm:mb-6"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-slate-400 dark:text-slate-500"
                  >
                    |
                  </motion.span>
                </h1>
              </motion.div>
              
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl sm:text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8"
              >
                {siteConfig.title}
              </motion.h2>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto lg:mx-0"
              >
                {siteConfig.description}
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm sm:text-base font-medium text-white bg-slate-900 border border-transparent rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors min-h-[44px]"
                >
                  View My Work
                  <svg className="ml-2 w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm sm:text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 transition-colors min-h-[44px]"
                >
                  Get In Touch
                  <svg className="ml-2 w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative">
                {/* Decorative background elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-1 xs:-top-2 sm:-top-4 -right-1 xs:-right-2 sm:-right-4 w-32 xs:w-40 sm:w-48 md:w-64 lg:w-72 h-32 xs:h-40 sm:h-48 md:h-64 lg:h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1.1, 1, 1.1]
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -bottom-1 xs:-bottom-2 sm:-bottom-4 -left-1 xs:-left-2 sm:-left-4 w-28 xs:w-32 sm:w-40 md:w-56 lg:w-64 h-28 xs:h-32 sm:h-40 md:h-56 lg:h-64 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-xl"
                />
                
                {/* Profile Image Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-10 w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 rounded-full overflow-hidden border-2 xs:border-4 border-white dark:border-slate-800 shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"
                >
                  {siteConfig.profileImage ? (
                    <Image
                      src={siteConfig.profileImage}
                      alt={`${siteConfig.name} - Profile Photo`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                    />
                  ) : (
                    /* Placeholder for profile image */
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 xs:w-14 sm:w-16 md:w-20 lg:w-24 h-12 xs:h-14 sm:h-16 md:h-20 lg:h-24 mx-auto mb-2 xs:mb-3 sm:mb-4 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
                          <svg className="w-6 xs:w-7 sm:w-8 md:w-10 lg:w-12 h-6 xs:h-7 sm:h-8 md:h-10 lg:h-12 text-slate-500 dark:text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          Profile Image
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          Add your photo here
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-2 xs:top-4 sm:top-8 -left-2 xs:-left-4 sm:-left-8 w-8 xs:w-10 sm:w-12 md:w-16 h-8 xs:h-10 sm:h-12 md:h-16 bg-blue-500 rounded-lg opacity-80 flex items-center justify-center text-white font-bold shadow-lg"
                >
                  <svg className="w-4 xs:w-5 sm:w-6 md:w-8 h-4 xs:h-5 sm:h-6 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                </motion.div>
                
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-2 xs:bottom-4 sm:bottom-8 -right-2 xs:-right-4 sm:-right-8 w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 bg-purple-500 rounded-full opacity-80 flex items-center justify-center text-white shadow-lg"
                >
                  <svg className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll/Swipe indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Scroll to about section"
          >
            {/* Desktop: Scroll Down */}
            <div className="hidden md:flex flex-col items-center">
              <span className="text-xs sm:text-sm mb-2">Scroll Down</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-current rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-2 sm:h-3 bg-current rounded-full mt-1 sm:mt-2"
                />
              </motion.div>
            </div>
            
            {/* Mobile/Tablet: Swipe Up */}
            <div className="flex md:hidden flex-col items-center">
              <span className="text-xs mb-2">Swipe Up</span>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}