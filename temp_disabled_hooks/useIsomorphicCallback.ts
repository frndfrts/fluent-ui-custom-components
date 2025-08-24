import React from 'react';

/**
 * Custom hook for isomorphic callbacks with comprehensive error handling.
 * Provides robust callback management for external applications.
 */
export const useIsomorphicCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  onError?: (error: Error) => void
): T => {
  const useIsomorphicCallback = typeof window !== 'undefined' ? React.useCallback : React.useCallback;

  return useIsomorphicCallback((...args: Parameters<T>) => {
    try {
      return callback(...args);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic callback');
      onError?.(errorObj);
      throw errorObj;
    }
  }, deps);
};
