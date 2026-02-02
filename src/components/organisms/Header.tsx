'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation, siteConfig } from '@/data/config';
import { MenuIcon, CloseIcon } from '@/components/icons';
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Skip section detection during programmatic scrolling
      if (isProgrammaticScroll.current) return;

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'projects', 'articles', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        const sectionId = sections[i];
        if (element && sectionId) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    setIsOpen(false);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Block scroll listener and set active section immediately
    isProgrammaticScroll.current = true;
    setActiveSection(targetId);

    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        // Re-enable scroll listener after scrolling completes
        scrollTimeout.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 1500);
      }
    }, 100);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 shadow-lg backdrop-blur-md dark:bg-slate-900/90'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('#hero')}
            className="cursor-pointer text-xl font-bold text-slate-900 transition-colors hover:text-slate-600 dark:text-slate-100 dark:hover:text-slate-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {siteConfig.name}
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map(item => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative cursor-pointer px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute right-0 bottom-0 left-0 h-0.5 bg-slate-900 dark:bg-slate-100"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Theme Switcher - Desktop */}
            <ThemeSwitcher />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme Switcher - Mobile */}
            <ThemeSwitcher />

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t border-slate-200 py-4 md:hidden dark:border-slate-700"
            >
              <div className="flex flex-col space-y-4">
                {navigation.map(item => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-3 py-2 text-left text-base font-medium transition-colors ${
                      activeSection === item.href.replace('#', '')
                        ? 'rounded-md bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
