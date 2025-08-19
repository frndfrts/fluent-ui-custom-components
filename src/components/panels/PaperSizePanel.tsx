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

export interface PaperSize {
  width: number;
  height: number;
  widthUnit: string; // Individual unit for width
  heightUnit: string; // Individual unit for height
  orientation: string;
  paperSize: string;
}

export interface PaperSizePanelProps {
  paperSize?: PaperSize;
  units?: string[];
  onChange?: (paperSize: PaperSize) => void;
}

export const PaperSizePanel = React.memo<PaperSizePanelProps>(({
  paperSize: externalPaperSize,
  units = ['%', 'cm', 'in', 'mm', 'pt', 'px'],
  onChange: externalOnChange,
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
    externalPaperSize?.widthUnit || 'cm',
    externalPaperSize?.heightUnit || 'cm',
    externalPaperSize?.orientation || 'portrait'
  );

  // Standard paper sizes with dimensions in cm
  const standardPaperSizes = React.useMemo(() => [
    'A4',
    'A3', 
    'A5',
    'Letter',
    'Legal',
    'Tabloid',
    'A0',
    'A1',
    'A2',
    'A6'
  ], []);

  // Handle external onChange if provided
  const handlePaperSizeChange = React.useCallback((newPaperSize: string) => {
    updatePaperSize(newPaperSize);
    if (externalOnChange) {
      const updatedData = { ...paperSizeData, paperSize: newPaperSize };
      externalOnChange(updatedData);
    }
  }, [updatePaperSize, externalOnChange, paperSizeData]);

  const handleDimensionsChange = React.useCallback((fields: {
    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;
  }) => {
    updateDimensions(fields.width, fields.height, fields.widthUnit, fields.heightUnit);
    if (externalOnChange) {
      const updatedData = { ...paperSizeData, ...fields };
      externalOnChange(updatedData);
    }
  }, [updateDimensions, externalOnChange, paperSizeData]);

  const handleOrientationChange = React.useCallback((orientation: string) => {
    updateOrientation(orientation);
    if (externalOnChange) {
      const updatedData = { ...paperSizeData, orientation };
      externalOnChange(updatedData);
    }
  }, [updateOrientation, externalOnChange, paperSizeData]);

  return (
    <FormLayoutProvider>
      <div className={styles.panel}>
        <Text className={styles.sectionTitle}>Paper Size</Text>

        <div className={styles.section}>
          <PaperSelector
            label="Paper Type"
            paperSize={paperSizeData.paperSize}
            paperSizes={standardPaperSizes}
            onChange={handlePaperSizeChange}
          />
        </div>

        <div className={styles.section}>
          <SizeFields
            width={paperSizeData.width}
            height={paperSizeData.height}
            widthUnit={paperSizeData.widthUnit}
            heightUnit={paperSizeData.heightUnit}
            units={units}
            showLockAspectRatio={true}
            disabled={!areDimensionsEditable}
            onChange={handleDimensionsChange}
          />
        </div>

        <div className={styles.section}>
          <OrientationSelector
            label="Orientation"
            orientation={paperSizeData.orientation}
            onChange={handleOrientationChange}
          />
        </div>
      </div>
    </FormLayoutProvider>
  );
}); 