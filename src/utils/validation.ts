/**
 * validation.ts
 * Centralized validation utilities for consistent input validation across components.
 */
import { ValidationOptions, ValidationResult } from '../types/common';

export const validateNumericInput = (input: string, options: ValidationOptions): ValidationResult => {
  const { min, max, nonNegative, allowEmpty } = options;
  
  if (allowEmpty && input === '') {
    return { isValid: true, value: '', error: null };
  }
  
  const num = parseFloat(input);
  if (isNaN(num)) {
    return { isValid: false, value: null, error: 'Invalid number' };
  }
  
  if (nonNegative && num < 0) {
    return { isValid: false, value: null, error: 'Value must be non-negative' };
  }
  
  if (min !== undefined && num < min) {
    return { isValid: false, value: null, error: `Value must be at least ${min}` };
  }
  
  if (max !== undefined && num > max) {
    return { isValid: false, value: null, error: `Value must be at most ${max}` };
  }
  
  return { isValid: true, value: num, error: null };
};

export const validateUnit = (unit: string, allowedUnits: string[]): ValidationResult => {
  if (!allowedUnits.includes(unit)) {
    return { isValid: false, value: null, error: `Invalid unit: ${unit}` };
  }
  
  return { isValid: true, value: unit, error: null };
};

// Extended validation result for dimension validation
export interface DimensionValidationResult {
  isValid: boolean;
  value: { value: number | string; unit: string } | null;
  error: string | null;
}

export const validateDimension = (
  value: number | '', 
  unit: string, 
  units: string[], 
  options: ValidationOptions
): DimensionValidationResult => {
  // Validate the numeric value
  const numericValidation = validateNumericInput(
    typeof value === 'number' ? value.toString() : value, 
    options
  );
  
  if (!numericValidation.isValid) {
    return { isValid: false, value: null, error: numericValidation.error };
  }
  
  // Validate the unit
  const unitValidation = validateUnit(unit, units);
  if (!unitValidation.isValid) {
    return { isValid: false, value: null, error: unitValidation.error };
  }
  
  // Ensure we have valid values before creating the result
  if (numericValidation.value === null || unitValidation.value === null) {
    return { isValid: false, value: null, error: 'Invalid validation result' };
  }
  
  return { 
    isValid: true, 
    value: { 
      value: numericValidation.value, 
      unit: unitValidation.value as string 
    }, 
    error: null 
  };
};

export const clampValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const formatNumber = (value: number, decimalPlaces: number): string => {
  return value.toFixed(decimalPlaces);
};

export const parseNumber = (input: string): number | null => {
  const parsed = parseFloat(input);
  return isNaN(parsed) ? null : parsed;
}; 