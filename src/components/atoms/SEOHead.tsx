'use client';

import Head from 'next/head';
import { siteConfig } from '@/data/config';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  author,
  noIndex = false,
}: SEOHeadProps) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.seo.defaultTitle;
  const pageDescription = description || siteConfig.seo.defaultDescription;
  const pageImage = image || siteConfig.seo.defaultImage;
  const pageUrl = url || siteConfig.seo.siteUrl;
  const fullImageUrl = pageImage.startsWith('http')
    ? pageImage
    : `${siteConfig.seo.siteUrl}${pageImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={author || siteConfig.author.name} />
      <link rel="canonical" href={pageUrl} />

      {/* Keywords */}
      {tags && <meta name="keywords" content={tags.join(', ')} />}

      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={`${siteConfig.name} - Portfolio`} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      {type === 'article' &&
        tags &&
        tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      {siteConfig.seo.twitterUsername && (
        <meta name="twitter:creator" content={siteConfig.seo.twitterUsername} />
      )}

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="color-scheme" content="dark light" />

      {/* Verification Tags */}
      {siteConfig.seo.googleSiteVerification && (
        <meta name="google-site-verification" content={siteConfig.seo.googleSiteVerification} />
      )}
      {siteConfig.seo.bingSiteVerification && (
        <meta name="msvalidate.01" content={siteConfig.seo.bingSiteVerification} />
      )}

      {/* Facebook App ID */}
      {siteConfig.seo.facebookAppId && (
        <meta property="fb:app_id" content={siteConfig.seo.facebookAppId} />
      )}
    </Head>
  );
}
