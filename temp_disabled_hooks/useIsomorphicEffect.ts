import React from 'react';

/**
 * Custom hook for isomorphic effects with comprehensive error handling.
 * Provides robust effect management for external applications.
 */
export const useIsomorphicEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList,
  onError?: (error: Error) => void
) => {
  const useIsomorphicEffect = typeof window !== 'undefined' ? React.useEffect : React.useEffect;

  useIsomorphicEffect(() => {
    try {
      return effect();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic effect');
      onError?.(errorObj);
    }
  }, deps);
};
