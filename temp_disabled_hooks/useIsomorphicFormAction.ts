import React from 'react';

/**
 * Custom hook for isomorphic form actions with comprehensive error handling.
 * Provides robust form action management for external applications.
 */
export const useIsomorphicFormAction = <T>(
  action: (prevState: T, formData: FormData) => Promise<T> | T,
  onError?: (error: Error) => void
): React.FormAction<T> => {
  const useIsomorphicFormAction = typeof window !== 'undefined' ? React.useFormAction : React.useFormAction;

  try {
    return useIsomorphicFormAction(action);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form action');
    onError?.(errorObj);
    
    // Fallback to regular useFormAction
    try {
      return React.useFormAction(action);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form action');
      onError?.(fallbackErrorObj);
      
      // Return a fallback form action
      return React.useCallback(async (formData: FormData) => {
        try {
          return await action(undefined as T, formData);
        } catch (actionError) {
          const actionErrorObj = actionError instanceof Error ? actionError : new Error('Unknown error in fallback form action execution');
          onError?.(actionErrorObj);
          throw actionErrorObj;
        }
      }, [action, onError]);
    }
  }
};
