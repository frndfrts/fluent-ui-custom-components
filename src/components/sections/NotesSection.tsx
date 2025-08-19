/**
 * NotesSection.tsx
 * Section component for notes-related settings including size, position, and margins.
 */
import * as React from 'react';
import { makeStyles, tokens, Title2 } from '@fluentui/react-components';
import { SizeAndPositionPanel } from '../panels/SizeAndPositionPanel';
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

export interface NotesSectionProps {
  size?: {
    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;
  };
  position?: {
    position: string;
    x: number;
    y: number;
    xUnit: string;
    yUnit: string;
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
  positions?: string[];
  units?: string[];
  showLockAspectRatio?: boolean;
  onSizeChange?: (size: any) => void;
  onPositionChange?: (position: any) => void;
  onMarginsChange?: (margins: any) => void;
  disabled?: boolean;
}

export const NotesSection = React.memo<NotesSectionProps>(({
  size,
  position,
  margins,
  positions = ['top-left', 'top-center', 'top-right', 'center', 'bottom-left', 'bottom-center', 'bottom-right', 'Custom'],
  units = ['px', 'pt', 'cm', 'mm', 'in'],
  showLockAspectRatio = true,
  onSizeChange,
  onPositionChange,
  onMarginsChange,
  disabled = false,
}) => {
  const styles = useStyles();

  const handleSizeChange = React.useCallback((newSize: any) => {
    if (onSizeChange) {
      onSizeChange(newSize);
    }
  }, [onSizeChange]);

  const handlePositionChange = React.useCallback((newPosition: any) => {
    if (onPositionChange) {
      onPositionChange(newPosition);
    }
  }, [onPositionChange]);

  const handleMarginsChange = React.useCallback((newMargins: any) => {
    if (onMarginsChange) {
      onMarginsChange(newMargins);
    }
  }, [onMarginsChange]);

  return (
    <FormLayoutProvider>
      <div className={styles.section}>
        <Title2 className={styles.sectionTitle}>Notes</Title2>
        
        <div className={styles.panelContainer}>
          <SizeAndPositionPanel
            width={size?.width || 400}
            height={size?.height || 300}
            widthUnit={size?.widthUnit || 'px'}
            heightUnit={size?.heightUnit || 'px'}
            position={position?.position || 'Custom'}
            positions={positions}
            x={position?.x || 0}
            y={position?.y || 0}
            xUnit={position?.xUnit || 'px'}
            yUnit={position?.yUnit || 'px'}
            units={units}
            showLockAspectRatio={showLockAspectRatio}
            onSizeChange={handleSizeChange}
            onPositionChange={handlePositionChange}
            disabled={disabled}
          />
          
          <MarginsPanel
            margins={margins || { top: 0, right: 0, bottom: 0, left: 0, topUnit: 'px', rightUnit: 'px', bottomUnit: 'px', leftUnit: 'px' }}
            units={units}
            onChange={handleMarginsChange}
            disabled={disabled}
          />
        </div>
      </div>
    </FormLayoutProvider>
  );
});
