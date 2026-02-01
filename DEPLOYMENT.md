# Deployment Guide

## GitHub Pages Deployment

This portfolio website is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Push to main branch**: Any push to the `main` branch will trigger an automatic deployment
2. **Pull request preview**: Pull requests will build the site for testing (but not deploy)
3. **Manual deployment**: You can manually trigger deployment from the Actions tab

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages section
   - Set Source to "GitHub Actions"

2. **Configure Environment Variables**:
   - Add `NEXT_PUBLIC_GITHUB_USERNAME` to repository variables/secrets
   - Add `NEXT_PUBLIC_MEDIUM_USERNAME` to repository variables/secrets
   - Optionally add search engine verification codes
   - `NEXT_PUBLIC_BASE_PATH`: Set automatically for GitHub Pages when not using custom domain
   - `GITHUB_ACTIONS`: Automatically set to 'true' in GitHub Actions environment

3. **Configure Repository Permissions**:
   - Go to Settings > Actions > General
   - Set "Workflow permissions" to "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

4. **Custom Domain (Optional)**:
   - Edit `public/CNAME` file and uncomment/replace with your domain
   - Configure DNS settings with your domain provider
   - Add a CNAME record pointing to `<username>.github.io`

### Local Testing

To test the GitHub Pages build locally:

```bash
# Build for GitHub Pages (without custom domain)
npm run build

# Build for GitHub Pages (with custom base path)
npm run build:github --base_path=/repository-name

# Serve the built site locally
npm run serve
```

### Troubleshooting

**Build Failures**:

- Check the Actions tab for detailed error logs
- Ensure all dependencies are properly listed in package.json
- Verify TypeScript compilation passes locally

**Routing Issues**:

- Ensure `trailingSlash: true` is set in next.config.ts
- Check that all internal links use relative paths
- Verify `.nojekyll` file exists in public directory

**Custom Domain Issues**:

- Verify CNAME file contains only the domain name
- Check DNS configuration with your domain provider
- Allow 24-48 hours for DNS propagation

### File Structure

```
portfolio-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   ├── .nojekyll              # Prevents Jekyll processing
│   └── CNAME                  # Custom domain configuration
├── next.config.ts             # Next.js configuration with GitHub Pages support
└── DEPLOYMENT.md              # This file
```

### Performance Considerations

- Static export ensures fast loading times
- Images are unoptimized for GitHub Pages compatibility
- CSS and JavaScript are minified and compressed
- Build artifacts are cached between deployments
