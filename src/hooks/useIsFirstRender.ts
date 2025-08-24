import React from 'react';

/**
 * Custom hook for tracking first render state with comprehensive error handling.
 * Provides robust first render tracking for external applications.
 */
export const useIsFirstRender = (onError?: (error: Error) => void) => {
  const isFirst = React.useRef(true);

  React.useEffect(() => {
    try {
      isFirst.current = false;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in first render state update');
      onError?.(errorObj);
    }
  });

  const getIsFirst = React.useCallback((): boolean => {
    try {
      return isFirst.current;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in first render state check');
      onError?.(errorObj);
      return true;
    }
  }, [onError]);

  return getIsFirst;
};
