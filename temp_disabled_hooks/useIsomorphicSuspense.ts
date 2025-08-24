import React from 'react';

/**
 * Custom hook for isomorphic suspense with comprehensive error handling.
 * Provides robust suspense management for external applications.
 */
export const useIsomorphicSuspense = (onError?: (error: Error) => void): void => {
  const useIsomorphicSuspense = typeof window !== 'undefined' ? React.useSuspense : React.useSuspense;

  try {
    useIsomorphicSuspense();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic suspense');
    onError?.(errorObj);
    
    // Fallback to regular useSuspense
    try {
      React.useSuspense();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback suspense');
      onError?.(fallbackErrorObj);
      
      // No fallback available for useSuspense
      // This hook is experimental and may not be available in all React versions
    }
  }
};
