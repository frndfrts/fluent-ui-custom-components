import React from 'react';

/**
 * Custom hook for tracking first mount state with comprehensive error handling.
 * Provides robust first mount tracking for external applications.
 */
export const useFirstMountState = (onError?: (error: Error) => void) => {
  const isFirst = React.useRef(true);

  React.useEffect(() => {
    try {
      isFirst.current = false;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in first mount state update');
      onError?.(errorObj);
    }
  });

  const getIsFirst = React.useCallback((): boolean => {
    try {
      return isFirst.current;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in first mount state check');
      onError?.(errorObj);
      return true;
    }
  }, [onError]);

  return getIsFirst;
};
