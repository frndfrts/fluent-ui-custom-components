/**
 * useUnitConversion.ts
 * Custom hook for converting between units while maintaining cm as internal storage.
 */
import React from 'react';

export type Unit = 'cm' | 'mm' | 'in' | 'px' | 'pt' | '%';

// Conversion factors from cm to other units
const UNIT_CONVERSIONS: Record<Unit, number> = {
  'cm': 1,
  'mm': 10,
  'in': 1 / 2.54,
  'px': 37.795275591, // 1 cm = 37.795275591 pixels (96 DPI)
  'pt': 28.346456693, // 1 cm = 28.346456693 points (72 DPI)
  '%': 1, // Percentage is relative, handled separately
};

// Conversion factors from other units to cm
const REVERSE_CONVERSIONS: Record<Unit, number> = {
  'cm': 1,
  'mm': 0.1,
  'in': 2.54,
  'px': 1 / 37.795275591,
  'pt': 1 / 28.346456693,
  '%': 1, // Percentage is relative, handled separately
};

// Helper function to get decimal places (not a hook)
const getDecimalPlaces = (unit: Unit): number => {
  switch (unit) {
    case 'px':
    case 'pt':
      return 0; // Pixels and points are typically whole numbers
    case 'in':
    case 'cm':
      return 2; // Inches and centimeters typically shown with 2 decimal places
    case 'mm':
      return 1; // Millimeters typically shown with 1 decimal place
    case '%':
      return 1; // Percentages typically shown with 1 decimal place
    default:
      return 2; // Default fallback
  }
};

export interface UnitConversionState {
  // Convert cm value to display value in target unit
  cmToDisplay: (cmValue: number, targetUnit: Unit) => number;
  // Convert display value in source unit to cm
  displayToCm: (displayValue: number, sourceUnit: Unit) => number;
  // Format display value with appropriate decimal places
  formatDisplayValue: (cmValue: number, targetUnit: Unit) => string;
  // Get conversion factor from cm to target unit
  getConversionFactor: (targetUnit: Unit) => number;
  // Get reverse conversion factor from source unit to cm
  getReverseConversionFactor: (sourceUnit: Unit) => number;
}

export const useUnitConversion = (onError?: (error: Error) => void) => {
  const cmToDisplay = React.useCallback((cmValue: number, targetUnit: Unit): number => {
    try {
      switch (targetUnit) {
        case 'px':
          return Math.round(cmValue * 37.7952755906); // 1 cm = 37.7952755906 px
        case 'pt':
          return Math.round(cmValue * 28.3464566929); // 1 cm = 28.3464566929 pt
        case 'mm':
          return Math.round(cmValue * 10); // 1 cm = 10 mm
        case 'in':
          return Math.round(cmValue * 0.3937007874 * 100) / 100; // 1 cm = 0.3937007874 in
        case '%':
          return Math.round(cmValue * 100) / 100; // Keep as is for percentage
        default:
          return cmValue; // Default to cm
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in cm to display conversion');
      onError?.(errorObj);
      return cmValue; // Return original value on error
    }
  }, [onError]);

  const displayToCm = React.useCallback((displayValue: number, sourceUnit: Unit): number => {
    try {
      switch (sourceUnit) {
        case 'px':
          return displayValue / 37.7952755906; // 1 px = 0.0264583333 cm
        case 'pt':
          return displayValue / 28.3464566929; // 1 pt = 0.0352777778 cm
        case 'mm':
          return displayValue / 10; // 1 mm = 0.1 cm
        case 'in':
          return displayValue * 2.54; // 1 in = 2.54 cm
        case '%':
          return displayValue; // Keep as is for percentage
        default:
          return displayValue; // Default to cm
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in display to cm conversion');
      onError?.(errorObj);
      return displayValue; // Return original value on error
    }
  }, [onError]);

  return {
    cmToDisplay,
    displayToCm,
  };
}; 