'use client';

import { AnimatedSection } from '@/components/atoms/AnimatedSection';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { useMediumArticles } from '@/lib/hooks/useMediumArticles';
import { siteConfig } from '@/data/config';
import { Loader2, AlertCircle, RefreshCw, BookOpen } from 'lucide-react';

export function ArticlesSection() {
  const { articles, loading, error, refetch } = useMediumArticles();

  return (
    <section
      id="articles"
      className="relative flex min-h-screen items-center justify-center bg-white dark:bg-slate-900"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <AnimatedSection direction="up" delay={0}>
              <div className="mb-6 flex items-center justify-center">
                <BookOpen className="mr-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h2 className="text-4xl font-bold text-slate-900 md:text-5xl dark:text-slate-100">
                  Latest Articles
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-300">
                Thoughts on software development, technology trends, and lessons learned from
                building modern applications.
              </p>
            </AnimatedSection>
          </div>

          {/* Articles content */}
          <AnimatedSection direction="up" delay={0.4}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="mb-6 h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Loading articles from Medium...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24">
                <AlertCircle className="mb-6 h-16 w-16 text-red-500" />
                <h3 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Unable to Load Articles
                </h3>
                <p className="mb-8 max-w-md text-center leading-relaxed text-slate-600 dark:text-slate-300">
                  {error}
                </p>
                <button
                  onClick={refetch}
                  className="flex items-center space-x-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Try Again</span>
                </button>
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                  <AnimatedSection key={article.id} direction="up" delay={0.1 * index}>
                    <ArticleCard
                      article={article}
                      priority={index < 3} // Prioritize loading for first 3 articles
                    />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <BookOpen className="mx-auto mb-6 h-16 w-16 text-slate-400 dark:text-slate-500" />
                <p className="mb-4 text-xl text-slate-600 dark:text-slate-300">No articles found</p>
                <p className="text-slate-500 dark:text-slate-400">
                  Check back later for new content!
                </p>
              </div>
            )}
          </AnimatedSection>

          {/* Medium profile link */}
          {articles.length > 0 && (
            <AnimatedSection direction="up" delay={0.6}>
              <div className="mt-12 text-center">
                <a
                  href={`https://medium.com/@${siteConfig.medium.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  <span>Read more articles on Medium</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                </a>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
