/**
 * errorLogger.ts
 * Centralized error logging utility for consistent error handling and reporting.
 */

export interface ErrorLogEntry {
  id: string;
  timestamp: Date;
  error: Error;
  context?: Record<string, any>;
  componentStack?: string;
  userAgent?: string;
  url?: string;
}

export interface ErrorLoggerOptions {
  enableConsole?: boolean;
  enableRemote?: boolean;
  remoteEndpoint?: string;
  maxEntries?: number;
  includeUserAgent?: boolean;
  includeUrl?: boolean;
}

class ErrorLogger {
  private entries: ErrorLogEntry[] = [];
  private options: ErrorLoggerOptions;

  constructor(options: ErrorLoggerOptions = {}) {
    this.options = {
      enableConsole: true,
      enableRemote: false,
      maxEntries: 100,
      includeUserAgent: true,
      includeUrl: true,
      ...options,
    };
  }

  /**
   * Log an error with optional context
   */
  log(error: Error, context?: Record<string, any>, componentStack?: string): string {
    const entry: ErrorLogEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      error,
      context,
      componentStack,
      userAgent: this.options.includeUserAgent ? navigator.userAgent : undefined,
      url: this.options.includeUrl ? window.location.href : undefined,
    };

    // Add to local storage
    this.entries.push(entry);
    this.trimEntries();

    // Console logging
    if (this.options.enableConsole) {
      this.logToConsole(entry);
    }

    // Remote logging
    if (this.options.enableRemote && this.options.remoteEndpoint) {
      this.logToRemote(entry);
    }

    return entry.id;
  }

  /**
   * Log a validation error
   */
  logValidationError(field: string, value: any, validationError: string, context?: Record<string, any>): string {
    const error = new Error(`Validation error for field "${field}": ${validationError}`);
    return this.log(error, {
      field,
      value,
      validationError,
      ...context,
    });
  }

  /**
   * Log a component error
   */
  logComponentError(error: Error, componentName: string, props?: Record<string, any>): string {
    return this.log(error, {
      componentName,
      props,
    });
  }

  /**
   * Get all logged errors
   */
  getEntries(): ErrorLogEntry[] {
    return [...this.entries];
  }

  /**
   * Get errors by component
   */
  getErrorsByComponent(componentName: string): ErrorLogEntry[] {
    return this.entries.filter(entry => 
      entry.context?.componentName === componentName
    );
  }

  /**
   * Get recent errors (last N entries)
   */
  getRecentErrors(count: number = 10): ErrorLogEntry[] {
    return this.entries.slice(-count);
  }

  /**
   * Clear all logged errors
   */
  clear(): void {
    this.entries = [];
  }

  /**
   * Export errors as JSON
   */
  export(): string {
    return JSON.stringify(this.entries, null, 2);
  }

  /**
   * Generate unique ID for error entry
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Trim entries to max count
   */
  private trimEntries(): void {
    if (this.entries.length > this.options.maxEntries!) {
      this.entries = this.entries.slice(-this.options.maxEntries!);
    }
  }

  /**
   * Log to console with formatting
   */
  private logToConsole(entry: ErrorLogEntry): void {
    const { error, context, componentStack, timestamp } = entry;
    
    console.group(`🚨 Error logged at ${timestamp.toISOString()}`);
    console.error('Error:', error);
    
    if (context) {
      console.log('Context:', context);
    }
    
    if (componentStack) {
      console.log('Component Stack:', componentStack);
    }
    
    console.groupEnd();
  }

  /**
   * Log to remote endpoint
   */
  private async logToRemote(entry: ErrorLogEntry): Promise<void> {
    try {
      await fetch(this.options.remoteEndpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (fetchError) {
      console.warn('Failed to log error to remote endpoint:', fetchError);
    }
  }
}

// Global error logger instance
export const errorLogger = new ErrorLogger();

// Convenience functions
export const logError = (error: Error, context?: Record<string, any>, componentStack?: string) => {
  return errorLogger.log(error, context, componentStack);
};

export const logValidationError = (field: string, value: any, validationError: string, context?: Record<string, any>) => {
  return errorLogger.logValidationError(field, value, validationError, context);
};

export const logComponentError = (error: Error, componentName: string, props?: Record<string, any>) => {
  return errorLogger.logComponentError(error, componentName, props);
};

// React error boundary integration
export const createErrorBoundaryLogger = (componentName: string) => {
  return (error: Error, errorInfo: React.ErrorInfo) => {
    logComponentError(error, componentName, {
      componentStack: errorInfo.componentStack,
    });
  };
}; 