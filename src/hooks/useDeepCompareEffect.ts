import React from 'react';

/**
 * Custom hook for deep comparison effects with comprehensive error handling.
 * Provides robust deep comparison effect management for external applications.
 */
export const useDeepCompareEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList,
  onError?: (error: Error) => void
) => {
  const depsRef = React.useRef<React.DependencyList>();

  const isEqual = React.useCallback((deps1: React.DependencyList, deps2: React.DependencyList): boolean => {
    try {
      if (deps1 === deps2) return true;
      if (deps1.length !== deps2.length) return false;

      for (let i = 0; i < deps1.length; i++) {
        try {
          if (deps1[i] !== deps2[i]) {
            // Deep comparison for objects
            if (typeof deps1[i] === 'object' && deps1[i] !== null &&
                typeof deps2[i] === 'object' && deps2[i] !== null) {
              try {
                if (JSON.stringify(deps1[i]) !== JSON.stringify(deps2[i])) {
                  return false;
                }
              } catch (jsonError) {
                // If JSON.stringify fails, fall back to reference equality
                if (deps1[i] !== deps2[i]) {
                  return false;
                }
              }
            } else {
              return false;
            }
          }
        } catch (itemError) {
          const errorObj = itemError instanceof Error ? itemError : new Error(`Unknown error comparing dependency item ${i}`);
          onError?.(errorObj);
          return false;
        }
      }

      return true;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in deep comparison');
      onError?.(errorObj);
      return false;
    }
  }, [onError]);

  React.useEffect(() => {
    try {
      if (!depsRef.current || !isEqual(depsRef.current, deps)) {
        depsRef.current = deps;
        
        try {
          return effect();
        } catch (effectError) {
          const errorObj = effectError instanceof Error ? effectError : new Error('Unknown error in deep compare effect');
          onError?.(errorObj);
        }
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in deep compare effect setup');
      onError?.(errorObj);
    }
  }, [effect, deps, isEqual, onError]);
};
