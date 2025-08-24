import React from 'react';

/**
 * Custom hook for isomorphic form errors with comprehensive error handling.
 * Provides robust form error management for external applications.
 */
export const useIsomorphicFormError = (onError?: (error: Error) => void): React.FormError | null => {
  const useIsomorphicFormError = typeof window !== 'undefined' ? React.useFormError : React.useFormError;

  try {
    return useIsomorphicFormError();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form error');
    onError?.(errorObj);
    
    // Fallback to regular useFormError
    try {
      return React.useFormError();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form error');
      onError?.(fallbackErrorObj);
      
      // Return null as fallback
      return null;
    }
  }
};
