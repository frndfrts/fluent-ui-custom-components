import React from 'react';

export type ColorModel = 'RGB' | 'HSL' | 'HEX';

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export type ColorValue = 
  | { type: 'rgb'; value: RGBColor }
  | { type: 'hsl'; value: HSLColor }
  | { type: 'hex'; value: string };

/**
 * Custom hook for managing color state across different color models.
 * Provides error handling and fallback values for robust external use.
 */
export const useColorManager = (onError?: (error: Error) => void) => {
  const [colorModel, setColorModel] = React.useState<ColorModel>('RGB');
  const [rgbColor, setRgbColor] = React.useState<RGBColor>({ r: 0, g: 0, b: 0 });
  const [hslColor, setHslColor] = React.useState<HSLColor>({ h: 0, s: 0, l: 0 });
  const [hexColor, setHexColor] = React.useState<string>('#000000');

  const updateColorModel = React.useCallback((model: ColorModel) => {
    try {
      setColorModel(model);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in color model update');
      onError?.(errorObj);
    }
  }, [onError]);

  const updateRgbColor = React.useCallback((color: Partial<RGBColor>) => {
    try {
      setRgbColor(prev => ({ ...prev, ...color }));
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in RGB color update');
      onError?.(errorObj);
    }
  }, [onError]);

  const updateHslColor = React.useCallback((color: Partial<HSLColor>) => {
    try {
      setHslColor(prev => ({ ...prev, ...color }));
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in HSL color update');
      onError?.(errorObj);
    }
  }, [onError]);

  const updateHexColor = React.useCallback((hex: string) => {
    try {
      setHexColor(hex);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hex color update');
      onError?.(errorObj);
    }
  }, [onError]);

  const getCurrentColor = React.useCallback((): ColorValue => {
    try {
      switch (colorModel) {
        case 'RGB':
          return { type: 'rgb', value: rgbColor };
        case 'HSL':
          return { type: 'hsl', value: hslColor };
        case 'HEX':
          return { type: 'hex', value: hexColor };
        default:
          return { type: 'rgb', value: rgbColor };
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in color retrieval');
      onError?.(errorObj);
      return { type: 'rgb', value: { r: 0, g: 0, b: 0 } }; // Return fallback value
    }
  }, [colorModel, rgbColor, hslColor, hexColor, onError]);

  return {
    colorModel,
    rgbColor,
    hslColor,
    hexColor,
    updateColorModel,
    updateRgbColor,
    updateHslColor,
    updateHexColor,
    getCurrentColor,
  };
};



