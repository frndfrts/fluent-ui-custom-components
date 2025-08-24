/**
 * PaperSection.tsx
 * Section component for paper-related settings including paper size and margins.
 */
import * as React from 'react';
import { makeStyles, tokens, Card, CardHeader } from '@fluentui/react-components';
import { PaperSizePanel } from '../panels/PaperSizePanel';
import { MarginsPanel } from '../panels/MarginsPanel';
import { FormLayoutProvider } from '../../styles/FormLayoutContext';
import { ErrorBoundary } from '../error/ErrorBoundary';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    width: '100%',
    maxWidth: '100%',
  },
  card: {
    width: '320px',
    maxWidth: '320px',
    minWidth: '320px',
  },
});

export interface PaperSectionProps {
  paperSize?: {
    width: number;
    height: number;
    widthUnit?: string;
    heightUnit?: string;
    orientation: string;
    paperSize: string;
  };
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    topUnit?: string;
    rightUnit?: string;
    bottomUnit?: string;
    leftUnit?: string;
  };
  units?: string[];
  onPaperSizeChange?: (paperSize: any) => void;
  onMarginsChange?: (margins: any) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}

// Custom error fallback for PaperSection
const PaperSectionErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <Card className={styles.card}>
      <CardHeader 
        header="Paper" 
        style={{
          fontSize: tokens.fontSizeBase400,
          fontWeight: tokens.fontWeightSemibold,
          color: tokens.colorNeutralForeground1,
          paddingBottom: tokens.spacingVerticalS,
          borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
          marginBottom: tokens.spacingVerticalM
        }}
      />
      <div className={styles.section}>
        <div style={{
          padding: tokens.spacingVerticalM,
          color: tokens.colorPaletteRedForeground1,
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: tokens.spacingVerticalS }}>
            Failed to load paper settings
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
              backgroundColor: tokens.colorPaletteRedBackground1,
              border: `1px solid ${tokens.colorPaletteRedBorder1}`,
              borderRadius: tokens.borderRadiusMedium,
              color: tokens.colorPaletteRedForeground1,
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </Card>
  );
};

export const PaperSection = React.memo<PaperSectionProps>(({
  paperSize,
  margins,
  units,
  onPaperSizeChange,
  onMarginsChange,
  onError,
  disabled = false,
}) => {
  const styles = useStyles();
  
  const handlePaperSizeChange = React.useCallback((newPaperSize: any) => {
    try {
      if (onPaperSizeChange) {
        onPaperSizeChange(newPaperSize);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in paper size change');
      onError?.(errorObj);
    }
  }, [onPaperSizeChange, onError]);

  const handleMarginsChange = React.useCallback((newMargins: any) => {
    try {
      if (onMarginsChange) {
        onMarginsChange(newMargins);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in margins change');
      onError?.(errorObj);
    }
  }, [onMarginsChange, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={PaperSectionErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <FormLayoutProvider>
        <Card className={styles.card}>
          <CardHeader 
            header="Paper" 
            style={{
              fontSize: tokens.fontSizeBase400,
              fontWeight: tokens.fontWeightSemibold,
              color: tokens.colorNeutralForeground1,
              paddingBottom: tokens.spacingVerticalS,
              borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
              marginBottom: tokens.spacingVerticalM
            }}
          />
          <div className={styles.section}>
            <PaperSizePanel
              paperSize={paperSize}
              units={units}
              onChange={handlePaperSizeChange}
              onError={onError}
              disabled={disabled}
            />
            
            <MarginsPanel
              margins={margins}
              units={units}
              onChange={handleMarginsChange}
              onError={onError}
              disabled={disabled}
            />
          </div>
        </Card>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
});
