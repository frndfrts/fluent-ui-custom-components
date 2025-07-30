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
  options: string[];
  onChange: (value: string) => void;
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
  }, [styles.container, fullWidth, width, minWidth, maxWidth]);

  const containerStyles = React.useMemo(() => getContainerStyles(), [getContainerStyles]);

  // Sort options alphabetically if requested
  const sortedOptions = React.useMemo(() => {
    if (sortAlphabetically) {
      return [...options].sort((a, b) => a.localeCompare(b));
    }
    return options;
  }, [options, sortAlphabetically]);

  const handleChange = React.useCallback((e: React.FormEvent<HTMLSelectElement>, data: { value: string }) => {
    onChange(data.value);
  }, [onChange]);

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
        {sortedOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
        {showCustomOption && (
          <option value={customOptionText}>{customOptionText}</option>
        )}
      </Select>
    </div>
  );
}); 