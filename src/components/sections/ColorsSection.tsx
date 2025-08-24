/**
 * ColorsSection.tsx
 * Section component for color theme configuration with multiple color pickers.
 * Each color picker represents a standard PowerPoint color theme label.
 */
import * as React from 'react';
import { makeStyles, tokens, Card, CardHeader } from '@fluentui/react-components';
import { LabeledColorPicker } from '../compositions/LabeledColorPicker';
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
    width: '400px',
    maxWidth: '400px',
    minWidth: '400px',
  },
  colorPickerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
  },
  colorPickerRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },

});

export interface ColorsSectionProps {
  colors?: {
    accent1?: string;
    accent2?: string;
    accent3?: string;
    accent4?: string;
    accent5?: string;
    accent6?: string;
    dark1?: string;
    dark2?: string;
    light1?: string;
    light2?: string;
    hyperlink?: string;
    followedHyperlink?: string;
  };
  onColorChange?: (colorKey: string, color: string) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}

// Standard PowerPoint color theme labels
const COLOR_LABELS = {
  accent1: 'Accent 1',
  accent2: 'Accent 2',
  accent3: 'Accent 3',
  accent4: 'Accent 4',
  accent5: 'Accent 5',
  accent6: 'Accent 6',
  dark1: 'Dark 1',
  dark2: 'Dark 2',
  light1: 'Light 1',
  light2: 'Light 2',
  hyperlink: 'Hyperlink',
  followedHyperlink: 'Followed Hyperlink',
};

// Default color values (Standard PowerPoint default theme colors)
const DEFAULT_COLORS = {
  // Dark and Light Colors (Primary theme colors)
  dark1: '#000000',        // Primary text color
  light1: '#FFFFFF',       // Primary background color
  dark2: '#44546A',        // Secondary text color
  light2: '#E7E6E6',       // Secondary background color
  
  // Accent Colors (Theme accent colors)
  accent1: '#4472C4',      // Blue accent
  accent2: '#ED7D31',      // Orange accent
  accent3: '#A5A5A5',      // Gray accent
  accent4: '#FFC000',      // Yellow accent
  accent5: '#5B9BD5',      // Light blue accent
  accent6: '#70AD47',      // Green accent
  
  // Hyperlink Colors
  hyperlink: '#0563C1',    // Standard hyperlink blue
  followedHyperlink: '#954F72', // Visited link purple
};

// Custom error fallback for ColorsSection
const ColorsSectionErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <Card className={styles.card}>
      <CardHeader 
        header="Colors" 
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
            Failed to load color theme settings
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

export const ColorsSection = React.memo<ColorsSectionProps>(({
  colors = DEFAULT_COLORS,
  onColorChange,
  onError,
  disabled = false,
}) => {
  const styles = useStyles();

  // Handle color changes
  const handleColorChange = React.useCallback((colorKey: string, color: string) => {
    try {
      if (onColorChange) {
        onColorChange(colorKey, color);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in color change');
      onError?.(errorObj);
    }
  }, [onColorChange, onError]);

  // Render individual color picker
  const renderColorPicker = React.useCallback((colorKey: keyof typeof COLOR_LABELS) => {
    const label = COLOR_LABELS[colorKey];
    const color = colors[colorKey] || DEFAULT_COLORS[colorKey];

    return (
      <div key={colorKey} className={styles.colorPickerRow}>
        <LabeledColorPicker
          value={color}
          onChange={(newColor: string) => handleColorChange(colorKey, newColor)}
          label={label}
          disabled={disabled}
          onError={onError}
        />
      </div>
    );
  }, [colors, disabled, onError, styles.colorPickerRow, handleColorChange]);

  return (
    <ErrorBoundary
      fallback={ColorsSectionErrorFallback}
      onError={onError}
    >
      <FormLayoutProvider>
        <div className={styles.section}>
          <Card className={styles.card}>
            <CardHeader 
              header="Colors" 
              style={{
                fontSize: tokens.fontSizeBase400,
                fontWeight: tokens.fontWeightSemibold,
                color: tokens.colorNeutralForeground1,
                paddingBottom: tokens.spacingVerticalS,
                borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
                marginBottom: tokens.spacingVerticalM
              }}
            />
            <div className={styles.colorPickerContainer}>
              {/* Dark and Light Colors */}
              {renderColorPicker('dark1')}
              {renderColorPicker('light1')}
              {renderColorPicker('dark2')}
              {renderColorPicker('light2')}
              
              {/* Accent Colors */}
              {renderColorPicker('accent1')}
              {renderColorPicker('accent2')}
              {renderColorPicker('accent3')}
              {renderColorPicker('accent4')}
              {renderColorPicker('accent5')}
              {renderColorPicker('accent6')}
              
              {/* Hyperlink Colors */}
              {renderColorPicker('hyperlink')}
              {renderColorPicker('followedHyperlink')}
            </div>
          </Card>
        </div>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
});

ColorsSection.displayName = 'ColorsSection';
