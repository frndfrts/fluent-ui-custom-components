/**
 * useInputValidation.ts
 * Custom hook for real-time input validation with error handling and user feedback.
 */
import { useState, useCallback, useMemo } from 'react';
import { ValidationOptions, ValidationResult, HexValidationOptions } from '../types/common';
import { validateNumericInput, validateUnit, validateDimension } from '../utils/validation';
import React from 'react'; // Added for useCallback

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

export const useInputValidation = (onError?: (error: Error) => void) => {
  const validateNumericInput = React.useCallback((input: string, options: ValidationOptions = {}): ValidationResult => {
    try {
      const {
        allowNegative = true,
        allowDecimal = true,
        minValue = -Infinity,
        maxValue = Infinity,
        maxDecimalPlaces = 10
      } = options;

      // Check if input is empty
      if (input === '') {
        return { isValid: true, value: '', error: null };
      }

      // Check if input is a valid number
      const num = parseFloat(input);
      if (isNaN(num)) {
        return { isValid: false, value: input, error: 'Input must be a valid number' };
      }

      // Check negative constraint
      if (!allowNegative && num < 0) {
        return { isValid: false, value: input, error: 'Negative values are not allowed' };
      }

      // Check decimal constraint
      if (!allowDecimal && !Number.isInteger(num)) {
        return { isValid: false, value: input, error: 'Decimal values are not allowed' };
      }

      // Check decimal places constraint
      const decimalPlaces = input.includes('.') ? input.split('.')[1].length : 0;
      if (decimalPlaces > maxDecimalPlaces) {
        return { isValid: false, value: input, error: `Maximum ${maxDecimalPlaces} decimal places allowed` };
      }

      // Check value range constraints
      if (num < minValue) {
        return { isValid: false, value: input, error: `Value must be at least ${minValue}` };
      }
      if (num > maxValue) {
        return { isValid: false, value: input, error: `Value must be at most ${maxValue}` };
      }

      return { isValid: true, value: input, error: null };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in numeric input validation');
      onError?.(errorObj);
      return { isValid: false, value: input, error: 'Validation error occurred' };
    }
  }, [onError]);

  const validateHexColor = React.useCallback((input: string, options: HexValidationOptions = {}): ValidationResult => {
    try {
      const { requireHash = true, maxLength = 6 } = options;

      // Check if input is empty
      if (input === '') {
        return { isValid: true, value: '', error: null };
      }

      // Check hash requirement
      if (requireHash && !input.startsWith('#')) {
        return { isValid: false, value: input, error: 'Hex color must start with #' };
      }

      // Remove hash for validation
      const hexValue = input.startsWith('#') ? input.slice(1) : input;

      // Check length
      if (hexValue.length > maxLength) {
        return { isValid: false, value: input, error: `Hex color must be at most ${maxLength} characters` };
      }

      // Check if all characters are valid hex
      if (!/^[0-9A-Fa-f]*$/.test(hexValue)) {
        return { isValid: false, value: input, error: 'Hex color must contain only 0-9, A-F, and a-f' };
      }

      return { isValid: true, value: input, error: null };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hex color validation');
      onError?.(errorObj);
      return { isValid: false, value: input, error: 'Validation error occurred' };
    }
  }, [onError]);

  return {
    validateNumericInput,
    validateHexColor,
  };
};

// Specialized hooks for common input types
export const useNumericValidation = (
  initialValue: number | '',
  options: UseInputValidationOptions = {}
) => {
  const [value, setValueState] = useState<number | ''>(initialValue);
  const [validation, setValidation] = useState<ValidationState>({
    isValid: true,
    error: null,
    isDirty: false,
    isTouched: false,
  });

  const setValue = useCallback((newValue: number | '') => {
    setValueState(newValue);
  }, []);

  const setTouched = useCallback((touched: boolean) => {
    setValidation(prev => ({ ...prev, isTouched: touched }));
  }, []);

  const setDirty = useCallback((dirty: boolean) => {
    setValidation(prev => ({ ...prev, isDirty: dirty }));
  }, []);

  return {
    value,
    setValue,
    validation,
    setTouched,
    setDirty,
  };
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