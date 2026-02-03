'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/hooks/useTheme';
import { MoonIcon, SunIcon } from '@/components/icons';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative cursor-pointer p-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      suppressHydrationWarning
    >
      <div className="relative h-6 w-6">
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 0 : 1,
            rotate: theme === 'dark' ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="absolute inset-0"
          suppressHydrationWarning
        >
          <SunIcon className="h-6 w-6" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -180,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="absolute inset-0"
          suppressHydrationWarning
        >
          <MoonIcon className="h-6 w-6" />
        </motion.div>
      </div>
    </motion.button>
  );
}
