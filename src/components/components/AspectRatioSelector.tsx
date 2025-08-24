/**
 * AspectRatioSelector.tsx
 * Dropdown component to select aspect ratio with custom option.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { UniversalSelector } from '../primitives/UniversalSelector';
import { useFormLayout } from '../../styles/FormLayoutContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px', // Reduced gap for tighter integration
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

// Standard aspect ratio options with Custom as default
export const DEFAULT_ASPECT_RATIOS = ['1:1', '4:3', '16:9', '3:2', '5:4', 'Custom'];
export const DEFAULT_ASPECT_RATIO = '1:1';

export interface AspectRatioSelectorProps {
  value?: string;
  options?: string[];
  onChange: (value: string) => void;
  onError?: (error: Error) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const AspectRatioSelector = React.memo<AspectRatioSelectorProps>(({ 
  value = DEFAULT_ASPECT_RATIO, 
  options = DEFAULT_ASPECT_RATIOS, 
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
      <div className={styles.label} style={labelStyle}>
        Aspect Ratio:&nbsp;
      </div>
      <UniversalSelector
        value={value}
        options={options}
        onChange={onChange}
        width={selectorWidth}
        minWidth={undefined}
        maxWidth={undefined}
        fullWidth={false}
        showCustomOption={true}
        customOptionText="Custom"
        sortAlphabetically={true}
        disabled={disabled}
        onError={onError}
      />
    </div>
  );
}); 