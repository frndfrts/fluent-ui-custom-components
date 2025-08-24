/**
 * PaperSelector.tsx
 * Dropdown component to select a paper size with custom option.
 * Contains comprehensive list of standard paper types and dimensions.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useFormLayout } from '../../styles/FormLayoutContext';
import { UniversalSelector } from '../primitives/UniversalSelector';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
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

// Standard paper dimensions in cm (portrait orientation)
export const STANDARD_PAPER_DIMENSIONS: Record<string, { width: number; height: number }> = {
  'A0': { width: 84.1, height: 118.9 },
  'A1': { width: 59.4, height: 84.1 },
  'A2': { width: 42.0, height: 59.4 },
  'A3': { width: 29.7, height: 42.0 },
  'A4': { width: 21.0, height: 29.7 },
  'A5': { width: 14.8, height: 21.0 },
  'A6': { width: 10.5, height: 14.8 },
  'Letter': { width: 21.6, height: 27.9 },
  'Legal': { width: 21.6, height: 35.6 },
  'Tabloid': { width: 27.9, height: 43.2 },
  'Custom': { width: 0, height: 0 }, // Placeholder for custom dimensions
};

// Comprehensive list of standard paper sizes (Custom is always last)
export const STANDARD_PAPER_SIZES = [
  'A0',
  'A1', 
  'A2',
  'A3',
  'A4',
  'A5',
  'A6',
  'Letter',
  'Legal',
  'Tabloid',
  'Custom'
];

export interface PaperSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onError?: (error: Error) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  showLabel?: boolean;
  labelText?: string;
}

export const PaperSelector = React.memo<PaperSelectorProps>(({ 
  value, 
  onChange,
  onError,
  size = 'medium',
  disabled = false,
  showLabel = true,
  labelText = 'Paper Type:',
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

  return (
    <div className={styles.container}>
      {showLabel && (
        <div className={styles.label} style={labelStyle}>
          {labelText}&nbsp;
        </div>
      )}
      <UniversalSelector
        value={value}
        options={STANDARD_PAPER_SIZES}
        onChange={onChange}
        width={selectorWidth}
        minWidth={undefined}
        maxWidth={undefined}
        fullWidth={false}
        showCustomOption={false}
        customOptionText="Custom"
        sortAlphabetically={false}
        disabled={disabled}
        onError={onError}
      />
    </div>
  );
}); 