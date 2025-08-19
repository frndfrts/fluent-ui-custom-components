/**
 * PositionSelector.tsx
 * Dropdown component to select a position with custom option.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { UniversalSelector } from './UniversalSelector';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px', // Same gap as DimensionInput
    width: '100%',
    maxWidth: '320px',
    minWidth: '240px',
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

  const getLabelClassName = React.useCallback(() => {
    const baseClass = styles.label;
    if (size === 'small') {
      return `${baseClass} ${styles.labelSmall}`;
    } else if (size === 'large') {
      return `${baseClass} ${styles.labelLarge}`;
    } else {
      return `${baseClass} ${styles.labelMedium}`;
    }
  }, [styles.label, styles.labelSmall, styles.labelMedium, styles.labelLarge, size]);

  // Calculate the exact width needed to match DimensionInput layout
  // Width must equal: NumericInput + gap + UnitSelector to align left edges correctly
  const getSelectorWidth = React.useCallback(() => {
    if (size === 'small') {
      return 80 + 4 + 60; // NumericInput small + gap + UnitSelector small
    } else if (size === 'large') {
      return 160 + 4 + 80; // NumericInput large + gap + UnitSelector large
    } else {
      return 120 + 4 + 70; // NumericInput medium + gap + UnitSelector medium
    }
  }, [size]);

  const selectorWidth = React.useMemo(() => getSelectorWidth(), [getSelectorWidth]);
  const labelClassName = React.useMemo(() => getLabelClassName(), [getLabelClassName]);

  return (
    <div className={styles.container}>
      {!hideLabel && (
        <div className={labelClassName}>
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