import React from 'react';

/**
 * Custom hook for isomorphic memoization with comprehensive error handling.
 * Provides robust memoization for external applications.
 */
export const useIsomorphicMemo = <T>(
  factory: () => T,
  deps: React.DependencyList,
  onError?: (error: Error) => void
): T => {
  const useIsomorphicMemo = typeof window !== 'undefined' ? React.useMemo : React.useMemo;

  return useIsomorphicMemo(() => {
    try {
      return factory();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic memo factory');
      onError?.(errorObj);
      throw errorObj;
    }
  }, deps);
};
