/**
 * usePaperSizeManager.ts
 * Custom hook for managing paper size data and dimension field states.
 */
import { useState, useCallback, useMemo } from 'react';

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

// Standard paper dimensions in cm
const STANDARD_PAPER_DIMENSIONS: Record<string, PaperDimensions> = {
  'A0': { width: 84.1, height: 118.9 },
  'A1': { width: 59.4, height: 84.1 },
  'A2': { width: 42.0, height: 59.4 },
  'A3': { width: 29.7, height: 42.0 },
  'A4': { width: 21.0, height: 29.7 },
  'A5': { width: 14.8, height: 21.0 },
  'A6': { width: 10.5, height: 14.8 },
  'Letter': { width: 21.6, height: 27.9 },
  'Legal': { width: 21.6, height: 35.6 },
  'Tabloid': { width: 27.9, height: 43.2 },
};

export const usePaperSizeManager = (
  initialPaperSize: string = 'A4',
  initialWidthUnit: string = 'cm',
  initialHeightUnit: string = 'cm',
  initialOrientation: string = 'portrait'
): PaperSizeManagerState => {
  const [paperSizeData, setPaperSizeData] = useState<PaperSizeData>(() => {
    const dimensions = STANDARD_PAPER_DIMENSIONS[initialPaperSize];
    return {
      width: dimensions.width,
      height: dimensions.height,
      widthUnit: initialWidthUnit,
      heightUnit: initialHeightUnit,
      orientation: initialOrientation,
      paperSize: initialPaperSize,
    };
  });

  // Determine if current paper size is custom
  const isCustomPaper = useMemo(() => {
    return paperSizeData.paperSize === 'Custom';
  }, [paperSizeData.paperSize]);

  // Determine if dimensions should be editable
  const areDimensionsEditable = useMemo(() => {
    return isCustomPaper;
  }, [isCustomPaper]);

  // Update paper size and automatically update dimensions if standard paper
  const updatePaperSize = useCallback((newPaperSize: string) => {
    setPaperSizeData(prev => {
      if (newPaperSize === 'Custom') {
        // Keep current dimensions when switching to custom
        return {
          ...prev,
          paperSize: newPaperSize,
        };
      } else {
        // Update dimensions for standard paper sizes
        const dimensions = STANDARD_PAPER_DIMENSIONS[newPaperSize];
        if (dimensions) {
          // Apply orientation if needed
          let { width, height } = dimensions;
          if (prev.orientation === 'landscape') {
            [width, height] = [height, width];
          }
          
          return {
            ...prev,
            paperSize: newPaperSize,
            width,
            height,
          };
        }
        return prev;
      }
    });
  }, []);

  // Update dimensions (only effective when custom paper is selected)
  const updateDimensions = useCallback((width: number, height: number, widthUnit: string, heightUnit: string) => {
    setPaperSizeData(prev => ({
      ...prev,
      width,
      height,
      widthUnit,
      heightUnit,
    }));
  }, []);

  // Update orientation and adjust dimensions accordingly
  const updateOrientation = useCallback((newOrientation: string) => {
    setPaperSizeData(prev => {
      if (prev.orientation === newOrientation) {
        return prev;
      }

      // For standard papers, swap width and height when orientation changes
      if (prev.paperSize !== 'Custom') {
        return {
          ...prev,
          orientation: newOrientation,
          width: prev.height,
          height: prev.width,
        };
      }

      // For custom papers, just update orientation
      return {
        ...prev,
        orientation: newOrientation,
      };
    });
  }, []);

  return {
    paperSizeData,
    isCustomPaper,
    areDimensionsEditable,
    updatePaperSize,
    updateDimensions,
    updateOrientation,
  };
}; 