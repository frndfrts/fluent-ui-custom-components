import React from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

/**
 * Custom hook for form validation with comprehensive error handling.
 * Provides robust validation logic for external applications.
 */
export const useFormValidation = (onError?: (error: Error) => void) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isValid, setIsValid] = React.useState<boolean>(true);

  const validateField = React.useCallback((fieldName: string, value: any, rules: ValidationRule[]) => {
    try {
      const fieldErrors: string[] = [];
      
      rules.forEach(rule => {
        try {
          if (rule.required && (!value || value === '')) {
            fieldErrors.push(rule.message || `${fieldName} is required`);
          }
          
          if (rule.minLength && value && value.length < rule.minLength) {
            fieldErrors.push(rule.message || `${fieldName} must be at least ${rule.minLength} characters`);
          }
          
          if (rule.maxLength && value && value.length > rule.maxLength) {
            fieldErrors.push(rule.message || `${fieldName} must be no more than ${rule.maxLength} characters`);
          }
          
          if (rule.pattern && value && !rule.pattern.test(value)) {
            fieldErrors.push(rule.message || `${fieldName} format is invalid`);
          }
          
          if (rule.custom && !rule.custom(value)) {
            fieldErrors.push(rule.message || `${fieldName} validation failed`);
          }
        } catch (ruleError) {
          const errorObj = ruleError instanceof Error ? ruleError : new Error(`Unknown error in validation rule for ${fieldName}`);
          onError?.(errorObj);
        }
      });
      
      return fieldErrors;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(`Unknown error in field validation for ${fieldName}`);
      onError?.(errorObj);
      return [`Validation error for ${fieldName}`];
    }
  }, [onError]);

  const setFieldError = React.useCallback((fieldName: string, errorMessage: string) => {
    try {
      setErrors(prev => ({ ...prev, [fieldName]: errorMessage }));
      setIsValid(false);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(`Unknown error in setting field error for ${fieldName}`);
      onError?.(errorObj);
    }
  }, [onError]);

  const clearFieldError = React.useCallback((fieldName: string) => {
    try {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
      
      // Check if all errors are cleared
      setErrors(prev => {
        const hasErrors = Object.keys(prev).length > 0;
        setIsValid(!hasErrors);
        return prev;
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(`Unknown error in clearing field error for ${fieldName}`);
      onError?.(errorObj);
    }
  }, [onError]);

  const clearAllErrors = React.useCallback(() => {
    try {
      setErrors({});
      setIsValid(true);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in clearing all errors');
      onError?.(errorObj);
    }
  }, [onError]);

  const validateForm = React.useCallback((formData: Record<string, any>, validationSchema: Record<string, ValidationRule[]>) => {
    try {
      const newErrors: Record<string, string> = {};
      let formIsValid = true;
      
      Object.keys(validationSchema).forEach(fieldName => {
        try {
          const fieldErrors = validateField(fieldName, formData[fieldName], validationSchema[fieldName]);
          if (fieldErrors.length > 0) {
            newErrors[fieldName] = fieldErrors[0]; // Take first error
            formIsValid = false;
          }
        } catch (fieldError) {
          const errorObj = fieldError instanceof Error ? fieldError : new Error(`Unknown error in form validation for field ${fieldName}`);
          onError?.(errorObj);
          newErrors[fieldName] = 'Validation error';
          formIsValid = false;
        }
      });
      
      setErrors(newErrors);
      setIsValid(formIsValid);
      return formIsValid;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in form validation');
      onError?.(errorObj);
      return false;
    }
  }, [validateField, onError]);

  return {
    errors,
    isValid,
    validateField,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    validateForm,
  };
};



