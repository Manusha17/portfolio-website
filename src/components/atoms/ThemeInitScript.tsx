/**
 * ThemeInitScript - Prevents flash of unstyled content (FOUC) on page load
 *
 * This script runs before React hydrates to apply the saved theme immediately.
 * It must be inline in the <head> to execute before the page renders.
 */
export function ThemeInitScript() {
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (!theme) {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.add('light');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} suppressHydrationWarning />;
}
