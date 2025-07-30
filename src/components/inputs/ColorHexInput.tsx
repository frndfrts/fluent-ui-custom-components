/**
 * ColorHexInput.tsx
 * Atomic color hex input component following Fluent UI guidelines.
 * Combines a color preview swatch with hex input functionality.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { HexInput } from './HexInput';
import { useClickableSwatch } from '../../hooks/useClickableSwatch';

const useStyles = makeStyles({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
    width: 'auto',
  },
  colorSwatch: {
    width: '32px',
    height: '32px',
    borderRadius: 'var(--borderRadiusMedium)',
    flexShrink: 0,
  },
  clickableSwatch: {
    cursor: 'pointer',
    border: '2px solid transparent',
    '&:hover': {
      border: '2px solid var(--colorNeutralStroke1)',
    },
    '&:focus': {
      border: '2px solid var(--colorNeutralStroke1)',
      outline: '2px solid var(--colorNeutralStroke1)',
      outlineOffset: '2px',
    },
  },
  hexInputContainer: {
    flexGrow: 1,
  },
});

export interface ColorHexInputProps {
  value: string; // Hex color value
  onChange: (hexColor: string) => void;
  size?: 'small' | 'medium' | 'large' | 'auto';
  disabled?: boolean;
  placeholder?: string;
  length?: number;
  fullWidth?: boolean;
  swatchClickable?: boolean; // Flag to enable/disable swatch click functionality
  onSwatchClick?: () => void; // Optional click handler for the color swatch
  swatchSize?: number; // Size of the color swatch in pixels (width and height)
  hexInputWidth?: string | number; // Width of the hex input field
  containerWidth?: string | number; // Overall container width
  containerHeight?: string | number; // Overall container height
}

export const ColorHexInput: React.FC<ColorHexInputProps> = ({
  value,
  onChange,
  size = 'medium', // Default to medium
  disabled = false,
  placeholder = '#000000',
  length = 6,
  fullWidth = false,
  swatchClickable = false,
  onSwatchClick,
  swatchSize,
  hexInputWidth,
  containerWidth,
  containerHeight,
}) => {
  const styles = useStyles();

  // --- ALL JS WIDTH CALCULATIONS REMOVED ---
  // Sizing is now handled by CSS flexbox and child component's own size.

  const { isClickable, swatchProps, containerProps } = useClickableSwatch({
    enabled: swatchClickable,
    disabled,
    onSwatchClick,
  });

  const isValidHexColor = React.useCallback((color: string): boolean => {
    if (!color || color === '') return false;
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
  }, []);

  const colorSwatchStyle = React.useMemo(() => {
    const backgroundColor = value && isValidHexColor(value) ? value : 'transparent';
    const isInvalid = value && !isValidHexColor(value);
    
    return {
      backgroundColor,
      ...(isInvalid ? { background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #ff0000 2px, #ff0000 4px)' } : {}),
    };
  }, [value, isValidHexColor]);

  const { style: containerPropsStyle, ...otherContainerProps } = containerProps || {};

  const mergedContainerStyle = {
    ...(fullWidth ? { width: '100%' } : {}),
    ...(containerWidth ? { width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth } : {}),
    ...(containerHeight ? { height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight } : {}),
    ...containerPropsStyle,
  };

  const { className: swatchClassName, ...otherSwatchProps } = swatchProps || {};

  const swatchStyle = React.useMemo(() => {
    const baseStyle = colorSwatchStyle;
    const sizeStyle = swatchSize ? {
      width: `${swatchSize}px`,
      height: `${swatchSize}px`,
    } : {};
    
    return {
      ...baseStyle,
      ...sizeStyle,
      cursor: isClickable ? 'pointer' : 'default',
    };
  }, [colorSwatchStyle, swatchSize, isClickable]);

  const mergedSwatchClassName = `${styles.colorSwatch} ${isClickable ? styles.clickableSwatch : ''} ${swatchClassName || ''}`;

  return (
    <div
      className={styles.container}
      style={mergedContainerStyle}
      {...otherContainerProps}
    >
      <div
        className={mergedSwatchClassName}
        style={swatchStyle}
        data-color-swatch
        {...otherSwatchProps}
      />
      <div className={styles.hexInputContainer}>
        <HexInput
          value={value}
          onChange={onChange}
          size={size}
          length={length}
          disabled={disabled}
          placeholder={placeholder}
          fullWidth={fullWidth}
          width={hexInputWidth}
        />
      </div>
    </div>
  );
};

ColorHexInput.displayName = 'ColorHexInput'; 