/**
 * UniversalSelector.tsx
 * Universal dropdown selector component for consistent UI/UX across all selector types.
 */
import * as React from 'react';
import { Select } from '@fluentui/react-select';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    flex: 1,
  },
});

export interface UniversalSelectorProps {
  value: string;
  options: Array<{ value: string; label: string }> | string[];
  onChange: (value: string) => void;
  onError?: (error: Error) => void;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
  customOptionText?: string;
  showCustomOption?: boolean;
  sortAlphabetically?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const UniversalSelector = React.memo<UniversalSelectorProps>(({ 
  value, 
  options, 
  onChange,
  onError,
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  customOptionText = 'Custom',
  showCustomOption = false,
  sortAlphabetically = false,
  placeholder,
  disabled = false
}) => {
  const styles = useStyles();

  // Calculate container styles
  const getContainerStyles = React.useCallback(() => {
    try {
      const baseClass = styles.container;
      let inlineStyles: React.CSSProperties = {};

      if (fullWidth) {
        inlineStyles.width = '100%';
      } else if (width) {
        inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
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
        style: { width: '200px' }
      };
    }
  }, [styles.container, fullWidth, width, minWidth, maxWidth, onError]);

  const containerStyles = React.useMemo(() => {
    try {
      return getContainerStyles();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container styles memo');
      onError?.(errorObj);
      // Return fallback styles
      return {
        className: styles.container,
        style: { width: '200px' }
      };
    }
  }, [getContainerStyles, onError, styles.container]);

  // Sort options alphabetically if requested
  const sortedOptions = React.useMemo(() => {
    try {
      if (sortAlphabetically) {
        if (Array.isArray(options) && options.length > 0 && typeof options[0] === 'string') {
          // Handle string array
          return [...(options as string[])].sort((a, b) => a.localeCompare(b));
        } else if (Array.isArray(options) && options.length > 0 && typeof options[0] === 'object') {
          // Handle label-value array
          return [...(options as Array<{ label: string; value: string }>)].sort((a, b) => a.label.localeCompare(b.label));
        }
      }
      return options;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in options sorting');
      onError?.(errorObj);
      return options; // Return original options on error
    }
  }, [options, sortAlphabetically, onError]);

  const handleChange = React.useCallback((e: React.FormEvent<HTMLSelectElement>, data: { value: string }) => {
    try {
      onChange(data.value);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in selector change');
      onError?.(errorObj);
    }
  }, [onChange, onError]);

  return (
    <div className={containerStyles.className} style={containerStyles.style}>
      <Select 
        value={value} 
        onChange={handleChange} 
        className={styles.select}
        style={{ width: '100%', minWidth: '0' }}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {showCustomOption && (
          <option value="Custom">{customOptionText}</option>
        )}
        {sortedOptions.map((option) => {
          if (typeof option === 'string') {
            return <option key={option} value={option}>{option}</option>;
          } else {
            return <option key={option.value} value={option.value}>{option.label}</option>;
          }
        })}
      </Select>
    </div>
  );
});

UniversalSelector.displayName = 'UniversalSelector'; 