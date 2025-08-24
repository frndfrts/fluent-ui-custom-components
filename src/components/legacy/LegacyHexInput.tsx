/**
 * LegacyHexInput.tsx
 * A legacy hex color input component with validation and formatting.
 * Follows Fluent UI standards and is analogous to NumericInput in behavior and styling.
 */
import * as React from 'react';
import { Input } from '@fluentui/react-input';
import { mergeClasses, makeStyles } from '@fluentui/react-components';

export interface LegacyHexInputProps {
  value: string;
  onChange: (value: string) => void;
  onError?: (error: Error) => void;
  size?: 'small' | 'medium' | 'large' | 'auto';
  disabled?: boolean;
  placeholder?: string;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string; // Custom ARIA label
  ariaDescribedBy?: string; // ID for description element
  ariaLabelledBy?: string; // ID for label element
  length?: number; // Expected hex length (3 or 6)
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
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
    fontFamily: 'monospace',
    textAlign: 'right',
  },
});

const validateHexColor = (value: string, maxLength: number): boolean => {
  const hex = value.replace('#', '');
  return new RegExp(`^[0-9A-Fa-f]{0,${maxLength}}$`).test(hex);
};

const ensureHashPrefix = (value: string): string => {
  return value.startsWith('#') ? value : `#${value}`;
};

export const LegacyHexInput = React.memo<LegacyHexInputProps>(({
  value,
  onChange,
  onError,
  size = 'medium',
  disabled = false,
  placeholder = '#000000',
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  className,
  ariaLabel,
  ariaDescribedBy,
  ariaLabelledBy,
  length = 6,
}) => {
  const styles = useStyles();
  const [validationMessage, setValidationMessage] = React.useState<string>('');

  // Generate accessible label and description
  const accessibleLabel = React.useMemo(() => {
    try {
      if (ariaLabel) return ariaLabel;
      
      // Generate descriptive label from props
      let desc = 'Hex color input';
      if (length === 3) {
        desc += ' (3 characters)';
      } else if (length === 6) {
        desc += ' (6 characters)';
      }
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible label generation');
      onError?.(errorObj);
      return 'Hex color input';
    }
  }, [ariaLabel, length, onError]);

  const accessibleDescription = React.useMemo(() => {
    try {
      let desc = 'Enter a hex color value starting with #. ';
      if (length === 3) {
        desc += 'Use 3 characters (e.g., #F00 for red). ';
      } else if (length === 6) {
        desc += 'Use 6 characters (e.g., #FF0000 for red). ';
      }
      desc += 'Only hexadecimal characters (0-9, A-F) are allowed.';
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible description generation');
      onError?.(errorObj);
      return 'Hex color input field.';
    }
  }, [length, onError]);

  // Generate unique IDs for accessibility
  const inputId = React.useMemo(() => `hex-input-${Math.random().toString(36).substr(2, 9)}`, []);
  const descriptionId = React.useMemo(() => `hex-input-desc-${Math.random().toString(36).substr(2, 9)}`, []);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputValue = e.target.value;
      // Validate hex input
      if (/^#[0-9A-Fa-f]*$/.test(inputValue)) {
        // Auto-format: convert to uppercase
        const formattedValue = inputValue.toUpperCase();
        onChange(formattedValue);
        
        // Update validation message for screen readers
        if (formattedValue.length === 1 && formattedValue === '#') {
          setValidationMessage('Enter hex characters after #');
        } else if (formattedValue.length > 1) {
          const hexLength = formattedValue.length - 1; // Exclude #
          if (hexLength === length) {
            setValidationMessage('Valid hex color');
          } else if (hexLength < length) {
            setValidationMessage(`Enter ${length - hexLength} more character${length - hexLength === 1 ? '' : 's'}`);
          } else {
            setValidationMessage('Too many characters');
          }
        } else {
          setValidationMessage('');
        }
      } else if (/^[0-9A-Fa-f]*$/.test(inputValue)) {
        // Auto-add hash prefix if missing
        const formattedValue = `#${inputValue.toUpperCase()}`;
        onChange(formattedValue);
        
        // Update validation message
        const hexLength = formattedValue.length - 1; // Exclude #
        if (hexLength === length) {
          setValidationMessage('Valid hex color');
        } else if (hexLength < length) {
          setValidationMessage(`Enter ${length - hexLength} more character${length - hexLength === 1 ? '' : 's'}`);
        } else {
          setValidationMessage('Too many characters');
        }
      } else {
        setValidationMessage('Invalid character. Only hex characters (0-9, A-F) allowed.');
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hex input change');
      onError?.(errorObj);
    }
  }, [onChange, onError, length]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      // Allow navigation keys
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab', 'Escape'].includes(e.key)) {
        return;
      }
      
      // Allow backspace and delete
      if (['Backspace', 'Delete'].includes(e.key)) {
        return;
      }
      
      // Allow # at the beginning
      if (e.key === '#' && e.currentTarget.selectionStart === 0) {
        return;
      }
      
      // Allow hex characters
      if (/^[0-9A-Fa-f]$/.test(e.key)) {
        return;
      }
      
      // Prevent other characters
      e.preventDefault();
      setValidationMessage('Invalid character. Only hex characters (0-9, A-F) allowed.');
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in key handling');
      onError?.(errorObj);
    }
  }, [onError]);

  // Calculate container styles - mirroring NumericInput's approach
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
          inlineStyles.width = '60px';
        } else if (size === 'large') {
          inlineStyles.width = '100px';
        } else if (size === 'auto') {
          // Auto size - let content determine width
          inlineStyles.width = 'auto';
        } else {
          inlineStyles.width = '80px'; // medium default
        }
      }

      if (minWidth) {
        inlineStyles.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
      }

      if (maxWidth) {
        inlineStyles.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      }

      return {
        className: mergeClasses(baseClass, className), // Include custom className
        style: inlineStyles
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container styles calculation');
      onError?.(errorObj);
      // Return fallback styles
      return {
        className: styles.container,
        style: { width: '80px' }
      };
    }
  }, [styles.container, fullWidth, width, size, minWidth, maxWidth, className, onError]);

  const containerStyles = React.useMemo(() => {
    try {
      return getContainerStyles();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container styles memo');
      onError?.(errorObj);
      // Return fallback styles
      return {
        className: styles.container,
        style: { width: '80px' }
      };
    }
  }, [getContainerStyles, onError, styles.container, className, fullWidth, width, size, minWidth, maxWidth]);


  
  return (
    <div className={containerStyles.className} style={containerStyles.style}>
      {/* Hidden label for screen readers */}
      <label htmlFor={inputId} style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
        {accessibleLabel}
      </label>
      
      <div className={styles.input}>
        <Input
          id={inputId}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.inputField}
          aria-label={accessibleLabel}
          aria-describedby={`${descriptionId} ${ariaDescribedBy || ''}`.trim()}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={value.length > 1 && value.length !== length + 1}
          maxLength={length + 1} // +1 for #
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      
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

LegacyHexInput.displayName = 'LegacyHexInput'; 