import React from 'react';

export interface CopyToClipboardResult {
  copy: (text: string) => Promise<boolean>;
  isCopied: boolean;
  error: Error | null;
}

/**
 * Custom hook for copying text to clipboard with comprehensive error handling.
 * Provides robust clipboard operations for external applications.
 */
export const useCopyToClipboard = (onError?: (error: Error) => void): CopyToClipboardResult => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const copy = React.useCallback(async (text: string): Promise<boolean> => {
    try {
      setError(null);
      
      if (navigator?.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
          
          // Reset copied state after 2 seconds
          setTimeout(() => {
            try {
              setIsCopied(false);
            } catch (timeoutError) {
              const errorObj = timeoutError instanceof Error ? timeoutError : new Error('Unknown error in copy timeout reset');
              onError?.(errorObj);
            }
          }, 2000);
          
          return true;
        } catch (clipboardError) {
          const errorObj = clipboardError instanceof Error ? clipboardError : new Error('Failed to copy to clipboard');
          setError(errorObj);
          onError?.(errorObj);
          return false;
        }
      } else {
        // Fallback for older browsers
        try {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          
          if (successful) {
            setIsCopied(true);
            setTimeout(() => {
              try {
                setIsCopied(false);
              } catch (timeoutError) {
                const errorObj = timeoutError instanceof Error ? timeoutError : new Error('Unknown error in copy timeout reset');
                onError?.(errorObj);
              }
            }, 2000);
            return true;
          } else {
            const errorObj = new Error('Failed to copy using fallback method');
            setError(errorObj);
            onError?.(errorObj);
            return false;
          }
        } catch (fallbackError) {
          const errorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback copy method');
          setError(errorObj);
          onError?.(errorObj);
          return false;
        }
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error in copy operation');
      setError(errorObj);
      onError?.(errorObj);
      return false;
    }
  }, [onError]);

  return { copy, isCopied, error };
};
