/**
 * ColorSelector.tsx
 * Atomic component for selecting colors from a grid of standard color swatches.
 * Uses Fluent UI v9 SwatchPicker component for professional color selection.
 */
import * as React from 'react';
import { makeStyles, Tooltip, ColorSwatch } from '@fluentui/react-components';
import { SwatchPicker, renderSwatchPickerGrid } from '@fluentui/react-swatch-picker';
import type { ColorSwatchProps, SwatchProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex', // Use flexbox for centering
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
    padding: '0',
    backgroundColor: 'var(--colorNeutralBackground1)',
    borderRadius: 'var(--borderRadiusMedium)',
    width: '240px', // Fixed width
    height: '240px', // Fixed height
    border: '1px solid red',
    boxSizing: 'border-box', // Ensure border is included in the total size
  },
});

// Professional color palette organized by color families (64 colors - 8x8 grid)
// Organized: Grays, Reds, Oranges, Yellows, Greens, Cyans, Blues, Purples
const STANDARD_COLORS = [
  // Row 1: Grayscale and Blacks (8 colors)
  '#000000', '#2A0000', '#402000', '#3D3500', '#132B13', '#031C1F', '#021C33', '#120726',
  
  // Row 2: Whites and Light Grays (8 colors)
  '#FFFFFF', '#E6E6E6', '#CCCCCC', '#B3B3B3', '#999999', '#7F7F7F', '#595959', '#4D0000',
  
  // Row 3: Reds (8 colors) - from light to dark
  '#F4CCCC', '#EA9999', '#E06666', '#CC0000', '#990000', '#660000', '#5B2C02', '#2A0000',
  
  // Row 4: Oranges (8 colors) - from light to dark
  '#FCE5CD', '#F9CB9C', '#F6B26B', '#E69138', '#B45F06', '#783F04', '#5A4C00', '#402000',
  
  // Row 5: Yellows (8 colors) - from light to dark
  '#FFF2CC', '#FFE599', '#FFD966', '#F1C232', '#BF9000', '#7F6000', '#3D3500', '#5A4C00',
  
  // Row 6: Greens (8 colors) - from light to dark
  '#D9EAD3', '#B6D7A8', '#93C47D', '#6AA84F', '#38761D', '#274E13', '#1F3F1F', '#132B13',
  
  // Row 7: Cyans (8 colors) - from light to dark
  '#D0E0E3', '#A2C4C9', '#76A5AF', '#45818E', '#134F5C', '#0C343D', '#062F32', '#031C1F',
  
  // Row 8: Blues and Purples (8 colors) - from light to dark
  '#D9D2E9', '#B4A7D6', '#8E7CC3', '#674EA7', '#351C75', '#20124D', '#1C0A3A', '#120726',
];

// Utility functions for color conversion and tooltip content
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const { r, g, b } = rgb;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const getColorTooltipContent = (hexColor: string, colorModel: 'rgb' | 'hsl' = 'rgb'): string => {
  const rgb = hexToRgb(hexColor);
  const hsl = hexToHsl(hexColor);
  
  if (!rgb || !hsl) return hexColor.toUpperCase();
  
  const hexLine = hexColor.toUpperCase();
  const colorLine = colorModel === 'hsl' 
    ? `HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%`
    : `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
  
  return `${hexLine}\n${colorLine}`;
};

// ColorSwatch with tooltip component
const ColorSwatchWithTooltip = (props: ColorSwatchProps & { colorModel?: 'rgb' | 'hsl' }) => {
  const { color, value, size, shape, disabled, colorModel = 'rgb' } = props;
  const tooltipContent = getColorTooltipContent(color, colorModel);
  
  return (
    <Tooltip withArrow content={tooltipContent} relationship="label">
      <ColorSwatch 
        color={color} 
        value={value} 
        size={size}
        shape={shape}
        disabled={disabled}
      />
    </Tooltip>
  );
};

export interface ColorSelectorProps {
  value: string; // Hex color value
  onChange: (color: string) => void;
  disabled?: boolean;
  colors?: string[]; // Custom color array, defaults to STANDARD_COLORS
  columns?: number; // Number of columns in the grid, defaults to 8
  showTooltips?: boolean; // Whether to show color tooltips
  colorModel?: 'rgb' | 'hsl'; // Color model for tooltip display
}

export const ColorSelector = React.memo<ColorSelectorProps>(({
  value,
  onChange,
  disabled = false,
  colors = STANDARD_COLORS,
  columns = 8,
  showTooltips = true,
  colorModel = 'rgb',
}) => {
  const styles = useStyles();

  const handleSelectionChange = React.useCallback((event: any, data: { selectedValue: string; selectedSwatch: string }) => {
    if (!disabled) {
      onChange(data.selectedValue);
    }
  }, [onChange, disabled]);

  const swatchPickerSize = 'medium' as const;

  const colorItems: SwatchProps[] = React.useMemo(() => 
    colors.map(color => ({
      color,
      value: color,
      disabled,
      size: swatchPickerSize,
      shape: 'square' as const,
    })), [colors, disabled, swatchPickerSize]
  );

  return (
    <div className={styles.container}>
      <SwatchPicker
        layout="grid"
        selectedValue={value}
        onSelectionChange={handleSelectionChange}
        size={swatchPickerSize}
        shape="square"
        spacing="small"
      >
        {renderSwatchPickerGrid({
          items: colorItems,
          columnCount: columns,
          renderSwatch: (item: SwatchProps) => (
            showTooltips ? (
              <ColorSwatchWithTooltip
                key={item.value}
                color={item.color ?? ""}
                value={item.value}
                size={item.size}
                shape={item.shape}
                disabled={item.disabled}
                colorModel={colorModel}
              />
            ) : (
              <ColorSwatch
                key={item.value}
                color={item.color ?? ""}
                value={item.value}
                size={item.size}
                shape={item.shape}
                disabled={item.disabled}
              />
            )
          ),
        })}
      </SwatchPicker>
    </div>
  );
});

ColorSelector.displayName = 'ColorSelector'; 