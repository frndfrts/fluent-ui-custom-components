import React from 'react';

/**
 * Custom hook for isomorphic form data errors with comprehensive error handling.
 * Provides robust form data error management for external applications.
 */
export const useIsomorphicFormDataError = (onError?: (error: Error) => void): React.FormDataError | null => {
  const useIsomorphicFormDataError = typeof window !== 'undefined' ? React.useFormDataError : React.useFormDataError;

  try {
    return useIsomorphicFormDataError();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form data error');
    onError?.(errorObj);
    
    // Fallback to regular useFormDataError
    try {
      return React.useFormDataError();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form data error');
      onError?.(fallbackErrorObj);
      
      // Return null as fallback
      return null;
    }
  }
};
