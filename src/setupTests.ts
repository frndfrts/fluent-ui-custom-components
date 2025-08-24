import '@testing-library/jest-dom';

// Mock ResizeObserver
global.ResizeObserver = (global as any).ResizeObserver || function() {
  return {
    observe: () => {},
    unobserve: () => {},
    disconnect: () => {},
  };
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: function(query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function() {}, // deprecated
      removeListener: function() {}, // deprecated
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {},
    };
  },
});

// Mock IntersectionObserver
global.IntersectionObserver = (global as any).IntersectionObserver || function() {
  return {
    observe: () => {},
    unobserve: () => {},
    disconnect: () => {},
  };
};

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});

// Suppress console errors in tests unless explicitly needed
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
