import React from 'react';

/**
 * Custom hook for forcing component updates with comprehensive error handling.
 * Provides robust force update functionality for external applications.
 */
export const useForceUpdate = (onError?: (error: Error) => void) => {
  const [, forceUpdate] = React.useReducer((x: number) => {
    try {
      return x + 1;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in force update reducer');
      onError?.(errorObj);
      return x;
    }
  }, 0);

  const safeForceUpdate = React.useCallback(() => {
    try {
      forceUpdate();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in force update');
      onError?.(errorObj);
    }
  }, [forceUpdate, onError]);

  return safeForceUpdate;
};
