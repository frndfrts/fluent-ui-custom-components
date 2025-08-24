import React from 'react';

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

/**
 * Custom hook for geolocation with comprehensive error handling.
 * Provides robust location detection for external applications.
 */
export const useGeolocation = (
  options: GeolocationOptions = {},
  onError?: (error: Error) => void
) => {
  const [state, setState] = React.useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: false,
  });

  const getCurrentPosition = React.useCallback(() => {
    try {
      if (!navigator.geolocation) {
        const errorObj = new Error('Geolocation is not supported by this browser');
        setState(prev => ({ ...prev, error: errorObj.message, loading: false }));
        onError?.(errorObj);
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          try {
            setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              error: null,
              loading: false,
            });
          } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Unknown error in position success handler');
            setState(prev => ({ ...prev, error: errorObj.message, loading: false }));
            onError?.(errorObj);
          }
        },
        (error) => {
          try {
            let errorMessage = 'Unknown geolocation error';
            
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'User denied the request for geolocation';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information is unavailable';
                break;
              case error.TIMEOUT:
                errorMessage = 'The request to get user location timed out';
                break;
              default:
                errorMessage = error.message || 'Unknown geolocation error';
            }
            
            const errorObj = new Error(errorMessage);
            setState(prev => ({ ...prev, error: errorMessage, loading: false }));
            onError?.(errorObj);
          } catch (handlerError) {
            const errorObj = handlerError instanceof Error ? handlerError : new Error('Unknown error in position error handler');
            setState(prev => ({ ...prev, error: errorObj.message, loading: false }));
            onError?.(errorObj);
          }
        },
        options
      );
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in geolocation setup');
      setState(prev => ({ ...prev, error: errorObj.message, loading: false }));
      onError?.(errorObj);
    }
  }, [options, onError]);

  const clearError = React.useCallback(() => {
    try {
      setState(prev => ({ ...prev, error: null }));
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in clearing geolocation error');
      onError?.(errorObj);
    }
  }, [onError]);

  return {
    ...state,
    getCurrentPosition,
    clearError,
  };
};
