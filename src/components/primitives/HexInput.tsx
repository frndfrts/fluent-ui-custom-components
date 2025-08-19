/**
 * HexInput.tsx
 * Atomic component for hex color input with validation and formatting.
 */
import * as React from 'react';
import { Input } from '@fluentui/react-input';
import { mergeClasses, makeStyles } from '@fluentui/react-components';

export interface HexInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  size?: 'small' | 'medium' | 'large' | 'auto';
  disabled?: boolean;
  placeholder?: string;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
  className?: string;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '0px',
    // Let the component determine its own width based on children
  },
  label: {
    textAlign: 'right',
    fontWeight: 'normal',
    color: 'var(--colorNeutralForeground1)',
    fontSize: 'inherit',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0, // Prevent label from shrinking
  },
  labelSmall: {
    width: '32px',
  },
  labelMedium: {
    width: '40px',
  },
  labelLarge: {
    width: '48px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flexGrow: 1, // Allow input container to grow
  },
  input: {
    flex: 1,
  },
  inputField: {
    fontFamily: 'monospace',
    fontSize: 'var(--fontSizeBase200)',
    textTransform: 'uppercase',
    textAlign: 'right',
  },
});

const validateHexColor = (value: string, maxLength: number): boolean => {
  const hex = value.replace('#', '');
  return new RegExp(`^[0-9A-Fa-f]{0,${maxLength}}$`).test(hex);
};

const formatHexValue = (value: string, length: number): string => {
  return value.replace('#', '').toUpperCase().padStart(length, '0');
};

const ensureHashPrefix = (value: string): string => {
  return value.startsWith('#') ? value : `#${value}`;
};

export const HexInput: React.FC<HexInputProps> = ({
  value,
  onChange,
  length = 6,
  size = 'small',
  disabled = false,
  placeholder,
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  className,
}) => {
  const defaultPlaceholder = '0'.repeat(length);
  const displayPlaceholder = placeholder || defaultPlaceholder;
  const styles = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [editingValue, setEditingValue] = React.useState<string>('');
  const [originalValue, setOriginalValue] = React.useState<string>('');
  const [isCanceling, setIsCanceling] = React.useState(false);

  const getLabelClassName = React.useCallback(() => {
    const baseClass = styles.label;
    if (size === 'auto') {
      return `${baseClass} ${styles.labelSmall}`;
    }
    if (size === 'small') {
      return `${baseClass} ${styles.labelSmall}`;
    }
    if (size === 'large') {
      return `${baseClass} ${styles.labelLarge}`;
    }
    return `${baseClass} ${styles.labelSmall}`; // Default to small instead of medium
  }, [styles.label, styles.labelSmall, styles.labelLarge, size]);

  // Update editing value when prop value changes
  React.useEffect(() => {
    setEditingValue(formatHexValue(value, length));
  }, [value, length]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Validate and filter input to only allow valid hex characters
    if (validateHexColor(inputValue, length)) {
      setEditingValue(inputValue.toUpperCase());
    }
    
    // Don't update parent component in real-time - wait for Enter or blur
  }, [length]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Accept the current value if it's valid
      if (editingValue === '') {
        const defaultHex = '#' + '0'.repeat(length);
        onChange(defaultHex);
        setEditingValue(formatHexValue(defaultHex, length));
      } else if (validateHexColor(editingValue, length)) {
        const paddedValue = editingValue.padStart(length, '0');
        const hexWithHash = ensureHashPrefix(paddedValue);
        onChange(hexWithHash);
        setEditingValue(formatHexValue(hexWithHash, length));
      } else {
        // If invalid, revert to the original value
        setEditingValue(formatHexValue(originalValue, length));
        onChange(originalValue);
      }
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsCanceling(true);
      setEditingValue(formatHexValue(originalValue, length));
      
      // Call onChange after a brief delay to ensure state is updated
      setTimeout(() => {
        onChange(originalValue);
        inputRef.current?.blur();
        setIsCanceling(false);
      }, 10);
    }
  }, [editingValue, onChange, originalValue, length]);

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
    if (editingValue === '') {
      const defaultHex = '#' + '0'.repeat(length);
      onChange(defaultHex);
      setEditingValue(formatHexValue(defaultHex, length));
    } else if (validateHexColor(editingValue, length)) {
      const paddedValue = editingValue.padStart(length, '0');
      const hexWithHash = ensureHashPrefix(paddedValue);
      onChange(hexWithHash);
      setEditingValue(formatHexValue(hexWithHash, length));
    } else {
      // If invalid, revert to the original value
      setEditingValue(formatHexValue(originalValue, length));
      onChange(originalValue);
    }
  }, [isCanceling, editingValue, onChange, originalValue, length]);

  // Simplified input container styling logic
  const inputContainerStyles = React.useMemo(() => {
    const calculatedStyles: React.CSSProperties = {};
    if (fullWidth) {
      calculatedStyles.width = '100%';
    } else if (width) {
      calculatedStyles.width = typeof width === 'number' ? `${width}px` : width;
    } else if (size !== 'auto') {
      const inputWidths = { small: 72, medium: 96, large: 120 };
      calculatedStyles.width = `${inputWidths[size] || 96}px`;
    } else {
      calculatedStyles.width = 'auto'; 
    }

    if (minWidth) calculatedStyles.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    if (maxWidth) calculatedStyles.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;

    return {
      className: styles.inputContainer,
      style: calculatedStyles,
    };
  }, [styles.inputContainer, fullWidth, width, size, minWidth, maxWidth]);

  const labelClassName = React.useMemo(() => getLabelClassName(), [getLabelClassName]);
  const totalContainerStyles = {
    display: 'inline-flex', // Use inline-flex to wrap content tightly
    alignItems: 'center',
  };
  return (
    <div style={totalContainerStyles}>
      <div className={labelClassName}>
        Hex:&nbsp;
      </div>
      <div className={inputContainerStyles.className} style={inputContainerStyles.style}>
        <Input
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
          placeholder={displayPlaceholder}
          input={{ className: styles.inputField, ref: inputRef }}
          style={{ width: '100%', minWidth: '0' }}
          maxLength={length}
        />
      </div>
    </div>
  );
}; 