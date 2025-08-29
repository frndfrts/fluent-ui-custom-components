/**
 * PositionSelector.tsx
 * Dropdown component to select a position with custom option.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useFormLayout } from '../../styles/FormLayoutContext';
import { UniversalSelector } from '../primitives/UniversalSelector';

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

// Standard position options with Custom as default (complete 3x3 grid + center + custom)
export const DEFAULT_POSITIONS = [
  'top-left', 'top-center', 'top-right',
  'middle-left', 'middle-center', 'middle-right',
  'bottom-left', 'bottom-center', 'bottom-right',
  'Custom'
];
export const DEFAULT_POSITION = 'top-left';

export interface PositionSelectorProps {
  value?: string;
  options?: string[];
  onChange: (value: string) => void;
  onError?: (error: Error) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const PositionSelector = React.memo<PositionSelectorProps>(({
  value = DEFAULT_POSITION,
  options = DEFAULT_POSITIONS,
  onChange,
  onError,
  size = 'medium',
  disabled = false,
}) => {
  const styles = useStyles();
  const layout = useFormLayout();

  const getLabelStyle = React.useCallback((): React.CSSProperties => {
    try {
      return { width: `${layout.labelWidth}px` };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in label style calculation');
      onError?.(errorObj);
      return { width: '100px' }; // Return fallback width
    }
  }, [layout.labelWidth, onError]);

  // Calculate the exact width needed to match DimensionInput layout
  // Width must equal: NumericInput + gap + UnitSelector to align left edges correctly
  const getSelectorWidth = React.useCallback(() => {
    try {
      return layout.combinedControlWidth;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in selector width calculation');
      onError?.(errorObj);
      return 200; // Return fallback width
    }
  }, [layout.combinedControlWidth, onError]);

  const selectorWidth = React.useMemo(() => {
    try {
      return getSelectorWidth();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in selector width memo');
      onError?.(errorObj);
      return 200; // Return fallback width
    }
  }, [getSelectorWidth, onError]);

  const labelStyle = React.useMemo(() => {
    try {
      return getLabelStyle();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in label style memo');
      onError?.(errorObj);
      return { width: '100px' }; // Return fallback width
    }
  }, [getLabelStyle, onError]);

  // Function to capitalize position labels for display
  const capitalizePosition = React.useCallback((position: string): string => {
    if (position === 'Custom') return 'Custom';
    return position.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }, []);

  // Create display options with proper capitalization
  const displayOptions = React.useMemo(() => {
    return options.map(option => ({
      value: option,
      label: capitalizePosition(option)
    }));
  }, [options, capitalizePosition]);

  const handlePositionChange = React.useCallback((selectedValue: string) => {
    onChange(selectedValue);
  }, [onChange]);

  return (
    <div className={styles.container}>
      <div className={styles.label} style={labelStyle}>
        Position:&nbsp;
      </div>
      <UniversalSelector
        value={value}
        options={displayOptions}
        onChange={handlePositionChange}
        width={selectorWidth} // Use calculated width for perfect alignment
        minWidth={undefined}
        maxWidth={undefined}
        fullWidth={false} // Use calculated width instead of full width
        showCustomOption={false} // Don't add duplicate Custom since it's already in the options
        customOptionText=""
        sortAlphabetically={false}
        disabled={disabled}
        onError={onError}
      />
    </div>
  );
}); 