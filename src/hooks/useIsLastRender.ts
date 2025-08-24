import React from 'react';

/**
 * Custom hook for tracking last render state with comprehensive error handling.
 * Provides robust last render tracking for external applications.
 */
export const useIsLastRender = (onError?: (error: Error) => void) => {
  const isLast = React.useRef(true);

  React.useEffect(() => {
    try {
      isLast.current = false;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in last render state update');
      onError?.(errorObj);
    }
  });

  const getIsLast = React.useCallback((): boolean => {
    try {
      return isLast.current;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in last render state check');
      onError?.(errorObj);
      return true;
    }
  }, [onError]);

  return getIsLast;
};
