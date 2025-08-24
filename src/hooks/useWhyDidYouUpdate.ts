import React from 'react';

/**
 * Custom hook for debugging component updates with comprehensive error handling.
 * Provides robust update debugging for external applications.
 */
export const useWhyDidYouUpdate = (
  name: string,
  props: Record<string, any>,
  onError?: (error: Error) => void
) => {
  const previousProps = React.useRef<Record<string, any>>();

  React.useEffect(() => {
    try {
      if (previousProps.current) {
        const allKeys = Object.keys({ ...previousProps.current, ...props });
        const changesObj: Record<string, { from: any; to: any }> = {};

        allKeys.forEach(key => {
          try {
            if (previousProps.current?.[key] !== props[key]) {
              changesObj[key] = {
                from: previousProps.current?.[key],
                to: props[key],
              };
            }
          } catch (keyError) {
            const errorObj = keyError instanceof Error ? keyError : new Error(`Unknown error checking prop key: ${key}`);
            onError?.(errorObj);
          }
        });

        if (Object.keys(changesObj).length) {
          try {
            console.log('[why-did-you-update]', name, changesObj);
          } catch (logError) {
            const errorObj = logError instanceof Error ? logError : new Error('Unknown error in console logging');
            onError?.(errorObj);
          }
        }
      }

      previousProps.current = props;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in why did you update effect');
      onError?.(errorObj);
    }
  });
};
