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
    gap: '4px',
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

  const getLabelStyle = React.useCallback((): React.CSSProperties => {
    return { width: `${layout.labelWidth}px` };
  }, [layout.labelWidth]);

  const labelStyle = React.useMemo(() => getLabelStyle(), [getLabelStyle]);

  const handleChange = React.useCallback((e: React.FormEvent<HTMLInputElement>, data: { checked: string | boolean }) => {
    onChange(Boolean(data.checked));
  }, [onChange]);

  return (
    <div className={styles.container}>
      <div className={styles.label} style={labelStyle}>
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
