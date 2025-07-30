import * as React from 'react';
import { Slider, RadioGroup, Radio, makeStyles } from '@fluentui/react-components';

export type ColorModel = 'rgb' | 'hsl';

export interface ColorInputProps {
  hexValue: string;
  onHexChange: (hex: string) => void;
  red: number;
  green: number;
  blue: number;
  hue: number;
  saturation: number;
  lightness: number;
  onRedChange: (value: number) => void;
  onGreenChange: (value: number) => void;
  onBlueChange: (value: number) => void;
  onHueChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
  onLightnessChange: (value: number) => void;
  colorModel: ColorModel;
  onColorModelChange: (model: ColorModel) => void;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
    alignItems: 'flex-start',
  },
  colorModelToggle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 'var(--spacingHorizontalM)',
  },
  colorControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    gap: 'var(--spacingHorizontalM)',
  },
  liveColorPreview: {
    width: '90px',
    height: '90px',
    border: '2px solid var(--colorNeutralStroke2)',
    borderRadius: 'var(--borderRadiusMedium)',
    flexShrink: 0,
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalS)',
    flex: 1,
    minWidth: '200px',
  },
  colorControlRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
  },
  colorControlLabel: {
    minWidth: '12px',
    textAlign: 'left',
    fontSize: 'var(--fontSizeBase200)',
    fontWeight: 'var(--fontWeightRegular)',
  },
  colorControlValue: {
    minWidth: '32px',
    textAlign: 'right',
    fontSize: 'var(--fontSizeBase200)',
    fontWeight: 'var(--fontWeightRegular)',
  },
});

export const ColorInput: React.FC<ColorInputProps> = ({
  hexValue,
  red,
  green,
  blue,
  hue,
  saturation,
  lightness,
  onRedChange,
  onGreenChange,
  onBlueChange,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  colorModel,
  onColorModelChange,
}) => {
  const styles = useStyles();

  const previewColorStyle = {
    background: hexValue,
  };

  return (
    <div className={styles.container}>
      <div className={styles.colorModelToggle}>
        <RadioGroup
          value={colorModel}
          onChange={(e, data) => onColorModelChange(data.value as ColorModel)}
          layout="horizontal"
        >
          <Radio value="rgb" label="RGB" />
          <Radio value="hsl" label="HSL" />
        </RadioGroup>
      </div>

      <div className={styles.colorControls}>
        <div className={styles.liveColorPreview} style={previewColorStyle} />
        
        <div className={styles.sliderContainer}>
          {colorModel === 'rgb' ? (
            <>
              <div className={styles.colorControlRow}>
                <span className={styles.colorControlLabel}>R</span>
                <Slider
                  min={0}
                  max={255}
                  value={red}
                  onChange={(e, data) => onRedChange(data.value)}
                  size="small"
                />
                <span className={styles.colorControlValue}>{red}</span>
              </div>
              <div className={styles.colorControlRow}>
                <span className={styles.colorControlLabel}>G</span>
                <Slider
                  min={0}
                  max={255}
                  value={green}
                  onChange={(e, data) => onGreenChange(data.value)}
                  size="small"
                />
                <span className={styles.colorControlValue}>{green}</span>
              </div>
              <div className={styles.colorControlRow}>
                <span className={styles.colorControlLabel}>B</span>
                <Slider
                  min={0}
                  max={255}
                  value={blue}
                  onChange={(e, data) => onBlueChange(data.value)}
                  size="small"
                />
                <span className={styles.colorControlValue}>{blue}</span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.colorControlRow}>
                <span className={styles.colorControlLabel}>H</span>
                <Slider
                  min={0}
                  max={360}
                  value={hue}
                  onChange={(e, data) => onHueChange(data.value)}
                  size="small"
                />
                <span className={styles.colorControlValue}>{hue}</span>
              </div>
              <div className={styles.colorControlRow}>
                <span className={styles.colorControlLabel}>S</span>
                <Slider
                  min={0}
                  max={100}
                  value={saturation}
                  onChange={(e, data) => onSaturationChange(data.value)}
                  size="small"
                />
                <span className={styles.colorControlValue}>{saturation}%</span>
              </div>
              <div className={styles.colorControlRow}>
                <span className={styles.colorControlLabel}>L</span>
                <Slider
                  min={0}
                  max={100}
                  value={lightness}
                  onChange={(e, data) => onLightnessChange(data.value)}
                  size="small"
                />
                <span className={styles.colorControlValue}>{lightness}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 