import React from 'react';

/**
 * Custom hook for isomorphic deferred values with comprehensive error handling.
 * Provides robust deferred value management for external applications.
 */
export const useIsomorphicDeferredValue = <T>(
  value: T,
  onError?: (error: Error) => void
): T => {
  const useIsomorphicDeferredValue = typeof window !== 'undefined' ? React.useDeferredValue : React.useDeferredValue;

  try {
    return useIsomorphicDeferredValue(value);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic deferred value');
    onError?.(errorObj);
    
    // Fallback to regular useDeferredValue
    try {
      return React.useDeferredValue(value);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback deferred value');
      onError?.(fallbackErrorObj);
      
      // Return the original value as last resort
      return value;
    }
  }
};
