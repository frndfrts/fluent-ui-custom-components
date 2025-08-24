import React from 'react';

/**
 * Custom hook for isomorphic insertion effects with comprehensive error handling.
 * Provides robust insertion effect management for external applications.
 */
export const useIsomorphicInsertionEffect = (
  effect: React.InsertionEffect,
  deps?: React.DependencyList,
  onError?: (error: Error) => void
): void => {
  const useIsomorphicInsertionEffect = typeof window !== 'undefined' ? React.useInsertionEffect : React.useInsertionEffect;

  try {
    if (deps) {
      useIsomorphicInsertionEffect(effect, deps);
    } else {
      useIsomorphicInsertionEffect(effect);
    }
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic insertion effect');
    onError?.(errorObj);
    
    // Fallback to regular useInsertionEffect
    try {
      if (deps) {
        React.useInsertionEffect(effect, deps);
      } else {
        React.useInsertionEffect(effect);
      }
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback insertion effect');
      onError?.(fallbackErrorObj);
      
      // Fallback to useEffect as last resort
      try {
        if (deps) {
          React.useEffect(effect, deps);
        } else {
          React.useEffect(effect);
        }
      } catch (useEffectError) {
        const useEffectErrorObj = useEffectError instanceof Error ? useEffectError : new Error('Unknown error in useEffect fallback');
        onError?.(useEffectErrorObj);
      }
    }
  }
};
