
/**
 * MarginsPanel.tsx
 * Panel for managing margin settings with individual controls for each side.
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

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topUnit?: string;
  rightUnit?: string;
  bottomUnit?: string;
  leftUnit?: string;
}

export interface MarginsPanelProps {
  margins?: Margins;
  units?: string[];
  onChange?: (margins: Margins) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}

// Custom error fallback for MarginsPanel
const MarginsPanelErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.errorFallback}>
      <div style={{ marginBottom: tokens.spacingVerticalS }}>
        Failed to load margins settings
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

export const MarginsPanel = React.memo<MarginsPanelProps>(({
  margins: externalMargins,
  units,
  onChange: externalOnChange,
  onError,
  disabled = false,
}) => {
  const styles = useStyles();

  // Use default margins if none provided, wrapped in useMemo to prevent unnecessary re-renders
  const margins = React.useMemo(() => externalMargins || { 
    top: 0, 
    right: 0, 
    bottom: 0, 
    left: 0, 
    topUnit: DEFAULT_UNIT, 
    rightUnit: DEFAULT_UNIT, 
    bottomUnit: DEFAULT_UNIT, 
    leftUnit: DEFAULT_UNIT 
  }, [externalMargins]);

  const handleMarginChange = React.useCallback((side: 'top' | 'right' | 'bottom' | 'left') => {
    return (value: number | '', unit: string) => {
      try {
        if (externalOnChange) {
          const updatedMargins = { ...margins };
          if (side === 'top') {
            updatedMargins.top = typeof value === 'number' ? value : 0;
            updatedMargins.topUnit = unit;
          } else if (side === 'right') {
            updatedMargins.right = typeof value === 'number' ? value : 0;
            updatedMargins.rightUnit = unit;
          } else if (side === 'bottom') {
            updatedMargins.bottom = typeof value === 'number' ? value : 0;
            updatedMargins.bottomUnit = unit;
          } else if (side === 'left') {
            updatedMargins.left = typeof value === 'number' ? value : 0;
            updatedMargins.leftUnit = unit;
          }
          externalOnChange(updatedMargins);
        }
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error('Unknown error in margin change');
        onError?.(errorObj);
      }
    };
  }, [margins, externalOnChange, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={MarginsPanelErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <FormLayoutProvider>
        <div className={styles.panel}>
          <Text className={styles.sectionTitle}>Margins</Text>
          
          <div className={styles.section}>
            <DimensionInput
              label="Top"
              value={margins.top}
              {...(margins.topUnit !== undefined && { unit: margins.topUnit })}
              {...(units !== undefined && { units })}
              onChange={handleMarginChange('top')}
              disabled={disabled}
              onError={onError}
            />
            
            <DimensionInput
              label="Right"
              value={margins.right}
              {...(margins.rightUnit !== undefined && { unit: margins.rightUnit })}
              {...(units !== undefined && { units })}
              onChange={handleMarginChange('right')}
              disabled={disabled}
              onError={onError}
            />
            
            <DimensionInput
              label="Bottom"
              value={margins.bottom}
              {...(margins.bottomUnit !== undefined && { unit: margins.bottomUnit })}
              {...(units !== undefined && { units })}
              onChange={handleMarginChange('bottom')}
              disabled={disabled}
              onError={onError}
            />
            
            <DimensionInput
              label="Left"
              value={margins.left}
              {...(margins.leftUnit !== undefined && { unit: margins.leftUnit })}
              {...(units !== undefined && { units })}
              onChange={handleMarginChange('left')}
              disabled={disabled}
              onError={onError}
            />
          </div>
        </div>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
});
