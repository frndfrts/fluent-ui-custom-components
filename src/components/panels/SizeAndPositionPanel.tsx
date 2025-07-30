/**
 * SizeAndPositionPanel.tsx
 * Panel for size and position controls using SizeFields and PositionFields components.
 */
import * as React from 'react';
import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { SizeFields } from './SizeFields';
import { PositionFields } from './PositionFields';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalM,
    width: '100%',
    maxWidth: '320px',
    minWidth: '240px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: 'var(--colorNeutralForeground1)',
    marginBottom: tokens.spacingVerticalXS,
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--colorNeutralStroke2)',
    margin: `${tokens.spacingVerticalM} 0`,
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
    <div className={styles.container}>
      {/* Size Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Size</Text>
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

      {/* Divider */}
      <div className={styles.divider} />

      {/* Position Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Position</Text>
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
