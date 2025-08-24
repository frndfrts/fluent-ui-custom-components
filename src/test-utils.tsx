import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { FormLayoutProvider } from './styles/FormLayoutContext';

// Custom render function that includes necessary providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormLayoutProvider>
      {children}
    </FormLayoutProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Test data helpers
export const createMockError = (message: string = 'Test error'): Error => {
  return new Error(message);
};

export const createMockErrorInfo = (): React.ErrorInfo => {
  return {
    componentStack: 'Test component stack',
  };
};

// Mock functions for testing
export const mockOnError = jest.fn();
export const mockOnChange = jest.fn();
export const mockOnPaperSizeChange = jest.fn();
export const mockOnMarginsChange = jest.fn();

// Common test props
export const commonTestProps = {
  onError: mockOnError,
  onChange: mockOnChange,
  onPaperSizeChange: mockOnPaperSizeChange,
  onMarginsChange: mockOnMarginsChange,
};

// Reset mocks between tests
export const resetMocks = () => {
  mockOnError.mockClear();
  mockOnChange.mockClear();
  mockOnPaperSizeChange.mockClear();
  mockOnMarginsChange.mockClear();
};
