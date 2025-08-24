
/**
 * UnitSelector.tsx
 * Dropdown component for selecting units of measurement.
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

// Standard units array with cm as default first option
export const DEFAULT_UNITS = ['cm', 'mm', 'in', 'pt', 'px'];
export const DEFAULT_UNIT = 'cm';

export interface UnitSelectorProps {
  unit?: string;
  units?: string[];
  onChange: (unit: string) => void;
  onError?: (error: Error) => void;
  size?: 'small' | 'medium' | 'large';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
  disabled?: boolean;
  sortAlphabetically?: boolean;
  label?: string; // Accessibility label
  ariaLabel?: string; // Custom ARIA label
  ariaDescribedBy?: string; // ID for description element
  ariaLabelledBy?: string; // ID for label element
}

export const UnitSelector = React.memo<UnitSelectorProps>(({ 
  unit = DEFAULT_UNIT, 
  units = DEFAULT_UNITS, 
  onChange,
  onError,
  size = 'medium',
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  disabled = false,
  sortAlphabetically = false,
  label,
  ariaLabel,
  ariaDescribedBy,
  ariaLabelledBy,
}) => {
  const styles = useStyles();

  // Generate accessible label and description
  const accessibleLabel = React.useMemo(() => {
    try {
      if (ariaLabel) return ariaLabel;
      if (label) return `${label} unit selector`;
      
      // Generate descriptive label from props
      let desc = 'Unit selector';
      if (units.length > 0) {
        desc += ` (${units.length} options available)`;
      }
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible label generation');
      onError?.(errorObj);
      return 'Unit selector';
    }
  }, [ariaLabel, label, units.length, onError]);

  const accessibleDescription = React.useMemo(() => {
    try {
      let desc = 'Select a unit of measurement. ';
      if (units.length > 0) {
        desc += `Available options: ${units.join(', ')}. `;
      }
      desc += 'Use arrow keys to navigate options, Enter to select, or click to open dropdown.';
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible description generation');
      onError?.(errorObj);
      return 'Unit selector dropdown.';
    }
  }, [units, onError]);

  // Generate unique IDs for accessibility
  const selectId = React.useMemo(() => `unit-selector-${Math.random().toString(36).substr(2, 9)}`, []);
  const descriptionId = React.useMemo(() => `unit-selector-desc-${Math.random().toString(36).substr(2, 9)}`, []);

  // Sort units if requested
  const sortedUnits = React.useMemo(() => {
    try {
      if (sortAlphabetically) {
        return [...units].sort((a, b) => a.localeCompare(b));
      }
      return units;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit sorting');
      onError?.(errorObj);
      return units;
    }
  }, [units, sortAlphabetically, onError]);

  // UnitSelector defines its own sizing logic
  const getUnitSelectorWidth = React.useCallback(() => {
    try {
      if (width) return width;
      if (fullWidth) return '100%';
      
      if (size === 'small') return '60px';
      if (size === 'large') return '80px';
      return '70px'; // medium default
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit selector width calculation');
      onError?.(errorObj);
      return '70px'; // Return fallback width
    }
  }, [width, fullWidth, size, onError]);

  const handleChange = React.useCallback((e: React.FormEvent<HTMLSelectElement>, data: { value: string }) => {
    try {
      onChange(data.value);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit change');
      onError?.(errorObj);
    }
  }, [onChange, onError]);

  const getContainerStyles = React.useCallback(() => {
    try {
      const baseClass = styles.container;
      let inlineStyles: React.CSSProperties = {};

      if (fullWidth) {
        inlineStyles.width = '100%';
      } else if (width) {
        inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
      } else {
        inlineStyles.width = getUnitSelectorWidth();
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
        style: { width: '70px' }
      };
    }
  }, [styles.container, fullWidth, width, minWidth, maxWidth, getUnitSelectorWidth, onError]);

  const containerStyles = React.useMemo(() => {
    try {
      return getContainerStyles();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in container styles memo');
      onError?.(errorObj);
      // Return fallback styles
      return {
        className: styles.container,
        style: { width: '70px' }
      };
    }
  }, [getContainerStyles, onError, styles.container]);

  return (
    <div className={containerStyles.className} style={containerStyles.style}>
      {/* Hidden label for screen readers if no visible label */}
      {!label && (
        <label htmlFor={selectId} style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
          {accessibleLabel}
        </label>
      )}
      
      <Select 
        id={selectId}
        value={unit} 
        onChange={handleChange} 
        className={styles.select}
        style={{ width: '100%', minWidth: '0' }}
        disabled={disabled}
        aria-label={accessibleLabel}
        aria-describedby={`${descriptionId} ${ariaDescribedBy || ''}`.trim()}
        aria-labelledby={ariaLabelledBy}
        aria-live="polite"
        aria-atomic="true"
        role="combobox"
        aria-expanded={false}
        aria-haspopup="listbox"
        aria-autocomplete="none"
      >
        {sortedUnits.map((unitOption) => (
          <option 
            key={unitOption} 
            value={unitOption}
            aria-selected={unitOption === unit}
          >
            {unitOption}
          </option>
        ))}
      </Select>
      
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
        {` Current selection: ${unit}`}
      </div>
    </div>
  );
});
