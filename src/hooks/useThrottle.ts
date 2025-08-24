import React from 'react';

/**
 * Custom hook for throttling values with comprehensive error handling.
 * Provides robust throttling functionality for external applications.
 */
export const useThrottle = <T>(value: T, delay: number, onError?: (error: Error) => void) => {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const lastExecuted = React.useRef<number>(Date.now());

  React.useEffect(() => {
    try {
      const handler = setTimeout(() => {
        try {
          if (Date.now() - lastExecuted.current >= delay) {
            setThrottledValue(value);
            lastExecuted.current = Date.now();
          }
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in throttled value update');
          onError?.(errorObj);
        }
      }, delay - (Date.now() - lastExecuted.current));

      return () => {
        try {
          clearTimeout(handler);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in throttle timeout cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in throttle effect setup');
      onError?.(errorObj);
    }
  }, [value, delay, onError]);

  return throttledValue;
};
