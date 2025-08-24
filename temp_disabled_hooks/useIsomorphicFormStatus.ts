import React from 'react';

/**
 * Custom hook for isomorphic form status with comprehensive error handling.
 * Provides robust form status management for external applications.
 */
export const useIsomorphicFormStatus = (onError?: (error: Error) => void): React.FormStatus => {
  const useIsomorphicFormStatus = typeof window !== 'undefined' ? React.useFormStatus : React.useFormStatus;

  try {
    return useIsomorphicFormStatus();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form status');
    onError?.(errorObj);
    
    // Fallback to regular useFormStatus
    try {
      return React.useFormStatus();
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form status');
      onError?.(fallbackErrorObj);
      
      // Return a fallback form status
      return {
        pending: false,
        data: undefined,
        method: undefined,
        action: undefined,
      };
    }
  }
};
