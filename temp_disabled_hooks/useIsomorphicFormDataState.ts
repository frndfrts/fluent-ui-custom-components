import React from 'react';

/**
 * Custom hook for isomorphic form data state with comprehensive error handling.
 * Provides robust form data state management for external applications.
 */
export const useIsomorphicFormDataState = <T>(
  action: (prevState: T, formData: FormData) => Promise<T> | T,
  initialState: T,
  onError?: (error: Error) => void
): [T, React.FormDataState<T>, (formData: FormData) => void] => {
  const useIsomorphicFormDataState = typeof window !== 'undefined' ? React.useFormDataState : React.useFormDataState;

  try {
    return useIsomorphicFormDataState(action, initialState);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form data state');
    onError?.(errorObj);
    
    // Fallback to regular useFormDataState
    try {
      return React.useFormDataState(action, initialState);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form data state');
      onError?.(fallbackErrorObj);
      
      // Return a fallback form data state
      const [state, setState] = React.useState(initialState);
      const [formDataState, setFormDataState] = React.useState<React.FormDataState<T>>({
        pending: false,
        data: undefined,
        error: undefined,
      });
      
      const dispatch = React.useCallback(async (formData: FormData) => {
        try {
          setFormDataState(prev => ({ ...prev, pending: true, error: undefined }));
          const result = await action(state, formData);
          setState(result);
          setFormDataState(prev => ({ ...prev, pending: false, data: result }));
        } catch (actionError) {
          const actionErrorObj = actionError instanceof Error ? actionError : new Error('Unknown error in fallback form data action');
          setFormDataState(prev => ({ ...prev, pending: false, error: actionErrorObj }));
          onError?.(actionErrorObj);
        }
      }, [action, state, onError]);
      
      return [state, formDataState, dispatch];
    }
  }
};
