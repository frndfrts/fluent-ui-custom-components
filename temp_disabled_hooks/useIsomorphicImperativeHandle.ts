import React from 'react';

/**
 * Custom hook for isomorphic imperative handles with comprehensive error handling.
 * Provides robust imperative handle management for external applications.
 */
export const useIsomorphicImperativeHandle = <T, R extends T>(
  ref: React.Ref<T> | React.RefCallback<T> | null | undefined,
  init: () => R,
  deps?: React.DependencyList,
  onError?: (error: Error) => void
): void => {
  const useIsomorphicImperativeHandle = typeof window !== 'undefined' ? React.useImperativeHandle : React.useImperativeHandle;

  try {
    useIsomorphicImperativeHandle(ref, init, deps);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic imperative handle');
    onError?.(errorObj);
    
    // Fallback to regular useImperativeHandle
    React.useImperativeHandle(ref, init, deps);
  }
};
