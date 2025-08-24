/**
 * LabeledColorHexInput.tsx
 * Composition component that combines a label with ColorHexInput.
 * The label is right-aligned and precedes the color swatch with a colon.
 */
import * as React from 'react';
import { makeStyles, Label } from '@fluentui/react-components';
import { ColorHexInput } from './ColorHexInput';
import { ColorHexInputProps } from './ColorHexInput';

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
  colorInputContainer: {
    flexGrow: 1,
    minWidth: 0,
  },
});

export interface LabeledColorHexInputProps extends Omit<ColorHexInputProps, 'fullWidth'> {
  /** The label text to display */
  label: string;
  /** Whether the label should be required (adds asterisk) */
  required?: boolean;
  /** Custom width for the label container */
  labelWidth?: string | number;
}

export const LabeledColorHexInput: React.FC<LabeledColorHexInputProps> = React.memo(({
  label,
  required = false,
  labelWidth,
  ...colorHexInputProps
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
      <div className={styles.colorInputContainer}>
        <ColorHexInput
          {...colorHexInputProps}
          fullWidth={false}
        />
      </div>
    </div>
  );
});

LabeledColorHexInput.displayName = 'LabeledColorHexInput';
