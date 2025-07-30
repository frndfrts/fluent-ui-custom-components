/**
 * RGBHSLColorSlidersInput.tsx
 * A component to display RGB or HSL color sliders in a stacked layout.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { ColorSliderInput, ColorSliderInputProps } from '../primitives/ColorSliderInput';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalS)',
    width: '240px',
    padding: 'var(--spacingHorizontalS)',
    boxSizing: 'border-box',
  },
});

export type ColorSliderConfig = Omit<ColorSliderInputProps, 'width' | 'size'>;

export type ColorMode = 'rgb' | 'hsl';

export interface RGBHSLColorSlidersInputProps {
  mode: ColorMode;
  rgbValues?: { r: number; g: number; b: number };
  hslValues?: { h: number; s: number; l: number };
  onRGBChange?: (values: { r: number; g: number; b: number }) => void;
  onHSLChange?: (values: { h: number; s: number; l: number }) => void;
  width?: string | number;
}

export const RGBHSLColorSlidersInput: React.FC<RGBHSLColorSlidersInputProps> = ({
  mode,
  rgbValues = { r: 128, g: 128, b: 128 },
  hslValues = { h: 0, s: 0, l: 50 },
  onRGBChange,
  onHSLChange,
  width,
}) => {
  const styles = useStyles();

  const containerStyle: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '240px',
  };

  const handleRGBChange = (channel: 'r' | 'g' | 'b', value: number) => {
    if (onRGBChange) {
      onRGBChange({ ...rgbValues, [channel]: value });
    }
  };

  const handleHSLChange = (channel: 'h' | 's' | 'l', value: number) => {
    if (onHSLChange) {
      onHSLChange({ ...hslValues, [channel]: value });
    }
  };

  if (mode === 'rgb') {
    return (
      <div className={styles.container} style={containerStyle}>
        <ColorSliderInput
          label="Red"
          value={rgbValues.r}
          onChange={(value) => handleRGBChange('r', value)}
        />
        <ColorSliderInput
          label="Green"
          value={rgbValues.g}
          onChange={(value) => handleRGBChange('g', value)}
        />
        <ColorSliderInput
          label="Blue"
          value={rgbValues.b}
          onChange={(value) => handleRGBChange('b', value)}
        />
      </div>
    );
  }

  return (
    <div className={styles.container} style={containerStyle}>
      <ColorSliderInput
        label="Hue"
        value={hslValues.h}
        onChange={(value) => handleHSLChange('h', value)}
      />
      <ColorSliderInput
        label="Sat"
        value={hslValues.s}
        onChange={(value) => handleHSLChange('s', value)}
      />
      <ColorSliderInput
        label="Lum"
        value={hslValues.l}
        onChange={(value) => handleHSLChange('l', value)}
      />
    </div>
  );
};

RGBHSLColorSlidersInput.displayName = 'RGBHSLColorSlidersInput'; 