/**
 * LabeledColorPicker.tsx
 * Composition component that combines a label with ResponsiveColorPicker.
 * The label is right-aligned and precedes the color picker with a colon.
 */
import * as React from 'react';
import { makeStyles, Label } from '@fluentui/react-components';
import { ResponsiveColorPicker } from '../panels/ResponsiveColorPicker';
import { ResponsiveColorPickerProps } from '../panels/ResponsiveColorPicker';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
    width: '100%',
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: '160px',
    flexShrink: 0,
  },
  label: {
    textAlign: 'right',
    fontWeight: 'var(--fontWeightMedium)',
    color: 'var(--colorNeutralForeground1)',
  },
  colon: {
    marginLeft: 'var(--spacingHorizontalXXS)',
    color: 'var(--colorNeutralForeground1)',
  },
  colorPickerContainer: {
    flexGrow: 1,
    minWidth: 0,
  },
});

export interface LabeledColorPickerProps extends ResponsiveColorPickerProps {
  /** The label text to display */
  label: string;
  /** Whether the label should be required (adds asterisk) */
  required?: boolean;
  /** Custom width for the label container */
  labelWidth?: string | number;
}

export const LabeledColorPicker: React.FC<LabeledColorPickerProps> = React.memo(({
  label,
  required = false,
  labelWidth,
  ...responsiveColorPickerProps
}) => {
  const styles = useStyles();

  const labelContainerStyle = React.useMemo(() => {
    if (labelWidth) {
      return {
        minWidth: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth,
      };
    }
    return {};
  }, [labelWidth]);

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer} style={labelContainerStyle}>
        <Label className={styles.label} required={required}>
          {label}
        </Label>
        <span className={styles.colon}>:</span>
      </div>
      <div className={styles.colorPickerContainer}>
        <ResponsiveColorPicker
          {...responsiveColorPickerProps}
        />
      </div>
    </div>
  );
});

LabeledColorPicker.displayName = 'LabeledColorPicker';
