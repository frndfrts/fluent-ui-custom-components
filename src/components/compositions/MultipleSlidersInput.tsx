/**
 * MultipleSlidersInput.tsx
 * A component to display a stack of sliders with aligned labels and values.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { SliderInput, SliderInputProps } from '../primitives/SliderInput';
import { ErrorBoundary } from '../error/ErrorBoundary';
import { useInputValidation } from '../../hooks/useInputValidation';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
    width: '100%',
  },
});

export type SliderConfig = Omit<SliderInputProps, 'size'>;

export interface MultipleSlidersInputProps {
  sliders: SliderConfig[];
  labelValueWidth: number; // The symmetric width for label and value areas
  width?: string | number;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
}

// Custom error fallback for MultipleSlidersInput
const MultipleSlidersInputErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
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
          Failed to load multiple sliders
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

export const MultipleSlidersInput = React.memo<MultipleSlidersInputProps>(({
  sliders,
  labelValueWidth,
  width,
  onError,
}) => {
  const styles = useStyles();
  const { validateNumericInput } = useInputValidation(onError);

  const containerStyle: React.CSSProperties = React.useMemo(() => {
    try {
      return {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container style calculation');
      onError?.(errorObj);
      return { width: '100%' };
    }
  }, [width, onError]);

  const validatedSliders = React.useMemo(() => {
    try {
      return sliders.map(sliderProps => {
        // Validate slider configuration
        if (sliderProps.label && typeof sliderProps.label === 'string') {
          return sliderProps;
        } else {
          throw new Error('Invalid slider configuration: missing or invalid label');
        }
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in slider validation');
      onError?.(errorObj);
      return [];
    }
  }, [sliders, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={MultipleSlidersInputErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <div className={styles.container} style={containerStyle}>
        {validatedSliders.map((sliderProps) => (
          <SliderInput
            key={sliderProps.label} // Assuming label is unique for the key
            {...sliderProps}
            size="small"
            onError={onError}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
});

MultipleSlidersInput.displayName = 'MultipleSlidersInput';