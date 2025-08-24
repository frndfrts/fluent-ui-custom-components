import React from 'react';

/**
 * Custom hook for unmount effects with comprehensive error handling.
 * Provides robust unmount effect management for external applications.
 */
export const useUnmountEffect = (
  effect: () => void,
  onError?: (error: Error) => void
) => {
  React.useEffect(() => {
    try {
      return () => {
        try {
          effect();
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in unmount effect');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unmount effect setup');
      onError?.(errorObj);
    }
  }, [effect, onError]);
};
