import React from 'react';

/**
 * Custom hook for isomorphic sync external store with comprehensive error handling.
 * Provides robust sync external store management for external applications.
 */
export const useIsomorphicSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T,
  onError?: (error: Error) => void
): T => {
  const useIsomorphicSyncExternalStore = typeof window !== 'undefined' ? React.useSyncExternalStore : React.useSyncExternalStore;

  try {
    if (getServerSnapshot) {
      return useIsomorphicSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    }
    return useIsomorphicSyncExternalStore(subscribe, getSnapshot);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic sync external store');
    onError?.(errorObj);
    
    // Fallback to regular useSyncExternalStore
    try {
      if (getServerSnapshot) {
        return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
      }
      return React.useSyncExternalStore(subscribe, getSnapshot);
    } catch (fallbackError) {
      const fallbackErrorObj = fallbackError instanceof Error ? fallbackError : new Error('Unknown error in fallback sync external store');
      onError?.(fallbackErrorObj);
      
      // Return a fallback snapshot
      try {
        return getSnapshot();
      } catch (snapshotError) {
        const snapshotErrorObj = snapshotError instanceof Error ? snapshotError : new Error('Unknown error in fallback snapshot');
        onError?.(snapshotErrorObj);
        
        // Return undefined as last resort
        return undefined as T;
      }
    }
  }
};
