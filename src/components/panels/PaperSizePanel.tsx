/**
 * PaperSizePanel.tsx
 * Integrated panel for paper size selection, dimensions, and orientation.
 */
import * as React from 'react';
import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { PaperSelector } from '../components/PaperSelector';
import { SizeFields } from './SizeFields';
import { OrientationSelector } from '../components/OrientationSelector';
import { FormLayoutProvider } from '../../styles/FormLayoutContext';
import { usePaperSizeManager } from '../../hooks/usePaperSizeManager';
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

export interface PaperSize {
  width: number;
  height: number;
  widthUnit?: string; // Individual unit for width
  heightUnit?: string; // Individual unit for height
  orientation: string;
  paperSize: string;
}

export interface PaperSizePanelProps {
  paperSize?: PaperSize;
  units?: string[];
  onChange?: (paperSize: PaperSize) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}

// Custom error fallback for PaperSizePanel
const PaperSizePanelErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.errorFallback}>
      <div style={{ marginBottom: tokens.spacingVerticalS }}>
        Failed to load paper size settings
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

export const PaperSizePanel = React.memo<PaperSizePanelProps>(({
  paperSize: externalPaperSize,
  units,
  onChange: externalOnChange,
  onError,
  disabled = false,
}) => {
  const styles = useStyles();

  // Use the paper size manager hook
  const {
    paperSizeData,
    areDimensionsEditable,
    updatePaperSize,
    updateDimensions,
    updateOrientation,
  } = usePaperSizeManager(
    externalPaperSize?.paperSize || 'A4',
    externalPaperSize?.widthUnit || DEFAULT_UNIT,
    externalPaperSize?.heightUnit || DEFAULT_UNIT,
    externalPaperSize?.orientation || 'portrait'
  );

  // Handle external onChange if provided
  const handlePaperSizeChange = React.useCallback((newPaperSize: string) => {
    try {
      updatePaperSize(newPaperSize);
      if (externalOnChange) {
        const updatedData = { ...paperSizeData, paperSize: newPaperSize };
        externalOnChange(updatedData);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in paper size change');
      onError?.(errorObj);
    }
  }, [updatePaperSize, externalOnChange, paperSizeData, onError]);

  const handleDimensionsChange = React.useCallback((fields: {
    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;
  }) => {
    try {
      updateDimensions(fields.width, fields.height, fields.widthUnit, fields.heightUnit);
      if (externalOnChange) {
        const updatedData = { ...paperSizeData, ...fields };
        externalOnChange(updatedData);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in dimensions change');
      onError?.(errorObj);
    }
  }, [updateDimensions, externalOnChange, paperSizeData, onError]);

  const handleOrientationChange = React.useCallback((newOrientation: string) => {
    try {
      updateOrientation(newOrientation);
      if (externalOnChange) {
        const updatedData = { ...paperSizeData, orientation: newOrientation };
        externalOnChange(updatedData);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in orientation change');
      onError?.(errorObj);
    }
  }, [updateOrientation, externalOnChange, paperSizeData, onError]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={PaperSizePanelErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <FormLayoutProvider>
        <div className={styles.panel}>
          {/* Paper Type and Size Selection */}
          <div className={styles.section}>
            <Text className={styles.sectionTitle}>Paper Type and Size</Text>
            <PaperSelector
              value={paperSizeData.paperSize}
              onChange={handlePaperSizeChange}
              disabled={disabled}
              onError={onError}
            />
          </div>

          {/* Dimensions */}
          <div className={styles.section}>
            <SizeFields
              width={paperSizeData.width}
              height={paperSizeData.height}
              {...(paperSizeData.widthUnit !== undefined && { widthUnit: paperSizeData.widthUnit })}
              {...(paperSizeData.heightUnit !== undefined && { heightUnit: paperSizeData.heightUnit })}
              {...(units !== undefined && { units })}
              showLockAspectRatio={false}
              disabled={disabled || !areDimensionsEditable}
              onChange={handleDimensionsChange}
              onError={onError}
            />
          </div>

          {/* Orientation */}
          <div className={styles.section}>
            <OrientationSelector
              orientation={paperSizeData.orientation}
              onChange={handleOrientationChange}
              disabled={disabled}
              onError={onError}
            />
          </div>
        </div>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
}); 