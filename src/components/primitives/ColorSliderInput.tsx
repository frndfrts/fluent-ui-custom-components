import * as React from 'react';
import { SliderInput, SliderInputProps } from './SliderInput';

export type ColorSliderInputProps = Omit<SliderInputProps, 'min' | 'max' | 'step' | 'width' | 'minWidth' | 'maxWidth'>;

export const ColorSliderInput: React.FC<ColorSliderInputProps> = (props) => {
  const containerStyle: React.CSSProperties = {
    width: '224px', // 240px - 16px padding (8px on each side)
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle}>
      <SliderInput
        min={0}
        max={255}
        step={1}
        width="100%" // SliderInput should fill the wrapper
        labelWidth={30}
        valueWidth={30}
        {...props}
      />
    </div>
  );
};

ColorSliderInput.displayName = 'ColorSliderInput';