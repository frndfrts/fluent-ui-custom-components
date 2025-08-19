/**
 * PositionSelector.tsx
 * Dropdown component to select a position with custom option.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useFormLayout } from '../../styles/FormLayoutContext';
import { UniversalSelector } from './UniversalSelector';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px', // Same gap as DimensionInput
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
  labelFixed: {},

});

export interface PositionSelectorProps {
  label?: string;
  position: string;
  positions: string[];
  onChange: (position: string) => void;
  size?: 'small' | 'medium' | 'large';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
  customOptionText?: string;
  sortAlphabetically?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
}

export const PositionSelector = React.memo<PositionSelectorProps>(({ 
  label = 'Position',
  position, 
  positions, 
  onChange,
  size = 'medium',
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  customOptionText = 'Custom',
  sortAlphabetically = false,
  disabled = false,
  hideLabel = false,
}) => {
  const styles = useStyles();
  const layout = useFormLayout();

  const getLabelStyle = React.useCallback((): React.CSSProperties => {
    return { width: `${layout.labelWidth}px` };
  }, [layout.labelWidth]);

  // Calculate the exact width needed to match DimensionInput layout
  // Width must equal: NumericInput + gap + UnitSelector to align left edges correctly
  const getSelectorWidth = React.useCallback(() => {
    return layout.combinedControlWidth;
  }, [layout.combinedControlWidth]);

  const selectorWidth = React.useMemo(() => getSelectorWidth(), [getSelectorWidth]);
  const labelStyle = React.useMemo(() => getLabelStyle(), [getLabelStyle]);

  return (
    <div className={styles.container}>
      {!hideLabel && (
        <div className={styles.label} style={labelStyle}>
          {label}:&nbsp;
        </div>
      )}
      <UniversalSelector
        value={position}
        options={positions}
        onChange={onChange}
        width={selectorWidth} // Use calculated width for perfect alignment
        minWidth={minWidth}
        maxWidth={maxWidth}
        fullWidth={false} // Use calculated width instead of full width
        showCustomOption={true}
        customOptionText={customOptionText}
        sortAlphabetically={sortAlphabetically}
        disabled={disabled}
      />
    </div>
  );
}); 