/**
 * LockAspectRatio.tsx
 * Checkbox component for locking aspect ratio with integrated label.
 */
import * as React from 'react';
import { Checkbox, makeStyles } from '@fluentui/react-components';
import { useFormLayout } from '../../styles/FormLayoutContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
  },
  label: {
    fontWeight: 'normal',
    color: 'var(--colorNeutralForeground1)',
    fontSize: 'inherit',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    margin: 0,
  },
});

export interface LockAspectRatioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const LockAspectRatio = React.memo<LockAspectRatioProps>(({
  checked,
  onChange,
  disabled = false,
  size = 'medium',
}) => {
  const styles = useStyles();
  const layout = useFormLayout();

  const getContainerStyle = React.useCallback((): React.CSSProperties => {
    return {
      marginLeft: `${layout.labelWidth}px`,
      width: `${layout.combinedControlWidth}px`,
    };
  }, [layout.labelWidth, layout.combinedControlWidth]);

  const containerStyle = React.useMemo(() => getContainerStyle(), [getContainerStyle]);

  const handleChange = React.useCallback((e: React.FormEvent<HTMLInputElement>, data: { checked: string | boolean }) => {
    onChange(Boolean(data.checked));
  }, [onChange]);

  return (
    <div className={styles.container} style={containerStyle}>
      <div className={styles.label}>
        Lock aspect ratio:&nbsp;
      </div>
      <Checkbox
        className={styles.checkbox}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
});
