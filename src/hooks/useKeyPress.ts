import React from 'react';

/**
 * Custom hook for detecting key presses with comprehensive error handling.
 * Provides robust key detection for external applications.
 */
export const useKeyPress = (targetKey: string, onError?: (error: Error) => void) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  React.useEffect(() => {
    try {
      const downHandler = (event: KeyboardEvent) => {
        try {
          if (event.key === targetKey) {
            setKeyPressed(true);
          }
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in key down handler');
          onError?.(errorObj);
        }
      };

      const upHandler = (event: KeyboardEvent) => {
        try {
          if (event.key === targetKey) {
            setKeyPressed(false);
          }
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in key up handler');
          onError?.(errorObj);
        }
      };

      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);

      return () => {
        try {
          window.removeEventListener('keydown', downHandler);
          window.removeEventListener('keyup', upHandler);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in key press cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in key press effect setup');
      onError?.(errorObj);
    }
  }, [targetKey, onError]);

  return keyPressed;
};
