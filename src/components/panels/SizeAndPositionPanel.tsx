/**
 * SizeAndPositionPanel.tsx
 * Panel for size and position controls using SizeFields and PositionFields components.
 */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { SizeFields } from './SizeFields';
import { PositionFields } from './PositionFields';
import { DEFAULT_POSITIONS } from '../components/PositionSelector';

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

export interface SizeAndPositionPanelProps {
  // Size properties
  width?: number;
  height?: number;
  widthUnit?: string;
  heightUnit?: string;

  // Position properties
  position?: string;
  positions?: string[];
  x?: number;
  y?: number;
  xUnit?: string;
  yUnit?: string;

  // Common properties
  units?: string[];
  showLockAspectRatio?: boolean;
  lockAspectRatio?: boolean;
  onLockAspectRatioChange?: (locked: boolean) => void;
  disabled?: boolean;

  // Change handlers
  onSizeChange: (fields: {
    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;
  }) => void;
  onPositionChange: (fields: {
    position: string;
    x: number;
    y: number;
    xUnit: string;
    yUnit: string;
  }) => void;

  // Error handling
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
}

// Custom error fallback for SizeAndPositionPanel
const SizeAndPositionPanelErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();

  return (
    <div className={styles.errorFallback}>
      <div style={{ marginBottom: tokens.spacingVerticalS }}>
        Failed to load size and position settings
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

export const SizeAndPositionPanel = React.memo<SizeAndPositionPanelProps>(({
  width = 15,
  height = 10,
  widthUnit,
  heightUnit,
  position = 'middle-center',
  positions = DEFAULT_POSITIONS,
  x = 0,
  y = 0,
  xUnit,
  yUnit,
  units,
  showLockAspectRatio = true,
  lockAspectRatio,
  onLockAspectRatioChange,
  disabled = false,
  onSizeChange,
  onPositionChange,
  onError,
}) => {
  const styles = useStyles();

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary
      fallback={SizeAndPositionPanelErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <div className={styles.panel}>
        {/* Size Section */}
        <div className={styles.section}>
          <SizeFields
            width={width}
            height={height}
            widthUnit={widthUnit}
            heightUnit={heightUnit}
            units={units}
            showLockAspectRatio={showLockAspectRatio}
            lockAspectRatio={lockAspectRatio}
            onLockAspectRatioChange={onLockAspectRatioChange}
            disabled={disabled}
            onChange={onSizeChange}
            onError={onError}
          />
        </div>

        {/* Position Section */}
        <div className={styles.section}>
          <PositionFields
            position={position}
            positions={positions}
            x={x}
            y={y}
            xUnit={xUnit}
            yUnit={yUnit}
            units={units}
            onChange={onPositionChange}
            onError={onError}
            disabled={disabled}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
});
