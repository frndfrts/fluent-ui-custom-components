/**
 * LockAspectRatio.tsx
 * Checkbox component for locking aspect ratio with integrated label.
 */
import * as React from 'react';
import { Checkbox, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    maxWidth: '320px',
    margin: '0 auto',
  },
  label: {
    fontWeight: 'normal',
    color: 'var(--colorNeutralForeground1)',
    fontSize: 'inherit',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
});

export interface LockAspectRatioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const LockAspectRatio = React.memo<LockAspectRatioProps>(({
  checked,
  onChange,
  onError,
  disabled = false,
  size = 'medium',
}) => {
  const styles = useStyles();

  const handleChange = React.useCallback((ev: React.FormEvent<HTMLInputElement>) => {
    try {
      onChange(ev.currentTarget.checked);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in aspect ratio lock change');
      onError?.(errorObj);
    }
  }, [onChange, onError]);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        Lock aspect ratio:&nbsp;
      </div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
});
