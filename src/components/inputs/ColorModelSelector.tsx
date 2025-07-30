/**
 * ColorModelSelector.tsx
 * Radio button group for selecting color model (RGB/HSL).
 */
import * as React from 'react';
import { RadioGroup, Radio, makeStyles } from '@fluentui/react-components';
import { ColorModel } from './ColorInput';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '240px',
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
  labelSmall: {
    width: '60px',
  },
  labelMedium: {
    width: '80px',
  },
  labelLarge: {
    width: '100px',
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

export interface ColorModelSelectorProps {
  label?: string;
  colorModel: ColorModel;
  onChange: (colorModel: ColorModel) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const ColorModelSelector = React.memo<ColorModelSelectorProps>(({ 
  label = 'Color Model',
  colorModel, 
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
    onChange(data.value as ColorModel);
  }, [onChange]);

  const labelClassName = React.useMemo(() => getLabelClassName(), [getLabelClassName]);

  return (
    <div className={styles.container}>
        <div className={labelClassName}>
          {label}:&nbsp;
        </div>
        <RadioGroup 
          value={colorModel} 
          onChange={handleChange}
          className={styles.radioGroup}
          layout="horizontal"
          disabled={disabled}
        >
          <Radio value="rgb" label="RGB" />
          <Radio value="hsl" label="HSL" />
        </RadioGroup>
      </div>
  );
}); 