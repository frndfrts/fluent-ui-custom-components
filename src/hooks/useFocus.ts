import React from 'react';

/**
 * Custom hook for managing focus state with comprehensive error handling.
 * Provides robust focus management for external applications.
 */
export const useFocus = (onError?: (error: Error) => void) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = React.useRef<HTMLElement>();

  const focus = React.useCallback(() => {
    try {
      if (ref.current) {
        ref.current.focus();
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in focus operation');
      onError?.(errorObj);
    }
  }, [onError]);

  const blur = React.useCallback(() => {
    try {
      if (ref.current) {
        ref.current.blur();
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in blur operation');
      onError?.(errorObj);
    }
  }, [onError]);

  const callbackRef = React.useCallback((node: HTMLElement | null) => {
    try {
      if (ref.current) {
        ref.current.removeEventListener('focus', () => setIsFocused(true));
        ref.current.removeEventListener('blur', () => setIsFocused(false));
      }

      if (node) {
        node.addEventListener('focus', () => {
          try {
            setIsFocused(true);
          } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Unknown error in focus event handler');
            onError?.(errorObj);
          }
        });
        node.addEventListener('blur', () => {
          try {
            setIsFocused(false);
          } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Unknown error in blur event handler');
            onError?.(errorObj);
          }
        });
      }

      ref.current = node || undefined;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in focus callback ref setup');
      onError?.(errorObj);
    }
  }, [onError]);

  React.useEffect(() => {
    try {
      return () => {
        try {
          if (ref.current) {
            ref.current.removeEventListener('focus', () => setIsFocused(true));
            ref.current.removeEventListener('blur', () => setIsFocused(false));
          }
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in focus cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in focus effect setup');
      onError?.(errorObj);
    }
  }, [onError]);

  return { ref: callbackRef, isFocused, focus, blur };
};
