/**
 * ErrorBoundary.tsx
 * React Error Boundary for catching and handling component errors gracefully.
 */
import * as React from 'react';
import { Button, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    padding: 'var(--spacingVerticalL)',
    border: `1px solid var(--colorPaletteRedBorder2)`,
    borderRadius: 'var(--borderRadiusMedium)',
    backgroundColor: 'var(--colorPaletteRedBackground2)',
    margin: 'var(--spacingVerticalM) 0',
  },
  title: {
    color: 'var(--colorPaletteRedForeground1)',
    fontSize: 'var(--fontSizeBase500)',
    fontWeight: 'var(--fontWeightSemibold)',
    marginBottom: 'var(--spacingVerticalS)',
  },
  message: {
    color: 'var(--colorPaletteRedForeground2)',
    fontSize: 'var(--fontSizeBase300)',
    marginBottom: 'var(--spacingVerticalM)',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  actions: {
    display: 'flex',
    gap: 'var(--spacingHorizontalS)',
    marginTop: 'var(--spacingVerticalM)',
  },
});

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetOnPropsChange?: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error state when props change (if enabled)
    if (this.props.resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetError();
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      // Default fallback UI
      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

// Default error fallback component
interface DefaultErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error, resetError }) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Something went wrong</div>
      <div className={styles.message}>
        {error.message || 'An unexpected error occurred'}
      </div>
      <div className={styles.actions}>
        <Button appearance="primary" onClick={resetError}>
          Try Again
        </Button>
        <Button appearance="outline" onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </div>
    </div>
  );
}; 