#!/usr/bin/env node

/**
 * Validation script for deployed GitHub Pages site
 * This script checks if the deployed site is working correctly
 */

const validateDeployment = async url => {
  console.log(`🔍 Validating deployment at: ${url}\n`);

  try {
    // Test 1: Check if site is accessible
    console.log('1️⃣ Checking site accessibility...');
    const response = await fetch(url);
    if (response.ok) {
      console.log('✅ Site is accessible');
    } else {
      throw new Error(`Site returned status: ${response.status}`);
    }

    // Test 2: Check if HTML is valid
    console.log('2️⃣ Checking HTML content...');
    const html = await response.text();
    if (html.includes('<html') && html.includes('</html>')) {
      console.log('✅ Valid HTML structure found');
    } else {
      console.warn('⚠️  HTML structure may be incomplete');
    }

    // Test 3: Check for required meta tags
    console.log('3️⃣ Checking SEO meta tags...');
    const hasTitle = html.includes('<title>');
    const hasDescription = html.includes('name="description"');
    const hasViewport = html.includes('name="viewport"');

    if (hasTitle && hasDescription && hasViewport) {
      console.log('✅ Required meta tags found');
    } else {
      console.warn('⚠️  Some meta tags may be missing');
    }

    // Test 4: Check for structured data
    console.log('4️⃣ Checking structured data...');
    if (html.includes('application/ld+json')) {
      console.log('✅ Structured data found');
    } else {
      console.warn('⚠️  Structured data not found');
    }

    console.log('\n🎉 Deployment validation completed!');
    return true;
  } catch (error) {
    console.error('\n❌ Deployment validation failed:');
    console.error(error.message);
    return false;
  }
};

// Get URL from command line argument or use default
const url = process.argv[2] || 'https://yourusername.github.io/repository-name';

if (url.includes('yourusername') || url.includes('repository-name')) {
  console.log('❌ Please provide a valid GitHub Pages URL:');
  console.log(
    '   node scripts/validate-deployment.mjs https://yourusername.github.io/repository-name'
  );
  process.exit(1);
}

validateDeployment(url).then(success => {
  process.exit(success ? 0 : 1);
});
