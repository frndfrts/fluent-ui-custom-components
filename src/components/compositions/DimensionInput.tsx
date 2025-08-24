
/**
 * DimensionInput.tsx
 * Combines NumericInput and UnitSelector into one component for size, position, margin, etc.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { NumericInput } from '../primitives/NumericInput';
import { UnitSelector, DEFAULT_UNIT } from '../components/UnitSelector';
import { useUnitConversion, Unit } from '../../hooks/useUnitConversion';
import { useFormLayout } from '../../styles/FormLayoutContext';
import { ErrorBoundary } from '../error/ErrorBoundary';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px', // Reduced gap for tighter integration
    width: '100%',
  },
  label: {
    textAlign: 'right',
    fontWeight: 'normal',
    color: 'var(--colorNeutralForeground1)',
    fontSize: 'inherit',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  labelSmall: {
    width: '120px',
  },
  labelMedium: {
    width: '160px',
  },
  labelLarge: {
    width: '200px',
  },
});

export interface DimensionInputProps {
  label: string;
  value: number | ''; // This is the cm value (internal storage)
  unit?: string; // This is the display unit, UnitSelector will default to cm
  units?: string[]; // Available units, UnitSelector will default to standard units with cm first
  onChange: (value: number | '', unit: string) => void; // value is always in cm
  onError?: (error: Error) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  hideLabel?: boolean;
}

// Custom error fallback for DimensionInput
const DimensionInputErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.container}>
      <div style={{
        padding: 'var(--spacingVerticalS)',
        color: 'var(--colorPaletteRedForeground1)',
        textAlign: 'center',
        border: '1px solid var(--colorPaletteRedBorder1)',
        borderRadius: 'var(--borderRadiusMedium)',
        backgroundColor: 'var(--colorPaletteRedBackground1)',
        width: '100%'
      }}>
        <div style={{ marginBottom: 'var(--spacingVerticalS)' }}>
          Failed to load dimension input
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

export const DimensionInput = React.memo<DimensionInputProps>(({ 
  label, 
  value, 
  unit, 
  units, 
  onChange, 
  onError,
  size = 'medium',
  disabled = false,
  hideLabel = false,
}) => {
  const styles = useStyles();
  const layout = useFormLayout();
  const { cmToDisplay, displayToCm } = useUnitConversion();

  const getLabelStyle = React.useCallback((): React.CSSProperties => {
    try {
      return { width: `${layout.labelWidth}px` };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in label style calculation');
      onError?.(errorObj);
      return { width: '100px' }; // Return fallback width
    }
  }, [layout.labelWidth, onError]);

  // Convert cm value to display value in current unit
  const displayValue = React.useMemo(() => {
    try {
      if (typeof value === 'number') {
        const currentUnit = unit || DEFAULT_UNIT;
        return cmToDisplay(value, currentUnit as Unit);
      }
      return value;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in display value conversion');
      onError?.(errorObj);
      return value; // Return original value on error
    }
  }, [value, unit, cmToDisplay, onError]);

  // Handle numeric input change (convert display value back to cm)
  const handleNumericChange = React.useCallback((displayValue: number | '') => {
    try {
      const currentUnit = unit || DEFAULT_UNIT;
      if (typeof displayValue === 'number') {
        const cmValue = displayToCm(displayValue, currentUnit as Unit);
        onChange(cmValue, currentUnit);
      } else {
        onChange(displayValue, currentUnit);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in numeric input change');
      onError?.(errorObj);
    }
  }, [unit, displayToCm, onChange, onError]);

  // Handle unit change (convert cm value to new display unit)
  const handleUnitChange = React.useCallback((newUnit: string) => {
    try {
      // The internal cm value stays the same, only the display unit changes
      onChange(value, newUnit);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit change');
      onError?.(errorObj);
    }
  }, [value, onChange, onError]);

  const labelStyle = React.useMemo(() => {
    try {
      return getLabelStyle();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in label style memo');
      onError?.(errorObj);
      return { width: '100px' }; // Return fallback width
    }
  }, [getLabelStyle, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={DimensionInputErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <div className={styles.container}>
        {!hideLabel && (
          <div className={styles.label} style={labelStyle}>
            {label}:&nbsp;
          </div>
        )}
        <NumericInput
          value={displayValue}
          onChange={handleNumericChange}
          size={size}
          disabled={disabled}
          onError={onError}
        />
        
        <UnitSelector
          {...(unit !== undefined && { unit })}
          {...(units !== undefined && { units })}
          onChange={handleUnitChange}
          size={size}
          disabled={disabled}
          onError={onError}
        />
      </div>
    </ErrorBoundary>
  );
});
