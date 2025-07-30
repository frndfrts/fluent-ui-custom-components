/**
 * useInputValidation.ts
 * Custom hook for real-time input validation with error handling and user feedback.
 */
import { useState, useCallback, useMemo } from 'react';
import { ValidationOptions, ValidationResult } from '../types/common';
import { validateNumericInput, validateUnit, validateDimension } from '../utils/validation';

export interface ValidationState {
  isValid: boolean;
  error: string | null;
  isDirty: boolean;
  isTouched: boolean;
}

export interface UseInputValidationOptions extends ValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
  debounceMs?: number;
}

export interface UseInputValidationReturn<T> {
  value: T;
  setValue: (value: T) => void;
  validation: ValidationState;
  validate: () => ValidationResult;
  reset: () => void;
  setTouched: (touched: boolean) => void;
  setDirty: (dirty: boolean) => void;
}

export const useInputValidation = <T>(
  initialValue: T,
  options: UseInputValidationOptions = {}
): UseInputValidationReturn<T> => {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    validateOnMount = false,
    debounceMs = 0,
    ...validationOptions
  } = options;

  const [value, setValueState] = useState<T>(initialValue);
  const [validation, setValidation] = useState<ValidationState>({
    isValid: true,
    error: null,
    isDirty: false,
    isTouched: false,
  });

  // Debounced validation
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const clearDebounce = useCallback(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      setDebounceTimeout(null);
    }
  }, [debounceTimeout]);

  const debouncedValidate = useCallback((newValue: T) => {
    clearDebounce();
    
    if (debounceMs > 0) {
      const timeout = setTimeout(() => {
        const result = validateValue(newValue);
        setValidation(prev => ({
          ...prev,
          isValid: result.isValid,
          error: result.error,
        }));
      }, debounceMs);
      setDebounceTimeout(timeout);
    } else {
      const result = validateValue(newValue);
      setValidation(prev => ({
        ...prev,
        isValid: result.isValid,
        error: result.error,
      }));
    }
  }, [debounceMs, clearDebounce]);

  // Validation function based on value type
  const validateValue = useCallback((val: T): ValidationResult => {
    if (typeof val === 'string') {
      return validateNumericInput(val, validationOptions);
    }
    
    // For other types, return valid by default
    return { isValid: true, value: val as string | number | null, error: null };
  }, [validationOptions]);

  // Set value with optional validation
  const setValue = useCallback((newValue: T) => {
    setValueState(newValue);
    
    if (validateOnChange) {
      debouncedValidate(newValue);
    }
    
    setValidation(prev => ({
      ...prev,
      isDirty: true,
    }));
  }, [validateOnChange, debouncedValidate]);

  // Manual validation
  const validate = useCallback((): ValidationResult => {
    const result = validateValue(value);
    setValidation(prev => ({
      ...prev,
      isValid: result.isValid,
      error: result.error,
    }));
    return result;
  }, [value, validateValue]);

  // Reset validation state
  const reset = useCallback(() => {
    setValueState(initialValue);
    setValidation({
      isValid: true,
      error: null,
      isDirty: false,
      isTouched: false,
    });
    clearDebounce();
  }, [initialValue, clearDebounce]);

  // Set touched state
  const setTouched = useCallback((touched: boolean) => {
    setValidation(prev => ({ ...prev, isTouched: touched }));
    
    if (touched && validateOnBlur) {
      validate();
    }
  }, [validateOnBlur, validate]);

  // Set dirty state
  const setDirty = useCallback((dirty: boolean) => {
    setValidation(prev => ({ ...prev, isDirty: dirty }));
  }, []);

  // Validate on mount if enabled
  useMemo(() => {
    if (validateOnMount) {
      validate();
    }
  }, [validateOnMount, validate]);

  // Cleanup debounce on unmount
  useMemo(() => {
    return () => {
      clearDebounce();
    };
  }, [clearDebounce]);

  return {
    value,
    setValue,
    validation,
    validate,
    reset,
    setTouched,
    setDirty,
  };
};

// Specialized hooks for common input types
export const useNumericValidation = (
  initialValue: number | '',
  options: UseInputValidationOptions = {}
) => {
  return useInputValidation<number | ''>(initialValue, options);
};

export const useUnitValidation = (
  initialValue: string,
  allowedUnits: string[],
  options: UseInputValidationOptions = {}
) => {
  const [value, setValueState] = useState<string>(initialValue);
  const [validation, setValidation] = useState<ValidationState>({
    isValid: true,
    error: null,
    isDirty: false,
    isTouched: false,
  });

  const validateUnitValue = useCallback((unit: string): ValidationResult => {
    return validateUnit(unit, allowedUnits);
  }, [allowedUnits]);

  const setValue = useCallback((newValue: string) => {
    setValueState(newValue);
    
    if (options.validateOnChange !== false) {
      const result = validateUnitValue(newValue);
      setValidation(prev => ({
        ...prev,
        isValid: result.isValid,
        error: result.error,
        isDirty: true,
      }));
    }
  }, [validateUnitValue, options.validateOnChange]);

  const validate = useCallback((): ValidationResult => {
    const result = validateUnitValue(value);
    setValidation(prev => ({
      ...prev,
      isValid: result.isValid,
      error: result.error,
    }));
    return result;
  }, [value, validateUnitValue]);

  const reset = useCallback(() => {
    setValueState(initialValue);
    setValidation({
      isValid: true,
      error: null,
      isDirty: false,
      isTouched: false,
    });
  }, [initialValue]);

  return {
    value,
    setValue,
    validation,
    validate,
    reset,
    setTouched: (touched: boolean) => setValidation(prev => ({ ...prev, isTouched: touched })),
    setDirty: (dirty: boolean) => setValidation(prev => ({ ...prev, isDirty: dirty })),
  };
}; 