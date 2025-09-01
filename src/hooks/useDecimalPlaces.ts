/**
 * useDecimalPlaces.ts
 * Custom hook for determining appropriate decimal places based on unit type.
 * Now matches the enhanced unit conversion implementation.
 */
import React from 'react';
import { Unit } from './useUnitConversion';

export const useDecimalPlaces = (unit: Unit, onError?: (error: Error) => void) => {
  const getDecimalPlaces = React.useCallback((targetUnit: Unit): number => {
    try {
      switch (targetUnit) {
        case 'px':
        case 'pt':
          return 0; // Whole numbers for pixels and points
        case 'mm':
          return 1; // 1 decimal place for millimeters
        case 'cm':
          return 2; // 2 decimal places for centimeters
        case 'in':
          return 3; // 3 decimal places for inches
        case '%':
        case 'vw':
        case 'vh':
          return 1; // 1 decimal place for percentages and viewport units
        case 'em':
        case 'rem':
          return 2; // 2 decimal places for font-relative units
        default:
          return 2; // Default to 2 decimal places
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in decimal places calculation');
      onError?.(errorObj);
      return 2; // Return fallback value
    }
  }, [onError]);

  return React.useMemo(() => getDecimalPlaces(unit), [getDecimalPlaces, unit]);
}; 