import React from 'react';

/**
 * Custom hook for media queries with comprehensive error handling.
 * Provides robust media query detection for external applications.
 */
export const useMediaQuery = (query: string, onError?: (error: Error) => void) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const mediaQuery = window.matchMedia(query);
      
      const updateMatch = () => {
        try {
          setMatches(mediaQuery.matches);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in media query match update');
          onError?.(errorObj);
        }
      };

      // Set initial value
      updateMatch();

      // Add listener
      try {
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', updateMatch);
        } else {
          // Fallback for older browsers
          mediaQuery.addListener(updateMatch);
        }
      } catch (listenerError) {
        const errorObj = listenerError instanceof Error ? listenerError : new Error('Unknown error in media query listener setup');
        onError?.(errorObj);
      }

      return () => {
        try {
          if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', updateMatch);
          } else {
            // Fallback for older browsers
            mediaQuery.removeListener(updateMatch);
          }
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in media query listener cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in media query effect setup');
      onError?.(errorObj);
    }
  }, [query, onError]);

  return matches;
};
