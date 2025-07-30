/**
 * ErrorHandlingTemplate.tsx
 * Template component demonstrating error handling patterns and best practices.
 * Use this as a reference when implementing error handling in new components.
 */
import * as React from 'react';
import { Input } from '@fluentui/react-input';
import { useCommonStyles } from '../../styles/commonStyles';
import { useComponentSize } from '../../hooks/useComponentSize';
import { useNumericValidation } from '../../hooks/useInputValidation';
import { ValidationError } from '../error/ErrorDisplay';
import { logValidationError } from '../../utils/errorLogger';
import { ErrorBoundary } from '../error/ErrorBoundary';

export interface ErrorHandlingTemplateProps {
  initialValue?: number | '';
  min?: number;
  max?: number;
  nonNegative?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: number | '') => void;
}

export const ErrorHandlingTemplate = React.memo<ErrorHandlingTemplateProps>(({
  initialValue = '',
  min = 0,
  max = 10000,
  nonNegative = false,
  size = 'medium',
  disabled = false,
  className,
  onValueChange,
}) => {
  const styles = useCommonStyles();
  const sizeConfig = useComponentSize(size);

  // Use validation hook
  const {
    value,
    setValue,
    validation,
    setTouched,
    setDirty,
  } = useNumericValidation(initialValue, {
    min,
    max,
    nonNegative,
    allowEmpty: true,
    validateOnChange: true,
    validateOnBlur: true,
    debounceMs: 300,
  });

  // Event handlers with error logging
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedValue = inputValue === '' ? '' : parseFloat(inputValue);
    setValue(parsedValue);
    
    // Log validation errors
    if (validation.error) {
      logValidationError('numericInput', inputValue, validation.error, {
        min,
        max,
        nonNegative,
        componentName: 'ErrorHandlingTemplate',
      });
    }
    
    // Call parent callback
    if (onValueChange) {
      onValueChange(parsedValue);
    }
  }, [setValue, validation.error, min, max, nonNegative, onValueChange]);

  const handleBlur = React.useCallback(() => {
    setTouched(true);
  }, [setTouched]);

  const handleFocus = React.useCallback(() => {
    setDirty(true);
  }, [setDirty]);

  // Container styles
  const containerStyles = React.useMemo(() => ({
    width: sizeConfig.width,
    gap: sizeConfig.gap,
  }), [sizeConfig]);

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('ErrorHandlingTemplate error:', error, errorInfo);
      }}
    >
      <div 
        className={`${styles.container} ${className || ''}`}
        style={containerStyles}
      >
        <Input
          type="text"
          value={value === '' ? '' : value.toString()}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={styles.input}
          inputMode="decimal"
          appearance="outline"
          disabled={disabled}
          style={{ width: '100%', minWidth: '0' }}
        />
        
        {/* Error display */}
        <ValidationError 
          message={validation.error}
          show={validation.isDirty && validation.isTouched && !validation.isValid}
          aria-live="polite"
        />
      </div>
    </ErrorBoundary>
  );
});

// Example usage with error boundary wrapper
export const ErrorHandlingTemplateWithBoundary: React.FC<ErrorHandlingTemplateProps> = (props) => {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div style={{ 
          padding: '1rem', 
          border: '1px solid red', 
          borderRadius: '4px',
          backgroundColor: '#fff5f5'
        }}>
          <h3>Component Error</h3>
          <p>{error.message}</p>
          <button onClick={resetError}>Try Again</button>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error('ErrorHandlingTemplateWithBoundary error:', error, errorInfo);
      }}
    >
      <ErrorHandlingTemplate {...props} />
    </ErrorBoundary>
  );
}; 