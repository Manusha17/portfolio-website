#!/usr/bin/env node

/**
 * Generate site.webmanifest from config.ts
 * This script runs during the build process to create a static manifest file
 * with values from the site configuration.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the config - we'll need to read and parse it
import { readFileSync } from 'fs';

// Read the config file
const configPath = join(__dirname, '../src/data/config.ts');
const configContent = readFileSync(configPath, 'utf-8');

// Extract siteConfig values using regex (simple parsing)
const extractValue = key => {
  const regex = new RegExp(`${key}:\\s*['"\`]([^'"\`]+)['"\`]`, 'm');
  const match = configContent.match(regex);
  return match ? match[1] : null;
};

const name = extractValue('name') || 'Your Name';
const title = extractValue('title') || 'Software Engineer';
const description =
  extractValue('description') || 'A passionate software engineer building modern web applications.';

// Generate the manifest
const manifest = {
  name: `${name} - ${title} Portfolio`,
  short_name: `${name} Portfolio`,
  description: description,
  start_url: '/',
  display: 'standalone',
  background_color: '#0a0a0a',
  theme_color: '#0a0a0a',
  orientation: 'portrait-primary',
  scope: '/',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable any',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable any',
    },
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    {
      src: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      src: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
  ],
  categories: ['portfolio', 'professional', 'developer', 'software'],
  lang: 'en',
  dir: 'ltr',
  prefer_related_applications: false,
  shortcuts: [
    {
      name: 'About',
      short_name: 'About',
      description: `Learn more about ${name}`,
      url: '/#about',
      icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
    },
    {
      name: 'Projects',
      short_name: 'Projects',
      description: 'View my projects and work',
      url: '/#projects',
      icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
    },
    {
      name: 'Articles',
      short_name: 'Articles',
      description: 'Read my latest articles',
      url: '/#articles',
      icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
    },
    {
      name: 'Contact',
      short_name: 'Contact',
      description: 'Get in touch with me',
      url: '/#contact',
      icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
    },
  ],
};

// Write the manifest file
const outputPath = join(__dirname, '../public/site.webmanifest');
writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log('✅ Generated site.webmanifest successfully');
console.log(`   Name: ${manifest.name}`);
console.log(`   Description: ${manifest.description}`);
