import React from 'react';

/**
 * Custom hook for isomorphic cache with comprehensive error handling.
 * Provides robust cache management for external applications.
 */
export const useIsomorphicCache = <T>(
  cache: React.Cache<T>,
  onError?: (error: Error) => void
): T => {
  const useIsomorphicCache = typeof window !== 'undefined' ? React.useCache : React.useCache;

  try {
    return useIsomorphicCache(cache);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic cache');
    onError?.(errorObj);
    
    // Fallback to regular useCache
    try {
      return React.useCache(cache);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback cache');
      onError?.(fallbackErrorObj);
      
      // Return the cache as last resort
      return cache;
    }
  }
};
