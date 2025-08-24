
/**
 * SizeFields.tsx
 * Panel for width and height input with optional aspect ratio lock.
 */
import * as React from 'react';
import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { DimensionInput } from '../compositions/DimensionInput';
import { LockAspectRatio } from '../primitives/LockAspectRatio';
import { DEFAULT_UNIT } from '../components/UnitSelector';

import { FormLayoutProvider } from '../../styles/FormLayoutContext';
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

export interface SizeFieldsProps {
  width?: number;
  height?: number;
  widthUnit?: string;
  heightUnit?: string;
  units?: string[];
  showLockAspectRatio?: boolean;
  lockAspectRatio?: boolean;
  onLockAspectRatioChange?: (locked: boolean) => void;
  onChange: (fields: {
    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;
  }) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}

// Custom error fallback for SizeFields
const SizeFieldsErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.errorFallback}>
      <div style={{ marginBottom: tokens.spacingVerticalS }}>
        Failed to load size settings
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

export const SizeFields = React.memo<SizeFieldsProps>(({
  width = 15,
  height = 10,
  widthUnit,
  heightUnit,
  units,
  showLockAspectRatio = true,
  lockAspectRatio = false,
  onLockAspectRatioChange,
  onChange,
  onError,
  disabled = false,
}) => {
  const styles = useStyles();

  // Local state for aspect ratio lock - this ensures the checkbox works immediately
  const [localLockAspectRatio, setLocalLockAspectRatio] = React.useState(lockAspectRatio);

  // Update local state when prop changes
  React.useEffect(() => {
    setLocalLockAspectRatio(lockAspectRatio);
  }, [lockAspectRatio]);

  // Store the original dimensions when aspect ratio is first locked - use full precision
  const [lockedDimensions, setLockedDimensions] = React.useState<{ width: number; height: number } | null>(null);

  // Update locked dimensions when aspect ratio is locked or dimensions change significantly
  // Use a very small threshold to avoid unnecessary updates while maintaining precision
  React.useEffect(() => {
    if (localLockAspectRatio && (lockedDimensions === null || 
        Math.abs(width - lockedDimensions.width) > 0.001 || 
        Math.abs(height - lockedDimensions.height) > 0.001)) {
      setLockedDimensions({ width, height });
    }
  }, [localLockAspectRatio, width, height, lockedDimensions]);

  // Calculate aspect ratio from the locked dimensions (more stable for stepping)
  // Use full precision values for calculations
  const aspectRatio = React.useMemo(() => {
    if (localLockAspectRatio && lockedDimensions) {
      return lockedDimensions.width > 0 && lockedDimensions.height > 0 ? 
        lockedDimensions.width / lockedDimensions.height : 1;
    }
    return width > 0 && height > 0 ? width / height : 1;
  }, [localLockAspectRatio, lockedDimensions, width, height]);

  const handleWidthChange = React.useCallback((value: number | '', unit: string) => {
    try {
      const currentHeightUnit = heightUnit || DEFAULT_UNIT;
      const newWidth = typeof value === 'number' ? value : 0;
      
      let newHeight = height;
      // If aspect ratio is locked, adjust height proportionally
      // Use full precision values for calculations, don't truncate during calculation
      if (localLockAspectRatio && newWidth > 0 && aspectRatio > 0) {
        // Calculate with full precision, only round at the very end if needed
        newHeight = newWidth / aspectRatio;
      }

      onChange({
        width: newWidth,
        height: newHeight,
        widthUnit: unit,
        heightUnit: currentHeightUnit,
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in width change');
      onError?.(errorObj);
    }
  }, [onChange, height, heightUnit, localLockAspectRatio, aspectRatio, onError]);

  const handleHeightChange = React.useCallback((value: number | '', unit: string) => {
    try {
      const currentWidthUnit = widthUnit || DEFAULT_UNIT;
      const newHeight = typeof value === 'number' ? value : 0;
      
      let newWidth = width;
      // If aspect ratio is locked, adjust width proportionally
      // Use full precision values for calculations, don't truncate during calculation
      if (localLockAspectRatio && newHeight > 0 && aspectRatio > 0) {
        // Calculate with full precision, only round at the very end if needed
        newWidth = newHeight * aspectRatio;
      }

      onChange({
        width: newWidth,
        height: newHeight,
        widthUnit: currentWidthUnit,
        heightUnit: unit,
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in height change');
      onError?.(errorObj);
    }
  }, [onChange, width, widthUnit, localLockAspectRatio, aspectRatio, onError]);

  const handleLockAspectRatioChange = React.useCallback((locked: boolean) => {
    try {
      // Update local state immediately for responsive UI
      setLocalLockAspectRatio(locked);
      
      // If locking, store current dimensions as the reference point
      // Store the full precision values, not truncated display values
      if (locked) {
        setLockedDimensions({ width, height });
      } else {
        setLockedDimensions(null);
      }
      
      // Call parent callback to propagate state up
      if (onLockAspectRatioChange) {
        onLockAspectRatioChange(locked);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in aspect ratio lock change');
      onError?.(errorObj);
    }
  }, [onLockAspectRatioChange, onError, width, height]);

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={SizeFieldsErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <FormLayoutProvider>
        <div className={styles.panel}>
          <Text className={styles.sectionTitle}>Size</Text>
          <div className={styles.section}>
            <DimensionInput
              label="Width"
              value={width}
              {...(widthUnit !== undefined && { unit: widthUnit })}
              {...(units !== undefined && { units })}
              onChange={handleWidthChange}
              disabled={disabled}
              onError={onError}
            />
            
            <DimensionInput
              label="Height"
              value={height}
              {...(heightUnit !== undefined && { unit: heightUnit })}
              {...(units !== undefined && { units })}
              onChange={handleHeightChange}
              disabled={disabled}
              onError={onError}
            />
          </div>
          
          {showLockAspectRatio && (
            <div className={styles.section}>
              <LockAspectRatio
                checked={localLockAspectRatio}
                onChange={handleLockAspectRatioChange}
                disabled={disabled}
                onError={onError}
              />
            </div>
          )}
        </div>
      </FormLayoutProvider>
    </ErrorBoundary>
  );
});
