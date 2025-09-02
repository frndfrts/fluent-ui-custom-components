
/**
 * DimensionInput.tsx
 * Enhanced composition component that combines NumericInput and UnitSelector.
 * Now supports unit systems for different measurement types (length, temperature, volume, etc.).
 * Includes percent input clamping to prevent values outside [0, 100].
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { NumericInput } from '../primitives/NumericInput';
import { UnitSelector, DEFAULT_UNIT } from '../components/UnitSelector';
import { UnitSystem } from '../../systems/UnitSystems';
import { unitConversionService, UnitConversionContext } from '../../services/UnitConversionService';
import { useUnitConversionContext } from '../../contexts/UnitConversionContext';
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
  value: number | ''; // This is the internal unit value (e.g., cm for length, celsius for temperature)
  unit?: string; // This is the display unit
  units?: string[]; // Available units

  // Unit system support
  unitSystem?: UnitSystem | string; // Can be UnitSystem object or system ID string

  // Axis for percentage calculations
  axis?: 'width' | 'height' | 'x' | 'y'; // Defaults to 'width' for backward compatibility

  onChange: (value: number | '', unit: string) => void; // value is always in internal unit
  onError?: (error: Error) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  hideLabel?: boolean;

  // Context for relative unit calculations (props override context)
  referenceWidth?: number;   // For percentage calculations (in internal unit)
  referenceHeight?: number;  // For percentage calculations (in internal unit)
  containerWidth?: number;   // For viewport-relative units (in internal unit)
  containerHeight?: number;  // For viewport-relative units (in internal unit)
  fontSize?: number;         // For em calculations (in internal unit)
  rootFontSize?: number;     // For rem calculations (in internal unit)

  // Enhanced features
  showUnitNames?: boolean; // Show full unit names instead of symbols
  filterUnits?: (unit: string) => boolean; // Filter function for units

  // Percent clamping options
  enablePercentClamping?: boolean; // Enable percent clamping (default: true)
  debouncedClamping?: boolean; // Enable debounced clamping while typing (default: false)
}

// Custom error fallback for DimensionInput
const DimensionInputErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  return (
    <div style={{
      padding: '8px',
      border: '1px solid var(--colorPaletteRedBorder1)',
      borderRadius: '4px',
      backgroundColor: 'var(--colorPaletteRedBackground1)',
      color: 'var(--colorPaletteRedForeground1)',
      fontSize: '12px'
    }}>
      <div><strong>Dimension Input Error:</strong></div>
      <div>{error.message}</div>
      <button
        onClick={resetError}
        style={{
          marginTop: '4px',
          padding: '2px 8px',
          border: '1px solid currentColor',
          borderRadius: '2px',
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer'
        }}
      >
        Retry
      </button>
    </div>
  );
};

export const DimensionInput = React.memo<DimensionInputProps>(({
  label,
  value,
  unit,
  units,
  axis = 'width', // Default to 'width' for backward compatibility
  unitSystem,
  onChange,
  onError,
  size = 'medium',
  disabled = false,
  hideLabel = false,
  referenceWidth,
  referenceHeight,
  containerWidth,
  containerHeight,
  fontSize,
  rootFontSize,
  showUnitNames = false,
  filterUnits,
  enablePercentClamping = true,
  debouncedClamping = false,
}) => {
  const styles = useStyles();
  const layout = useFormLayout();

  // Internal state for percent clamping
  const [lastValidPercent, setLastValidPercent] = React.useState<number>(0);
  const [displayString, setDisplayString] = React.useState<string>('');

  // Resolve unit system
  const resolvedUnitSystem = React.useMemo(() => {
    try {
      if (typeof unitSystem === 'string') {
        return unitConversionService.getSystem(unitSystem);
      }
      return unitSystem;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit system resolution');
      onError?.(errorObj);
      return undefined;
    }
  }, [unitSystem, onError]);

  // Get system ID for conversion service
  const systemId = React.useMemo(() => {
    return resolvedUnitSystem?.id || 'length'; // Default to length for backward compatibility
  }, [resolvedUnitSystem]);

  // Get internal unit for the system
  const internalUnit = React.useMemo(() => {
    return resolvedUnitSystem?.internalUnit || 'cm'; // Default to cm for backward compatibility
  }, [resolvedUnitSystem]);

  // Try to get context from provider, fall back to props
  let contextContext: UnitConversionContext | undefined;
  try {
    contextContext = useUnitConversionContext();
  } catch {
    // Context not available, will use props
  }

  // Create context object for unit conversions (props override context)
  const context: UnitConversionContext = React.useMemo(() => ({
    referenceWidth: referenceWidth ?? contextContext?.referenceWidth,
    referenceHeight: referenceHeight ?? contextContext?.referenceHeight,
    containerWidth: containerWidth ?? contextContext?.containerWidth,
    containerHeight: containerHeight ?? contextContext?.containerHeight,
    fontSize: fontSize ?? contextContext?.fontSize,
    rootFontSize: rootFontSize ?? contextContext?.rootFontSize,
    axis: axis, // Pass axis to context
  }), [
    referenceWidth, referenceHeight, containerWidth, containerHeight, fontSize, rootFontSize,
    contextContext?.referenceWidth, contextContext?.referenceHeight, contextContext?.containerWidth,
    contextContext?.containerHeight, contextContext?.fontSize, contextContext?.rootFontSize, axis
  ]);

  const getLabelStyle = React.useCallback((): React.CSSProperties => {
    try {
      return { width: `${layout.labelWidth}px` };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in label style calculation');
      onError?.(errorObj);
      return { width: '100px' }; // Return fallback width
    }
  }, [layout.labelWidth, onError]);

  // Helper functions for percent clamping
  const clampPercent = React.useCallback((percent: number): number => {
    return Math.min(100, Math.max(0, percent));
  }, []);

  const formatPercent = React.useCallback((percent: number): string => {
    const decimalPlaces = unitConversionService.getDecimalPlaces('%', systemId);
    return percent.toFixed(decimalPlaces);
  }, [systemId]);

  const parsePercent = React.useCallback((input: string): number | null => {
    // Strip non-numeric except decimal separator
    const cleaned = input.replace(/[^\d.-]/g, '');
    const parsed = parseFloat(cleaned);
    return Number.isNaN(parsed) ? null : parsed;
  }, []);

  const emitChangeFromPercent = React.useCallback((percent: number) => {
    try {
      const referenceAxis = axis === 'width' || axis === 'x' ? context.referenceWidth : context.referenceHeight;
      if (referenceAxis === undefined) {
        throw new Error(`Reference ${axis} required for percentage conversion`);
      }
      const cm = (percent / 100) * referenceAxis;
      onChange(cm, '%');
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in percent conversion');
      onError?.(errorObj);
    }
  }, [axis, context.referenceWidth, context.referenceHeight, onChange, onError]);

  // Convert internal unit value to display value in current unit
  const displayValue = React.useMemo(() => {
    try {
      if (typeof value === 'number') {
        const currentUnit = unit || internalUnit;

        // Validate context for relative units
        if (!unitConversionService.validateContext(currentUnit, systemId, context)) {
          throw new Error(`Context required for unit '${currentUnit}' but not provided`);
        }

        const converted = unitConversionService.fromInternalUnit(value, currentUnit, systemId, { ...context, axis });
        
        // Apply percent clamping if enabled and unit is percent
        if (enablePercentClamping && currentUnit === '%') {
          const clamped = clampPercent(converted);
          if (clamped !== converted) {
            // Update last valid percent for fallback
            setLastValidPercent(clamped);
          }
          return clamped;
        }
        
        return converted;
      }
      return value;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in display value conversion');
      onError?.(errorObj);
      return value; // Return original value on error
    }
  }, [value, unit, internalUnit, systemId, context, axis, onError, enablePercentClamping, clampPercent]);

  // Get step value and decimal places for current unit
  const currentUnit = unit || internalUnit;
  const stepValue = React.useMemo(() => unitConversionService.getStepValue(currentUnit, systemId), [currentUnit, systemId]);
  const decimalPlaces = React.useMemo(() => unitConversionService.getDecimalPlaces(currentUnit, systemId), [currentUnit, systemId]);



  // Handle blur event for percent clamping (integrated into handleNumericChange)
  const handleNumericChangeWithClamping = React.useCallback((displayValue: number | '') => {
    try {
      const currentUnit = unit || internalUnit;

      // Validate context for relative units
      if (!unitConversionService.validateContext(currentUnit, systemId, context)) {
        throw new Error(`Context required for unit '${currentUnit}' but not provided`);
      }

      if (typeof displayValue === 'number') {
        // Apply percent clamping if enabled and unit is percent
        if (enablePercentClamping && currentUnit === '%') {
          const clamped = clampPercent(displayValue);
          setLastValidPercent(clamped);
          emitChangeFromPercent(clamped);
          return;
        }

        const internalValue = unitConversionService.toInternalUnit(displayValue, currentUnit, systemId, { ...context, axis });
        onChange(internalValue, currentUnit);
      } else {
        onChange(displayValue, currentUnit);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in numeric input change');
      onError?.(errorObj);
    }
  }, [unit, internalUnit, systemId, onChange, onError, context, axis, enablePercentClamping, clampPercent, emitChangeFromPercent]);

  // Handle unit change (convert internal unit value to new display unit)
  const handleUnitChange = React.useCallback((newUnit: string) => {
    try {
      // Validate context for the new unit
      if (!unitConversionService.validateContext(newUnit, systemId, context)) {
        throw new Error(`Context required for unit '${newUnit}' but not provided`);
      }

      // The internal unit value stays the same, only the display unit changes
      // The displayValue will be recalculated automatically in the useMemo
      onChange(value, newUnit);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit change');
      onError?.(errorObj);
    }
  }, [value, onChange, onError, systemId, context]);

  // Update display string when display value changes
  React.useEffect(() => {
    if (typeof displayValue === 'number') {
      setDisplayString(formatPercent(displayValue));
    } else {
      setDisplayString('');
    }
  }, [displayValue, formatPercent]);

  // Set min/max constraints for percent inputs
  const inputConstraints = React.useMemo(() => {
    if (enablePercentClamping && currentUnit === '%') {
      return {
        min: 0,
        max: 100,
      };
    }
    return {};
  }, [enablePercentClamping, currentUnit]);

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
          onChange={handleNumericChangeWithClamping}
          step={stepValue}
          decimalPlaces={decimalPlaces}
          size={size}
          disabled={disabled}
          onError={onError}
          {...inputConstraints}
        />

        <UnitSelector
          unitSystem={resolvedUnitSystem}
          unit={unit}
          units={units}
          onChange={handleUnitChange}
          size={size}
          disabled={disabled}
          onError={onError}
          showUnitNames={showUnitNames}
          filterUnits={filterUnits}
        />
      </div>
    </ErrorBoundary>
  );
});

DimensionInput.displayName = 'DimensionInput';
