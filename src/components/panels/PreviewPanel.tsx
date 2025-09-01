/**
 * PreviewPanel.tsx
 * 
 * A panel component that provides a preview container with header and content area.
 * 
 * @description
 * This component provides a preview panel with the following features:
 * - Card-based layout with header
 * - Configurable title and content
 * - Responsive design
 * - Customizable styling
 * - Error handling support
 * 
 * @example
 * ```tsx
 * <PreviewPanel title="Document Preview">
 *   <div>Your preview content here</div>
 * </PreviewPanel>
 * ```
 * 
 * @since 1.0.0
 * @author Fluent UI Custom Components Team
 */
import * as React from 'react';
import { Card, CardHeader, tokens } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { ErrorBoundary } from '../error/ErrorBoundary';

const useStyles = makeStyles({
  previewCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  previewContent: {
    position: 'relative',
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalM,
  },
});

export interface PreviewPanelProps {
  title?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  className?: string;
}

// Custom error fallback for PreviewPanel
const PreviewPanelErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <Card className={styles.previewCard}>
      <CardHeader
        header="Preview"
        style={{
          fontSize: tokens.fontSizeBase400,
          fontWeight: tokens.fontWeightSemibold,
          color: tokens.colorNeutralForeground1,
          paddingBottom: tokens.spacingVerticalS,
          borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
          marginBottom: tokens.spacingVerticalM,
        }}
      />
      <div className={styles.previewContent}>
        <div style={{
          padding: tokens.spacingVerticalM,
          color: tokens.colorPaletteRedForeground1,
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: tokens.spacingVerticalS }}>
            Failed to load preview
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

export const PreviewPanel: React.FC<PreviewPanelProps> = React.memo(({
  title = 'Preview',
  children,
  size = 'medium',
  disabled = false,
  onError,
  className,
}) => {
  const styles = useStyles();

  return (
    <ErrorBoundary
      fallback={PreviewPanelErrorFallback}
      onError={onError}
    >
      <Card className={`${styles.previewCard} ${className || ''}`}>
        <CardHeader
          header={title}
          style={{
            fontSize: tokens.fontSizeBase400,
            fontWeight: tokens.fontWeightSemibold,
            color: tokens.colorNeutralForeground1,
            paddingBottom: tokens.spacingVerticalS,
            borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
            marginBottom: tokens.spacingVerticalM,
          }}
        />
        <div className={styles.previewContent}>
          {children}
        </div>
      </Card>
    </ErrorBoundary>
  );
});

PreviewPanel.displayName = 'PreviewPanel';
