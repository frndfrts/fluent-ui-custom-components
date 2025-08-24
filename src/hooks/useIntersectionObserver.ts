import React from 'react';

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Custom hook for intersection observer with comprehensive error handling.
 * Provides robust intersection detection for external applications.
 */
export const useIntersectionObserver = (
  options: IntersectionObserverOptions = {},
  onError?: (error: Error) => void
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null);
  const elementRef = React.useRef<Element | null>(null);

  const callback = React.useCallback((entries: IntersectionObserverEntry[]) => {
    try {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in intersection observer callback');
      onError?.(errorObj);
    }
  }, [onError]);

  React.useEffect(() => {
    try {
      const element = elementRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(callback, options);
      observer.observe(element);

      return () => {
        try {
          observer.disconnect();
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in intersection observer cleanup');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in intersection observer setup');
      onError?.(errorObj);
    }
  }, [callback, options, onError]);

  const ref = React.useCallback((node: Element | null) => {
    try {
      elementRef.current = node;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in intersection observer ref setup');
      onError?.(errorObj);
    }
  }, [onError]);

  return { ref, isIntersecting, entry };
};
