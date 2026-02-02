import { siteConfig } from '@/data/config';

export interface WebAppManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  background_color: string;
  theme_color: string;
  orientation?:
    | 'any'
    | 'natural'
    | 'landscape'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary'
    | 'landscape-primary'
    | 'landscape-secondary';
  scope?: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }>;
  categories?: string[];
  lang?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
  prefer_related_applications?: boolean;
  shortcuts?: Array<{
    name: string;
    short_name?: string;
    description?: string;
    url: string;
    icons?: Array<{
      src: string;
      sizes: string;
      type?: string;
    }>;
  }>;
}

// Generate web app manifest from site configuration
export function generateWebAppManifest(): WebAppManifest {
  return {
    name: `${siteConfig.name} - ${siteConfig.title} Portfolio`,
    short_name: `${siteConfig.name} Portfolio`,
    description: siteConfig.description,
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
        description: `Learn more about ${siteConfig.name}`,
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
}

// Generate manifest with custom theme colors
export function generateWebAppManifestWithTheme(
  backgroundColor: string = '#0a0a0a',
  themeColor: string = '#0a0a0a'
): WebAppManifest {
  const manifest = generateWebAppManifest();
  return {
    ...manifest,
    background_color: backgroundColor,
    theme_color: themeColor,
  };
}

// Validate manifest data
export function validateManifest(manifest: WebAppManifest): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!manifest.name || manifest.name.trim().length === 0) {
    errors.push('Manifest name is required');
  }

  if (!manifest.short_name || manifest.short_name.trim().length === 0) {
    errors.push('Manifest short_name is required');
  }

  if (!manifest.start_url) {
    errors.push('Manifest start_url is required');
  }

  if (!manifest.icons || manifest.icons.length === 0) {
    errors.push('Manifest must have at least one icon');
  }

  // Check for required icon sizes
  const requiredSizes = ['192x192', '512x512'];
  const availableSizes = manifest.icons.map(icon => icon.sizes);

  requiredSizes.forEach(size => {
    if (!availableSizes.includes(size)) {
      errors.push(`Missing required icon size: ${size}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
