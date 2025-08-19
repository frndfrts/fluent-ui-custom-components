/**
 * NotesSection.tsx
 * Section component for notes-related settings including size, position, and margins.
 */
import * as React from 'react';
import { makeStyles, tokens, Card, CardHeader } from '@fluentui/react-components';
import { SizeAndPositionPanel } from '../panels/SizeAndPositionPanel';
import { MarginsPanel } from '../panels/MarginsPanel';
import { FormLayoutProvider } from '../../styles/FormLayoutContext';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    width: '100%',
    maxWidth: '100%',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    minWidth: '380px',
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
      <Card className={styles.card}>
        <CardHeader 
          header="Notes" 
          style={{
            fontSize: tokens.fontSizeBase400,
            fontWeight: tokens.fontWeightSemibold,
            color: tokens.colorNeutralForeground1,
            paddingBottom: tokens.spacingVerticalS,
            borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
            marginBottom: tokens.spacingVerticalM
          }}
        />
        <div className={styles.section}>
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
      </Card>
    </FormLayoutProvider>
  );
});
