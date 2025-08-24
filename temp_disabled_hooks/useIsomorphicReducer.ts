import React from 'react';

/**
 * Custom hook for isomorphic reducers with comprehensive error handling.
 * Provides robust reducer management for external applications.
 */
export const useIsomorphicReducer = <R extends React.Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & React.ReducerState<R>,
  initializer?: (arg: I & React.ReducerState<R>) => React.ReducerState<R>,
  onError?: (error: Error) => void
): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>] => {
  const useIsomorphicReducer = typeof window !== 'undefined' ? React.useReducer : React.useReducer;

  try {
    if (initializer) {
      return useIsomorphicReducer(reducer, initializerArg, initializer);
    }
    return useIsomorphicReducer(reducer, initializerArg);
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error in isomorphic reducer creation');
    onError?.(errorObj);
    
    // Return a fallback reducer
    const fallbackReducer = React.useReducer(reducer, initializerArg, initializer);
    return fallbackReducer;
  }
};
