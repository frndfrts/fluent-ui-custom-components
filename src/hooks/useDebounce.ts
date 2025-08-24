import React from 'react';

/**
 * Custom hook for debouncing values with comprehensive error handling.
 * Provides robust debouncing functionality for external applications.
 */
export const useDebounce = <T>(value: T, delay: number, onError?: (error: Error) => void) => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    try {
      const handler = setTimeout(() => {
        try {
          setDebouncedValue(value);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in debounced value update');
          onError?.(errorObj);
        }
      }, delay);

      return () => {
        try {
          clearTimeout(handler);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in timeout cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in debounce effect setup');
      onError?.(errorObj);
    }
  }, [value, delay, onError]);

  return debouncedValue;
};



