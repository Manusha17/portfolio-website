// SEO validation utilities to help verify SEO implementation

import { generateWebAppManifest, validateManifest } from './manifest';

export interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export function validateSEOConfig(): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_GITHUB_USERNAME) {
    warnings.push('NEXT_PUBLIC_GITHUB_USERNAME environment variable is not set');
  }

  if (!process.env.NEXT_PUBLIC_MEDIUM_USERNAME) {
    warnings.push('NEXT_PUBLIC_MEDIUM_USERNAME environment variable is not set');
  }

  // Check for verification codes
  if (!process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION) {
    suggestions.push('Consider adding Google Search Console verification code');
  }

  if (!process.env.NEXT_PUBLIC_BING_VERIFICATION) {
    suggestions.push('Consider adding Bing Webmaster Tools verification code');
  }

  // Validate web app manifest
  try {
    const manifest = generateWebAppManifest();
    const manifestValidation = validateManifest(manifest);

    if (!manifestValidation.isValid) {
      errors.push(...manifestValidation.errors.map(error => `Manifest: ${error}`));
    }
  } catch (error) {
    errors.push(`Failed to generate or validate web app manifest: ${error}`);
  }

  // Suggestions for better SEO
  suggestions.push('Replace placeholder favicon files with actual branded icons');
  suggestions.push('Replace placeholder og-image.jpg with a custom 1200x630 image');
  suggestions.push('Update siteConfig with your actual personal information');
  suggestions.push('Add your actual social media URLs in siteConfig.links');

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

// Validate meta tag requirements
export function validateMetaTags(document: Document): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Required meta tags
  const requiredTags = [
    { selector: 'title', name: 'Title tag' },
    { selector: 'meta[name="description"]', name: 'Meta description' },
    { selector: 'meta[property="og:title"]', name: 'Open Graph title' },
    { selector: 'meta[property="og:description"]', name: 'Open Graph description' },
    { selector: 'meta[property="og:image"]', name: 'Open Graph image' },
    { selector: 'meta[name="twitter:card"]', name: 'Twitter Card' },
    { selector: 'link[rel="canonical"]', name: 'Canonical URL' },
  ];

  requiredTags.forEach(tag => {
    const element = document.querySelector(tag.selector);
    if (!element) {
      errors.push(`Missing ${tag.name}`);
    } else {
      const content = element.getAttribute('content') || element.textContent;
      if (!content || content.trim().length === 0) {
        errors.push(`Empty ${tag.name}`);
      }
    }
  });

  // Check for structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    warnings.push('No structured data (JSON-LD) found');
  }

  // Check meta description length
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const content = metaDescription.getAttribute('content') || '';
    if (content.length < 120) {
      suggestions.push('Meta description could be longer (120-160 characters recommended)');
    } else if (content.length > 160) {
      warnings.push('Meta description is too long (over 160 characters)');
    }
  }

  // Check title length
  const title = document.querySelector('title');
  if (title) {
    const content = title.textContent || '';
    if (content.length > 60) {
      warnings.push('Title tag is too long (over 60 characters)');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

// Generate SEO report
export function generateSEOReport(): string {
  const configValidation = validateSEOConfig();

  let report = '# SEO Configuration Report\n\n';

  if (configValidation.isValid) {
    report += '✅ **SEO Configuration Status**: Valid\n\n';
  } else {
    report += '❌ **SEO Configuration Status**: Issues Found\n\n';
  }

  if (configValidation.errors.length > 0) {
    report += '## ❌ Errors\n';
    configValidation.errors.forEach(error => {
      report += `- ${error}\n`;
    });
    report += '\n';
  }

  if (configValidation.warnings.length > 0) {
    report += '## ⚠️ Warnings\n';
    configValidation.warnings.forEach(warning => {
      report += `- ${warning}\n`;
    });
    report += '\n';
  }

  if (configValidation.suggestions.length > 0) {
    report += '## 💡 Suggestions\n';
    configValidation.suggestions.forEach(suggestion => {
      report += `- ${suggestion}\n`;
    });
    report += '\n';
  }

  report += '## 📋 SEO Checklist\n\n';
  report += '- [ ] Update siteConfig with your personal information\n';
  report += '- [ ] Replace placeholder images (favicon, og-image, etc.)\n';
  report += '- [ ] Set up Google Search Console\n';
  report += '- [ ] Set up Bing Webmaster Tools\n';
  report += '- [ ] Add environment variables for API integrations\n';
  report += '- [ ] Test social media sharing previews\n';
  report += '- [ ] Validate structured data with Google Rich Results Test\n';
  report += '- [ ] Check mobile-friendliness with Google Mobile-Friendly Test\n';
  report += '- [ ] Run Lighthouse SEO audit\n';
  report += '- [ ] Submit sitemap to search engines\n';

  return report;
}
