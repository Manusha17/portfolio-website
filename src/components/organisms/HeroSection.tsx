'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/config';
import { ChevronRight } from 'lucide-react';
import { EmailIcon, UserIcon, CodeIcon, CloudIcon, ArrowUpIcon } from '@/components/icons';

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
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto overflow-x-clip px-4 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 text-center lg:order-1 lg:text-left"
            >
              {/* Animated Name with Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4 sm:mb-6"
              >
                <h1 className="text-4xl leading-tight font-bold text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-slate-100">
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
                className="mb-6 text-xl text-slate-600 sm:mb-8 sm:text-2xl md:text-3xl dark:text-slate-300"
              >
                {siteConfig.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mx-auto mb-8 max-w-2xl text-base text-slate-500 sm:mb-12 sm:text-lg md:text-xl lg:mx-0 dark:text-slate-400"
              >
                {siteConfig.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-transparent bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none sm:px-8 sm:text-base dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  View My Work
                  <ChevronRight className="ml-2 h-4 w-4 shrink-0" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none sm:px-8 sm:text-base dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Get In Touch
                  <EmailIcon className="ml-2 h-4 w-4 shrink-0" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-1 flex justify-center lg:order-2 lg:justify-end"
            >
              <div className="relative">
                {/* Decorative background elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="xs:-top-2 xs:-right-2 xs:w-40 xs:h-40 absolute -top-1 -right-1 h-32 w-32 rounded-full bg-linear-to-r from-blue-400 to-purple-500 opacity-20 blur-xl sm:-top-4 sm:-right-4 sm:h-48 sm:w-48 md:h-56 md:w-56 xl:h-72 xl:w-72"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1.1, 1, 1.1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="xs:-bottom-2 xs:-left-2 xs:w-32 xs:h-32 absolute -bottom-1 -left-1 h-28 w-28 rounded-full bg-linear-to-r from-green-400 to-blue-500 opacity-20 blur-xl sm:-bottom-4 sm:-left-4 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-64 lg:w-64"
                />

                {/* Profile Image Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="xs:w-56 xs:h-56 xs:border-4 relative z-10 h-48 w-48 overflow-hidden rounded-full border-2 border-white bg-linear-to-br from-slate-100 to-slate-200 shadow-2xl sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900"
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
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-center">
                        <div className="xs:w-14 xs:h-14 xs:mb-3 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-300 sm:mb-4 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 dark:bg-slate-600">
                          <UserIcon className="xs:w-7 xs:h-7 h-6 w-6 text-slate-500 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 dark:text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                          Profile Image
                        </p>
                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                          Add your photo here
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="xs:top-4 xs:-left-4 xs:w-10 xs:h-10 absolute top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 font-bold text-white opacity-80 shadow-lg sm:top-8 sm:-left-8 sm:h-12 sm:w-12 md:h-16 md:w-16"
                >
                  <CodeIcon className="xs:w-5 xs:h-5 h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                </motion.div>

                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="xs:bottom-4 xs:-right-4 xs:w-10 xs:h-10 absolute -right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white opacity-80 shadow-lg sm:-right-8 sm:bottom-8 sm:h-12 sm:w-12"
                >
                  <CloudIcon className="xs:w-5 xs:h-5 h-4 w-4 sm:h-6 sm:w-6" />
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
          className="absolute bottom-4 left-1/2 -translate-x-1/2 transform sm:bottom-8"
        >
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
            aria-label="Scroll to about section"
          >
            {/* Desktop: Scroll Down */}
            <div className="hidden flex-col items-center md:flex">
              <span className="mb-2 text-xs sm:text-sm">Scroll Down</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-8 w-5 justify-center rounded-full border-2 border-current sm:h-10 sm:w-6"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-1 h-2 w-1 rounded-full bg-current sm:mt-2 sm:h-3"
                />
              </motion.div>
            </div>

            {/* Mobile/Tablet: Swipe Up */}
            <div className="flex flex-col items-center md:hidden">
              <span className="mb-2 text-xs">Swipe Up</span>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <ArrowUpIcon className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
