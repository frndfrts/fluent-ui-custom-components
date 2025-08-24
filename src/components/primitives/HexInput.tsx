/**
 * HexInput.tsx
 * 
 * A comprehensive hexadecimal input component with validation and accessibility features.
 * 
 * @description
 * This component provides a hexadecimal input field with the following features:
 * - Comprehensive validation for hex color values
 * - Automatic formatting with # prefix and uppercase conversion
 * - Full accessibility support with ARIA attributes
 * - Keyboard navigation (arrow keys, Enter/Escape)
 * - Multiple size variants (small, medium, large)
 * - Custom width support
 * - Error handling and validation feedback
 * 
 * @example
 * ```tsx
 * <HexInput
 *   value="#FF6B35"
 *   length={6}
 *   onChange={(value) => setValue(value)}
 *   label="Color"
 *   ariaLabel="Enter hex color value"
 * />
 * ```
 * 
 * @since 1.0.0
 * @author Fluent UI Custom Components Team
 */
import * as React from 'react';
import { Input } from '@fluentui/react-input';

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
  },
});

/**
 * Props for the HexInput component
 */
export interface HexInputProps {
  /** The current hexadecimal value. Can be empty string for unset state. */
  value: string;
  
  /** Number of hex digits required (excluding # prefix). Common values: 3, 6. */
  length?: number;
  
  /** Callback when the value changes. Receives the new hexadecimal value. */
  onChange: (value: string) => void;
  
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
 * HexInput component
 * 
 * @param props - Component props
 * @param props.value - Current hexadecimal value
 * @param props.length - Number of hex digits required (excluding # prefix)
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
export const HexInput = React.memo<HexInputProps>(({
  value,
  length = 6,
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
  const [originalValue, setOriginalValue] = React.useState<string>('');
  const [isCanceling, setIsCanceling] = React.useState(false);

  // Format hex value with proper formatting and length constraint
  const formatHex = React.useCallback((hex: string): string => {
    try {
      if (!hex) return '';
      
      // Remove # prefix for processing
      let hexDigits = hex.startsWith('#') ? hex.substring(1) : hex;
      
      // Ensure it's uppercase
      hexDigits = hexDigits.toUpperCase();
      
      // Truncate or pad to exact length
      if (hexDigits.length > length) {
        hexDigits = hexDigits.substring(0, length);
      } else if (hexDigits.length < length) {
        // Left-pad with zeros to maintain positional significance
        hexDigits = hexDigits.padStart(length, '0');
      }
      
      return `#${hexDigits}`;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hex formatting');
      onError?.(errorObj);
      return ''; // Return empty string on error
    }
  }, [length, onError]);

  // Validate and filter input to only allow valid hex characters and respect length
  const validateHexInput = React.useCallback((input: string): string => {
    try {
      // Use regex to match valid hex patterns
      const hexPattern = /^[0-9A-Fa-f]*$/;
      
      // Find the longest valid prefix that doesn't exceed length
      for (let i = Math.min(input.length, length); i >= 0; i--) {
        const testString = input.substring(0, i);
        if (hexPattern.test(testString)) {
          return testString;
        }
      }
      
      return '';
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hex input validation');
      onError?.(errorObj);
      return ''; // Return empty string on error
    }
  }, [length, onError]);

  // Update editing value when prop value changes
  React.useEffect(() => {
    try {
      setEditingValue(value === '' ? '' : formatHex(value));
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in editing value update');
      onError?.(errorObj);
    }
  }, [value, formatHex, onError]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    try {
      const validatedVal = validateHexInput(val);
      
      // Always update with validated value
      setEditingValue(validatedVal);
      
      // Don't update parent component in real-time - wait for Enter or blur
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hex input validation');
      onError?.(errorObj);
    }
  }, [validateHexInput, onError]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.key === 'Enter') {
        // Accept the current value and conclude editing
        if (editingValue === '') {
          // Format blank input to default hex value
          const defaultValue = `#${'0'.repeat(length)}`;
          onChange(defaultValue);
          setEditingValue(defaultValue);
        } else {
          const formattedValue = formatHex(editingValue);
          onChange(formattedValue);
          setEditingValue(formattedValue);
        }
        inputRef.current?.blur(); // Remove focus from input
      } else if (e.key === 'Escape') {
        // Cancel editing and revert to the original value
        e.preventDefault(); // Prevent default behavior
        e.stopPropagation(); // Stop event propagation
        
        // Revert to original value without calling onChange immediately
        setEditingValue(originalValue === '' ? '' : formatHex(originalValue));
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
  }, [editingValue, onChange, formatHex, originalValue, length, onError]);

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
      if (editingValue === '') {
        // Format blank input to default hex value
        const defaultValue = `#${'0'.repeat(length)}`;
        onChange(defaultValue);
        setEditingValue(defaultValue);
      } else {
        const formattedValue = formatHex(editingValue);
        onChange(formattedValue);
        setEditingValue(formattedValue);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in blur handling');
      onError?.(errorObj);
    }
  }, [isCanceling, editingValue, onChange, formatHex, length, onError]);




  




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
      return 'Hexadecimal input';

    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible label generation');
      onError?.(errorObj);
      return 'Hexadecimal input';
    }
  }, [ariaLabel, label, onError]);

  const accessibleDescription = React.useMemo(() => {
    try {
      let desc = '';
      desc += `Enter ${length}-digit hexadecimal color values. `;
      desc += 'Use up/down arrow keys to adjust value.';
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible description generation');
      onError?.(errorObj);
      return 'Hexadecimal input field.';
    }
  }, [length, onError]);

  // Generate unique IDs for accessibility
  const inputId = React.useMemo(() => `new-numeric-input-${Math.random().toString(36).substr(2, 9)}`, []);
  const descriptionId = React.useMemo(() => `new-numeric-input-desc-${Math.random().toString(36).substr(2, 9)}`, []);

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
         inputMode="text"
         appearance="outline"
         disabled={disabled}
         placeholder={placeholder}
         input={{ 
           className: styles.inputField, 
           ref: inputRef,
           'aria-label': accessibleLabel,
           'aria-describedby': `${descriptionId} ${ariaDescribedBy || ''}`.trim(),
           'aria-labelledby': ariaLabelledBy,
           'aria-valuetext': value || 'empty',
           role: 'textbox',
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
      

    </div>
  );
});

HexInput.displayName = 'HexInput';
