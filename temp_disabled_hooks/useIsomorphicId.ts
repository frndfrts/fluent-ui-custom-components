import React from 'react';

/**
 * Custom hook for isomorphic IDs with comprehensive error handling.
 * Provides robust ID management for external applications.
 */
export const useIsomorphicId = (onError?: (error: Error) => void): string => {
  const useIsomorphicId = typeof window !== 'undefined' ? React.useId : React.useId;

  try {
    return useIsomorphicId();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic ID creation');
    onError?.(errorObj);
    
    // Fallback to regular useId
    try {
      return React.useId();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback ID creation');
      onError?.(fallbackErrorObj);
      
      // Return a fallback ID
      return `fallback-id-${Math.random().toString(36).substr(2, 9)}`;
    }
  }
};
