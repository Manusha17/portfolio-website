import { siteConfig } from '@/data/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
