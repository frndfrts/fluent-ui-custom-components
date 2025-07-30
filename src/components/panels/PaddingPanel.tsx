
/**
 * PaddingPanel.tsx
 * Panel for padding settings with individual unit controls for each side.
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

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topUnit: string;
  rightUnit: string;
  bottomUnit: string;
  leftUnit: string;
}

export interface PaddingPanelProps {
  padding: Padding;
  units: string[];
  onChange: (padding: Padding) => void;
  disabled?: boolean;
}

export const PaddingPanel = React.memo<PaddingPanelProps>(({
  padding,
  units,
  onChange,
  disabled = false,
}) => {
  const styles = useStyles();

  const handleTopChange = React.useCallback((value: number | '', unit: string) => {
    onChange({
      ...padding,
      top: typeof value === 'number' ? value : 0,
      topUnit: unit,
    });
  }, [padding, onChange]);

  const handleRightChange = React.useCallback((value: number | '', unit: string) => {
    onChange({
      ...padding,
      right: typeof value === 'number' ? value : 0,
      rightUnit: unit,
    });
  }, [padding, onChange]);

  const handleBottomChange = React.useCallback((value: number | '', unit: string) => {
    onChange({
      ...padding,
      bottom: typeof value === 'number' ? value : 0,
      bottomUnit: unit,
    });
  }, [padding, onChange]);

  const handleLeftChange = React.useCallback((value: number | '', unit: string) => {
    onChange({
      ...padding,
      left: typeof value === 'number' ? value : 0,
      leftUnit: unit,
    });
  }, [padding, onChange]);

  return (
    <div className={styles.panel}>
      <Title3>Padding</Title3>
      
      <div className={styles.section}>
        <DimensionInput
          label="Top"
          value={padding.top}
          unit={padding.topUnit}
          units={units}
          onChange={handleTopChange}
          disabled={disabled}
        />
        <DimensionInput
          label="Right"
          value={padding.right}
          unit={padding.rightUnit}
          units={units}
          onChange={handleRightChange}
          disabled={disabled}
        />
        <DimensionInput
          label="Bottom"
          value={padding.bottom}
          unit={padding.bottomUnit}
          units={units}
          onChange={handleBottomChange}
          disabled={disabled}
        />
        <DimensionInput
          label="Left"
          value={padding.left}
          unit={padding.leftUnit}
          units={units}
          onChange={handleLeftChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
});
