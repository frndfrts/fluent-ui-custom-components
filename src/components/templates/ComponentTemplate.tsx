/**
 * ComponentTemplate.tsx
 * Template component demonstrating the new reusable patterns and best practices.
 * Use this as a reference when creating new components.
 */
import React, { useState } from 'react';
import { makeStyles, tokens, Card, CardHeader } from '@fluentui/react-components';
import { Input } from '@fluentui/react-input';
import { Button } from '@fluentui/react-button';
import { useComponentSize } from '../../hooks/useComponentSize';
import type { ComponentSize } from '../../types/common';
import { ErrorBoundary } from '../error/ErrorBoundary';
import { useCommonStyles } from '../../styles/commonStyles';
import { useDecimalPlaces } from '../../hooks/useDecimalPlaces';
import { BaseComponentProps, InputComponentProps } from '../../types/common';
import { validateNumericInput, clampValue } from '../../utils/validation';

export interface ComponentTemplateProps extends InputComponentProps {
  min?: number;
  max?: number;
  step?: number;
  nonNegative?: boolean;
  onError?: (error: Error) => void;
}

export const ComponentTemplate = React.memo<ComponentTemplateProps>(({
  value,
  onChange,
  placeholder,
  size = 'medium',
  disabled = false,
  className,
  min = 0,
  max = 10000,
  step = 0.1,
  nonNegative = false,
  onError,
}) => {
  const styles = useCommonStyles();
  const sizeConfig = useComponentSize(size, onError);
  const decimalPlaces = useDecimalPlaces('cm'); // Example unit

  // State management
  const [editingValue, setEditingValue] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  // Memoized calculations
  const displayValue = React.useMemo(() => {
    if (typeof value === 'number') {
      return value.toFixed(decimalPlaces);
    }
    return value;
  }, [value, decimalPlaces]);

  // Event handlers with useCallback
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Validate input
    const validation = validateNumericInput(inputValue, {
      min,
      max,
      nonNegative,
      allowEmpty: true,
    });

    if (validation.isValid) {
      setError(null);
      setEditingValue(inputValue);
      
      if (typeof validation.value === 'number') {
        const clampedValue = clampValue(validation.value, min, max);
        onChange(clampedValue);
      } else {
        onChange('');
      }
    } else {
      setError(validation.error);
      setEditingValue(inputValue);
    }
  }, [min, max, nonNegative, onChange]);

  const handleBlur = React.useCallback(() => {
    // Final validation on blur
    const validation = validateNumericInput(editingValue, {
      min,
      max,
      nonNegative,
      allowEmpty: true,
    });

    if (validation.isValid && typeof validation.value === 'number') {
      const clampedValue = clampValue(validation.value, min, max);
      onChange(clampedValue);
      setEditingValue(clampedValue.toFixed(decimalPlaces));
    } else if (validation.isValid) {
      onChange('');
      setEditingValue('');
    }
    
    setError(null);
  }, [editingValue, min, max, nonNegative, onChange, decimalPlaces]);

  // Update editing value when prop value changes
  React.useEffect(() => {
    setEditingValue(displayValue);
  }, [displayValue]);

  // Container styles
  const containerStyles = React.useMemo(() => ({
    width: sizeConfig.width,
    gap: sizeConfig.gap,
  }), [sizeConfig]);

  return (
    <div 
      className={`${styles.container} ${className || ''}`}
      style={containerStyles}
    >
      <Input
        type="text"
        value={editingValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
        inputMode="decimal"
        appearance="outline"
        disabled={disabled}
        placeholder={placeholder}
        style={{ width: '100%', minWidth: '0' }}
      />
      {error && (
        <div style={{ color: 'var(--colorPaletteRedForeground1)', fontSize: '12px' }}>
          {error}
        </div>
      )}
    </div>
  );
}); 