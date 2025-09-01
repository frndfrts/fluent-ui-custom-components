/**
 * useUnitConversion.ts
 * Enhanced custom hook for converting between units while maintaining cm as internal storage.
 * Now supports context-aware percentage calculations and unit-specific step values.
 */
import React from 'react';

export type Unit = 'cm' | 'mm' | 'in' | 'px' | 'pt' | '%' | 'vw' | 'vh' | 'em' | 'rem';

// Unit-specific step values for precise control
export const UNIT_STEPS: Record<Unit, number> = {
  'px': 1,      // Whole pixels
  'pt': 1,      // Whole points
  'mm': 0.1,    // 0.1mm precision
  'cm': 0.01,   // 0.01cm precision
  'in': 0.001,  // 0.001in precision
  '%': 0.1,     // 0.1% precision
  'vw': 0.1,    // 0.1vw precision
  'vh': 0.1,    // 0.1vh precision
  'em': 0.01,   // 0.01em precision
  'rem': 0.01,  // 0.01rem precision
};

// Conversion factors from cm to other units (high precision)
const UNIT_CONVERSIONS: Record<Unit, number> = {
  'cm': 1,
  'mm': 10,
  'in': 1 / 2.54,
  'px': 37.795275591, // 1 cm = 37.795275591 pixels (96 DPI)
  'pt': 28.346456693, // 1 cm = 28.346456693 points (72 DPI)
  '%': 1, // Percentage is relative, handled separately
  'vw': 1, // Viewport width is relative, handled separately
  'vh': 1, // Viewport height is relative, handled separately
  'em': 1, // Em is relative, handled separately
  'rem': 1, // Rem is relative, handled separately
};

// Conversion factors from other units to cm (high precision)
const REVERSE_CONVERSIONS: Record<Unit, number> = {
  'cm': 1,
  'mm': 0.1,
  'in': 2.54,
  'px': 1 / 37.795275591,
  'pt': 1 / 28.346456693,
  '%': 1, // Percentage is relative, handled separately
  'vw': 1, // Viewport width is relative, handled separately
  'vh': 1, // Viewport height is relative, handled separately
  'em': 1, // Em is relative, handled separately
  'rem': 1, // Rem is relative, handled separately
};

// Context for relative unit calculations
export interface UnitConversionContext {
  referenceWidth?: number;   // For percentage calculations (in cm)
  referenceHeight?: number;  // For percentage calculations (in cm)
  containerWidth?: number;   // For viewport-relative units (in cm)
  containerHeight?: number;  // For viewport-relative units (in cm)
  fontSize?: number;         // For em calculations (in cm)
  rootFontSize?: number;     // For rem calculations (in cm)
}



export interface UnitConversionState {
  // Convert cm value to display value in target unit
  cmToDisplay: (cmValue: number, targetUnit: Unit, context?: UnitConversionContext) => number;
  // Convert display value in source unit to cm
  displayToCm: (displayValue: number, sourceUnit: Unit, context?: UnitConversionContext) => number;
  // Format display value with appropriate decimal places
  formatDisplayValue: (cmValue: number, targetUnit: Unit, context?: UnitConversionContext) => string;
  // Get step value for the specified unit
  getStepValue: (unit: Unit) => number;
  // Get decimal places for the specified unit
  getDecimalPlaces: (unit: Unit) => number;
  // Get conversion factor from cm to target unit
  getConversionFactor: (targetUnit: Unit) => number;
  // Get reverse conversion factor from source unit to cm
  getReverseConversionFactor: (sourceUnit: Unit) => number;
  // Validate if context is sufficient for unit conversion
  validateContext: (unit: Unit, context?: UnitConversionContext) => boolean;
}

export const useUnitConversion = (onError?: (error: Error) => void) => {
  const cmToDisplay = React.useCallback((cmValue: number, targetUnit: Unit, context?: UnitConversionContext): number => {
    try {
      switch (targetUnit) {
        case 'px':
          return Math.round(cmValue * 37.7952755906); // 1 cm = 37.7952755906 px
        case 'pt':
          return Math.round(cmValue * 28.3464566929); // 1 cm = 28.3464566929 pt
        case 'mm':
          return Math.round(cmValue * 10 * 10) / 10; // 1 cm = 10 mm, with 1 decimal place
        case 'in':
          return Math.round(cmValue * 0.3937007874 * 1000) / 1000; // 1 cm = 0.3937007874 in, with 3 decimal places
        case '%':
          // Percentage requires reference context
          if (!context?.referenceWidth && !context?.referenceHeight) {
            throw new Error('Reference dimensions required for percentage conversion');
          }
          const reference = context.referenceWidth || context.referenceHeight;
          if (reference === undefined) {
            throw new Error('Reference dimensions required for percentage conversion');
          }
          return Math.round((cmValue / reference) * 100 * 10) / 10; // 1 decimal place
        case 'vw':
          // Viewport width percentage
          if (!context?.containerWidth) {
            throw new Error('Container width required for vw conversion');
          }
          return Math.round((cmValue / context.containerWidth) * 100 * 10) / 10;
        case 'vh':
          // Viewport height percentage
          if (!context?.containerHeight) {
            throw new Error('Container height required for vh conversion');
          }
          return Math.round((cmValue / context.containerHeight) * 100 * 10) / 10;
        case 'em':
          // Em relative to font size
          if (!context?.fontSize) {
            throw new Error('Font size required for em conversion');
          }
          return Math.round((cmValue / context.fontSize) * 100) / 100;
        case 'rem':
          // Rem relative to root font size
          if (!context?.rootFontSize) {
            throw new Error('Root font size required for rem conversion');
          }
          return Math.round((cmValue / context.rootFontSize) * 100) / 100;
        default:
          return cmValue; // Default to cm
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in cm to display conversion');
      onError?.(errorObj);
      return cmValue; // Return original value on error
    }
  }, [onError]);

  const displayToCm = React.useCallback((displayValue: number, sourceUnit: Unit, context?: UnitConversionContext): number => {
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
          // Percentage requires reference context
          if (!context?.referenceWidth && !context?.referenceHeight) {
            throw new Error('Reference dimensions required for percentage conversion');
          }
          const reference = context.referenceWidth || context.referenceHeight;
          if (reference === undefined) {
            throw new Error('Reference dimensions required for percentage conversion');
          }
          return (displayValue / 100) * reference;
        case 'vw':
          // Viewport width percentage
          if (!context?.containerWidth) {
            throw new Error('Container width required for vw conversion');
          }
          return (displayValue / 100) * context.containerWidth;
        case 'vh':
          // Viewport height percentage
          if (!context?.containerHeight) {
            throw new Error('Container height required for vh conversion');
          }
          return (displayValue / 100) * context.containerHeight;
        case 'em':
          // Em relative to font size
          if (!context?.fontSize) {
            throw new Error('Font size required for em conversion');
          }
          return (displayValue * context.fontSize);
        case 'rem':
          // Rem relative to root font size
          if (!context?.rootFontSize) {
            throw new Error('Root font size required for rem conversion');
          }
          return (displayValue * context.rootFontSize);
        default:
          return displayValue; // Default to cm
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in display to cm conversion');
      onError?.(errorObj);
      return displayValue; // Return original value on error
    }
  }, [onError]);

  const formatDisplayValue = React.useCallback((cmValue: number, targetUnit: Unit, context?: UnitConversionContext): string => {
    try {
      const displayValue = cmToDisplay(cmValue, targetUnit, context);
      const decimalPlaces = getDecimalPlaces(targetUnit);
      return displayValue.toFixed(decimalPlaces);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in display value formatting');
      onError?.(errorObj);
      return cmValue.toString(); // Return original value on error
    }
  }, [cmToDisplay, onError]);

  const getStepValue = React.useCallback((unit: Unit): number => {
    return UNIT_STEPS[unit] || 0.1; // Default fallback
  }, []);

  const getDecimalPlaces = React.useCallback((unit: Unit): number => {
    switch (unit) {
      case 'px':
      case 'pt':
        return 0; // Pixels and points are typically whole numbers
      case 'mm':
        return 1; // Millimeters typically shown with 1 decimal place
      case 'cm':
        return 2; // Centimeters typically shown with 2 decimal places
      case 'in':
        return 3; // Inches typically shown with 3 decimal places
      case '%':
      case 'vw':
      case 'vh':
        return 1; // Percentages and viewport units typically shown with 1 decimal place
      case 'em':
      case 'rem':
        return 2; // Font-relative units typically shown with 2 decimal places
      default:
        return 2; // Default fallback
    }
  }, []);

  const getConversionFactor = React.useCallback((targetUnit: Unit): number => {
    return UNIT_CONVERSIONS[targetUnit] || 1;
  }, []);

  const getReverseConversionFactor = React.useCallback((sourceUnit: Unit): number => {
    return REVERSE_CONVERSIONS[sourceUnit] || 1;
  }, []);

  const validateContext = React.useCallback((unit: Unit, context?: UnitConversionContext): boolean => {
    switch (unit) {
      case '%':
        return !!(context?.referenceWidth || context?.referenceHeight);
      case 'vw':
        return !!context?.containerWidth;
      case 'vh':
        return !!context?.containerHeight;
      case 'em':
        return !!context?.fontSize;
      case 'rem':
        return !!context?.rootFontSize;
      default:
        return true; // Absolute units don't need context
    }
  }, []);

  return {
    cmToDisplay,
    displayToCm,
    formatDisplayValue,
    getStepValue,
    getDecimalPlaces,
    getConversionFactor,
    getReverseConversionFactor,
    validateContext,
  };
}; 