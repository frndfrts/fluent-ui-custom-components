import React from 'react';

/**
 * Custom hook for isomorphic optimistic updates with comprehensive error handling.
 * Provides robust optimistic update management for external applications.
 */
export const useIsomorphicOptimistic = <T>(
  state: T,
  updateFn: (pending: T) => T,
  onError?: (error: Error) => void
): [T, (action: T | ((pending: T) => T)) => void] => {
  const useIsomorphicOptimistic = typeof window !== 'undefined' ? React.useOptimistic : React.useOptimistic;

  try {
    return useIsomorphicOptimistic(state, updateFn);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic optimistic');
    onError?.(errorObj);
    
    // Fallback to regular useOptimistic
    try {
      return React.useOptimistic(state, updateFn);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback optimistic');
      onError?.(fallbackErrorObj);
      
      // Return a fallback optimistic state
      const [optimisticState, setOptimisticState] = React.useState(state);
      const addOptimistic = React.useCallback((action: T | ((pending: T) => T)) => {
        try {
          if (typeof action === 'function') {
            setOptimisticState((pending) => updateFn(action(pending)));
          } else {
            setOptimisticState(updateFn(action));
          }
        } catch (actionError) {
          const actionErrorObj = actionError instanceof Error ? actionError : new Error('Unknown error in fallback optimistic action');
          onError?.(actionErrorObj);
        }
      }, [updateFn, onError]);
      
      return [optimisticState, addOptimistic];
    }
  }
};
