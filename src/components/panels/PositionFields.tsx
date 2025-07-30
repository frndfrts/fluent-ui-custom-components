
/**
 * PositionFields.tsx
 * Panel for position selection and X/Y position inputs using DimensionInput.
 */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { PositionSelector } from '../components/PositionSelector';
import { DimensionInput } from '../inputs/DimensionInput';

const useStyles = makeStyles({
  group: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
    width: '100%',
    maxWidth: '320px',
    minWidth: '240px',
  },
});

export interface PositionFieldsProps {
  position: string;
  positions: string[];
  x: number;
  y: number;
  xUnit: string;
  yUnit: string;
  units: string[];
  onChange: (fields: { 
    position: string;
    x: number; 
    y: number; 
    xUnit: string; 
    yUnit: string; 
  }) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const PositionFields = React.memo<PositionFieldsProps>(({
  position,
  positions,
  x,
  y,
  xUnit,
  yUnit,
  units,
  onChange,
  size = 'medium',
  disabled = false,
}) => {
  const styles = useStyles();

  // Check if position fields should be disabled (when a preset position is selected)
  const arePositionFieldsDisabled = React.useMemo(() => {
    return disabled || position !== 'Custom';
  }, [disabled, position]);

  const handlePositionChange = React.useCallback((newPosition: string) => {
    onChange({ 
      position: newPosition,
      x, 
      y, 
      xUnit, 
      yUnit 
    });
  }, [x, y, xUnit, yUnit, onChange]);

  const handleXChange = React.useCallback((val: number | '', u: string) => {
    onChange({ 
      position,
      x: val || 0, 
      y, 
      xUnit: u, 
      yUnit 
    });
  }, [position, y, yUnit, onChange]);

  const handleYChange = React.useCallback((val: number | '', u: string) => {
    onChange({ 
      position,
      x, 
      y: val || 0, 
      xUnit, 
      yUnit: u 
    });
  }, [position, x, xUnit, onChange]);

  return (
    <div className={styles.group}>
      <PositionSelector
        label="Position"
        position={position}
        positions={positions}
        onChange={handlePositionChange}
        size={size}
        disabled={disabled}
      />
      <DimensionInput 
        label="Horizontal" 
        value={x} 
        unit={xUnit} 
        units={units} 
        onChange={handleXChange}
        disabled={arePositionFieldsDisabled}
        size={size}
      />
      <DimensionInput 
        label="Vertical" 
        value={y} 
        unit={yUnit} 
        units={units} 
        onChange={handleYChange}
        disabled={arePositionFieldsDisabled}
        size={size}
      />
    </div>
  );
});
