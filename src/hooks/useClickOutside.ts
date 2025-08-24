import React from 'react';

export const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void, onError?: (error: Error) => void) => {
  React.useEffect(() => {
    try {
      const listener = (event: MouseEvent | TouchEvent) => {
        try {
          if (!ref.current || ref.current.contains(event.target as Node)) {
            return;
          }
          handler();
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in click outside handler');
          onError?.(errorObj);
        }
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        try {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in click outside cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in click outside effect setup');
      onError?.(errorObj);
    }
  }, [ref, handler, onError]);
};
