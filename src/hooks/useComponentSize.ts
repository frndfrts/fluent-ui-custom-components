/**
 * useComponentSize.ts
 * Custom hook for consistent component sizing across the application.
 */
import { useMemo } from 'react';

export type ComponentSize = 'small' | 'medium' | 'large';

export interface SizeConfig {
  width: string;
  labelWidth: string;
  inputWidth: string;
  gap: string;
}

export const useComponentSize = (size: ComponentSize): SizeConfig => {
  return useMemo(() => {
    switch (size) {
      case 'small':
        return {
          width: '80px',
          labelWidth: '120px',
          inputWidth: '60px',
          gap: '4px',
        };
      case 'large':
        return {
          width: '160px',
          labelWidth: '200px',
          inputWidth: '120px',
          gap: '6px',
        };
      default: // medium
        return {
          width: '120px',
          labelWidth: '160px',
          inputWidth: '80px',
          gap: '4px',
        };
    }
  }, [size]);
}; 