/**
 * AspectRatioSelector.tsx
 * Dropdown component to select aspect ratio with custom option.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { UniversalSelector } from './UniversalSelector';

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

export interface AspectRatioSelectorProps {
  label?: string;
  aspectRatio: string;
  aspectRatios: string[];
  onChange: (aspectRatio: string) => void;
  size?: 'small' | 'medium' | 'large';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
  customOptionText?: string;
  sortAlphabetically?: boolean;
  disabled?: boolean;
}

export const AspectRatioSelector = React.memo<AspectRatioSelectorProps>(({ 
  label = 'Aspect Ratio',
  aspectRatio, 
  aspectRatios, 
  onChange,
  size = 'medium',
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  customOptionText = 'Custom',
  sortAlphabetically = false,
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

  // AspectRatioSelector defines its own sizing logic
  const getAspectRatioSelectorWidth = React.useCallback(() => {
    if (width) return width;
    if (fullWidth) return '100%';
    
    if (size === 'small') return '100px';
    if (size === 'large') return '140px';
    return '120px'; // medium default
  }, [width, fullWidth, size]);

  const labelClassName = React.useMemo(() => getLabelClassName(), [getLabelClassName]);

  return (
    <div className={styles.container}>
      <div className={labelClassName}>
        {label}:&nbsp;
      </div>
      <UniversalSelector
        value={aspectRatio}
        options={aspectRatios}
        onChange={onChange}
        width={getAspectRatioSelectorWidth()}
        minWidth={minWidth}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        showCustomOption={true}
        customOptionText={customOptionText}
        sortAlphabetically={sortAlphabetically}
        disabled={disabled}
      />
    </div>
  );
}); 