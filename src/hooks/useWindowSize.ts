import React from 'react';

export const useWindowSize = (onError?: (error: Error) => void) => {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const handleResize = () => {
        try {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in window resize handler');
          onError?.(errorObj);
        }
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        try {
          window.removeEventListener('resize', handleResize);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in resize event cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in window size effect setup');
      onError?.(errorObj);
    }
  }, [onError]);

  return windowSize;
};
