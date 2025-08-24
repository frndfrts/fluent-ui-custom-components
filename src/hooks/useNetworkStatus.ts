import React from 'react';

export interface NetworkStatus {
  online: boolean;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean | null;
}

/**
 * Custom hook for network status with comprehensive error handling.
 * Provides robust network monitoring for external applications.
 */
export const useNetworkStatus = (onError?: (error: Error) => void) => {
  const [networkStatus, setNetworkStatus] = React.useState<NetworkStatus>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    effectiveType: null,
    downlink: null,
    rtt: null,
    saveData: null,
  });

  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const updateNetworkStatus = () => {
        try {
          const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
          
          setNetworkStatus({
            online: navigator.onLine,
            effectiveType: connection?.effectiveType || null,
            downlink: connection?.downlink || null,
            rtt: connection?.rtt || null,
            saveData: connection?.saveData || null,
          });
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in network status update');
          onError?.(errorObj);
        }
      };

      // Set initial status
      updateNetworkStatus();

      // Add listeners
      window.addEventListener('online', updateNetworkStatus);
      window.addEventListener('offline', updateNetworkStatus);

      // Add connection change listener if available
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (connection) {
        try {
          connection.addEventListener('change', updateNetworkStatus);
        } catch (listenerError) {
          const errorObj = listenerError instanceof Error ? listenerError : new Error('Unknown error in connection change listener setup');
          onError?.(errorObj);
        }
      }

      return () => {
        try {
          window.removeEventListener('online', updateNetworkStatus);
          window.removeEventListener('offline', updateNetworkStatus);
          
          if (connection) {
            try {
              connection.removeEventListener('change', updateNetworkStatus);
            } catch (cleanupError) {
              const errorObj = cleanupError instanceof Error ? cleanupError : new Error('Unknown error in connection change listener cleanup');
              onError?.(errorObj);
            }
          }
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in network status listener cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in network status effect setup');
      onError?.(errorObj);
    }
  }, [onError]);

  return networkStatus;
};
