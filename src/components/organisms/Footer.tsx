import { siteConfig } from '@/data/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
      </div>
    </footer>
  );
}