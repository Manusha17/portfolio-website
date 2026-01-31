'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry) {
          const isElementIntersecting = entry.isIntersecting;
          setIsIntersecting(isElementIntersecting);

          if (isElementIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasIntersected]);

  // Return the current intersection state or the "has intersected" state based on triggerOnce
  const shouldAnimate = triggerOnce ? hasIntersected : isIntersecting;

  return { ref: elementRef, isIntersecting: shouldAnimate };
}
