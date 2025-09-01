/**
 * PreviewSection.tsx
 * 
 * A section component that provides a preview area for content display.
 * 
 * @description
 * This component provides a preview section with the following features:
 * - PreviewPanel for content display
 * - Integrated layout and styling
 * - Error handling and accessibility
 * - Responsive design support
 * - No internal navigation (navigation handled by TabbedNavbar)
 * 
 * @example
 * ```tsx
 * <PreviewSection
 *   previewTitle="Document Preview"
 * >
 *   <div>Your preview content here</div>
 * </PreviewSection>
 * ```
 * 
 * @since 1.0.0
 * @author Fluent UI Custom Components Team
 */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { PreviewPanel } from '../panels/PreviewPanel';
import { FormLayoutProvider } from '../../styles/FormLayoutContext';
import { ErrorBoundary } from '../error/ErrorBoundary';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
  },
  previewArea: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '400px',
  },
  previewPanel: {
    flexGrow: 1,
    height: '100%',
  },
});

export interface PreviewSectionProps {
  previewTitle?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  className?: string;
}

// Custom error fallback for PreviewSection
const PreviewSectionErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.section}>
      <div style={{
        padding: tokens.spacingVerticalL,
        color: tokens.colorPaletteRedForeground1,
        textAlign: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ marginBottom: tokens.spacingVerticalM }}>
          Failed to load preview section
        </div>
        <div style={{ 
          fontSize: tokens.fontSizeBase300, 
          color: tokens.colorPaletteRedForeground2,
          marginBottom: tokens.spacingVerticalL,
          maxWidth: '400px'
        }}>
          {error.message}
        </div>
        <button 
          onClick={resetError}
          style={{
            padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
            backgroundColor: tokens.colorPaletteRedBackground1,
            border: `1px solid ${tokens.colorPaletteRedBorder1}`,
            borderRadius: tokens.borderRadiusMedium,
            color: tokens.colorPaletteRedForeground1,
            cursor: 'pointer',
            fontSize: tokens.fontSizeBase300
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export const PreviewSection: React.FC<PreviewSectionProps> = React.memo(({
  previewTitle = 'Preview',
  children,
  size = 'medium',
  disabled = false,
  onError,
  className,
}) => {
  const styles = useStyles();

  return (
    <ErrorBoundary
      fallback={PreviewSectionErrorFallback}
      onError={onError}
    >
      <FormLayoutProvider>
        <div className={`${styles.section} ${className || ''}`}>
          <div className={styles.previewArea}>
            <div className={styles.previewPanel}>
              <PreviewPanel
                title={previewTitle}
                size={size}
                disabled={disabled}
                onError={onError}
              >
                {children}
              </PreviewPanel>
            </div>
          </div>
        </div>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
});

PreviewSection.displayName = 'PreviewSection';
