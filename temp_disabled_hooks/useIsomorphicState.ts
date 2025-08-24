import React from 'react';

/**
 * Custom hook for isomorphic state with comprehensive error handling.
 * Provides robust state management for external applications.
 */
export const useIsomorphicState = <T>(
  initialState: T | (() => T),
  onError?: (error: Error) => void
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const useIsomorphicState = typeof window !== 'undefined' ? React.useState : React.useState;

  try {
    return useIsomorphicState(initialState);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic state creation');
    onError?.(errorObj);
    
    // Return a fallback state
    const fallbackState = React.useState(initialState);
    return fallbackState;
  }
};
