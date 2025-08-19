/**
 * PaperSelector.tsx
 * Dropdown component to select a paper size with custom option.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useFormLayout } from '../../styles/FormLayoutContext';
import { UniversalSelector } from './UniversalSelector';

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
  const layout = useFormLayout();

  const getLabelStyle = React.useCallback((): React.CSSProperties => {
    return { width: `${layout.labelWidth}px` };
  }, [layout.labelWidth]);

  // PaperSelector defines its own sizing logic
  const getPaperSelectorWidth = React.useCallback(() => {
    if (width) return width;
    if (fullWidth) return '100%';
    // Align to combined control area
    return `${layout.combinedControlWidth}px`;
  }, [width, fullWidth, layout.combinedControlWidth]);

  const labelStyle = React.useMemo(() => getLabelStyle(), [getLabelStyle]);

  return (
    <div className={styles.container}>
      <div className={styles.label} style={labelStyle}>
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