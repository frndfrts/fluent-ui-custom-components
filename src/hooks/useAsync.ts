import React from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface AsyncActions<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for managing async operations with comprehensive error handling.
 * Provides robust async state management for external applications.
 */
export const useAsync = <T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate: boolean = false,
  onError?: (error: Error) => void
): [AsyncState<T>, AsyncActions<T>] => {
  const [state, setState] = React.useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = React.useCallback(async (...args: any[]) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const data = await asyncFunction(...args);
        setState(prev => ({ ...prev, data, loading: false }));
      } catch (asyncError) {
        const errorObj = asyncError instanceof Error ? asyncError : new Error('Unknown async error');
        setState(prev => ({ ...prev, error: errorObj, loading: false }));
        onError?.(errorObj);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in async execution');
      setState(prev => ({ ...prev, error: errorObj, loading: false }));
      onError?.(errorObj);
    }
  }, [asyncFunction, onError]);

  const reset = React.useCallback(() => {
    try {
      setState({
        data: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in async reset');
      onError?.(errorObj);
    }
  }, [onError]);

  React.useEffect(() => {
    try {
      if (immediate) {
        execute();
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in async immediate execution');
      onError?.(errorObj);
    }
  }, [immediate, execute, onError]);

  return [state, { execute, reset }];
};
