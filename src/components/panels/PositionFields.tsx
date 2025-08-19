
/**
 * PositionFields.tsx
 * Panel for position selection and X/Y position inputs using DimensionInput.
 */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { PositionSelector } from '../components/PositionSelector';
import { DimensionInput } from '../compositions/DimensionInput';
import { FormLayoutProvider, useFormLayout } from '../../styles/FormLayoutContext';
import { getGridTemplateColumns } from '../../styles/layoutTokens';

const useStyles = makeStyles({
  group: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
    width: '100%',
    maxWidth: '320px',
    minWidth: '240px',
  },
  row: {
    display: 'grid',
    gridAutoRows: 'auto',
    alignItems: 'center',
    columnGap: '0px',
  },
  labelCell: {
    justifySelf: 'end',
    color: 'var(--colorNeutralForeground1)',
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

const PositionFieldsInner = ({ 
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
}: PositionFieldsProps) => {
  const styles = useStyles();
  const layout = useFormLayout();

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

  const gridTemplateColumns = getGridTemplateColumns(layout.size);

  return (
    <div className={styles.group}>
      {/* Row 1: Position (spans numeric + gap + unit) */}
      <div className={styles.row} style={{ gridTemplateColumns }}>
        <div className={styles.labelCell}>Position:&nbsp;</div>
        <div style={{ gridColumn: '2 / span 3' }}>
          <PositionSelector
            position={position}
            positions={positions}
            onChange={handlePositionChange}
            size={size}
            disabled={disabled}
            hideLabel={true}
            fullWidth={true}
          />
        </div>
      </div>

      {/* Row 2: Horizontal */}
      <div className={styles.row} style={{ gridTemplateColumns }}>
        <div className={styles.labelCell}>Horizontal:&nbsp;</div>
        <DimensionInput 
          label=""
          value={x} 
          unit={xUnit} 
          units={units} 
          onChange={handleXChange}
          disabled={arePositionFieldsDisabled}
          size={size}
          hideLabel={true}
        />
      </div>

      {/* Row 3: Vertical */}
      <div className={styles.row} style={{ gridTemplateColumns }}>
        <div className={styles.labelCell}>Vertical:&nbsp;</div>
        <DimensionInput 
          label=""
          value={y} 
          unit={yUnit} 
          units={units} 
          onChange={handleYChange}
          disabled={arePositionFieldsDisabled}
          size={size}
          hideLabel={true}
        />
      </div>
    </div>
  );
};

export const PositionFields = React.memo<PositionFieldsProps>((props) => {
  return (
    <FormLayoutProvider size={props.size}>
      <PositionFieldsInner {...props} />
    </FormLayoutProvider>
  );
});
