/**
 * MultipleSlidersInput.tsx
 * A component to display a stack of sliders with aligned labels and values.
 */
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { SliderInput, SliderInputProps } from '../primitives/SliderInput';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
    width: '100%',
  },
});

export type SliderConfig = Omit<SliderInputProps, 'labelWidth' | 'valueWidth' | 'width' | 'size'>;

export interface MultipleSlidersInputProps {
  sliders: SliderConfig[];
  labelValueWidth: number; // The symmetric width for label and value areas
  width?: string | number;
}

export const MultipleSlidersInput: React.FC<MultipleSlidersInputProps> = ({
  sliders,
  labelValueWidth,
  width,
}) => {
  const styles = useStyles();

  const containerStyle: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {sliders.map((sliderProps) => (
        <SliderInput
          key={sliderProps.label} // Assuming label is unique for the key
          {...sliderProps}
          size="small"
          width="100%"
          labelWidth={labelValueWidth}
          valueWidth={labelValueWidth}
        />
      ))}
    </div>
  );
};

MultipleSlidersInput.displayName = 'MultipleSlidersInput';