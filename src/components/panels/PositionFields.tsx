
/**
 * PositionFields.tsx
 * Panel for position selection and X/Y inputs.
 */
import * as React from 'react';
import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { PositionSelector, DEFAULT_POSITIONS } from '../components/PositionSelector';
import { DimensionInput } from '../compositions/DimensionInput';
import { DEFAULT_UNIT } from '../components/UnitSelector';

import { FormLayoutProvider } from '../../styles/FormLayoutContext';
import { ErrorBoundary } from '../error/ErrorBoundary';

const useStyles = makeStyles({
  panel: {
    display: 'grid',
    rowGap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
    width: '100%',
    maxWidth: '320px',
    minWidth: '240px',
  },
  section: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: 'var(--colorNeutralForeground1)',
    marginBottom: tokens.spacingVerticalXS,
  },
  errorFallback: {
    padding: tokens.spacingVerticalM,
    color: tokens.colorPaletteRedForeground1,
    textAlign: 'center',
    border: `1px solid ${tokens.colorPaletteRedBorder1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorPaletteRedBackground1,
  },
});

export interface PositionFieldsProps {
  position?: string;
  positions?: string[];
  x?: number;
  y?: number;
  xUnit?: string;
  yUnit?: string;
  units?: string[];
  onChange: (fields: {
    position: string;
    x: number;
    y: number;
    xUnit: string;
    yUnit: string;
  }) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}

// Custom error fallback for PositionFields
const PositionFieldsErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.errorFallback}>
      <div style={{ marginBottom: tokens.spacingVerticalS }}>
        Failed to load position settings
      </div>
      <div style={{ 
        fontSize: tokens.fontSizeBase200, 
        color: tokens.colorPaletteRedForeground2,
        marginBottom: tokens.spacingVerticalM 
      }}>
        {error.message}
      </div>
      <button 
        onClick={resetError}
        style={{
          padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
          backgroundColor: tokens.colorPaletteRedBackground2,
          border: `1px solid ${tokens.colorPaletteRedBorder2}`,
          borderRadius: tokens.borderRadiusMedium,
          color: tokens.colorPaletteRedForeground1,
          cursor: 'pointer'
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export const PositionFields = React.memo<PositionFieldsProps>(({
  position = 'Custom',
  positions = DEFAULT_POSITIONS,
  x = 0,
  y = 0,
  xUnit,
  yUnit,
  units,
  onChange,
  onError,
  disabled = false,
}) => {
  const styles = useStyles();

  const handlePositionChange = React.useCallback((newPosition: string) => {
    try {
      const currentX = x || 0;
      const currentY = y || 0;
      const currentXUnit = xUnit || DEFAULT_UNIT;
      const currentYUnit = yUnit || DEFAULT_UNIT;
      onChange({
        position: newPosition,
        x: currentX,
        y: currentY,
        xUnit: currentXUnit,
        yUnit: currentYUnit,
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in position change');
      onError?.(errorObj);
    }
  }, [onChange, x, y, xUnit, yUnit, onError]);

  const handleXChange = React.useCallback((value: number | '', unit: string) => {
    try {
      const currentPosition = position || 'Custom';
      const currentY = y || 0;
      const currentYUnit = yUnit || DEFAULT_UNIT;
      onChange({
        position: currentPosition,
        x: typeof value === 'number' ? value : 0,
        y: currentY,
        xUnit: unit,
        yUnit: currentYUnit,
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in X position change');
      onError?.(errorObj);
    }
  }, [onChange, position, y, yUnit, onError]);

  const handleYChange = React.useCallback((value: number | '', unit: string) => {
    try {
      const currentPosition = position || 'Custom';
      const currentX = x || 0;
      const currentXUnit = xUnit || DEFAULT_UNIT;
      onChange({
        position: currentPosition,
        x: currentX,
        y: typeof value === 'number' ? value : 0,
        xUnit: currentXUnit,
        yUnit: unit,
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in Y position change');
      onError?.(errorObj);
    }
  }, [onChange, position, x, xUnit, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={PositionFieldsErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <FormLayoutProvider>
        <div className={styles.panel}>
          <Text className={styles.sectionTitle}>Position</Text>
          <div className={styles.section}>
            <PositionSelector
              {...(position !== undefined && { value: position })}
              {...(positions !== undefined && { options: positions })}
              onChange={handlePositionChange}
              disabled={disabled}
            />
            
            <DimensionInput
              label="Horizontal"
              value={x}
              {...(xUnit !== undefined && { unit: xUnit })}
              {...(units !== undefined && { units })}
              onChange={handleXChange}
              disabled={disabled}
              onError={onError}
            />
            
            <DimensionInput
              label="Vertical"
              value={y}
              {...(yUnit !== undefined && { unit: yUnit })}
              {...(units !== undefined && { units })}
              onChange={handleYChange}
              disabled={disabled}
              onError={onError}
            />
          </div>
        </div>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
});
