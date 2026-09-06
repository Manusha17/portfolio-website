# Environment Variables Setup Guide

This guide explains how to configure environment variables for both local development and GitHub Actions deployment.

## Overview

The portfolio website uses environment variables for:

- GitHub username (for fetching repositories)
- Medium username (for fetching articles from Medium)
- Dev.to username (for fetching articles from Dev.to)
- Search engine verification codes (for SEO)
- Base path configuration (for GitHub Pages)

## Local Development Setup

### 1. Create `.env.local` file

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

### 2. Configure Your Values

Edit `.env.local` with your information:

```env
# GitHub Configuration (Required for Projects Section)
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username

# Medium Configuration (Optional for Articles Section)
NEXT_PUBLIC_MEDIUM_USERNAME=your-medium-username

# Dev.to Configuration (Optional for Articles Section)
NEXT_PUBLIC_DEVTO_USERNAME=your-devto-username

# Search Engine Verification (Optional but Recommended for SEO)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_BING_VERIFICATION=your-bing-verification-code
NEXT_PUBLIC_YANDEX_VERIFICATION=your-yandex-verification-code
NEXT_PUBLIC_YAHOO_VERIFICATION=your-yahoo-verification-code

# Base Path (Only needed for non-root deployments)
# NEXT_PUBLIC_BASE_PATH=/repository-name
```

### 3. Restart Development Server

After updating `.env.local`, restart your development server:

```bash
npm run dev
```

## GitHub Actions Deployment Setup

For GitHub Actions to access your environment variables during deployment, you need to add them to your repository.

### Option 1: Repository Variables (Recommended for Non-Sensitive Data)

**Best for:** Usernames, public configuration

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click the **Variables** tab
4. Click **New repository variable**
5. Add each variable:

| Variable Name                     | Example Value | Required    |
| --------------------------------- | ------------- | ----------- |
| `NEXT_PUBLIC_GITHUB_USERNAME`     | `octocat`     | ✅ Yes      |
| `NEXT_PUBLIC_MEDIUM_USERNAME`     | `@username`   | ⚠️ Optional |
| `NEXT_PUBLIC_DEVTO_USERNAME`      | `username`    | ⚠️ Optional |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | `abc123...`   | ⚠️ Optional |
| `NEXT_PUBLIC_BING_VERIFICATION`   | `xyz789...`   | ⚠️ Optional |

### Option 2: Repository Secrets (For Sensitive Data)

**Best for:** API keys, verification codes

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click the **Secrets** tab
4. Click **New repository secret**
5. Add each secret with the same names as above

### How the Workflow Uses Variables

The GitHub Actions workflow checks both secrets and variables:

```yaml
env:
  NEXT_PUBLIC_GITHUB_USERNAME: ${{ secrets.NEXT_PUBLIC_GITHUB_USERNAME || vars.NEXT_PUBLIC_GITHUB_USERNAME }}
```

This means:

1. First tries to use the **secret** (if set)
2. Falls back to the **variable** (if secret not set)
3. If neither exists, the variable will be `undefined`

## Environment Variable Priority

The order of precedence (highest to lowest):

1. **GitHub Actions Secrets** (during deployment)
2. **GitHub Actions Variables** (during deployment)
3. **`.env.local`** (local development only)
4. **Default values in code** (fallback)

## Required vs Optional Variables

### ✅ Required for Full Functionality

These are needed for the site to work properly:

- `NEXT_PUBLIC_GITHUB_USERNAME` - Without this, the Projects section won't load

### ⚠️ Optional but Recommended

These improve functionality and SEO:

- `NEXT_PUBLIC_MEDIUM_USERNAME` - For displaying Medium articles (at least one article source recommended)
- `NEXT_PUBLIC_DEVTO_USERNAME` - For displaying Dev.to articles (at least one article source recommended)
- `NEXT_PUBLIC_GOOGLE_VERIFICATION` - For Google Search Console
- `NEXT_PUBLIC_BING_VERIFICATION` - For Bing Webmaster Tools
- `NEXT_PUBLIC_YANDEX_VERIFICATION` - For Yandex Webmaster
- `NEXT_PUBLIC_YAHOO_VERIFICATION` - For Yahoo Site Explorer

**Note:** You can configure one or both article sources (Medium and Dev.to). If neither is configured, the Articles section will show a "no articles" message.

### 🔧 Automatically Set

These are handled by the deployment workflow:

- `NEXT_PUBLIC_BASE_PATH` - Automatically configured for GitHub Pages
- `GITHUB_ACTIONS` - Set to `true` in GitHub Actions environment

## Getting Verification Codes

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (your deployed site URL)
3. Choose **HTML tag** verification method
4. Copy the `content` value from the meta tag
5. Add as `NEXT_PUBLIC_GOOGLE_VERIFICATION`

Example meta tag:

```html
<meta name="google-site-verification" content="abc123xyz789..." />
```

Use: `abc123xyz789...`

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Choose **Meta tag** verification
4. Copy the `content` value
5. Add as `NEXT_PUBLIC_BING_VERIFICATION`

## Troubleshooting

### Variables Not Working in GitHub Actions

**Problem:** Environment variables are undefined during deployment

**Solutions:**

1. Check variable names match exactly (case-sensitive)
2. Verify variables are set in repository settings
3. Check the Actions logs for the build step
4. Ensure you're using `NEXT_PUBLIC_` prefix (required for Next.js)

### Variables Not Working Locally

**Problem:** Environment variables are undefined in development

**Solutions:**

1. Ensure `.env.local` exists in the `portfolio-website` directory
2. Restart the development server after changing `.env.local`
3. Check for typos in variable names
4. Verify the file is named exactly `.env.local` (not `.env.local.txt`)

### GitHub/Medium/Dev.to Data Not Loading

**Problem:** Projects or articles section is empty

**Solutions:**

1. Verify your GitHub/Medium/Dev.to username is correct
2. Check that your GitHub repositories are public
3. Ensure your Medium profile is public
4. Ensure your Dev.to profile is public
5. Check browser console for API errors
6. Verify the environment variables are set correctly
7. For articles, ensure at least one source (Medium or Dev.to) is configured

## Security Notes

### ✅ Safe to Expose (Public Variables)

These variables are prefixed with `NEXT_PUBLIC_` and are **embedded in the client-side JavaScript bundle**. They are visible to anyone who views your site:

- GitHub username (already public)
- Medium username (already public)
- Dev.to username (already public)
- Verification codes (designed to be public)

### ❌ Never Add These

Do **NOT** add these types of values as environment variables:

- Private API keys
- Authentication tokens
- Database credentials
- Personal access tokens with write permissions

## Testing Your Configuration

### Local Testing

```bash
# Check if variables are loaded
npm run dev

# Visit http://localhost:3000
# Check browser console for any errors
# Verify Projects and Articles sections load
```

### Deployment Testing

```bash
# Test the deployment build locally
npm run test:deployment

# This will:
# - Run type checking
# - Build the project
# - Verify output structure
```

### Verify in GitHub Actions

1. Push your changes to GitHub
2. Go to **Actions** tab in your repository
3. Click on the latest workflow run
4. Expand the "Build with Next.js" step
5. Check that environment variables are set (they won't show values for security)

## Quick Setup Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Add your GitHub username to `.env.local`
- [ ] Add your Medium username to `.env.local` (optional)
- [ ] Add your Dev.to username to `.env.local` (optional)
- [ ] Test locally with `npm run dev`
- [ ] Add `NEXT_PUBLIC_GITHUB_USERNAME` to GitHub repository variables
- [ ] Add `NEXT_PUBLIC_MEDIUM_USERNAME` to GitHub repository variables (optional)
- [ ] Add `NEXT_PUBLIC_DEVTO_USERNAME` to GitHub repository variables (optional)
- [ ] (Optional) Add verification codes to GitHub repository variables
- [ ] Push to main branch and verify deployment works
- [ ] Check deployed site to ensure Projects and Articles load

## Additional Resources

- [Next.js Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Actions Variables Documentation](https://docs.github.com/en/actions/learn-github-actions/variables)
