import React from 'react';

/**
 * Custom hook for timeouts with comprehensive error handling.
 * Provides robust timeout management for external applications.
 */
export const useTimeout = (
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
          const errorObj = error instanceof Error ? error : new Error('Unknown error in timeout callback');
          onError?.(errorObj);
        }
      };

      const id = setTimeout(tick, delay);

      return () => {
        try {
          clearTimeout(id);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in timeout cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in timeout effect setup');
      onError?.(errorObj);
    }
  }, [delay, onError]);
};
