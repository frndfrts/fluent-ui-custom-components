import React from 'react';

/**
 * Custom hook for isomorphic refs with comprehensive error handling.
 * Provides robust ref management for external applications.
 */
export const useIsomorphicRef = <T>(
  initialValue: T,
  onError?: (error: Error) => void
): React.MutableRefObject<T> => {
  const useIsomorphicRef = typeof window !== 'undefined' ? React.useRef : React.useRef;

  try {
    return useIsomorphicRef(initialValue);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic ref creation');
    onError?.(errorObj);
    
    // Return a fallback ref
    const fallbackRef = React.useRef(initialValue);
    return fallbackRef;
  }
};
