/**
 * useAspectRatioLock.ts
 * Custom hook for managing aspect ratio locking between width and height dimensions.
 */
import React, { useState, useCallback, useMemo } from 'react';

export interface Dimensions {
  width: number;
  height: number;
}

export interface AspectRatioLockState {
  isLocked: boolean;
  aspectRatio: number;
  updateDimensions: (width: number, height: number, changedDimension: 'width' | 'height') => Dimensions;
  setIsLocked: (locked: boolean) => void;
  setAspectRatio: (ratio: number) => void;
}

export const useAspectRatioLock = (initialWidth: number, initialHeight: number): AspectRatioLockState => {
  const [isLocked, setIsLocked] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(initialWidth / initialHeight);

  // Update aspect ratio when input dimensions change (e.g., when switching paper sizes)
  React.useEffect(() => {
    if (initialWidth > 0 && initialHeight > 0) {
      const newAspectRatio = initialWidth / initialHeight;
      setAspectRatio(newAspectRatio);
    }
  }, [initialWidth, initialHeight]);

  // Update aspect ratio when dimensions change and lock is enabled
  const updateDimensions = useCallback((
    width: number, 
    height: number, 
    changedDimension: 'width' | 'height'
  ): Dimensions => {
    if (!isLocked) {
      // If not locked, just return the new dimensions and update aspect ratio
      const newAspectRatio = width / height;
      setAspectRatio(newAspectRatio);
      return { width, height };
    }

    // If locked, maintain the aspect ratio
    if (changedDimension === 'width') {
      const newHeight = width / aspectRatio;
      return { width, height: newHeight };
    } else {
      const newWidth = height * aspectRatio;
      return { width: newWidth, height };
    }
  }, [isLocked, aspectRatio]);

  // Memoize the current aspect ratio calculation
  const currentAspectRatio = useMemo(() => {
    return aspectRatio;
  }, [aspectRatio]);

  return {
    isLocked,
    aspectRatio: currentAspectRatio,
    updateDimensions,
    setIsLocked,
    setAspectRatio
  };
}; 