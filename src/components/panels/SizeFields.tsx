
/**
 * SizeFields.tsx
 * Panel for width and height input with optional lock aspect ratio toggle.
 */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { DimensionInput } from '../compositions/DimensionInput';
import { LockAspectRatio } from '../primitives/LockAspectRatio';
import { FormLayoutProvider } from '../../styles/FormLayoutContext';
import { useAspectRatioLock } from '../../hooks/useAspectRatioLock';

const useStyles = makeStyles({
  group: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
    width: '100%',
    maxWidth: '320px',
    minWidth: '240px',
  },
});

export interface SizeFieldsProps {
  width: number;
  height: number;
  widthUnit: string; // Individual unit for width
  heightUnit: string; // Individual unit for height
  units: string[];
  showLockAspectRatio?: boolean;
  disabled?: boolean;
  onChange: (fields: {
    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;
  }) => void;
}

export const SizeFields = React.memo<SizeFieldsProps>(({ 
  width,
  height,
  widthUnit,
  heightUnit,
  units,
  showLockAspectRatio = true,
  disabled = false,
  onChange,
}) => {
  const styles = useStyles();
  
  // Internal state for lock aspect ratio
  const [isLocked, setIsLocked] = React.useState(false);
  
  // Use the aspect ratio lock hook
  const { updateDimensions, setIsLocked: setHookLocked } = useAspectRatioLock(width, height);

  // Sync internal state with hook state
  React.useEffect(() => {
    setHookLocked(isLocked);
  }, [isLocked, setHookLocked]);

  const updateWidth = React.useCallback((w: number | '', u: string) => {
    if (typeof w === 'number') {
      const { width: newWidth, height: newHeight } = updateDimensions(w, height, 'width');
      onChange({ 
        width: newWidth, 
        height: newHeight, 
        widthUnit: u,
        heightUnit: heightUnit
      });
    } else {
      onChange({ width: 0, height, widthUnit: u, heightUnit: heightUnit });
    }
  }, [height, heightUnit, updateDimensions, onChange]);

  const updateHeight = React.useCallback((h: number | '', u: string) => {
    if (typeof h === 'number') {
      const { width: newWidth, height: newHeight } = updateDimensions(width, h, 'height');
      onChange({ 
        width: newWidth, 
        height: newHeight, 
        widthUnit: widthUnit,
        heightUnit: u
      });
    } else {
      onChange({ width, height: 0, widthUnit: widthUnit, heightUnit: u });
    }
  }, [width, widthUnit, updateDimensions, onChange]);

  const handleLockToggle = React.useCallback((checked: boolean) => {
    setIsLocked(checked);
  }, []);

  return (
    <FormLayoutProvider>
      <div className={styles.group}>
        <DimensionInput 
          label="Width"
          value={width} 
          unit={widthUnit} 
          units={units} 
          onChange={updateWidth}
          disabled={disabled}
        />
        <DimensionInput 
          label="Height"
          value={height} 
          unit={heightUnit} 
          units={units} 
          onChange={updateHeight}
          disabled={disabled}
        />
        {showLockAspectRatio && (
          <LockAspectRatio
            checked={isLocked}
            onChange={handleLockToggle}
            disabled={disabled}
          />
        )}
      </div>
    </FormLayoutProvider>
  );
});
