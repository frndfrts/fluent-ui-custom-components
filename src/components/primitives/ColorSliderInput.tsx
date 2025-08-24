import * as React from 'react';
import { SliderInput, SliderInputProps } from './SliderInput';
import { useFormLayout } from '../../styles/FormLayoutContext';

export interface ColorSliderInputProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  onError?: (error: Error) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const ColorSliderInput = React.memo<ColorSliderInputProps>((props) => {
  const layout = useFormLayout();
  
  // Calculate the same width structure as ColorModelSelector
  const containerStyle = React.useMemo(() => {
    try {
      return {
        width: `${layout.labelWidth + layout.combinedControlWidth}px`
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container style calculation');
      props.onError?.(errorObj);
      return { width: '294px' }; // Return fallback width for medium size
    }
  }, [layout.labelWidth, layout.combinedControlWidth, props.onError]);

  return (
    <div style={{
      width: '100%',
      maxWidth: '240px' // Constrain to ColorInput container width
    }}>
      <SliderInput
        {...props}
        min={props.min ?? 0}
        max={props.max ?? 255}
        step={props.step ?? 1}
      />
    </div>
  );
});

ColorSliderInput.displayName = 'ColorSliderInput';