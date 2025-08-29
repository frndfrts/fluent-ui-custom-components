/**
 * SizeAndPositionPanel.tsx
 * Panel for size and position controls using SizeFields and PositionFields components.
 */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { SizeFields } from './SizeFields';
import { PositionFields } from './PositionFields';
import { DEFAULT_POSITIONS, DEFAULT_POSITION } from '../components/PositionSelector';

import { ErrorBoundary } from '../error/ErrorBoundary';
import { computeCoordinates } from '../../utils/positioning';

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
  // Inner element size
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

  // Outer/Active area (in cm). If not provided, no preset recomputation is applied.
  // Option A: explicit active area
  activeX?: number; // usually 0
  activeY?: number; // usually 0
  activeWidth?: number;
  activeHeight?: number;
  // Option B: outer with padding (active area derived)
  outerWidth?: number;
  outerHeight?: number;
  outerPaddingTop?: number;
  outerPaddingRight?: number;
  outerPaddingBottom?: number;
  outerPaddingLeft?: number;

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
  position = DEFAULT_POSITION,
  positions = DEFAULT_POSITIONS,
  x = 0,
  y = 0,
  xUnit,
  yUnit,
  // Active area/outer
  activeX,
  activeY,
  activeWidth,
  activeHeight,
  outerWidth,
  outerHeight,
  outerPaddingTop = 0,
  outerPaddingRight = 0,
  outerPaddingBottom = 0,
  outerPaddingLeft = 0,
  // Common
  units,
  showLockAspectRatio = true,
  lockAspectRatio,
  onLockAspectRatioChange,
  disabled = false,
  onSizeChange,
  onPositionChange,
  onError,
}) => {

  // Derive active area (in cm)
  const getActiveArea = React.useCallback(() => {
    try {
      if (typeof activeWidth === 'number' && typeof activeHeight === 'number') {
        return {
          activeX: typeof activeX === 'number' ? activeX : 0,
          activeY: typeof activeY === 'number' ? activeY : 0,
          activeWidth,
          activeHeight,
        };
      }
      if (typeof outerWidth === 'number' && typeof outerHeight === 'number') {
        const ax = outerPaddingLeft || 0;
        const ay = outerPaddingTop || 0;
        const aw = Math.max(0, outerWidth - (outerPaddingLeft || 0) - (outerPaddingRight || 0));
        const ah = Math.max(0, outerHeight - (outerPaddingTop || 0) - (outerPaddingBottom || 0));
        return { activeX: ax, activeY: ay, activeWidth: aw, activeHeight: ah };
      }
      return { activeX: 0, activeY: 0, activeWidth: 0, activeHeight: 0 };
    } catch {
      return { activeX: 0, activeY: 0, activeWidth: 0, activeHeight: 0 };
    }
  }, [activeX, activeY, activeWidth, activeHeight, outerWidth, outerHeight, outerPaddingTop, outerPaddingRight, outerPaddingBottom, outerPaddingLeft]);

  // Recompute x/y for presets when dependent inputs change
  React.useEffect(() => {
    try {
      if (position === 'Custom') return; // user-defined, do not override

      // Inner size already in cm at this panel level
      const innerWidthCm = typeof width === 'number' ? width : 0;
      const innerHeightCm = typeof height === 'number' ? height : 0;

      const { activeWidth, activeHeight } = getActiveArea();
      const activeWidthCm = activeWidth || 0;
      const activeHeightCm = activeHeight || 0;

      if (activeWidthCm <= 0 || activeHeightCm <= 0) return; // cannot compute

      const { xCm, yCm } = computeCoordinates({
        position: position as any,
        innerWidthCm,
        innerHeightCm,
        activeWidthCm,
        activeHeightCm,
        clampToActiveArea: true,
      });

      // Emit updated position with cm-based values; PositionFields handles display conversion
      onPositionChange({
        position,
        x: xCm,
        y: yCm,
        xUnit: xUnit || 'cm',
        yUnit: yUnit || 'cm',
      });
    } catch (error) {
      // swallow; rely on error boundary
    }
  }, [position, width, height, getActiveArea, xUnit, yUnit]);

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
