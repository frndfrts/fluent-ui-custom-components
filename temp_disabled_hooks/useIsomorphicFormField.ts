import React from 'react';

/**
 * Custom hook for isomorphic form fields with comprehensive error handling.
 * Provides robust form field management for external applications.
 */
export const useIsomorphicFormField = <T>(
  name: string,
  formData: FormData,
  onError?: (error: Error) => void
): [T, (value: T) => void] => {
  const useIsomorphicFormField = typeof window !== 'undefined' ? React.useFormField : React.useFormField;

  try {
    return useIsomorphicFormField(name, formData);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form field');
    onError?.(errorObj);
    
    // Fallback to regular useFormField
    try {
      return React.useFormField(name, formData);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form field');
      onError?.(fallbackErrorObj);
      
      // Return a fallback form field
      const [value, setValue] = React.useState<T>(formData.get(name) as T);
      
      const updateValue = React.useCallback((newValue: T) => {
        try {
          setValue(newValue);
          formData.set(name, newValue as string);
        } catch (updateError) {
          const updateErrorObj = updateError instanceof Error ? updateError : new Error('Unknown error in fallback form field update');
          onError?.(updateErrorObj);
        }
      }, [name, formData, onError]);
      
      return [value, updateValue];
    }
  }
};
