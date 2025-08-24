import React from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Custom hook for tracking scroll position with comprehensive error handling.
 * Provides robust scroll tracking for external applications.
 */
export const useScrollPosition = (onError?: (error: Error) => void) => {
  const [scrollPosition, setScrollPosition] = React.useState<ScrollPosition>({ x: 0, y: 0 });

  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const updatePosition = () => {
        try {
          setScrollPosition({
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop,
          });
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in scroll position update');
          onError?.(errorObj);
        }
      };

      // Set initial position
      updatePosition();

      // Add listener
      window.addEventListener('scroll', updatePosition);

      return () => {
        try {
          window.removeEventListener('scroll', updatePosition);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in scroll listener cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in scroll position effect setup');
      onError?.(errorObj);
    }
  }, [onError]);

  return scrollPosition;
};
