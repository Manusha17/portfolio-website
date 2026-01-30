'use client';

import { motion } from 'framer-motion';
import { Article } from '@/types';
import { ExternalLink, Clock, Calendar } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <motion.article
      className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col"
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Article header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight line-clamp-2">
              {article.title}
            </h3>
            {/* Featured badge */}
            {article.featured && (
              <div className="inline-block mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                Featured
              </div>
            )}
          </div>
        </div>
        
        {/* Article metadata */}
        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={article.publishedAt.toISOString()}>
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Article image placeholder */}
      {article.imageUrl ? (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      ) : (
        <div className="mb-4 h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
          <div className="text-slate-400 dark:text-slate-500">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        </div>
      )}

      {/* Article excerpt */}
      <div className="mb-4 flex-grow">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm line-clamp-3">
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
                className="px-2.5 py-1 text-xs bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-medium border border-slate-200 dark:border-slate-600"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-600">
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
          className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg group/btn"
        >
          <span>Read Article</span>
          <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
        </a>
      </div>

      {/* Enhanced hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl" />
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all duration-500 pointer-events-none" />
    </motion.article>
  );
}