import React from 'react';

/**
 * Custom hook for intervals with comprehensive error handling.
 * Provides robust interval management for external applications.
 */
export const useInterval = (
  callback: () => void,
  delay: number | null,
  onError?: (error: Error) => void
) => {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    try {
      savedCallback.current = callback;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in callback update');
      onError?.(errorObj);
    }
  }, [callback, onError]);

  React.useEffect(() => {
    try {
      if (delay === null) return;

      const tick = () => {
        try {
          savedCallback.current();
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in interval callback');
          onError?.(errorObj);
        }
      };

      const id = setInterval(tick, delay);

      return () => {
        try {
          clearInterval(id);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in interval cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in interval effect setup');
      onError?.(errorObj);
    }
  }, [delay, onError]);
};
