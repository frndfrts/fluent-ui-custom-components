import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { ColorModelSelector } from './ColorModelSelector';
import { ColorHexInput } from './ColorHexInput';
import { RGBHSLColorSlidersInput } from './RGBHSLColorSlidersInput';

export type ColorModel = 'rgb' | 'hsl';

export interface ColorInputProps {
  value: string; // Hex color value as the single source of truth
  onChange: (hexColor: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '240px',
    height: '240px',
    padding: 'var(--spacingHorizontalM)',
    boxSizing: 'border-box',
  },
  // Row 1: Color Model Selector
  modelRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Row 2: Sliders Only
  sliderRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Row 3: ColorHexInput
  hexRow: {
    width: '100%',
    marginBottom: 'var(--spacingVerticalL)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Color conversion utilities
const hexToRgb = (hex: string): [number, number, number] => {
  if (!hex || hex === '' || !/^#[0-9A-F]{6}$/i.test(hex)) return [0, 0, 0];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number): string => {
    const hex = Math.max(0, Math.min(255, c)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const hexToHsl = (hex: string): [number, number, number] => {
  if (!hex || hex === '' || !/^#[0-9A-F]{6}$/i.test(hex)) return [0, 100, 50];
  
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const hslToHex = (h: number, s: number, l: number): string => {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

export const ColorInput: React.FC<ColorInputProps> = ({
  value,
  onChange,
  size = 'medium',
  disabled = false,
}) => {
  const styles = useStyles();
  
  const [colorModel, setColorModel] = React.useState<ColorModel>('rgb');

  const [red, green, blue] = React.useMemo(() => hexToRgb(value), [value]);
  const [hue, saturation, lightness] = React.useMemo(() => hexToHsl(value), [value]);



  const handleHexChange = React.useCallback((newHex: string) => {
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      onChange(newHex.toUpperCase());
    }
  }, [onChange]);

  const handleColorModelChange = React.useCallback((newModel: ColorModel) => {
    setColorModel(newModel);
  }, []);

  const handleRGBChange = React.useCallback((values: { r: number; g: number; b: number }) => {
    onChange(rgbToHex(values.r, values.g, values.b));
  }, [onChange]);

  const handleHSLChange = React.useCallback((values: { h: number; s: number; l: number }) => {
    onChange(hslToHex(values.h, values.s, values.l));
  }, [onChange]);

  return (
    <div className={styles.container}>
      <div className={styles.modelRow}>
        <ColorModelSelector
          colorModel={colorModel}
          onChange={handleColorModelChange}
          size={size}
          disabled={disabled}
        />
      </div>

      <div className={styles.sliderRow}>
        <RGBHSLColorSlidersInput
          mode={colorModel}
          rgbValues={{ r: red, g: green, b: blue }}
          hslValues={{ h: hue, s: saturation, l: lightness }}
          onRGBChange={handleRGBChange}
          onHSLChange={handleHSLChange}
        />
      </div>

      <div className={styles.hexRow}>
        <ColorHexInput
          value={value}
          onChange={handleHexChange}
          size="small"
          length={6}
          disabled={disabled}
          swatchClickable={false}
        />
      </div>
    </div>
  );
}; 