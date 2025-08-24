/**
 * TitlePlaceholderSection.tsx
 * Section component for title placeholder settings including size, position, and padding.
 */
import * as React from 'react';
import { makeStyles, tokens, Card, CardHeader } from '@fluentui/react-components';
import { SizeAndPositionPanel } from '../panels/SizeAndPositionPanel';
import { PaddingPanel } from '../panels/PaddingPanel';
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

export interface TitlePlaceholderSectionProps {
  size?: {
    width: number;
    height: number;
    widthUnit?: string;
    heightUnit?: string;
  };
  position?: {
    position: string;
    x: number;
    y: number;
    xUnit?: string;
    yUnit?: string;
  };
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    topUnit?: string;
    rightUnit?: string;
    bottomUnit?: string;
    leftUnit?: string;
  };
  positions?: string[];
  units?: string[];
  showLockAspectRatio?: boolean;
  onSizeChange?: (size: any) => void;
  onPositionChange?: (position: any) => void;
  onPaddingChange?: (padding: any) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}

// Custom error fallback for TitlePlaceholderSection
const TitlePlaceholderSectionErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <Card className={styles.card}>
      <CardHeader 
        header="Title Placeholder" 
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
            Failed to load title placeholder settings
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

export const TitlePlaceholderSection = React.memo<TitlePlaceholderSectionProps>(({
  size,
  position,
  padding,
  units,
  showLockAspectRatio = true,
  onSizeChange,
  onPositionChange,
  onPaddingChange,
  onError,
  disabled = false,
}) => {
  const styles = useStyles();
  
  // Local state for aspect ratio lock
  const [lockAspectRatio, setLockAspectRatio] = React.useState(false);

  const handleSizeChange = React.useCallback((newSize: any) => {
    try {
      if (onSizeChange) {
        onSizeChange(newSize);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in size change');
      onError?.(errorObj);
    }
  }, [onSizeChange, onError]);

  const handlePositionChange = React.useCallback((newPosition: any) => {
    try {
      if (onPositionChange) {
        onPositionChange(newPosition);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in position change');
      onError?.(errorObj);
    }
  }, [onPositionChange, onError]);

  const handlePaddingChange = React.useCallback((newPadding: any) => {
    try {
      if (onPaddingChange) {
        onPaddingChange(newPadding);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in padding change');
      onError?.(errorObj);
    }
  }, [onPaddingChange, onError]);

  const handleLockAspectRatioChange = React.useCallback((locked: boolean) => {
    setLockAspectRatio(locked);
  }, []);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={TitlePlaceholderSectionErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <FormLayoutProvider>
        <Card className={styles.card}>
          <CardHeader 
            header="Title Placeholder" 
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
            <SizeAndPositionPanel
              width={size?.width || 15}
              height={size?.height || 10}
              widthUnit={size?.widthUnit}
              heightUnit={size?.heightUnit}
              position={position?.position || 'Custom'}
              positions={['top-left', 'top-center', 'top-right', 'center', 'bottom-left', 'bottom-center', 'bottom-right', 'Custom']}
              x={position?.x || 0}
              y={position?.y || 0}
              xUnit={position?.xUnit}
              yUnit={position?.yUnit}
              units={units}
              showLockAspectRatio={showLockAspectRatio}
              lockAspectRatio={lockAspectRatio}
              onLockAspectRatioChange={handleLockAspectRatioChange}
              onSizeChange={handleSizeChange}
              onPositionChange={handlePositionChange}
              onError={onError}
              disabled={disabled}
            />
            
            <PaddingPanel
              padding={padding}
              units={units}
              onChange={handlePaddingChange}
              onError={onError}
              disabled={disabled}
            />
          </div>
        </Card>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
});
