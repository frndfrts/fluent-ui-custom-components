
/**
 * NumericInput.tsx
 * A numeric-only input component with right alignment, clamping, and subtle validation.
 */
import * as React from 'react';
import { Input } from '@fluentui/react-input';
import { Button } from '@fluentui/react-button';
import { ChevronUpRegular, ChevronDownRegular } from '@fluentui/react-icons';
import { mergeClasses, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&:hover [data-stepper-container]': {
      opacity: '1',
    },
  },
  containerSmall: {
    width: '60px',
  },
  containerMedium: {
    width: '80px',
  },
  containerLarge: {
    width: '100px',
  },
  containerCustom: {
    // Will be applied via inline styles
  },
  input: {
    flex: 1,
  },
  inputField: {
    textAlign: 'right',
    paddingRight: '28px', // Make room for stepper buttons with balanced gap
  },
  stepperContainer: {
    position: 'absolute',
    right: '1px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    pointerEvents: 'none', // Allow clicks to pass through to input
    opacity: '0',
    transition: 'opacity 0.15s ease-in-out',
  },
  stepperButton: {
    height: '12px',
    minHeight: '12px',
    padding: '0',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    color: 'var(--colorNeutralForeground3)',
    pointerEvents: 'auto', // Re-enable pointer events for buttons
    borderRadius: '2px',
    '&:hover': {
      color: 'var(--colorNeutralForeground1)',
      backgroundColor: 'var(--colorNeutralBackground3)',
    },
  },
});

export interface NumericInputProps {
  value: number | '';
  min?: number;
  max?: number;
  step?: number;
  decimalPlaces?: number;
  nonNegative?: boolean;
  onChange: (value: number | '') => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
}

export const NumericInput = React.memo<NumericInputProps>(({
  value,
  min = 0,
  max = 10000,
  step = 0.1,
  decimalPlaces = 2,
  nonNegative = false,
  onChange,
  className,
  disabled,
  placeholder,
  size = 'medium',
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
}) => {
  const styles = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [editingValue, setEditingValue] = React.useState<string>('');
  const [originalValue, setOriginalValue] = React.useState<number | ''>('');
  const [isCanceling, setIsCanceling] = React.useState(false);
  const isSteppingRef = React.useRef(false);

  // Format number to specified decimal places
  const formatNumber = React.useCallback((num: number): string => {
    return num.toFixed(decimalPlaces);
  }, [decimalPlaces]);

  // Validate and filter input to only allow valid numeric characters
  const validateNumericInput = React.useCallback((input: string): string => {
    // Use regex to match valid numeric patterns
    const negativePattern = /^-?\d*\.?\d*$/;
    const positivePattern = /^\d*\.?\d*$/;
    
    const pattern = (!nonNegative && min < 0) ? negativePattern : positivePattern;
    
    // Find the longest valid prefix
    for (let i = input.length; i >= 0; i--) {
      const testString = input.substring(0, i);
      if (pattern.test(testString)) {
        return testString;
      }
    }
    
    return '';
  }, [nonNegative, min]);

  // Update editing value when prop value changes
  React.useEffect(() => {
    setEditingValue(value === '' ? '' : formatNumber(value));
  }, [value, formatNumber]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const validatedVal = validateNumericInput(val);
    
    // Always update with validated value
    setEditingValue(validatedVal);
    
    // Don't update parent component in real-time - wait for Enter or blur
  }, [validateNumericInput]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Accept the current value and conclude editing
      const parsed = parseFloat(editingValue);
      if (editingValue === '') {
        onChange('');
      } else if (!isNaN(parsed)) {
        const clampedValue = Math.max(min, Math.min(max, parsed));
        onChange(clampedValue);
        setEditingValue(formatNumber(clampedValue));
      }
      inputRef.current?.blur(); // Remove focus from input
    } else if (e.key === 'Escape') {
      // Cancel editing and revert to the original value
      e.preventDefault(); // Prevent default behavior
      e.stopPropagation(); // Stop event propagation
      
      // Revert to original value without calling onChange immediately
      setEditingValue(originalValue === '' ? '' : formatNumber(originalValue));
      setIsCanceling(true);
      
      // Call onChange after a brief delay to ensure state is updated
      setTimeout(() => {
        onChange(originalValue);
        inputRef.current?.blur();
        setIsCanceling(false);
      }, 10);
    }
  }, [editingValue, min, max, onChange, formatNumber, originalValue]);

  const handleFocus = React.useCallback(() => {
    setOriginalValue(value); // Store the original value when editing starts
    // Select all text when focused
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  }, [value]);

  const handleBlur = React.useCallback(() => {
    // If we're canceling, don't process the blur logic
    if (isCanceling) {
      setIsCanceling(false);
      return;
    }

    // When losing focus, accept the current value if it's valid
    const parsed = parseFloat(editingValue);
    if (editingValue === '') {
      onChange('');
    } else if (!isNaN(parsed)) {
      const clampedValue = Math.max(min, Math.min(max, parsed));
      onChange(clampedValue);
      setEditingValue(formatNumber(clampedValue));
    } else {
      // If invalid, revert to the original value
      setEditingValue(originalValue === '' ? '' : formatNumber(originalValue));
      onChange(originalValue);
    }
  }, [isCanceling, editingValue, min, max, onChange, formatNumber, originalValue]);

  // Calculate step increment based on decimal places
  const stepIncrement = React.useMemo(() => {
    return Math.pow(10, -decimalPlaces);
  }, [decimalPlaces]);

  // Continuous stepping with timeout
  const [isSteppingUp, setIsSteppingUp] = React.useState(false);
  const [isSteppingDown, setIsSteppingDown] = React.useState(false);
  
  React.useEffect(() => {
    if (isSteppingUp) {
      const interval = setInterval(() => {
        const currentValue = typeof value === 'number' ? value : 0;
        const newValue = Math.min(max, currentValue + stepIncrement);
        onChange(newValue);
      }, 100); // 100ms between each increment in continuous mode
      
      return () => clearInterval(interval);
    }
  }, [isSteppingUp, value, max, stepIncrement, onChange]);

  React.useEffect(() => {
    if (isSteppingDown) {
      const interval = setInterval(() => {
        const currentValue = typeof value === 'number' ? value : 0;
        const newValue = Math.max(min, currentValue - stepIncrement);
        onChange(newValue);
      }, 100); // 100ms between each increment in continuous mode
      
      return () => clearInterval(interval);
    }
  }, [isSteppingDown, value, min, stepIncrement, onChange]);

  const handleStepUp = React.useCallback(() => {
    // Only increment if we haven't started continuous mode
    if (!isSteppingRef.current) {
      const currentValue = typeof value === 'number' ? value : 0;
      const newValue = Math.min(max, currentValue + stepIncrement);
      onChange(newValue);
    }
  }, [value, max, stepIncrement, onChange]);

  const handleStepDown = React.useCallback(() => {
    // Only increment if we haven't started continuous mode
    if (!isSteppingRef.current) {
      const currentValue = typeof value === 'number' ? value : 0;
      const newValue = Math.max(min, currentValue - stepIncrement);
      onChange(newValue);
    }
  }, [value, min, stepIncrement, onChange]);

  const handleStepUpStart = React.useCallback(() => {
    // Set flag immediately to prevent onClick from firing
    isSteppingRef.current = true;
    setIsSteppingUp(true);
  }, []);

  const handleStepDownStart = React.useCallback(() => {
    // Set flag immediately to prevent onClick from firing
    isSteppingRef.current = true;
    setIsSteppingDown(true);
  }, []);

  const handleStepUpEnd = React.useCallback(() => {
    // Clear flag after a small delay to allow for proper cleanup
    setTimeout(() => {
      isSteppingRef.current = false;
    }, 50);
    setIsSteppingUp(false);
  }, []);

  const handleStepDownEnd = React.useCallback(() => {
    // Clear flag after a small delay to allow for proper cleanup
    setTimeout(() => {
      isSteppingRef.current = false;
    }, 50);
    setIsSteppingDown(false);
  }, []);

  // Calculate container styles
  const getContainerStyles = React.useCallback(() => {
    const baseClass = styles.container;
    let inlineStyles: React.CSSProperties = {};

    if (fullWidth) {
      inlineStyles.width = '100%';
    } else if (width) {
      inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
    } else {
      // Apply size-based width directly
      if (size === 'small') {
        inlineStyles.width = '80px';
      } else if (size === 'large') {
        inlineStyles.width = '160px';
      } else {
        inlineStyles.width = '120px'; // medium default
      }
    }

    if (minWidth) {
      inlineStyles.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    }

    if (maxWidth) {
      inlineStyles.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    }

    return {
      className: baseClass,
      style: inlineStyles
    };
  }, [styles.container, fullWidth, width, size, minWidth, maxWidth]);

  const containerStyles = React.useMemo(() => getContainerStyles(), [getContainerStyles]);

  return (
    <div className={containerStyles.className} style={containerStyles.style}>
      <Input
        type="text"
        value={editingValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={mergeClasses(styles.input, className)}
        inputMode="decimal"
        appearance="outline"
        disabled={disabled}
        placeholder={placeholder}
        input={{ className: styles.inputField, ref: inputRef }}
        style={{ width: '100%', minWidth: '0' }}
      />
      <div className={styles.stepperContainer} data-stepper-container>
        <Button
          className={styles.stepperButton}
          onClick={handleStepUp}
          onMouseDown={handleStepUpStart}
          onMouseUp={handleStepUpEnd}
          onMouseLeave={handleStepUpEnd}
          disabled={disabled || (typeof value === 'number' && value >= max)}
          icon={<ChevronUpRegular />}
          appearance="subtle"
          size="small"
        />
        <Button
          className={styles.stepperButton}
          onClick={handleStepDown}
          onMouseDown={handleStepDownStart}
          onMouseUp={handleStepDownEnd}
          onMouseLeave={handleStepDownEnd}
          disabled={disabled || (typeof value === 'number' && value <= min)}
          icon={<ChevronDownRegular />}
          appearance="subtle"
          size="small"
        />
      </div>
    </div>
  );
});
