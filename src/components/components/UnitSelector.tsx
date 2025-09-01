
/**
 * UnitSelector.tsx
 * Enhanced dropdown component for selecting units of measurement.
 * Now supports unit systems and provides better unit metadata.
 */
import * as React from 'react';
import { Select } from '@fluentui/react-select';
import { makeStyles } from '@fluentui/react-components';
import { UnitSystem, getUnitSystem, getUnitDefinition } from '../../systems/UnitSystems';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    flex: 1,
  },
});

// Standard units array with cm as default first option (for backward compatibility)
export const DEFAULT_UNITS = ['cm', 'mm', 'in', 'pt', 'px', '%', 'vw', 'vh', 'em', 'rem'];
export const DEFAULT_UNIT = 'cm';

// Extended units for different use cases
export const ABSOLUTE_UNITS = ['cm', 'mm', 'in', 'pt', 'px'];
export const RELATIVE_UNITS = ['%', 'vw', 'vh', 'em', 'rem'];
export const PRINT_UNITS = ['cm', 'mm', 'in', 'pt'];
export const SCREEN_UNITS = ['px', '%', 'vw', 'vh', 'em', 'rem'];

export interface UnitSelectorProps {
  // Unit system support
  unitSystem?: UnitSystem | string; // Can be UnitSystem object or system ID string
  
  // Legacy props (for backward compatibility)
  unit?: string;
  units?: string[];
  
  // Enhanced props
  selectedUnit?: string;
  availableUnits?: string[];
  
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
  
  // Enhanced features
  showUnitNames?: boolean; // Show full unit names instead of symbols
  filterUnits?: (unit: string) => boolean; // Filter function for units
}

export const UnitSelector = React.memo<UnitSelectorProps>(({ 
  // Unit system props
  unitSystem,
  
  // Legacy props
  unit = DEFAULT_UNIT, 
  units = DEFAULT_UNITS,
  
  // Enhanced props
  selectedUnit,
  availableUnits,
  
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
  showUnitNames = false,
  filterUnits,
}) => {
  const styles = useStyles();

  // Resolve unit system
  const resolvedUnitSystem = React.useMemo(() => {
    try {
      if (typeof unitSystem === 'string') {
        return getUnitSystem(unitSystem);
      }
      return unitSystem;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit system resolution');
      onError?.(errorObj);
      return undefined;
    }
  }, [unitSystem, onError]);

  // Determine current unit and available units
  const currentUnit = React.useMemo(() => {
    return selectedUnit || unit;
  }, [selectedUnit, unit]);

  const resolvedUnits = React.useMemo(() => {
    try {
      // Priority: availableUnits > unitSystem units > legacy units
      if (availableUnits) {
        return availableUnits;
      }
      
      if (resolvedUnitSystem) {
        return resolvedUnitSystem.units.map(u => u.symbol);
      }
      
      return units;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in units resolution');
      onError?.(errorObj);
      return units;
    }
  }, [availableUnits, resolvedUnitSystem, units, onError]);

  // Apply unit filter if provided
  const filteredUnits = React.useMemo(() => {
    try {
      if (filterUnits) {
        return resolvedUnits.filter(filterUnits);
      }
      return resolvedUnits;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit filtering');
      onError?.(errorObj);
      return resolvedUnits;
    }
  }, [resolvedUnits, filterUnits, onError]);

  // Generate accessible label and description
  const accessibleLabel = React.useMemo(() => {
    try {
      if (ariaLabel) return ariaLabel;
      if (label) return `${label} unit selector`;
      
      // Generate descriptive label from props
      let desc = 'Unit selector';
      if (resolvedUnitSystem) {
        desc += ` (${resolvedUnitSystem.name})`;
      }
      if (filteredUnits.length > 0) {
        desc += ` (${filteredUnits.length} options available)`;
      }
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible label generation');
      onError?.(errorObj);
      return 'Unit selector';
    }
  }, [ariaLabel, label, resolvedUnitSystem, filteredUnits.length, onError]);

  const accessibleDescription = React.useMemo(() => {
    try {
      let desc = 'Select a unit of measurement. ';
      if (resolvedUnitSystem) {
        desc += `${resolvedUnitSystem.name} units. `;
      }
      if (filteredUnits.length > 0) {
        desc += `Available options: ${filteredUnits.join(', ')}. `;
      }
      desc += 'Use arrow keys to navigate options, Enter to select, or click to open dropdown.';
      return desc;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in accessible description generation');
      onError?.(errorObj);
      return 'Unit selector dropdown.';
    }
  }, [resolvedUnitSystem, filteredUnits, onError]);

  // Generate unique IDs for accessibility
  const selectId = React.useMemo(() => `unit-selector-${Math.random().toString(36).substr(2, 9)}`, []);
  const descriptionId = React.useMemo(() => `unit-selector-desc-${Math.random().toString(36).substr(2, 9)}`, []);

  // Sort units if requested
  const sortedUnits = React.useMemo(() => {
    try {
      if (sortAlphabetically) {
        return [...filteredUnits].sort((a, b) => a.localeCompare(b));
      }
      return filteredUnits;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit sorting');
      onError?.(errorObj);
      return filteredUnits;
    }
  }, [filteredUnits, sortAlphabetically, onError]);

  // Get unit display text
  const getUnitDisplayText = React.useCallback((unitSymbol: string): string => {
    try {
      if (showUnitNames && resolvedUnitSystem) {
        const unitDef = getUnitDefinition(resolvedUnitSystem.id, unitSymbol);
        return unitDef?.name || unitSymbol;
      }
      return unitSymbol;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in unit display text generation');
      onError?.(errorObj);
      return unitSymbol;
    }
  }, [showUnitNames, resolvedUnitSystem, onError]);

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
        value={currentUnit} 
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
            aria-selected={unitOption === currentUnit}
          >
            {getUnitDisplayText(unitOption)}
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
        {` Current selection: ${getUnitDisplayText(currentUnit)}`}
      </div>
    </div>
  );
});

UnitSelector.displayName = 'UnitSelector';
