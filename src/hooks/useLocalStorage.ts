import React from 'react';

/**
 * Custom hook for managing localStorage with comprehensive error handling.
 * Provides robust localStorage operations for external applications.
 */
export const useLocalStorage = <T>(key: string, initialValue: T, onError?: (error: Error) => void) => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(`Unknown error reading localStorage key: ${key}`);
      onError?.(errorObj);
      return initialValue;
    }
  });

  const setValue = React.useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (storageError) {
        const errorObj = storageError instanceof Error ? storageError : new Error(`Unknown error writing to localStorage key: ${key}`);
        onError?.(errorObj);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(`Unknown error setting localStorage value for key: ${key}`);
      onError?.(errorObj);
    }
  }, [key, storedValue, onError]);

  const removeValue = React.useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      try {
        window.localStorage.removeItem(key);
      } catch (storageError) {
        const errorObj = storageError instanceof Error ? storageError : new Error(`Unknown error removing localStorage key: ${key}`);
        onError?.(errorObj);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(`Unknown error removing localStorage value for key: ${key}`);
      onError?.(errorObj);
    }
  }, [key, initialValue, onError]);

  const clearAll = React.useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      try {
        window.localStorage.clear();
      } catch (storageError) {
        const errorObj = storageError instanceof Error ? storageError : new Error('Unknown error clearing localStorage');
        onError?.(errorObj);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error clearing localStorage values');
      onError?.(errorObj);
    }
  }, [initialValue, onError]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearAll,
  };
};



