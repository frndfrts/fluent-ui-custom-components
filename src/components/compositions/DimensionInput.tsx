
/**
 * DimensionInput.tsx
 * Combines NumericInput and UnitSelector into one component for size, position, margin, etc.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { NumericInput } from '../primitives/NumericInput';
import { UnitSelector } from '../primitives/UnitSelector';
import { useUnitConversion, Unit } from '../../hooks/useUnitConversion';
import { useFormLayout } from '../../styles/FormLayoutContext';
import { useDecimalPlaces } from '../../hooks/useDecimalPlaces';

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
  unit: string; // This is the display unit
  units: string[];
  onChange: (value: number | '', unit: string) => void; // value is always in cm
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  hideLabel?: boolean;
}

export const DimensionInput = React.memo<DimensionInputProps>(({ 
  label, 
  value, 
  unit, 
  units, 
  onChange, 
  size = 'medium',
  disabled = false,
  hideLabel = false,
}) => {
  const styles = useStyles();
  const layout = useFormLayout();
  const { cmToDisplay, displayToCm } = useUnitConversion();
  const decimalPlaces = useDecimalPlaces(unit as Unit);

  const getLabelStyle = React.useCallback((): React.CSSProperties => {
    return { width: `${layout.labelWidth}px` };
  }, [layout.labelWidth]);

  // Convert cm value to display value in current unit
  const displayValue = React.useMemo(() => {
    if (typeof value === 'number') {
      return cmToDisplay(value, unit as Unit);
    }
    return value;
  }, [value, unit, cmToDisplay]);

  // Handle numeric input change (convert display value back to cm)
  const handleNumericChange = React.useCallback((displayValue: number | '') => {
    if (typeof displayValue === 'number') {
      const cmValue = displayToCm(displayValue, unit as Unit);
      onChange(cmValue, unit);
    } else {
      onChange(displayValue, unit);
    }
  }, [unit, displayToCm, onChange]);

  // Handle unit change (convert cm value to new display unit)
  const handleUnitChange = React.useCallback((newUnit: string) => {
    // The internal cm value stays the same, only the display unit changes
    onChange(value, newUnit);
  }, [value, onChange]);

  const labelStyle = React.useMemo(() => getLabelStyle(), [getLabelStyle]);

  return (
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
        decimalPlaces={decimalPlaces}
      />
      <UnitSelector 
        unit={unit} 
        units={units} 
        onChange={handleUnitChange} 
        size={size}
        disabled={disabled}
      />
    </div>
  );
});
