/**
 * OrientationSelector.tsx
 * Radio button group for selecting orientation (portrait/landscape).
 */
import * as React from 'react';
import { RadioGroup, Radio, makeStyles } from '@fluentui/react-components';
import { useFormLayout } from '../../styles/FormLayoutContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  label: {
    textAlign: 'right',
    fontWeight: 'var(--fontWeightRegular)',
    color: 'var(--colorNeutralForeground1)',
    fontSize: 'var(--fontSizeBase200)',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
    minWidth: 'fit-content',
  },
  radioGroup: {
    display: 'flex',
    gap: '4px',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    minWidth: 'fit-content',
    flexShrink: 0,
    '& .fui-Radio__label': {
      fontSize: 'var(--fontSizeBase200)',
    },
  },
});

// Standard orientation options with portrait as default
export const DEFAULT_ORIENTATIONS = ['portrait', 'landscape'];
export const DEFAULT_ORIENTATION = 'portrait';

export interface OrientationSelectorProps {
  label?: string;
  orientation?: string;
  onChange: (orientation: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onError?: (error: Error) => void;
}

export const OrientationSelector = React.memo<OrientationSelectorProps>(({ 
  label = 'Orientation',
  orientation = DEFAULT_ORIENTATION, 
  onChange,
  size = 'medium',
  disabled = false,
  onError
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

  const handleChange = React.useCallback((ev: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
    try {
      onChange(data.value);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in orientation change');
      onError?.(errorObj);
    }
  }, [onChange, onError]);

  const labelStyle = React.useMemo(() => getLabelStyle(), [getLabelStyle]);
  const containerStyle = React.useMemo(() => {
    try {
      return {
        width: `${layout.labelWidth + layout.combinedControlWidth}px`
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container style calculation');
      onError?.(errorObj);
      return { width: '200px' }; // Return fallback width
    }
  }, [layout.labelWidth, layout.combinedControlWidth, onError]);

  return (
    <div className={styles.container} style={containerStyle}>
        <div className={styles.label} style={labelStyle}>
          {label}:&nbsp;
        </div>
        <RadioGroup 
          value={orientation} 
          onChange={handleChange}
          className={styles.radioGroup}
          disabled={disabled}
        >
          <Radio value="portrait" label="Portrait" />
          <Radio value="landscape" label="Landscape" />
        </RadioGroup>
      </div>
  );
}); 