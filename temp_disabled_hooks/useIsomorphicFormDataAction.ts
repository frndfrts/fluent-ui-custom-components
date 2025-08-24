import React from 'react';

/**
 * Custom hook for isomorphic form data actions with comprehensive error handling.
 * Provides robust form data action management for external applications.
 */
export const useIsomorphicFormDataAction = <T>(
  action: (prevState: T, formData: FormData) => Promise<T> | T,
  onError?: (error: Error) => void
): React.FormDataAction<T> => {
  const useIsomorphicFormDataAction = typeof window !== 'undefined' ? React.useFormDataAction : React.useFormDataAction;

  try {
    return useIsomorphicFormDataAction(action);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form data action');
    onError?.(errorObj);
    
    // Fallback to regular useFormDataAction
    try {
      return React.useFormDataAction(action);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form data action');
      onError?.(fallbackErrorObj);
      
      // Return a fallback form data action
      return React.useCallback(async (formData: FormData) => {
        try {
          return await action(undefined as T, formData);
        } catch (actionError) {
          const actionErrorObj = actionError instanceof Error ? actionError : new Error('Unknown error in fallback form data action execution');
          onError?.(actionErrorObj);
          throw actionErrorObj;
        }
      }, [action, onError]);
    }
  }
};
