import React from 'react';

export const usePrevious = <T>(value: T, onError?: (error: Error) => void) => {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    try {
      ref.current = value;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in previous value update');
      onError?.(errorObj);
    }
  }, [value, onError]);

  return ref.current;
};
