import { SpinnerIcon } from '@/components/icons';

interface SectionLoaderProps {
  fullHeight?: boolean;
}

export function SectionLoader({ fullHeight = true }: SectionLoaderProps) {
  return (
    <div
      className={`flex items-center justify-center ${fullHeight ? 'min-h-screen' : 'py-20'}`}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center gap-3">
        <SpinnerIcon className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
        <span className="text-sm text-slate-500 dark:text-slate-400">Loading...</span>
      </div>
    </div>
  );
}
