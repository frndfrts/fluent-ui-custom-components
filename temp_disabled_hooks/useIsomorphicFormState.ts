import React from 'react';

/**
 * Custom hook for isomorphic form state with comprehensive error handling.
 * Provides robust form state management for external applications.
 */
export const useIsomorphicFormState = <T>(
  action: (prevState: T, formData: FormData) => Promise<T> | T,
  initialState: T,
  onError?: (error: Error) => void
): [T, React.FormState<T>, (formData: FormData) => void] => {
  const useIsomorphicFormState = typeof window !== 'undefined' ? React.useFormState : React.useFormState;

  try {
    return useIsomorphicFormState(action, initialState);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form state');
    onError?.(errorObj);
    
    // Fallback to regular useFormState
    try {
      return React.useFormState(action, initialState);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form state');
      onError?.(fallbackErrorObj);
      
      // Return a fallback form state
      const [state, setState] = React.useState(initialState);
      const [formState, setFormState] = React.useState<React.FormState<T>>({
        pending: false,
        data: undefined,
        error: undefined,
      });
      
      const dispatch = React.useCallback(async (formData: FormData) => {
        try {
          setFormState(prev => ({ ...prev, pending: true, error: undefined }));
          const result = await action(state, formData);
          setState(result);
          setFormState(prev => ({ ...prev, pending: false, data: result }));
        } catch (actionError) {
          const actionErrorObj = actionError instanceof Error ? actionError : new Error('Unknown error in fallback form action');
          setFormState(prev => ({ ...prev, pending: false, error: actionErrorObj }));
          onError?.(actionErrorObj);
        }
      }, [action, state, onError]);
      
      return [state, formState, dispatch];
    }
  }
};
