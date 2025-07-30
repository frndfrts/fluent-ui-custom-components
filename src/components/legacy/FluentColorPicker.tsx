/**
 * FluentColorPicker.tsx
 * Fluent UI v9 ColorPicker component wrapper.
 * Professional color picker using Fluent UI's built-in ColorPicker components.
 */
import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import {
  makeStyles,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  Text,
  Input,
  Label,
  SpinButton,
  useId,
} from '@fluentui/react-components';
import { ColorPicker, ColorArea, ColorSlider, AlphaSlider } from '@fluentui/react-color-picker';
import type { ColorPickerProps, InputProps, SpinButtonChangeEvent, SpinButtonOnChangeData } from '@fluentui/react-components';

import { useCommonStyles } from '../../styles/commonStyles';
import { useComponentSize } from '../../hooks/useComponentSize';
import { ColorHexInput } from '../compositions/ColorHexInput';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
  },
  popoverSurface: {
    padding: 'var(--spacingVerticalM)',
    minWidth: '320px',
    maxWidth: '320px',
  },
  colorPickerContent: {
    display: 'grid',
    rowGap: 'var(--spacingVerticalM)',
  },
  section: {
    display: 'grid',
    rowGap: 'var(--spacingVerticalS)',
  },
  sectionTitle: {
    fontSize: 'var(--fontSizeBase300)',
    fontWeight: '600',
    color: 'var(--colorNeutralForeground1)',
    marginBottom: 'var(--spacingVerticalXS)',
  },
  buttonRow: {
    display: 'flex',
    gap: 'var(--spacingHorizontalS)',
    justifyContent: 'flex-end',
    marginTop: 'var(--spacingVerticalS)',
  },
  colorPreview: {
    width: '24px',
    height: '24px',
    borderRadius: 'var(--borderRadiusSmall)',
    border: `1px solid var(--colorNeutralStroke2)`,
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  inputFields: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: '10px',
    flexWrap: 'wrap',
  },
  colorFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  input: {
    width: '96px',
  },
  spinButton: {
    minWidth: '60px',
  },
  previewColor: {
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    alignSelf: 'center',
    marginTop: '10px',
  },
});

const HEX_COLOR_REGEX = /^#?([0-9A-Fa-f]{0,8})$/;
const NUMBER_REGEX = /^\d+$/;

export interface FluentColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  allowEmpty?: boolean;
  showPreview?: boolean;
  showHexInput?: boolean;
}

export const FluentColorPicker = React.memo<FluentColorPickerProps>(({
  value,
  onChange,
  size = 'medium',
  disabled = false,
  className,
  placeholder = '#000000',
  allowEmpty = false,
  showPreview = true,
  showHexInput = true,
}) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const sizeConfig = useComponentSize(size);

  // State for color picker
  const [isOpen, setIsOpen] = React.useState(false);
  const [previewColor, setPreviewColor] = React.useState<string>('');
  
  // Convert hex to HSV for internal state
  const hexToHsv = React.useCallback((hex: string) => {
    if (!hex || hex === '') {
      return { h: 0, s: 1, v: 0.9, a: 1 };
    }
    const color = tinycolor(hex);
    return color.isValid ? color.toHsv() : { h: 0, s: 1, v: 0.9, a: 1 };
  }, []);

  // Initialize color state
  const [color, setColor] = React.useState(() => hexToHsv(value));
  const [hex, setHex] = React.useState(value);
  const [rgb, setRgb] = React.useState(() => tinycolor(value).toRgb());
  const [alpha, setAlpha] = React.useState(() => hexToHsv(value).a || 1);

  // Update state when value prop changes
  React.useEffect(() => {
    const newColor = hexToHsv(value);
    setColor(newColor);
    setHex(value);
    setRgb(tinycolor(value).toRgb());
    setAlpha(newColor.a || 1);
  }, [value, hexToHsv]);

  // Handle color change from ColorPicker
  const handleColorChange: ColorPickerProps['onColorChange'] = React.useCallback((event: any, data: any) => {
    const newColor = { ...data.color, a: data.color.a ?? 1 };
    setColor(newColor);
    setHex(tinycolor(newColor).toHexString());
    setRgb(tinycolor(newColor).toRgb());
    setAlpha(newColor.a);
    setPreviewColor(tinycolor(newColor).toHexString());
  }, []);

  // Handle RGB changes
  const onRgbChange = React.useCallback((event: any, data: SpinButtonOnChangeData & { name: string }) => {
    const newColor = tinycolor({ ...rgb, [data.name]: data.value });
    if (newColor.isValid) {
      const hsv = newColor.toHsv();
      setColor(hsv);
      setHex(newColor.toHex());
      setRgb(newColor.toRgb());
      setPreviewColor(newColor.toHex());
    }
  }, [rgb]);

  // Handle alpha changes
  const onAlphaChange = React.useCallback((_ev: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
    const value = data.value ?? parseFloat(data.displayValue ?? '');
    if (Number.isNaN(value) || value < 0 || value > 1) {
      return;
    }
    const newColor = tinycolor({ ...color, a: value });
    if (newColor.isValid) {
      const hsv = newColor.toHsv();
      setColor(hsv);
      setHex(newColor.toHex());
      setRgb(newColor.toRgb());
      setAlpha(newColor.a);
      setPreviewColor(newColor.toHex());
    }
  }, [color]);

  // Handle hex input changes
  const onHexChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newColor = tinycolor(value);
    if (newColor.isValid) {
      const hsv = newColor.toHsv();
      setColor(hsv);
      setRgb(newColor.toRgb());
      setAlpha(newColor.a);
      setPreviewColor(newColor.toHex());
    }
    setHex(HEX_COLOR_REGEX.test(value) ? value : hex);
  }, [hex]);

  // Handle popover open/close
  const handlePopoverChange = React.useCallback((e: any, data: { open: boolean }) => {
    if (data.open) {
      setPreviewColor(value);
    } else {
      setPreviewColor('');
    }
    setIsOpen(data.open);
  }, [value]);

  // Commit the current preview color
  const handleCommitColor = React.useCallback(() => {
    if (previewColor && previewColor !== '') {
      onChange(previewColor);
    }
    setIsOpen(false);
  }, [previewColor, onChange]);

  // Handle keyboard events
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommitColor();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  }, [handleCommitColor]);

  // Container styles
  const containerStyles = React.useMemo(() => ({
    width: sizeConfig.width,
    gap: sizeConfig.gap,
  }), [sizeConfig]);

  const colorAriaAttributes = {
    'aria-roledescription': '2D slider',
    'aria-valuetext': `Saturation ${color.s * 100}, Brightness: ${color.v * 100}`,
  };

  return (
    <div 
      className={`${styles.container} ${commonStyles.container} ${className || ''}`}
      style={containerStyles}
    >
      <Popover 
        open={isOpen} 
        onOpenChange={handlePopoverChange}
        positioning={{
          position: 'below',
          align: 'start',
          offset: { mainAxis: 4, crossAxis: 0 },
        }}
      >
        <PopoverTrigger>
          <div data-color-picker-trigger>
            <ColorHexInput
              value={value}
              onChange={onChange}
              length={6}
              size={size}
              disabled={disabled}
              placeholder={placeholder}
              swatchClickable={true}
              onSwatchClick={() => !disabled && setIsOpen(true)}
            />
          </div>
        </PopoverTrigger>
        <PopoverSurface className={styles.popoverSurface}>
          <div 
            className={styles.colorPickerContent}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Fluent UI ColorPicker */}
            <div className={styles.section}>
              <Text className={styles.sectionTitle}>Color Picker</Text>
              <ColorPicker color={color} onColorChange={handleColorChange}>
                <ColorArea
                  inputX={{ 'aria-label': 'Saturation', ...colorAriaAttributes }}
                  inputY={{ 'aria-label': 'Brightness', ...colorAriaAttributes }}
                />
                <ColorSlider
                  aria-label="Hue"
                  aria-valuetext={`${color.h}°`}
                />
                <AlphaSlider 
                  aria-label="Alpha" 
                  aria-valuetext={`${color.a * 100}%`} 
                />
              </ColorPicker>
            </div>

            {/* Input Fields */}
            <div className={styles.section}>
              <Text className={styles.sectionTitle}>Color Values</Text>
              <div className={styles.inputFields}>
                <InputHexField
                  value={hex}
                  onChange={onHexChange}
                />
                <InputRgbField
                  label="Red"
                  value={rgb.r}
                  name="r"
                  onChange={onRgbChange}
                />
                <InputRgbField
                  label="Green"
                  value={rgb.g}
                  name="g"
                  onChange={onRgbChange}
                />
                <InputRgbField
                  label="Blue"
                  value={rgb.b}
                  name="b"
                  onChange={onRgbChange}
                />
                <InputAlphaField 
                  value={alpha} 
                  onChange={onAlphaChange} 
                />
              </div>
            </div>

            {/* Color Preview */}
            <div 
              className={styles.previewColor}
              style={{ backgroundColor: tinycolor(color).toRgbString() }}
            />

            {/* Action Buttons */}
            <div className={styles.buttonRow}>
              <Button 
                appearance="subtle" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                appearance="primary" 
                onClick={handleCommitColor}
                disabled={!previewColor || previewColor === ''}
              >
                OK
              </Button>
            </div>
          </div>
        </PopoverSurface>
      </Popover>
    </div>
  );
});

// Helper components
const InputHexField = ({
  label = "Hex",
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: InputProps['onChange'];
}) => {
  const styles = useStyles();
  const id = useId('hex-input');
  
  return (
    <div className={styles.colorFieldWrapper}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        className={styles.input}
        value={value}
        id={id}
        onChange={onChange}
        onBlur={(e) => {
          const value = tinycolor(e.target.value);
          if (!value.isValid) {
            e.target.setAttribute('aria-invalid', 'true');
          } else {
            e.target.removeAttribute('aria-invalid');
          }
        }}
      />
    </div>
  );
};

interface InputRgbFieldProps {
  value: number;
  label: string;
  name: string;
  onChange?: (
    event: SpinButtonChangeEvent,
    data: SpinButtonOnChangeData & { name: string }
  ) => void;
}

const InputRgbField = ({
  value,
  onChange,
  label,
  name,
}: InputRgbFieldProps) => {
  const id = useId(`${label.toLowerCase()}-input`);
  const styles = useStyles();

  const handleChange = React.useCallback(
    (event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      const val = data.value ?? parseFloat(data.displayValue ?? '');
      if (val === null || Number.isNaN(val) || !NUMBER_REGEX.test(val.toString())) {
        return;
      }
      if (onChange) {
        onChange(event, { ...data, value: val, name });
      }
    },
    [name, onChange]
  );

  return (
    <div className={styles.colorFieldWrapper}>
      <Label htmlFor={id}>{label}</Label>
      <SpinButton
        className={styles.spinButton}
        min={0}
        max={255}
        value={value}
        id={id}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

const InputAlphaField = ({
  label = "Alpha",
  value,
  onChange,
}: {
  value: number;
  label?: string;
  onChange?: (event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => void;
}) => {
  const styles = useStyles();
  const id = useId('alpha-input');

  return (
    <div className={styles.colorFieldWrapper}>
      <Label htmlFor={id}>{label}</Label>
      <SpinButton
        min={0}
        max={1}
        className={styles.spinButton}
        value={value}
        step={0.01}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};

FluentColorPicker.displayName = 'FluentColorPicker';