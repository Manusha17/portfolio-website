'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { TimelineItem as TimelineItemType } from '@/types';
import { TimelineItem } from '@/components/molecules/TimelineItem';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';

interface TimelineProps {
  items: TimelineItemType[];
}

export function Timeline({ items }: TimelineProps) {
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { ref: timelineRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Sort items by date (oldest first)
  const sortedItems = [...items].sort((a, b) => a.date.getTime() - b.date.getTime());

  const handleItemFocus = useCallback(
    (itemId: string) => {
      const index = sortedItems.findIndex(item => item.id === itemId);
      setFocusedItemIndex(index);
    },
    [sortedItems]
  );

  // Keyboard navigation between timeline items
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!timelineContainerRef.current?.contains(document.activeElement)) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (focusedItemIndex > 0) {
            const prevIndex = focusedItemIndex - 1;
            const prevItemElement = timelineContainerRef.current?.querySelector(
              `[role="button"][aria-labelledby="timeline-item-${sortedItems[prevIndex]?.id}-title"]`
            ) as HTMLElement;
            prevItemElement?.focus();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (focusedItemIndex < sortedItems.length - 1) {
            const nextIndex = focusedItemIndex + 1;
            const nextItemElement = timelineContainerRef.current?.querySelector(
              `[role="button"][aria-labelledby="timeline-item-${sortedItems[nextIndex]?.id}-title"]`
            ) as HTMLElement;
            nextItemElement?.focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          if (sortedItems.length > 0) {
            const firstItemElement = timelineContainerRef.current?.querySelector(
              `[role="button"][aria-labelledby="timeline-item-${sortedItems[0]?.id}-title"]`
            ) as HTMLElement;
            firstItemElement?.focus();
          }
          break;
        case 'End':
          e.preventDefault();
          if (sortedItems.length > 0) {
            const lastIndex = sortedItems.length - 1;
            const lastItemElement = timelineContainerRef.current?.querySelector(
              `[role="button"][aria-labelledby="timeline-item-${sortedItems[lastIndex]?.id}-title"]`
            ) as HTMLElement;
            lastItemElement?.focus();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedItemIndex, sortedItems]);

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Timeline container */}
      <div
        ref={el => {
          if (timelineRef.current) {
            (timelineRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }
          timelineContainerRef.current = el;
        }}
        className="relative"
        role="list"
        aria-label="Career timeline with keyboard navigation support"
      >
        {/* Main timeline line */}
        <div
          className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 transform bg-gradient-to-b from-slate-300 via-slate-400 to-slate-300 md:block dark:from-slate-600 dark:via-slate-500 dark:to-slate-600"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0)',
            transformOrigin: 'top',
            transition: 'all 1s ease-out 0.5s',
          }}
          aria-hidden="true"
        />

        {/* Timeline items */}
        <div className="space-y-0">
          {sortedItems.map((item, index) => (
            <div key={item.id} role="listitem">
              <TimelineItemObserver
                item={item}
                index={index}
                isLast={index === sortedItems.length - 1}
                onFocus={() => handleItemFocus(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Wrapper component to handle intersection observation for individual items
interface TimelineItemObserverProps {
  item: TimelineItemType;
  index: number;
  isLast: boolean;
  onFocus: () => void;
}

function TimelineItemObserver({ item, index, isLast, onFocus }: TimelineItemObserverProps) {
  const { ref } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <TimelineItem item={item} index={index} isLast={isLast} onFocus={onFocus} />
    </div>
  );
}
