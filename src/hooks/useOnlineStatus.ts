import React from 'react';

/**
 * Custom hook for tracking online status with comprehensive error handling.
 * Provides robust online status detection for external applications.
 */
export const useOnlineStatus = (onError?: (error: Error) => void) => {
  const [isOnline, setIsOnline] = React.useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const updateOnlineStatus = () => {
        try {
          setIsOnline(navigator.onLine);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in online status update');
          onError?.(errorObj);
        }
      };

      // Set initial status
      updateOnlineStatus();

      // Add listeners
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);

      return () => {
        try {
          window.removeEventListener('online', updateOnlineStatus);
          window.removeEventListener('offline', updateOnlineStatus);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in online status listener cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in online status effect setup');
      onError?.(errorObj);
    }
  }, [onError]);

  return isOnline;
};
