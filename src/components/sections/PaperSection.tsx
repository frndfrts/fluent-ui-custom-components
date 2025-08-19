/**
 * PaperSection.tsx
 * Section component for paper-related settings including paper size and margins.
 */
import * as React from 'react';
import { makeStyles, tokens, Title2 } from '@fluentui/react-components';
import { PaperSizePanel } from '../panels/PaperSizePanel';
import { MarginsPanel } from '../panels/MarginsPanel';
import { FormLayoutProvider } from '../../styles/FormLayoutContext';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    width: '100%',
    maxWidth: '400px',
    padding: tokens.spacingVerticalL,
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground1,
    borderBottom: `2px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: tokens.spacingVerticalS,
  },
  panelContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
});

export interface PaperSectionProps {
  paperSize?: {
    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;
    orientation: string;
    paperSize: string;
  };
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    topUnit: string;
    rightUnit: string;
    bottomUnit: string;
    leftUnit: string;
  };
  units?: string[];
  onPaperSizeChange?: (paperSize: any) => void;
  onMarginsChange?: (margins: any) => void;
  disabled?: boolean;
}

export const PaperSection = React.memo<PaperSectionProps>(({
  paperSize,
  margins,
  units = ['px', 'pt', 'cm', 'mm', 'in'],
  onPaperSizeChange,
  onMarginsChange,
  disabled = false,
}) => {
  const styles = useStyles();

  const handlePaperSizeChange = React.useCallback((newPaperSize: any) => {
    if (onPaperSizeChange) {
      onPaperSizeChange(newPaperSize);
    }
  }, [onPaperSizeChange]);

  const handleMarginsChange = React.useCallback((newMargins: any) => {
    if (onMarginsChange) {
      onMarginsChange(newMargins);
    }
  }, [onMarginsChange]);

  return (
    <FormLayoutProvider>
      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>Paper</Title2>
        
        <div className={styles.panelContainer}>
          <PaperSizePanel
            paperSize={paperSize}
            units={units}
            onChange={handlePaperSizeChange}
          />
          
          <MarginsPanel
            margins={margins || { top: 0, right: 0, bottom: 0, left: 0, topUnit: 'cm', rightUnit: 'cm', bottomUnit: 'cm', leftUnit: 'cm' }}
            units={units}
            onChange={handleMarginsChange}
            disabled={disabled}
          />
        </div>
      </div>
    </FormLayoutProvider>
  );
});
