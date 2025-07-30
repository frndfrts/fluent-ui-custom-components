/**
 * ErrorDisplay.tsx
 * Reusable component for displaying error messages with consistent styling.
 */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacingHorizontalXS)',
    marginTop: 'var(--spacingVerticalXS)',
    minHeight: '20px', // Prevent layout shift
  },
  icon: {
    color: 'var(--colorPaletteRedForeground1)',
    fontSize: 'var(--fontSizeBase300)',
    flexShrink: 0,
    marginTop: '2px',
  },
  message: {
    color: 'var(--colorPaletteRedForeground1)',
    fontSize: 'var(--fontSizeBase300)',
    lineHeight: 'var(--lineHeightBase300)',
    margin: 0,
    wordBreak: 'break-word',
  },
  warning: {
    color: 'var(--colorPaletteOrangeForeground1)',
  },
  info: {
    color: 'var(--colorPaletteBlueForeground1)',
  },
  success: {
    color: 'var(--colorPaletteGreenForeground1)',
  },
  hidden: {
    visibility: 'hidden',
  },
});

export type ErrorType = 'error' | 'warning' | 'info' | 'success';

export interface ErrorDisplayProps {
  message?: string | null;
  type?: ErrorType;
  show?: boolean;
  className?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

export const ErrorDisplay = React.memo<ErrorDisplayProps>(({
  message,
  type = 'error',
  show = true,
  className,
  'aria-live': ariaLive = 'polite',
}) => {
  const styles = useStyles();

  // Don't render if no message or not showing
  if (!message || !show) {
    return (
      <div className={`${styles.container} ${styles.hidden}`} aria-hidden="true">
        <span className={styles.icon}>⚠</span>
        <p className={styles.message}>Placeholder</p>
      </div>
    );
  }

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      case 'success':
        return '✓';
      case 'error':
      default:
        return '✕';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      case 'success':
        return styles.success;
      case 'error':
      default:
        return '';
    }
  };

  return (
    <div 
      className={`${styles.container} ${getTypeClass()} ${className || ''}`}
      role="alert"
      aria-live={ariaLive}
    >
      <span className={`${styles.icon} ${getTypeClass()}`}>
        {getIcon()}
      </span>
      <p className={`${styles.message} ${getTypeClass()}`}>
        {message}
      </p>
    </div>
  );
});

// Specialized error display components
export const ValidationError = React.memo<Omit<ErrorDisplayProps, 'type'>>((props) => (
  <ErrorDisplay {...props} type="error" />
));

export const WarningMessage = React.memo<Omit<ErrorDisplayProps, 'type'>>((props) => (
  <ErrorDisplay {...props} type="warning" />
));

export const InfoMessage = React.memo<Omit<ErrorDisplayProps, 'type'>>((props) => (
  <ErrorDisplay {...props} type="info" />
));

export const SuccessMessage = React.memo<Omit<ErrorDisplayProps, 'type'>>((props) => (
  <ErrorDisplay {...props} type="success" />
)); 