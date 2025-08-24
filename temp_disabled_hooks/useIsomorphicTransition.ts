import React from 'react';

/**
 * Custom hook for isomorphic transitions with comprehensive error handling.
 * Provides robust transition management for external applications.
 */
export const useIsomorphicTransition = (onError?: (error: Error) => void): [boolean, React.TransitionStartFunction] => {
  const useIsomorphicTransition = typeof window !== 'undefined' ? React.useTransition : React.useTransition;

  try {
    return useIsomorphicTransition();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic transition');
    onError?.(errorObj);
    
    // Fallback to regular useTransition
    try {
      return React.useTransition();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback transition');
      onError?.(fallbackErrorObj);
      
      // Return a fallback transition state
      const [isPending, startTransition] = React.useState(false);
      const safeStartTransition = React.useCallback((callback: () => void) => {
        try {
          startTransition(true);
          callback();
          startTransition(false);
        } catch (transitionError) {
          const transitionErrorObj = transitionError instanceof Error ? transitionError : new Error('Unknown error in fallback transition callback');
          onError?.(transitionErrorObj);
          startTransition(false);
        }
      }, [onError]);
      
      return [isPending, safeStartTransition];
    }
  }
};
