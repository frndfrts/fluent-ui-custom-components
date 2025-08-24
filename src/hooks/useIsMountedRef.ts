import React from 'react';

/**
 * Custom hook for tracking mount status with refs and comprehensive error handling.
 * Provides robust mount status tracking for external applications.
 */
export const useIsMountedRef = (onError?: (error: Error) => void) => {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    try {
      isMounted.current = true;

      return () => {
        try {
          isMounted.current = false;
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in unmount ref cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in mount ref effect setup');
      onError?.(errorObj);
    }
  }, [onError]);

  return isMounted;
};
