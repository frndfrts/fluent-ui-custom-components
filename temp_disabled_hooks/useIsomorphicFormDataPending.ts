import React from 'react';

/**
 * Custom hook for isomorphic form data pending state with comprehensive error handling.
 * Provides robust form data pending state management for external applications.
 */
export const useIsomorphicFormDataPending = (onError?: (error: Error) => void): boolean => {
  const useIsomorphicFormDataPending = typeof window !== 'undefined' ? React.useFormDataPending : React.useFormDataPending;

  try {
    return useIsomorphicFormDataPending();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form data pending');
    onError?.(errorObj);
    
    // Fallback to regular useFormDataPending
    try {
      return React.useFormDataPending();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form data pending');
      onError?.(fallbackErrorObj);
      
      // Return false as fallback
      return false;
    }
  }
};
