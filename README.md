# Personal Portfolio Website

A modern, accessible personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Designed to showcase projects, articles, and professional experience with optimal performance and accessibility.

## Features

- 🚀 **Next.js 14+** with App Router and Static Site Generation
- 🎨 **Tailwind CSS** for responsive design and styling with light and dark theme
- 📱 **Fully Responsive** - works on mobile, tablet, and desktop
- ♿ **Accessibility First** - WCAG 2.1 AA compliant
- 🔍 **SEO Optimized** with meta tags and structured data
- 🎭 **Smooth Animations** with Framer Motion
- 📊 **GitHub Integration** - automatically fetch and display repositories
- 📝 **Medium Integration** - display published articles
- 🚀 **GitHub Pages Ready** - optimized for static deployment

## Tech Stack

- **Framework:** Next.js 16 with TypeScript and React Compiler
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Deployment:** GitHub Pages
- **Code Quality:** ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Export static files for GitHub Pages
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run test:deployment` - Test deployment configuration locally
- `npm run validate:deployment <url>` - Validate deployed site
- `npm run build:github` - Build with custom base path for GitHub Pages
- `npm run serve` - Serve built files locally

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── atoms/          # Basic UI components
|   ├── icons/          # SVG icon components
│   ├── molecules/      # Simple component combinations
│   ├── organisms/      # Complex UI sections
│   └── templates/      # Page layouts
├── data/               # Static data and configuration
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Quick Setup

1. **Fork or clone this repository**
2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"
3. **Push to main branch** - deployment happens automatically!

### Advanced Configuration

For detailed deployment setup, custom domains, and troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Local Testing

Test your deployment configuration before pushing:

```bash
# Test the complete deployment process
npm run test:deployment

# Build and serve locally
npm run build
npm run serve

# Validate a deployed site
npm run validate:deployment https://yourusername.github.io/repository-name
```

## Customization

1. Update personal information in `src/data/config.ts`
2. Add your projects and experience data
3. Customize colors and styling in `src/app/globals.css`
4. Configure GitHub and Medium integration

## License

MIT License - feel free to use this template for your own portfolio!
