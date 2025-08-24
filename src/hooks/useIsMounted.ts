import React from 'react';

/**
 * Custom hook for checking component mount status with comprehensive error handling.
 * Provides robust mount status checking for external applications.
 */
export const useIsMounted = (onError?: (error: Error) => void) => {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    try {
      isMounted.current = true;

      return () => {
        try {
          isMounted.current = false;
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in unmount cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in mount effect setup');
      onError?.(errorObj);
    }
  }, [onError]);

  const getIsMounted = React.useCallback((): boolean => {
    try {
      return isMounted.current;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in mount status check');
      onError?.(errorObj);
      return false;
    }
  }, [onError]);

  return getIsMounted;
};
