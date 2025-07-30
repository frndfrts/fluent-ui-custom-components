/**
 * useUnitConversion.ts
 * Custom hook for converting between units while maintaining cm as internal storage.
 */
import { useMemo } from 'react';

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

export const useUnitConversion = (): UnitConversionState => {
  // Convert cm value to display value in target unit
  const cmToDisplay = useMemo(() => {
    return (cmValue: number, targetUnit: Unit): number => {
      if (targetUnit === '%') {
        // For percentage, we need a reference value (e.g., parent container)
        // For now, return the cm value as-is, but this could be enhanced
        return cmValue;
      }
      
      const conversionFactor = UNIT_CONVERSIONS[targetUnit];
      return cmValue * conversionFactor;
    };
  }, []);

  // Convert display value in source unit to cm
  const displayToCm = useMemo(() => {
    return (displayValue: number, sourceUnit: Unit): number => {
      if (sourceUnit === '%') {
        // For percentage, we need a reference value
        // For now, return the display value as-is, but this could be enhanced
        return displayValue;
      }
      
      const conversionFactor = REVERSE_CONVERSIONS[sourceUnit];
      return displayValue * conversionFactor;
    };
  }, []);

  // Format display value with appropriate decimal places
  const formatDisplayValue = useMemo(() => {
    return (cmValue: number, targetUnit: Unit): string => {
      const displayValue = cmToDisplay(cmValue, targetUnit);
      const decimalPlaces = getDecimalPlaces(targetUnit);
      return displayValue.toFixed(decimalPlaces);
    };
  }, [cmToDisplay]);

  // Get conversion factor from cm to target unit
  const getConversionFactor = useMemo(() => {
    return (targetUnit: Unit): number => {
      return UNIT_CONVERSIONS[targetUnit];
    };
  }, []);

  // Get reverse conversion factor from source unit to cm
  const getReverseConversionFactor = useMemo(() => {
    return (sourceUnit: Unit): number => {
      return REVERSE_CONVERSIONS[sourceUnit];
    };
  }, []);

  return {
    cmToDisplay,
    displayToCm,
    formatDisplayValue,
    getConversionFactor,
    getReverseConversionFactor,
  };
}; 