/**
 * ErrorBoundary.tsx
 * 
 * React Error Boundary for catching and handling component errors gracefully.
 * 
 * @description
 * This component catches JavaScript errors anywhere in the component tree and displays
 * a fallback UI instead of crashing the entire application. It's a crucial part of
 * building robust React applications that can handle runtime errors gracefully.
 * 
 * @features
 * - Catches JavaScript errors in child components
 * - Displays customizable fallback UI
 * - Provides error reporting via onError callback
 * - Supports automatic error reset on prop changes
 * - Logs errors to console in development mode
 * - Maintains application stability during errors
 * 
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={({ error, resetError }) => (
 *     <div>
 *       <h3>Something went wrong</h3>
 *       <p>Error: {error.message}</p>
 *       <button onClick={resetError}>Try again</button>
 *     </div>
 *   )}
 *   onError={(error, errorInfo) => {
 *     console.error('Error caught:', error);
 *     // Send to error reporting service
 *   }}
 *   resetOnPropsChange={true}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 * 
 * @since 1.0.0
 * @author Fluent UI Custom Components Team
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

/**
 * Props for the ErrorBoundary component
 */
export interface ErrorBoundaryProps {
  /** React components to render within the error boundary */
  children: React.ReactNode;
  
  /** Component to render when an error occurs. Receives error and resetError function. */
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  
  /** Callback when an error is caught. Useful for error reporting and logging. */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  
  /** Whether to automatically reset error state when props change. Defaults to false. */
  resetOnPropsChange?: boolean;
}

/**
 * Internal state for the ErrorBoundary component
 */
export interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  
  /** The error that was caught, if any */
  error: Error | null;
  
  /** Additional error information from React, if available */
  errorInfo: React.ErrorInfo | null;
}

/**
 * ErrorBoundary class component
 * 
 * Catches JavaScript errors in child components and renders a fallback UI.
 * This is a class component because React Error Boundaries must be class components.
 * 
 * @extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Static method called when an error is thrown in a child component
   * 
   * @param error - The error that was thrown
   * @returns Partial state update to indicate error state
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called after an error is caught
   * 
   * @param error - The error that was thrown
   * @param errorInfo - Additional error information from React
   */
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

  /**
   * Resets the error state, allowing the component to render normally again
   */
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