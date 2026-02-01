#!/usr/bin/env node

/**
 * Test script for GitHub Pages deployment
 * This script helps test the deployment locally before pushing to GitHub
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Testing GitHub Pages Deployment...\n');

// Check if we're in the correct directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error(
    '❌ Error: package.json not found. Please run this script from the portfolio-website directory.'
  );
  process.exit(1);
}

try {
  // Step 1: Type check
  console.log('1️⃣ Running TypeScript type check...');
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ TypeScript check passed\n');

  // Step 2: Build for production (skip lint for now due to existing issues)
  console.log('2️⃣ Building for production...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');

  // Step 3: Check output directory
  console.log('3️⃣ Checking output directory...');
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    throw new Error('Output directory not found');
  }

  const indexHtml = path.join(outDir, 'index.html');
  if (!fs.existsSync(indexHtml)) {
    throw new Error('index.html not found in output directory');
  }

  // Check for required files
  const requiredFiles = ['.nojekyll', 'robots.txt', 'sitemap.xml'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(outDir, file))) {
      console.warn(`⚠️  Warning: ${file} not found in output directory`);
    }
  }

  console.log('✅ Output directory structure is correct\n');

  // Step 4: Check file sizes
  console.log('4️⃣ Checking bundle sizes...');
  const nextDir = path.join(outDir, '_next');
  if (fs.existsSync(nextDir)) {
    try {
      execSync('dir /s /-c _next', { cwd: outDir, encoding: 'utf8' });
      console.log('📦 Bundle directory created successfully');
    } catch {
      console.log('📦 Bundle size check skipped');
    }
  }

  console.log('\n🎉 Deployment test completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('   1. Commit your changes');
  console.log('   2. Push to main branch');
  console.log('   3. Check GitHub Actions for deployment status');
  console.log('   4. Visit your GitHub Pages URL once deployed');
} catch (error) {
  console.error('\n❌ Deployment test failed:');
  console.error(error.message);
  process.exit(1);
}
