/**
 * useComponentSize.ts
 * Hook for managing component size state and validation.
 */
import { useState, useCallback } from 'react';
import type { ComponentSize } from '../types/common';

export const useComponentSize = (size: ComponentSize = 'medium', onError?: (error: Error) => void) => {
  const [currentSize, setCurrentSize] = useState<ComponentSize>(size);

  const updateSize = useCallback((newSize: ComponentSize) => {
    try {
      if (!['small', 'medium', 'large'].includes(newSize)) {
        throw new Error(`Invalid size: ${newSize}. Must be 'small', 'medium', or 'large'`);
      }
      setCurrentSize(newSize);
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error);
      } else {
        console.error('Error updating component size:', error);
      }
    }
  }, [onError]);

  const resetSize = useCallback(() => {
    setCurrentSize(size);
  }, [size]);

  // Provide the interface that existing components expect
  const getSizeValue = useCallback((sizeKey: ComponentSize): number => {
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
    size: currentSize,
    updateSize,
    resetSize,
    isSmall: currentSize === 'small',
    isMedium: currentSize === 'medium',
    isLarge: currentSize === 'large',
    // Legacy interface for backward compatibility
    width: currentSize === 'small' ? '200px' : currentSize === 'medium' ? '300px' : '400px',
    gap: currentSize === 'small' ? '8px' : currentSize === 'medium' ? '12px' : '16px',
    getSizeValue,
  };
}; 