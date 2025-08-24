import React from 'react';

/**
 * Custom hook for mount effects with comprehensive error handling.
 * Provides robust mount effect management for external applications.
 */
export const useMountEffect = (
  effect: () => void | (() => void),
  onError?: (error: Error) => void
) => {
  React.useEffect(() => {
    try {
      const cleanup = effect();
      
      if (typeof cleanup === 'function') {
        return () => {
          try {
            cleanup();
          } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Unknown error in mount effect cleanup');
            onError?.(errorObj);
          }
        };
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in mount effect');
      onError?.(errorObj);
    }
  }, [effect, onError]);
};
