/**
 * SizeAndPositionPanel.tsx
 * Panel for size and position controls using SizeFields and PositionFields components.
 */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { SizeFields } from './SizeFields';
import { PositionFields } from './PositionFields';

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

});

export interface SizeAndPositionPanelProps {
  // Size properties
  width: number;
  height: number;
  widthUnit: string;
  heightUnit: string;
  
  // Position properties
  position: string;
  positions: string[];
  x: number;
  y: number;
  xUnit: string;
  yUnit: string;
  
  // Common properties
  units: string[];
  showLockAspectRatio?: boolean;
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
}

export const SizeAndPositionPanel = React.memo<SizeAndPositionPanelProps>(({
  width,
  height,
  widthUnit,
  heightUnit,
  position,
  positions,
  x,
  y,
  xUnit,
  yUnit,
  units,
  showLockAspectRatio = true,
  disabled = false,
  onSizeChange,
  onPositionChange,
}) => {
  const styles = useStyles();

  return (
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
          disabled={disabled}
          onChange={onSizeChange}
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
          size="medium"
          disabled={disabled}
        />
      </div>
    </div>
  );
});
