import React from 'react';

/**
 * Custom hook for isomorphic form data fields with comprehensive error handling.
 * Provides robust form data field management for external applications.
 */
export const useIsomorphicFormDataField = <T>(
  name: string,
  formData: FormData,
  onError?: (error: Error) => void
): [T, (value: T) => void] => {
  const useIsomorphicFormDataField = typeof window !== 'undefined' ? React.useFormDataField : React.useFormDataField;

  try {
    return useIsomorphicFormDataField(name, formData);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic form data field');
    onError?.(errorObj);
    
    // Fallback to regular useFormDataField
    try {
      return React.useFormDataField(name, formData);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback form data field');
      onError?.(fallbackErrorObj);
      
      // Return a fallback form data field
      const [value, setValue] = React.useState<T>(formData.get(name) as T);
      
      const updateValue = React.useCallback((newValue: T) => {
        try {
          setValue(newValue);
          formData.set(name, newValue as string);
        } catch (updateError) {
          const updateErrorObj = updateError instanceof Error ? updateError : new Error('Unknown error in fallback form data field update');
          onError?.(updateErrorObj);
        }
      }, [name, formData, onError]);
      
      return [value, updateValue];
    }
  }
};
