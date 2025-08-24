/**
 * SliderInput.tsx
 * Fluent UI v9 Slider with custom label and value display.
 * Uses proper Fluent UI v9 Slider API with slot-based styling.
 */
import * as React from 'react';
import { useId, Slider, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '30px 1fr 20px', // Three columns: label | slider | value
    alignItems: 'center',
    gap: '8px',
    width: '100%',
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    textAlign: 'right', // Right-align labels
    gridColumn: '1', // First column
  },
  sliderContainer: {
    position: 'relative',
    gridColumn: '2', // Middle column
    width: '100%',
  },
  value: {
    fontFamily: 'monospace',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    textAlign: 'right', // Right-align values
    gridColumn: '3', // Third column
  },
  customSlider: {
    // Custom styling for the Fluent UI v9 Slider
    '& [data-slot="rail"]': {
      backgroundColor: tokens.colorNeutralStroke2,
      borderRadius: '4px',
      height: '4px',
    },
    '& [data-slot="thumb"]': {
      backgroundColor: tokens.colorBrandBackground,
      border: `2px solid ${tokens.colorBrandStroke1}`,
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: tokens.colorBrandBackgroundHover,
      },
    },
  },
});

export interface SliderInputProps {
  value: number;
  min?: number;
  max?: number;
  step?: number; // Optional - used for onChange precision but not for slider steps
  onChange: (value: number) => void;
  onError?: (error: Error) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const SliderInput = React.memo<SliderInputProps>(({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onError,
  label,
  size = 'medium',
  disabled = false,
}) => {
  const id = useId();
  const styles = useStyles();
  
  const handleChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>, data: { value: number }) => {
    try {
      let newValue = data.value;
      
      // Apply step precision if step is defined
      if (step && step > 0) {
        newValue = Math.round(newValue / step) * step;
      }
      
      if (!isNaN(newValue)) {
        onChange(newValue);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in slider change');
      onError?.(errorObj);
    }
  }, [onChange, onError, step]);

  // Proper Fluent UI v9 Slider with slot-based styling
  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.sliderContainer}>
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          disabled={disabled}
          size="small"
          className={styles.customSlider}
          root={{
            style: {
              width: '100%',
            }
          }}
          input={{
            id: id,
            'aria-label': label || 'Slider input',
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': value,
            step: 'any', // This makes it continuous instead of stepped
          }}
        />
      </div>
      <span className={styles.value}>{value}</span>
    </div>
  );
});

SliderInput.displayName = 'SliderInput'; 
