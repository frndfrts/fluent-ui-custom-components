/**
 * ColorHexInput.tsx
 * Atomic color hex input component following Fluent UI guidelines.
 * Combines a color preview swatch with hex input functionality.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { HexInput } from '../primitives/HexInput';
import { useClickableSwatch } from '../../hooks/useClickableSwatch';
import { ErrorBoundary } from '../error/ErrorBoundary';
import { useInputValidation } from '../../hooks/useInputValidation';

const useStyles = makeStyles({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
    width: 'auto',
    minWidth: '0',
  },
  colorSwatch: {
    width: '32px',
    height: '32px',
    borderRadius: 'var(--borderRadiusMedium)',
    flexShrink: 0,
    border: '0.5px solid var(--colorNeutralStroke1)',
  },
  clickableSwatch: {
    cursor: 'pointer',
    border: '0.5px solid var(--colorNeutralStroke1)',
    '&:hover': {
      border: '1px solid var(--colorNeutralStroke1)',
    },
    '&:focus': {
      border: '1px solid var(--colorNeutralStroke1)',
      outline: '2px solid var(--colorNeutralStroke1)',
      outlineOffset: '2px',
    },
  },
  hexInputContainer: {
    flexGrow: 0,
    flexShrink: 0,
    width: 'auto', // Let HexInput determine its own width using standard sizing
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
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
}

// Custom error fallback for ColorHexInput
const ColorHexInputErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.container}>
      <div style={{
        padding: 'var(--spacingVerticalM)',
        color: 'var(--colorPaletteRedForeground1)',
        textAlign: 'center',
        border: '1px solid var(--colorPaletteRedBorder1)',
        borderRadius: 'var(--borderRadiusMedium)',
        backgroundColor: 'var(--colorPaletteRedBackground1)',
        width: '100%'
      }}>
        <div style={{ marginBottom: 'var(--spacingVerticalS)' }}>
          Failed to load color hex input
        </div>
        <div style={{ 
          fontSize: 'var(--fontSizeBase200)', 
          color: 'var(--colorPaletteRedForeground2)',
          marginBottom: 'var(--spacingVerticalM)' 
        }}>
          {error.message}
        </div>
        <button 
          onClick={resetError}
          style={{
            padding: 'var(--spacingVerticalS) var(--spacingHorizontalM)',
            backgroundColor: 'var(--colorPaletteRedBackground2)',
            border: '1px solid var(--colorPaletteRedBorder2)',
            borderRadius: 'var(--borderRadiusMedium)',
            color: 'var(--colorPaletteRedForeground1)',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export const ColorHexInput = React.memo<ColorHexInputProps>(({
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
  onError,
}) => {
  const styles = useStyles();
  const { validateHexColor } = useInputValidation(onError);

  // --- ALL JS WIDTH CALCULATIONS REMOVED ---
  // Sizing is now handled by CSS flexbox and child component's own size.

  const { isClickable, swatchProps, containerProps } = useClickableSwatch({
    enabled: swatchClickable,
    disabled,
    onSwatchClick,
  });

  const isValidHexColor = React.useCallback((color: string): boolean => {
    try {
      if (!color || color === '') return false;
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexRegex.test(color);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hex color validation');
      onError?.(errorObj);
      return false;
    }
  }, [onError]);

  const colorSwatchStyle = React.useMemo(() => {
    try {
      const backgroundColor = value && isValidHexColor(value) ? value : 'transparent';
      const isInvalid = value && !isValidHexColor(value);
      
      return {
        backgroundColor,
        ...(isInvalid ? { background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #ff0000 2px, #ff0000 4px)' } : {}),
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in color swatch style calculation');
      onError?.(errorObj);
      return { backgroundColor: 'transparent' };
    }
  }, [value, isValidHexColor, onError]);

  const { style: containerPropsStyle, ...otherContainerProps } = containerProps || {};

  const mergedContainerStyle = React.useMemo(() => {
    try {
      return {
        ...(fullWidth ? { width: '100%' } : {}),
        ...(containerWidth ? { width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth } : {}),
        ...(containerHeight ? { height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight } : {}),
        ...containerPropsStyle,
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container style calculation');
      onError?.(errorObj);
      return {};
    }
  }, [fullWidth, containerWidth, containerHeight, containerPropsStyle, onError]);

  const { className: swatchClassName, ...otherSwatchProps } = swatchProps || {};

  const swatchStyle = React.useMemo(() => {
    try {
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
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in swatch style calculation');
      onError?.(errorObj);
      return { backgroundColor: 'transparent' };
    }
  }, [colorSwatchStyle, swatchSize, isClickable, onError]);

  const mergedSwatchClassName = React.useMemo(() => {
    try {
      return `${styles.colorSwatch} ${isClickable ? styles.clickableSwatch : ''} ${swatchClassName || ''}`;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in swatch class name calculation');
      onError?.(errorObj);
      return styles.colorSwatch;
    }
  }, [styles.colorSwatch, styles.clickableSwatch, isClickable, swatchClassName, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={ColorHexInputErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
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
            size={size === 'auto' ? 'small' : (size || 'small')}
            length={length}
            disabled={disabled}
            placeholder={placeholder}
            fullWidth={fullWidth}
            width={hexInputWidth}
            onError={onError}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
});

ColorHexInput.displayName = 'ColorHexInput'; 