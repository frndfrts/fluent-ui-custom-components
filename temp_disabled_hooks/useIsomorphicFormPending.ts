import React from 'react';

/**
 * Custom hook for isomorphic form pending state with comprehensive error handling.
 * Provides robust form pending state management for external applications.
 */
export const useIsomorphicFormPending = (onError?: (error: Error) => void): boolean => {
  const useIsomorphicFormPending = typeof window !== 'undefined' ? React.useFormPending : React.useFormPending;

  try {
    return useIsomorphicFormPending();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form pending');
    onError?.(errorObj);
    
    // Fallback to regular useFormPending
    try {
      return React.useFormPending();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form pending');
      onError?.(fallbackErrorObj);
      
      // Return false as fallback
      return false;
    }
  }
};
