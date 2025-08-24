import React from 'react';

/**
 * Custom hook for update effects with comprehensive error handling.
 * Provides robust update effect management for external applications.
 */
export const useUpdateEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList,
  onError?: (error: Error) => void
) => {
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    try {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      try {
        return effect();
      } catch (effectError) {
        const errorObj = effectError instanceof Error ? effectError : new Error('Unknown error in update effect');
        onError?.(errorObj);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in update effect setup');
      onError?.(errorObj);
    }
  }, deps);
};
