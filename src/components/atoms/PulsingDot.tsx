export type PulsingDotColor = 'green' | 'blue' | 'red' | 'yellow';

interface PulsingDotProps {
  className?: string;
  color?: PulsingDotColor;
}

const COLOR_CLASSES: Record<PulsingDotColor, { ping: string; dot: string }> = {
  green: { ping: 'bg-green-400', dot: 'bg-green-500' },
  blue: { ping: 'bg-blue-400', dot: 'bg-blue-500' },
  red: { ping: 'bg-red-400', dot: 'bg-red-500' },
  yellow: { ping: 'bg-yellow-400', dot: 'bg-yellow-500' },
};

/**
 * Small animated status indicator (e.g. "available", "online").
 * Renders a solid dot with a pulsing ring behind it.
 */
export function PulsingDot({ className = 'h-2.5 w-2.5', color = 'green' }: PulsingDotProps) {
  const { ping, dot } = COLOR_CLASSES[color];

  return (
    <span className={`relative flex ${className}`}>
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${ping}`}
      />
      <span className={`relative inline-flex h-full w-full rounded-full ${dot}`} />
    </span>
  );
}
