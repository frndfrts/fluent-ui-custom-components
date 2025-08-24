import React from 'react';

/**
 * Custom hook for isomorphic debug values with comprehensive error handling.
 * Provides robust debug value management for external applications.
 */
export const useIsomorphicDebugValue = <T>(
  value: T,
  format?: (value: T) => string,
  onError?: (error: Error) => void
): void => {
  const useIsomorphicDebugValue = typeof window !== 'undefined' ? React.useDebugValue : React.useDebugValue;

  try {
    if (format) {
      useIsomorphicDebugValue(value, format);
    } else {
      useIsomorphicDebugValue(value);
    }
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic debug value');
    onError?.(errorObj);
    
    // Fallback to regular useDebugValue
    if (format) {
      React.useDebugValue(value, format);
    } else {
      React.useDebugValue(value);
    }
  }
};
