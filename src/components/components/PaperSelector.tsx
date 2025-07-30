/**
 * PaperSelector.tsx
 * Dropdown component to select a paper size with custom option.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { UniversalSelector } from './UniversalSelector';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px', // Reduced gap for tighter integration
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

export interface PaperSelectorProps {
  label?: string;
  paperSize: string;
  paperSizes: string[];
  onChange: (paperSize: string) => void;
  size?: 'small' | 'medium' | 'large';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
  customOptionText?: string;
  sortAlphabetically?: boolean;
}

export const PaperSelector = React.memo<PaperSelectorProps>(({ 
  label = 'Paper Type',
  paperSize, 
  paperSizes, 
  onChange,
  size = 'medium',
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  customOptionText = 'Custom',
  sortAlphabetically = true
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

  // PaperSelector defines its own sizing logic
  const getPaperSelectorWidth = React.useCallback(() => {
    if (width) return width;
    if (fullWidth) return '100%';
    
    if (size === 'small') return '120px';
    if (size === 'large') return '160px';
    return '140px'; // medium default
  }, [width, fullWidth, size]);

  const labelClassName = React.useMemo(() => getLabelClassName(), [getLabelClassName]);

  return (
    <div className={styles.container}>
      <div className={labelClassName}>
        {label}:&nbsp;
      </div>
      <UniversalSelector
        value={paperSize}
        options={paperSizes}
        onChange={onChange}
        width={getPaperSelectorWidth()}
        minWidth={minWidth}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        showCustomOption={true}
        customOptionText={customOptionText}
        sortAlphabetically={sortAlphabetically}
      />
    </div>
  );
}); 