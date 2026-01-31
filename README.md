# Personal Portfolio Website

A modern, accessible personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Designed to showcase projects, articles, and professional experience with optimal performance and accessibility.

## Features

- 🚀 **Next.js 14+** with App Router and Static Site Generation
- 🎨 **Tailwind CSS** for responsive design and styling
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

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Simple component combinations
│   ├── organisms/      # Complex UI sections
│   └── templates/      # Page layouts
├── data/               # Static data and configuration
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## Deployment

This project is configured for deployment to GitHub Pages:

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. The site will automatically build and deploy

## Customization

1. Update personal information in `src/data/config.ts`
2. Add your projects and experience data
3. Customize colors and styling in `src/app/globals.css`
4. Configure GitHub and Medium integration

## License

MIT License - feel free to use this template for your own portfolio!
