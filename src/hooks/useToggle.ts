import React from 'react';

/**
 * Custom hook for boolean toggle state with comprehensive error handling.
 * Provides robust toggle functionality for external applications.
 */
export const useToggle = (initialValue: boolean = false, onError?: (error: Error) => void) => {
  const [value, setValue] = React.useState<boolean>(initialValue);

  const toggle = React.useCallback(() => {
    try {
      setValue(prev => !prev);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in toggle operation');
      onError?.(errorObj);
    }
  }, [onError]);

  const setTrue = React.useCallback(() => {
    try {
      setValue(true);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in setTrue operation');
      onError?.(errorObj);
    }
  }, [onError]);

  const setFalse = React.useCallback(() => {
    try {
      setValue(false);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in setFalse operation');
      onError?.(errorObj);
    }
  }, [onError]);

  const setValueSafely = React.useCallback((newValue: boolean) => {
    try {
      setValue(newValue);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in setValue operation');
      onError?.(errorObj);
    }
  }, [onError]);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue: setValueSafely,
  };
};



