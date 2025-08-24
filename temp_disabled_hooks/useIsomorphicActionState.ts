import React from 'react';

/**
 * Custom hook for isomorphic action state with comprehensive error handling.
 * Provides robust action state management for external applications.
 */
export const useIsomorphicActionState = <T, P>(
  action: (prevState: T, formData: P) => Promise<T> | T,
  initialState: T,
  initialActionState?: React.ActionState<T, P>,
  onError?: (error: Error) => void
): [T, React.ActionState<T, P>, (formData: P) => void] => {
  const useIsomorphicActionState = typeof window !== 'undefined' ? React.useActionState : React.useActionState;

  try {
    if (initialActionState) {
      return useIsomorphicActionState(action, initialState, initialActionState);
    }
    return useIsomorphicActionState(action, initialState);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic action state');
    onError?.(errorObj);
    
    // Fallback to regular useActionState
    try {
      if (initialActionState) {
        return React.useActionState(action, initialState, initialActionState);
      }
      return React.useActionState(action, initialState);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback action state');
      onError?.(fallbackErrorObj);
      
      // Return a fallback action state
      const [state, setState] = React.useState(initialState);
      const [actionState, setActionState] = React.useState<React.ActionState<T, P>>({
        pending: false,
        data: undefined,
        error: undefined,
      });
      
      const dispatch = React.useCallback(async (formData: P) => {
        try {
          setActionState(prev => ({ ...prev, pending: true, error: undefined }));
          const result = await action(state, formData);
          setState(result);
          setActionState(prev => ({ ...prev, pending: false, data: result }));
        } catch (actionError) {
          const actionErrorObj = actionError instanceof Error ? actionError : new Error('Unknown error in fallback action');
          setActionState(prev => ({ ...prev, pending: false, error: actionErrorObj }));
          onError?.(actionErrorObj);
        }
      }, [action, state, onError]);
      
      return [state, actionState, dispatch];
    }
  }
};
