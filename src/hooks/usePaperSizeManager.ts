/**
 * usePaperSizeManager.ts
 * Custom hook for managing paper size data and dimension field states.
 */
import { useState, useCallback, useMemo } from 'react';
import React from 'react'; // Added for React.useState and React.useCallback
import { STANDARD_PAPER_DIMENSIONS } from '../components/components/PaperSelector';

export interface PaperDimensions {
  width: number;
  height: number;
}

export interface PaperSizeData {
  width: number;
  height: number;
  widthUnit: string; // Individual unit for width
  heightUnit: string; // Individual unit for height
  orientation: string;
  paperSize: string;
}

export interface PaperSizeManagerState {
  paperSizeData: PaperSizeData;
  isCustomPaper: boolean;
  areDimensionsEditable: boolean;
  updatePaperSize: (paperSize: string) => void;
  updateDimensions: (width: number, height: number, widthUnit: string, heightUnit: string) => void;
  updateOrientation: (orientation: string) => void;
}

const getInitialPaperSizeData = (
  initialPaperSize: string,
  initialWidthUnit: string,
  initialHeightUnit: string,
  initialOrientation: string
): PaperSizeData => {
  const dimensions = STANDARD_PAPER_DIMENSIONS[initialPaperSize];
  if (!dimensions) {
    // Fallback to A4 if the initial paper size is not found
    const fallbackDimensions = STANDARD_PAPER_DIMENSIONS['A4'];
    return {
      width: fallbackDimensions.width,
      height: fallbackDimensions.height,
      widthUnit: initialWidthUnit,
      heightUnit: initialHeightUnit,
      orientation: initialOrientation,
      paperSize: 'A4', // Use A4 as fallback
    };
  }
  return {
    width: dimensions.width,
    height: dimensions.height,
    widthUnit: initialWidthUnit,
    heightUnit: initialHeightUnit,
    orientation: initialOrientation,
    paperSize: initialPaperSize,
  };
};

const getDefaultPaperSizeData = (): PaperSizeData => {
  return {
    width: 21.0, // Default width for A4
    height: 29.7, // Default height for A4
    widthUnit: 'cm',
    heightUnit: 'cm',
    orientation: 'portrait',
    paperSize: 'Custom',
  };
};

const getStandardPaperSizeData = (
  paperSize: string,
  widthUnit: string,
  heightUnit: string,
  orientation: string
): PaperDimensions => {
  const dimensions = STANDARD_PAPER_DIMENSIONS[paperSize];
  if (!dimensions) {
    // Fallback to A4 if the paper size is not found
    const fallbackDimensions = STANDARD_PAPER_DIMENSIONS['A4'];
    return {
      width: fallbackDimensions.width,
      height: fallbackDimensions.height,
    };
  }

  let { width, height } = dimensions;
  if (orientation === 'landscape') {
    [width, height] = [height, width];
  }

  return {
    width,
    height,
  };
};

export const usePaperSizeManager = (
  initialPaperSize: string = 'A4',
  initialWidthUnit: string = 'cm',
  initialHeightUnit: string = 'cm',
  initialOrientation: string = 'portrait',
  onError?: (error: Error) => void
) => {
  const [paperSizeData, setPaperSizeData] = React.useState<PaperSizeData>(() => {
    try {
      return getInitialPaperSizeData(initialPaperSize, initialWidthUnit, initialHeightUnit, initialOrientation);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in initial paper size data');
      onError?.(errorObj);
      return getDefaultPaperSizeData();
    }
  });

  const [areDimensionsEditable, setAreDimensionsEditable] = React.useState<boolean>(() => {
    try {
      return initialPaperSize === 'Custom';
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in dimensions editable state');
      onError?.(errorObj);
      return true;
    }
  });

  const updatePaperSize = React.useCallback((newPaperSize: string) => {
    try {
      setPaperSizeData(prevData => {
        const newData = { ...prevData, paperSize: newPaperSize };
        
        if (newPaperSize === 'Custom') {
          setAreDimensionsEditable(true);
        } else {
          setAreDimensionsEditable(false);
          // Update dimensions based on the new paper size
          const standardData = getStandardPaperSizeData(newPaperSize, prevData.widthUnit, prevData.heightUnit, prevData.orientation);
          return { ...newData, ...standardData };
        }
        
        return newData;
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in paper size update');
      onError?.(errorObj);
    }
  }, [onError]);

  const updateDimensions = React.useCallback((width: number, height: number, widthUnit: string, heightUnit: string) => {
    try {
      setPaperSizeData(prevData => ({
        ...prevData,
        width,
        height,
        widthUnit,
        heightUnit,
      }));
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in dimensions update');
      onError?.(errorObj);
    }
  }, [onError]);

  const updateOrientation = React.useCallback((orientation: string) => {
    try {
      setPaperSizeData(prevData => {
        const newData = { ...prevData, orientation };
        
        // If not custom, recalculate dimensions for the new orientation
        if (prevData.paperSize !== 'Custom') {
          const standardData = getStandardPaperSizeData(prevData.paperSize, prevData.widthUnit, prevData.heightUnit, orientation);
          return { ...newData, ...standardData };
        }
        
        return newData;
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in orientation update');
      onError?.(errorObj);
    }
  }, [onError]);

  return {
    paperSizeData,
    areDimensionsEditable,
    updatePaperSize,
    updateDimensions,
    updateOrientation,
  };
}; 