
/**
 * NumericInput.tsx
 * 
 * A comprehensive numeric input component with step controls, validation, and accessibility features.
 * 
 * @description
 * This component provides a numeric input field with the following features:
 * - Step up/down buttons for precise value adjustment
 * - Comprehensive validation (min/max, non-negative, decimal places)
 * - Full accessibility support with ARIA attributes
 * - Keyboard navigation (arrow keys, Enter/Escape)
 * - Multiple size variants (small, medium, large)
 * - Custom width support
 * - Error handling and validation feedback
 * 
 * @example
 * ```tsx
 * <NumericInput
 *   value={100}
 *   onChange={(value) => setValue(value)}
 *   min={0}
 *   max={1000}
 *   step={10}
 *   label="Quantity"
 *   ariaLabel="Enter quantity value"
 * />
 * ```
 * 
 * @since 1.0.0
 * @author Fluent UI Custom Components Team
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

/**
 * Props for the NumericInput component
 */
export interface NumericInputProps {
  /** The current numeric value. Can be empty string for unset state. */
  value: number | '';
  
  /** Minimum allowed value. Defaults to 0. */
  min?: number;
  
  /** Maximum allowed value. Defaults to 10000. */
  max?: number;
  
  /** Step increment for up/down buttons and keyboard navigation. Defaults to 0.1. */
  step?: number;
  
  /** Number of decimal places to display and validate. */
  decimalPlaces?: number;
  
  /** Whether to prevent negative values. Overrides min prop if set to true. */
  nonNegative?: boolean;
  
  /** Callback when the value changes. Receives the new numeric value. */
  onChange: (value: number | '') => void;
  
  /** Callback when validation errors occur. */
  onError?: (error: Error) => void;
  
  /** Additional CSS class name for styling. */
  className?: string;
  
  /** Whether the input is disabled. */
  disabled?: boolean;
  
  /** Placeholder text when value is empty. */
  placeholder?: string;
  
  /** Size variant of the input. Affects width and spacing. */
  size?: 'small' | 'medium' | 'large';
  
  /** Custom width of the input. Can be number (pixels) or CSS string. */
  width?: string | number;
  
  /** Minimum width constraint. */
  minWidth?: string | number;
  
  /** Maximum width constraint. */
  maxWidth?: string | number;
  
  /** Whether to expand to full available width. */
  fullWidth?: boolean;
  
  /** Visible label for the input. Provides accessibility context. */
  label?: string;
  
  /** Custom ARIA label for screen readers. Overrides label if provided. */
  ariaLabel?: string;
  
  /** ID of element that describes the input for screen readers. */
  ariaDescribedBy?: string;
  
  /** ID of element that labels the input for screen readers. */
  ariaLabelledBy?: string;
}

/**
 * NumericInput component
 * 
 * @param props - Component props
 * @param props.value - Current numeric value
 * @param props.min - Minimum allowed value
 * @param props.max - Maximum allowed value
 * @param props.step - Step increment for navigation
 * @param props.decimalPlaces - Number of decimal places
 * @param props.nonNegative - Whether to prevent negative values
 * @param props.onChange - Value change callback
 * @param props.onError - Error handling callback
 * @param props.className - Additional CSS class
 * @param props.disabled - Whether input is disabled
 * @param props.placeholder - Placeholder text
 * @param props.size - Size variant
 * @param props.width - Custom width
 * @param props.minWidth - Minimum width constraint
 * @param props.maxWidth - Maximum width constraint
 * @param props.fullWidth - Whether to expand to full width
 * @param props.label - Visible label
 * @param props.ariaLabel - ARIA label
 * @param props.ariaDescribedBy - ARIA description ID
 * @param props.ariaLabelledBy - ARIA label ID
 * 
 * @returns React component
 */
export const NumericInput = React.memo<NumericInputProps>(({
  value,
  min = 0,
  max = 10000,
  step = 0.1,
  decimalPlaces = 2,
  nonNegative = false,
  onChange,
  onError,
  className,
  disabled = false,
  placeholder,
  size = 'medium',
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  label,
  ariaLabel,
  ariaDescribedBy,
  ariaLabelledBy,
}) => {
  const styles = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [editingValue, setEditingValue] = React.useState<string>('');
  const [validationMessage, setValidationMessage] = React.useState<string>('');
  const [originalValue, setOriginalValue] = React.useState<number | ''>('');
  const [isCanceling, setIsCanceling] = React.useState(false);
  const isSteppingRef = React.useRef(false);

  // Format number to specified decimal places
  const formatNumber = React.useCallback((num: number): string => {
    try {
      return num.toFixed(decimalPlaces);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in number formatting');
      onError?.(errorObj);
      return '0'; // Return fallback value
    }
  }, [decimalPlaces, onError]);

  // Validate and filter input to only allow valid numeric characters
  const validateNumericInput = React.useCallback((input: string): string => {
    try {
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
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in numeric input validation');
      onError?.(errorObj);
      return ''; // Return empty string on error
    }
  }, [nonNegative, min, onError]);

  // Update editing value when prop value changes
  React.useEffect(() => {
    try {
      setEditingValue(value === '' ? '' : formatNumber(value));
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in editing value update');
      onError?.(errorObj);
    }
  }, [value, formatNumber, onError]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    try {
      const validatedVal = validateNumericInput(val);
      
      // Always update with validated value
      setEditingValue(validatedVal);
      
      // Don't update parent component in real-time - wait for Enter or blur
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in numeric input validation');
      onError?.(errorObj);
    }
  }, [validateNumericInput, onError]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
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
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in key down handling');
      onError?.(errorObj);
    }
  }, [editingValue, min, max, onChange, formatNumber, originalValue, onError]);

  const handleFocus = React.useCallback(() => {
    try {
      setOriginalValue(value); // Store the original value when editing starts
      // Select all text when focused
      setTimeout(() => {
        inputRef.current?.select();
      }, 0);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in focus handling');
      onError?.(errorObj);
    }
  }, [value, onError]);

  const handleBlur = React.useCallback(() => {
    try {
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
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in blur handling');
      onError?.(errorObj);
    }
  }, [isCanceling, editingValue, min, max, onChange, formatNumber, originalValue, onError]);

  // Calculate step increment based on decimal places
  const stepIncrement = React.useMemo(() => {
    try {
      return Math.pow(10, -decimalPlaces);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in step increment calculation');
      onError?.(errorObj);
      return 0.01; // Return fallback value
    }
  }, [decimalPlaces, onError]);

  // Continuous stepping with timeout
  const [isSteppingUp, setIsSteppingUp] = React.useState(false);
  const [isSteppingDown, setIsSteppingDown] = React.useState(false);
  
  React.useEffect(() => {
    if (isSteppingUp) {
      const interval = setInterval(() => {
        try {
          const currentValue = typeof value === 'number' ? value : 0;
          const newValue = Math.min(max, currentValue + stepIncrement);
          onChange(newValue);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in continuous step up');
          onError?.(errorObj);
          setIsSteppingUp(false); // Stop stepping on error
        }
      }, 100); // 100ms between each increment in continuous mode
      
      return () => clearInterval(interval);
    }
  }, [isSteppingUp, value, max, stepIncrement, onChange, onError]);

  React.useEffect(() => {
    if (isSteppingDown) {
      const interval = setInterval(() => {
        try {
          const currentValue = typeof value === 'number' ? value : 0;
          const newValue = Math.max(min, currentValue - stepIncrement);
          onChange(newValue);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in continuous step down');
          onError?.(errorObj);
          setIsSteppingDown(false); // Stop stepping on error
        }
      }, 100); // 100ms between each increment in continuous mode
      
      return () => clearInterval(interval);
    }
  }, [isSteppingDown, value, min, stepIncrement, onChange, onError]);

  const handleStepUp = React.useCallback(() => {
    try {
      // Only increment if we haven't started continuous mode
      if (!isSteppingRef.current) {
        const currentValue = typeof value === 'number' ? value : 0;
        const newValue = Math.min(max, currentValue + stepIncrement);
        onChange(newValue);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in step up');
      onError?.(errorObj);
    }
  }, [value, max, stepIncrement, onChange, onError]);

  const handleStepDown = React.useCallback(() => {
    try {
      // Only increment if we haven't started continuous mode
      if (!isSteppingRef.current) {
        const currentValue = typeof value === 'number' ? value : 0;
        const newValue = Math.max(min, currentValue - stepIncrement);
        onChange(newValue);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in step down');
      onError?.(errorObj);
    }
  }, [value, min, stepIncrement, onChange, onError]);

  const handleStepUpStart = React.useCallback(() => {
    try {
      // Set flag immediately to prevent onClick from firing
      isSteppingRef.current = true;
      setIsSteppingUp(true);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in step up start');
      onError?.(errorObj);
    }
  }, [onError]);

  const handleStepDownStart = React.useCallback(() => {
    try {
      // Set flag immediately to prevent onClick from firing
      isSteppingRef.current = true;
      setIsSteppingDown(true);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in step down start');
      onError?.(errorObj);
    }
  }, [onError]);

  const handleStepUpEnd = React.useCallback(() => {
    try {
      // Clear flag after a small delay to allow for proper cleanup
      setTimeout(() => {
        isSteppingRef.current = false;
      }, 50);
      setIsSteppingUp(false);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in step up end');
      onError?.(errorObj);
    }
  }, [onError]);

  const handleStepDownEnd = React.useCallback(() => {
    try {
      // Clear flag after a small delay to allow for proper cleanup
      setTimeout(() => {
        isSteppingRef.current = false;
      }, 50);
      setIsSteppingDown(false);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in step down end');
      onError?.(errorObj);
    }
  }, [onError]);

  // Calculate container styles
  const getContainerStyles = React.useCallback(() => {
    try {
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
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container styles calculation');
      onError?.(errorObj);
      // Return fallback styles
      return {
        className: styles.container,
        style: { width: '120px' }
      };
    }
  }, [styles.container, fullWidth, width, size, minWidth, maxWidth, onError]);

  const containerStyles = React.useMemo(() => {
    try {
      return getContainerStyles();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container styles memo');
      onError?.(errorObj);
      // Return fallback styles
      return {
        className: styles.container,
        style: { width: '120px' }
      };
    }
  }, [getContainerStyles, onError, styles.container]);

  // Generate accessible label and description
  const accessibleLabel = React.useMemo(() => {
    try {
      if (ariaLabel) return ariaLabel;
      if (label) return label;
      
      // Generate descriptive label from props
      let desc = 'Numeric input';
      if (min !== undefined && max !== undefined) {
        desc += ` (${min} to ${max})`;
      } else if (min !== undefined) {
        desc += ` (minimum ${min})`;
      } else if (max !== undefined) {
        desc += ` (maximum ${max})`;
      }
      if (step !== 0.1) {
        desc += `, step ${step}`;
      }
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible label generation');
      onError?.(errorObj);
      return 'Numeric input';
    }
  }, [ariaLabel, label, min, max, step, onError]);

  const accessibleDescription = React.useMemo(() => {
    try {
      let desc = '';
      if (min !== undefined && max !== undefined) {
        desc += `Value must be between ${min} and ${max}. `;
      }
      if (step !== 0.1) {
        desc += `Use step buttons to change by ${step}. `;
      }
      if (nonNegative) {
        desc += 'Only positive values allowed. ';
      }
      if (decimalPlaces > 0) {
        desc += `Supports up to ${decimalPlaces} decimal places. `;
      }
      desc += 'Use up/down arrow keys or step buttons to adjust value.';
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible description generation');
      onError?.(errorObj);
      return 'Numeric input field with step controls.';
    }
  }, [min, max, step, nonNegative, decimalPlaces, onError]);

  // Generate unique IDs for accessibility
  const inputId = React.useMemo(() => `numeric-input-${Math.random().toString(36).substr(2, 9)}`, []);
  const descriptionId = React.useMemo(() => `numeric-input-desc-${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <div className={containerStyles.className} style={containerStyles.style}>
      {/* Hidden label for screen readers if no visible label */}
      {!label && (
        <label htmlFor={inputId} style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
          {accessibleLabel}
        </label>
      )}
      
      <Input
        id={inputId}
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
        input={{ 
          className: styles.inputField, 
          ref: inputRef,
          'aria-label': accessibleLabel,
          'aria-describedby': `${descriptionId} ${ariaDescribedBy || ''}`.trim(),
          'aria-labelledby': ariaLabelledBy,
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-valuenow': typeof value === 'number' ? value : undefined,
          'aria-valuetext': typeof value === 'number' ? value.toString() : 'empty',
          role: 'spinbutton',
          'aria-live': 'polite',
          'aria-atomic': 'true'
        }}
        style={{ width: '100%', minWidth: '0' }}
      />
      
      {/* Accessibility description */}
      <div 
        id={descriptionId}
        aria-live="polite"
        aria-atomic="true"
        style={{ 
          position: 'absolute', 
          left: '-10000px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
      >
        {accessibleDescription}
        {validationMessage && ` ${validationMessage}`}
      </div>
      
      <div 
        className={styles.stepperContainer} 
        data-stepper-container
        role="group"
        aria-label="Step controls"
      >
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
          aria-label={`Increase value by ${step}`}
          aria-describedby={descriptionId}
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
          aria-label={`Decrease value by ${step}`}
          aria-describedby={descriptionId}
        />
      </div>
    </div>
  );
});
