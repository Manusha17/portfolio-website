import { PulsingDot, PulsingDotColor } from '@/components/atoms/PulsingDot';

interface AvailabilityBadgeProps {
  label: string;
  color?: PulsingDotColor;
  className?: string;
}

const BADGE_COLOR_CLASSES: Record<PulsingDotColor, string> = {
  green:
    'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400',
  blue: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  red: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400',
  yellow:
    'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
};

/**
 * Pill badge combining a pulsing status dot with a label.
 * Used to surface availability/status info (e.g. "Available for new opportunities").
 */
export function AvailabilityBadge({ label, color = 'green', className = '' }: AvailabilityBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${BADGE_COLOR_CLASSES[color]} ${className}`}
    >
      <PulsingDot color={color} />
      <span>{label}</span>
    </div>
  );
}
