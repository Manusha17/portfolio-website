'use client';

import { motion } from 'framer-motion';
import { Article } from '@/types';
import { ExternalLink, Clock, Calendar } from 'lucide-react';
import { BookIcon } from '@/components/icons';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-500 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Article header */}
      <div className="mb-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1 pr-2">
            <h3 className="line-clamp-2 text-xl leading-tight font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
              {article.title}
            </h3>
            {/* Featured badge */}
            {article.featured && (
              <div className="mt-2 inline-block rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                Featured
              </div>
            )}
          </div>
        </div>

        {/* Article metadata */}
        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={article.publishedAt.toISOString()}>
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Article image placeholder */}
      {article.imageUrl ? (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      ) : (
        <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
          <div className="text-slate-400 dark:text-slate-500">
            <BookIcon className="h-12 w-12" />
          </div>
        </div>
      )}

      {/* Article excerpt */}
      <div className="mb-4 flex-grow">
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {article.excerpt}
        </p>
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-slate-200 bg-gradient-to-r from-slate-100 to-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-600 dark:from-slate-800 dark:to-slate-700 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Read article button */}
      <div className="mt-auto">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
        >
          <span>Read Article</span>
          <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
        </a>
      </div>

      {/* Enhanced hover overlay effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

      {/* Subtle border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-blue-200 dark:group-hover:border-blue-800" />
    </motion.article>
  );
}
