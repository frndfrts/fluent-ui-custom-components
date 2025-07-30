
/**
 * MarginsPanel.tsx
 * Panel for margin settings with individual unit controls for each side.
 */
import * as React from 'react';
import { makeStyles, tokens, Title3 } from '@fluentui/react-components';
import { DimensionInput } from '../inputs/DimensionInput';

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
    marginBottom: tokens.spacingVerticalXS,
  },
});

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topUnit: string;
  rightUnit: string;
  bottomUnit: string;
  leftUnit: string;
}

export interface MarginsPanelProps {
  margins: Margins;
  units: string[];
  onChange: (margins: Margins) => void;
  disabled?: boolean;
}

export const MarginsPanel = React.memo<MarginsPanelProps>(({
  margins,
  units,
  onChange,
  disabled = false,
}) => {
  const styles = useStyles();

  const handleTopChange = React.useCallback((value: number | '', unit: string) => {
    onChange({
      ...margins,
      top: typeof value === 'number' ? value : 0,
      topUnit: unit,
    });
  }, [margins, onChange]);

  const handleRightChange = React.useCallback((value: number | '', unit: string) => {
    onChange({
      ...margins,
      right: typeof value === 'number' ? value : 0,
      rightUnit: unit,
    });
  }, [margins, onChange]);

  const handleBottomChange = React.useCallback((value: number | '', unit: string) => {
    onChange({
      ...margins,
      bottom: typeof value === 'number' ? value : 0,
      bottomUnit: unit,
    });
  }, [margins, onChange]);

  const handleLeftChange = React.useCallback((value: number | '', unit: string) => {
    onChange({
      ...margins,
      left: typeof value === 'number' ? value : 0,
      leftUnit: unit,
    });
  }, [margins, onChange]);

  return (
    <div className={styles.panel}>
      <Title3>Margins</Title3>
      
      <div className={styles.section}>
        <DimensionInput
          label="Top"
          value={margins.top}
          unit={margins.topUnit}
          units={units}
          onChange={handleTopChange}
          disabled={disabled}
        />
        <DimensionInput
          label="Right"
          value={margins.right}
          unit={margins.rightUnit}
          units={units}
          onChange={handleRightChange}
          disabled={disabled}
        />
        <DimensionInput
          label="Bottom"
          value={margins.bottom}
          unit={margins.bottomUnit}
          units={units}
          onChange={handleBottomChange}
          disabled={disabled}
        />
        <DimensionInput
          label="Left"
          value={margins.left}
          unit={margins.leftUnit}
          units={units}
          onChange={handleLeftChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
});
