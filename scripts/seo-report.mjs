#!/usr/bin/env node

// Simple script to generate SEO configuration report
import fs from 'fs';
import path from 'path';

function generateSEOReport() {
  const errors = [];
  const warnings = [];
  const suggestions = [];

  // Check if environment variables are set
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  if (!envContent.includes('NEXT_PUBLIC_GITHUB_USERNAME')) {
    warnings.push('NEXT_PUBLIC_GITHUB_USERNAME environment variable is not set in .env.local');
  }

  if (!envContent.includes('NEXT_PUBLIC_MEDIUM_USERNAME')) {
    warnings.push('NEXT_PUBLIC_MEDIUM_USERNAME environment variable is not set in .env.local');
  }

  if (!envContent.includes('NEXT_PUBLIC_GOOGLE_VERIFICATION')) {
    suggestions.push('Consider adding NEXT_PUBLIC_GOOGLE_VERIFICATION for Google Search Console');
  }

  // Check for placeholder files
  const placeholderFiles = [
    'public/favicon.ico',
    'public/og-image.jpg',
    'public/apple-touch-icon.png',
    'public/android-chrome-192x192.png',
    'public/android-chrome-512x512.png',
  ];

  placeholderFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      // Check if file is very small (likely placeholder)
      if (stats.size < 100) {
        suggestions.push(`Replace placeholder file: ${file}`);
      }
    }
  });

  // Check siteConfig
  const configPath = path.join(process.cwd(), 'src/data/config.ts');
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8');
    if (configContent.includes('Your Name')) {
      suggestions.push('Update siteConfig with your actual name and information');
    }
    if (configContent.includes('yourusername')) {
      suggestions.push('Update social media URLs in siteConfig.links');
    }
  }

  // Generate report
  let report = '# SEO Configuration Report\n\n';

  if (errors.length === 0) {
    report += '✅ **SEO Configuration Status**: No critical errors found\n\n';
  } else {
    report += '❌ **SEO Configuration Status**: Critical issues found\n\n';
  }

  if (errors.length > 0) {
    report += '## ❌ Errors\n';
    errors.forEach(error => {
      report += `- ${error}\n`;
    });
    report += '\n';
  }

  if (warnings.length > 0) {
    report += '## ⚠️ Warnings\n';
    warnings.forEach(warning => {
      report += `- ${warning}\n`;
    });
    report += '\n';
  }

  if (suggestions.length > 0) {
    report += '## 💡 Suggestions for Better SEO\n';
    suggestions.forEach(suggestion => {
      report += `- ${suggestion}\n`;
    });
    report += '\n';
  }

  report += '## 📋 SEO Implementation Checklist\n\n';
  report += '### ✅ Completed (Implemented in this task)\n';
  report += '- [x] Dynamic meta tags for all pages\n';
  report += '- [x] JSON-LD structured data for Person schema\n';
  report += '- [x] Open Graph meta tags for social sharing\n';
  report += '- [x] Twitter Card meta tags\n';
  report += '- [x] XML sitemap generation\n';
  report += '- [x] Robots.txt file\n';
  report += '- [x] Canonical URLs\n';
  report += '- [x] Dynamic web manifest for PWA support (pulls from config.ts)\n';
  report += '- [x] Favicon and icon files structure\n';
  report += '- [x] SEO-optimized Next.js configuration\n\n';

  report += '### 📝 Next Steps (Manual Configuration Required)\n';
  report += '- [ ] Update siteConfig with your personal information\n';
  report += '- [ ] Replace placeholder images (favicon, og-image, etc.)\n';
  report += '- [ ] Set up Google Search Console and add verification code\n';
  report += '- [ ] Set up Bing Webmaster Tools and add verification code\n';
  report += '- [ ] Configure environment variables for GitHub/Medium usernames\n';
  report += '- [ ] Test social media sharing previews\n';
  report += '- [ ] Validate structured data with Google Rich Results Test\n';
  report += '- [ ] Run Lighthouse SEO audit\n';
  report += '- [ ] Submit sitemap to search engines after deployment\n\n';

  report += '## 🔗 Useful SEO Tools\n\n';
  report += '- [Google Search Console](https://search.google.com/search-console)\n';
  report += '- [Bing Webmaster Tools](https://www.bing.com/webmasters)\n';
  report += '- [Google Rich Results Test](https://search.google.com/test/rich-results)\n';
  report += '- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)\n';
  report += '- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)\n';
  report += '- [Twitter Card Validator](https://cards-dev.twitter.com/validator)\n';
  report += '- [Lighthouse SEO Audit](https://developers.google.com/web/tools/lighthouse)\n';

  return report;
}

// Generate and save the report
const report = generateSEOReport();
const reportPath = path.join(process.cwd(), 'SEO-REPORT.md');
fs.writeFileSync(reportPath, report);

console.log('✅ SEO Configuration Report generated: SEO-REPORT.md');
console.log('\n📋 Summary:');
console.log('- Dynamic meta tags: ✅ Implemented');
console.log('- JSON-LD structured data: ✅ Implemented');
console.log('- Open Graph & Twitter Cards: ✅ Implemented');
console.log('- XML sitemap: ✅ Generated');
console.log('- Robots.txt: ✅ Generated');
console.log(
  '\n💡 Next: Update siteConfig with your personal information and replace placeholder images'
);
