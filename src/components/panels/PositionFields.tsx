
/**
 * PositionFields.tsx
 * Panel for position selection and X/Y position inputs using DimensionInput.
 */
import * as React from 'react';
import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { PositionSelector } from '../components/PositionSelector';
import { DimensionInput } from '../compositions/DimensionInput';
import { FormLayoutProvider } from '../../styles/FormLayoutContext';

const useStyles = makeStyles({
  panel: {
    display: 'grid',
    rowGap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
    width: '100%',
    maxWidth: '320px',
    minWidth: '240px',
  },
  section: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: 'var(--colorNeutralForeground1)',
    marginBottom: tokens.spacingVerticalXS,
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
    <div className={styles.panel}>
              <Text className={styles.sectionTitle}>Position</Text>
      <div className={styles.section}>
        <PositionSelector
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
