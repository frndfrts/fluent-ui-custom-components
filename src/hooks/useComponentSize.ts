/**
 * useComponentSize.ts
 * Custom hook for consistent component sizing across the application.
 */
import React from 'react';

export type ComponentSize = 'small' | 'medium' | 'large';

export interface SizeConfig {
  width: string;
  labelWidth: string;
  inputWidth: string;
  gap: string;
}

export const useComponentSize = (size: ComponentSize = 'medium', onError?: (error: Error) => void) => {
  const getSizeValue = React.useCallback((sizeKey: ComponentSize): number => {
    try {
      switch (sizeKey) {
        case 'small':
          return 8;
        case 'medium':
          return 12;
        case 'large':
          return 16;
        default:
          return 12;
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in size value calculation');
      onError?.(errorObj);
      return 12; // Return fallback value
    }
  }, [onError]);

  return {
    size,
    updateSize: (newSize: ComponentSize) => {
      // This is now just a no-op since we don't maintain internal state
      // Components should manage their own size state
    },
    getSizeValue,
    width: size === 'small' ? '200px' : size === 'medium' ? '300px' : '400px',
    gap: size === 'small' ? '8px' : size === 'medium' ? '12px' : '16px',
  };
}; 