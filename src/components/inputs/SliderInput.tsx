/**
 * SliderInput.tsx
 * Atomic slider input component following Fluent UI guidelines.
 * Reusable slider component for numeric value selection with label and value display.
 */
import * as React from 'react';
import { Slider, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
    width: '100%', // Default to taking full width of its parent
  },
  label: {
    textAlign: 'right',
    fontSize: 'var(--fontSizeBase200)',
    fontWeight: 'var(--fontWeightRegular)',
    color: 'var(--colorNeutralForeground1)',
    flexShrink: 0, // Prevent label from shrinking
  },
  slider: {
    flexGrow: 1,
    minWidth: 0, // Prevent the slider from overflowing its container
  },
  value: {
    textAlign: 'right',
    fontSize: 'var(--fontSizeBase200)',
    fontWeight: 'var(--fontWeightRegular)',
    fontFamily: 'monospace',
    color: 'var(--colorNeutralForeground1)',
    flexShrink: 0, // Prevent value from shrinking
  },
});

export interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  suffix?: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  labelWidth?: number; // Custom label width in pixels
  valueWidth?: number; // Custom value width in pixels
  width?: string | number; // Total width of the component
  minWidth?: string | number; // Minimum width
  maxWidth?: string | number; // Maximum width
}

export const SliderInput: React.FC<SliderInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  suffix = '',
  size = 'small',
  disabled = false,
  labelWidth,
  valueWidth,
  width,
  minWidth,
  maxWidth,
}) => {
  const styles = useStyles();

  const handleChange = React.useCallback((e: React.FormEvent<HTMLDivElement>, data: { value: number }) => {
    onChange(data.value);
  }, [onChange]);

  const containerStyle: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    minWidth: minWidth ? (typeof minWidth === 'number' ? `${minWidth}px` : minWidth) : undefined,
    maxWidth: maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
  };

  const labelStyle: React.CSSProperties = {
    width: labelWidth ? `${labelWidth}px` : undefined,
  };

  const valueStyle: React.CSSProperties = {
    width: valueWidth ? `${valueWidth}px` : undefined,
    minWidth: valueWidth ? `${valueWidth}px` : '32px', // Fallback to ensure space
  };

  return (
    <div className={styles.sliderRow} style={containerStyle}>
      <span className={styles.label} style={labelStyle}>
        {label}
      </span>
      <div className={styles.slider}>
        <Slider
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          size={size}
          disabled={disabled}
          style={{ width: '100%' }}
        />
      </div>
      <span className={styles.value} style={valueStyle}>{value}{suffix}</span>
    </div>
  );
};

SliderInput.displayName = 'SliderInput'; 
