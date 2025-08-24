import React from 'react';

/**
 * Custom hook for isomorphic form data with comprehensive error handling.
 * Provides robust form data management for external applications.
 */
export const useIsomorphicFormData = (onError?: (error: Error) => void): React.FormData => {
  const useIsomorphicFormData = typeof window !== 'undefined' ? React.useFormData : React.useFormData;

  try {
    return useIsomorphicFormData();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form data');
    onError?.(errorObj);
    
    // Fallback to regular useFormData
    try {
      return React.useFormData();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form data');
      onError?.(fallbackErrorObj);
      
      // Return a fallback form data
      return new FormData();
    }
  }
};
