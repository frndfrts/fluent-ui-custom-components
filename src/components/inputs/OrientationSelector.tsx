/**
 * OrientationSelector.tsx
 * Radio button group for selecting orientation (portrait/landscape).
 */
import * as React from 'react';
import { RadioGroup, Radio, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    // Atomic component must be immune to parent layout
    width: 'fit-content',
    minWidth: 'fit-content',
    // Override any parent grid/flex layout
    gridColumn: '1 / -1',
    gridRow: 'auto',
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
    flexShrink: 0,
    // Ensure label maintains its size
    minWidth: 'fit-content',
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
  radioGroup: {
    display: 'flex',
    gap: '8px',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    // Ensure radio group maintains horizontal layout
    minWidth: 'fit-content',
    flexShrink: 0,
  },
});

export interface OrientationSelectorProps {
  label?: string;
  orientation: string;
  onChange: (orientation: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const OrientationSelector = React.memo<OrientationSelectorProps>(({ 
  label = 'Orientation',
  orientation, 
  onChange,
  size = 'medium',
  disabled = false
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

  const handleChange = React.useCallback((ev: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
    onChange(data.value);
  }, [onChange]);

  const labelClassName = React.useMemo(() => getLabelClassName(), [getLabelClassName]);

  return (
    <div style={{ display: 'block', width: 'fit-content' }}>
      <div className={styles.container}>
        <div className={labelClassName}>
          {label}:&nbsp;
        </div>
        <RadioGroup 
          value={orientation} 
          onChange={handleChange}
          className={styles.radioGroup}
          layout="horizontal"
          disabled={disabled}
        >
          <Radio value="portrait" label="Portrait" />
          <Radio value="landscape" label="Landscape" />
        </RadioGroup>
      </div>
    </div>
  );
}); 