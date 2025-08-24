
/**
 * PaddingPanel.tsx
 * Panel for managing padding settings with individual controls for each side.
 */
import * as React from 'react';
import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { DimensionInput } from '../compositions/DimensionInput';
import { FormLayoutProvider } from '../../styles/FormLayoutContext';
import { ErrorBoundary } from '../error/ErrorBoundary';
import { DEFAULT_UNIT } from '../components/UnitSelector';

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

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topUnit?: string;
  rightUnit?: string;
  bottomUnit?: string;
  leftUnit?: string;
}

export interface PaddingPanelProps {
  padding?: Padding;
  units?: string[];
  onChange?: (padding: Padding) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}

// Custom error fallback for PaddingPanel
const PaddingPanelErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.errorFallback}>
      <div style={{ marginBottom: tokens.spacingVerticalS }}>
        Failed to load padding settings
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

export const PaddingPanel = React.memo<PaddingPanelProps>(({
  padding: externalPadding,
  units,
  onChange: externalOnChange,
  onError,
  disabled = false,
}) => {
  const styles = useStyles();

  // Use default padding if none provided, wrapped in useMemo to prevent unnecessary re-renders
  const padding = React.useMemo(() => externalPadding || { 
    top: 0, 
    right: 0, 
    bottom: 0, 
    left: 0, 
    topUnit: DEFAULT_UNIT, 
    rightUnit: DEFAULT_UNIT, 
    bottomUnit: DEFAULT_UNIT, 
    leftUnit: DEFAULT_UNIT 
  }, [externalPadding]);

  const handlePaddingChange = React.useCallback((side: 'top' | 'right' | 'bottom' | 'left') => {
    return (value: number | '', unit: string) => {
      try {
        if (externalOnChange) {
          const updatedPadding = { ...padding };
          if (side === 'top') {
            updatedPadding.top = typeof value === 'number' ? value : 0;
            updatedPadding.topUnit = unit;
          } else if (side === 'right') {
            updatedPadding.right = typeof value === 'number' ? value : 0;
            updatedPadding.rightUnit = unit;
          } else if (side === 'bottom') {
            updatedPadding.bottom = typeof value === 'number' ? value : 0;
            updatedPadding.bottomUnit = unit;
          } else if (side === 'left') {
            updatedPadding.left = typeof value === 'number' ? value : 0;
            updatedPadding.leftUnit = unit;
          }
          externalOnChange(updatedPadding);
        }
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error('Unknown error in padding change');
        onError?.(errorObj);
      }
    };
  }, [padding, externalOnChange, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={PaddingPanelErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <FormLayoutProvider>
        <div className={styles.panel}>
          <Text className={styles.sectionTitle}>Padding</Text>
          
          <div className={styles.section}>
            <DimensionInput
              label="Top"
              value={padding.top}
              {...(padding.topUnit !== undefined && { unit: padding.topUnit })}
              {...(units !== undefined && { units })}
              onChange={handlePaddingChange('top')}
              disabled={disabled}
              onError={onError}
            />
            
            <DimensionInput
              label="Right"
              value={padding.right}
              {...(padding.rightUnit !== undefined && { unit: padding.rightUnit })}
              {...(units !== undefined && { units })}
              onChange={handlePaddingChange('right')}
              disabled={disabled}
              onError={onError}
            />
            
            <DimensionInput
              label="Bottom"
              value={padding.bottom}
              {...(padding.bottomUnit !== undefined && { unit: padding.bottomUnit })}
              {...(units !== undefined && { units })}
              onChange={handlePaddingChange('bottom')}
              disabled={disabled}
              onError={onError}
            />
            
            <DimensionInput
              label="Left"
              value={padding.left}
              {...(padding.leftUnit !== undefined && { unit: padding.leftUnit })}
              {...(units !== undefined && { units })}
              onChange={handlePaddingChange('left')}
              disabled={disabled}
              onError={onError}
            />
          </div>
        </div>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
});
