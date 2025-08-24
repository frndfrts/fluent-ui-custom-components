import React from 'react';

/**
 * Custom hook for isomorphic layout effects with comprehensive error handling.
 * Provides robust layout effect management for external applications.
 */
export const useIsomorphicLayoutEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList,
  onError?: (error: Error) => void
) => {
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    try {
      return effect();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic layout effect');
      onError?.(errorObj);
    }
  }, deps);
};
