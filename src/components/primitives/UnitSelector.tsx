
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

export interface UnitSelectorProps {
  unit: string;
  units: string[];
  onChange: (unit: string) => void;
  size?: 'small' | 'medium' | 'large';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  fullWidth?: boolean;
  disabled?: boolean;
  sortAlphabetically?: boolean;
}

export const UnitSelector = React.memo<UnitSelectorProps>(({ 
  unit, 
  units, 
  onChange,
  size = 'medium',
  width,
  minWidth,
  maxWidth,
  fullWidth = false,
  disabled = false
}) => {
  const styles = useStyles();

  // UnitSelector defines its own sizing logic
  const getUnitSelectorWidth = React.useCallback(() => {
    if (width) return width;
    if (fullWidth) return '100%';
    
    if (size === 'small') return '60px';
    if (size === 'large') return '80px';
    return '70px'; // medium default
  }, [width, fullWidth, size]);

  const handleChange = React.useCallback((e: React.FormEvent<HTMLSelectElement>, data: { value: string }) => {
    onChange(data.value);
  }, [onChange]);

  const containerStyles = React.useMemo(() => {
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
  }, [styles.container, fullWidth, width, minWidth, maxWidth, getUnitSelectorWidth]);

  return (
    <div className={containerStyles.className} style={containerStyles.style}>
      <Select 
        value={unit} 
        onChange={handleChange} 
        className={styles.select}
        style={{ width: '100%', minWidth: '0' }}
        disabled={disabled}
      >
        {units.map((unitOption) => (
          <option key={unitOption} value={unitOption}>{unitOption}</option>
        ))}
      </Select>
    </div>
  );
});
