/**
 * RGBHSLColorSlidersInput.tsx
 * A component to display RGB or HSL color sliders in a stacked layout.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { ColorSliderInput, ColorSliderInputProps } from '../primitives/ColorSliderInput';
import { ErrorBoundary } from '../error/ErrorBoundary';
import { useInputValidation } from '../../hooks/useInputValidation';

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
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
}

// Custom error fallback for RGBHSLColorSlidersInput
const RGBHSLColorSlidersInputErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
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
          Failed to load color sliders
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

export const RGBHSLColorSlidersInput = React.memo<RGBHSLColorSlidersInputProps>(({
  mode,
  rgbValues = { r: 128, g: 128, b: 128 },
  hslValues = { h: 0, s: 0, l: 50 },
  onRGBChange,
  onHSLChange,
  width,
  onError,
}) => {
  const styles = useStyles();
  const { validateNumericInput } = useInputValidation(onError);

  const containerStyle: React.CSSProperties = React.useMemo(() => {
    try {
      return {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '240px',
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container style calculation');
      onError?.(errorObj);
      return { width: '240px' };
    }
  }, [width, onError]);

  const handleRGBChange = React.useCallback((channel: 'r' | 'g' | 'b', value: number) => {
    try {
      if (onRGBChange) {
        // Validate the RGB value
        const validation = validateNumericInput(value.toString());
        if (validation.isValid) {
          onRGBChange({ ...rgbValues, [channel]: value });
        } else {
          onError?.(new Error(`Invalid RGB value for ${channel}: ${validation.error}`));
        }
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(`Unknown error in RGB ${channel} change`);
      onError?.(errorObj);
    }
  }, [onRGBChange, rgbValues, validateNumericInput, onError]);

  const handleHSLChange = React.useCallback((channel: 'h' | 's' | 'l', value: number) => {
    try {
      if (onHSLChange) {
        // Validate the HSL value
        const validation = validateNumericInput(value.toString());
        if (validation.isValid) {
          onHSLChange({ ...hslValues, [channel]: value });
        } else {
          onError?.(new Error(`Invalid HSL value for ${channel}: ${validation.error}`));
        }
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(`Unknown error in HSL ${channel} change`);
      onError?.(errorObj);
    }
  }, [onHSLChange, hslValues, validateNumericInput, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  if (mode === 'rgb') {
    return (
      <ErrorBoundary 
        fallback={RGBHSLColorSlidersInputErrorFallback}
        onError={handleError}
        resetOnPropsChange={true}
      >
        <div className={styles.container} style={containerStyle}>
          <ColorSliderInput
            label="Red"
            value={rgbValues.r}
            onChange={(value) => handleRGBChange('r', value)}
            onError={onError}
          />
          <ColorSliderInput
            label="Green"
            value={rgbValues.g}
            onChange={(value) => handleRGBChange('g', value)}
            onError={onError}
          />
          <ColorSliderInput
            label="Blue"
            value={rgbValues.b}
            onChange={(value) => handleRGBChange('b', value)}
            onError={onError}
          />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary 
      fallback={RGBHSLColorSlidersInputErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <div className={styles.container} style={containerStyle}>
        <ColorSliderInput
          label="Hue"
          value={hslValues.h}
          onChange={(value) => handleHSLChange('h', value)}
          onError={onError}
        />
        <ColorSliderInput
          label="Sat"
          value={hslValues.s}
          onChange={(value) => handleHSLChange('s', value)}
          onError={onError}
        />
        <ColorSliderInput
          label="Lum"
          value={hslValues.l}
          onChange={(value) => handleHSLChange('l', value)}
          onError={onError}
        />
      </div>
    </ErrorBoundary>
  );
});

RGBHSLColorSlidersInput.displayName = 'RGBHSLColorSlidersInput'; 