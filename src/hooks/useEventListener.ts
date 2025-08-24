import React from 'react';

export type EventTargetType = Window | Document | HTMLElement;

export interface EventListenerOptions {
  target?: EventTargetType;
  type: string;
  listener: EventListener;
  options?: boolean | AddEventListenerOptions;
}

/**
 * Custom hook for event listeners with comprehensive error handling.
 * Provides robust event handling for external applications.
 */
export const useEventListener = (
  options: EventListenerOptions,
  onError?: (error: Error) => void
) => {
  const { target = window, type, listener, options: listenerOptions } = options;

  React.useEffect(() => {
    try {
      if (!target) return;

      const wrappedListener = (event: Event) => {
        try {
          listener(event);
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error('Unknown error in event listener');
          onError?.(errorObj);
        }
      };

      try {
        target.addEventListener(type, wrappedListener, listenerOptions);
      } catch (addError) {
        const errorObj = addError instanceof Error ? addError : new Error('Unknown error adding event listener');
        onError?.(errorObj);
      }

      return () => {
        try {
          target.removeEventListener(type, wrappedListener, listenerOptions);
        } catch (removeError) {
          const errorObj = removeError instanceof Error ? removeError : new Error('Unknown error removing event listener');
          onError?.(errorObj);
        }
      };
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in event listener effect setup');
      onError?.(errorObj);
    }
  }, [target, type, listener, listenerOptions, onError]);
};
