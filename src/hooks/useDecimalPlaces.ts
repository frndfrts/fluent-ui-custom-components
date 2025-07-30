/**
 * useDecimalPlaces.ts
 * Custom hook for determining appropriate decimal places based on unit type.
 */
import { useMemo } from 'react';
import { Unit } from './useUnitConversion';

export const useDecimalPlaces = (unit: Unit): number => {
  return useMemo(() => {
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
  }, [unit]);
}; 