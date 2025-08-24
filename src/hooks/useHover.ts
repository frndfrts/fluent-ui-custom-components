import React from 'react';

/**
 * Custom hook for detecting hover state with comprehensive error handling.
 * Provides robust hover detection for external applications.
 */
export const useHover = (onError?: (error: Error) => void) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const ref = React.useRef<HTMLElement>();

  const handleMouseEnter = React.useCallback(() => {
    try {
      setIsHovered(true);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in mouse enter handler');
      onError?.(errorObj);
    }
  }, [onError]);

  const handleMouseLeave = React.useCallback(() => {
    try {
      setIsHovered(false);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in mouse leave handler');
      onError?.(errorObj);
    }
  }, [onError]);

  const callbackRef = React.useCallback((node: HTMLElement | null) => {
    try {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
      }

      ref.current = node || undefined;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hover callback ref setup');
      onError?.(errorObj);
    }
  }, [handleMouseEnter, handleMouseLeave, onError]);

  React.useEffect(() => {
    try {
      return () => {
        try {
          if (ref.current) {
            ref.current.removeEventListener('mouseenter', handleMouseEnter);
            ref.current.removeEventListener('mouseleave', handleMouseLeave);
          }
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in hover cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in hover effect setup');
      onError?.(errorObj);
    }
  }, [handleMouseEnter, handleMouseLeave, onError]);

  return [callbackRef, isHovered] as const;
};
