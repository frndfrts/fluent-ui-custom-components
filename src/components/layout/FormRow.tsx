import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useFormLayout } from '../../styles/FormLayoutContext';

const useStyles = makeStyles({
  row: {
    display: 'grid',
    gridAutoRows: 'auto',
    alignItems: 'center',
  },
  labelCell: {
    justifySelf: 'end',
    color: 'var(--colorNeutralForeground1)',
  },
});

export interface FormRowProps {
  label: string;
  /** Single control spanning numeric + gap + unit */
  control?: React.ReactNode;
  /** Two-up layout: left in numeric, right in unit */
  leftControl?: React.ReactNode;
  rightControl?: React.ReactNode;
}

export const FormRow = React.memo<FormRowProps>(({ label, control, leftControl, rightControl }) => {
  const styles = useStyles();
  const layout = useFormLayout();
  const template = layout.gridTemplateColumns; // [label] [numeric] [gap] [unit]

  if (control) {
    // 1-up row: control spans numeric + gap + unit
    return (
      <div className={styles.row} style={{ gridTemplateColumns: template }}>
        <div className={styles.labelCell}>{label}:&nbsp;</div>
        <div style={{ gridColumn: '2 / span 3' }}>{control}</div>
      </div>
    );
  }

  return (
    <div className={styles.row} style={{ gridTemplateColumns: template }}>
      <div className={styles.labelCell}>{label}:&nbsp;</div>
      <div>{leftControl}</div>
      <div />
      <div>{rightControl}</div>
    </div>
  );
});


