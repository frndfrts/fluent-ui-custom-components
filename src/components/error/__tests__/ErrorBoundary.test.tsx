import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { createMockError, createMockErrorInfo, mockOnError } from '../../../test-utils';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Custom fallback component for testing
const CustomFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <div>
    <div>Custom error: {error.message}</div>
    <button onClick={resetError}>Reset</button>
  </div>
);

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for expected errors in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary onError={mockOnError}>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders default fallback when there is an error', () => {
    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={CustomFallback} onError={mockOnError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error: Test error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('calls onError when an error occurs', () => {
    const mockError = createMockError('Test error');
    const mockErrorInfo = createMockErrorInfo();

    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(mockOnError).toHaveBeenCalledWith(mockError, mockErrorInfo);
  });

  it('resets error state when reset button is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should show error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Click reset button
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    // Re-render without error
    rerender(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    // Should show normal content
    expect(screen.getByText('No error')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('resets error state when props change if resetOnPropsChange is true', () => {
    const { rerender } = render(
      <ErrorBoundary onError={mockOnError} resetOnPropsChange={true}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should show error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Change props to trigger reset
    rerender(
      <ErrorBoundary onError={mockOnError} resetOnPropsChange={true}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    // Should show normal content
    expect(screen.getByText('No error')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('does not reset error state when props change if resetOnPropsChange is false', () => {
    const { rerender } = render(
      <ErrorBoundary onError={mockOnError} resetOnPropsChange={false}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should show error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Change props without triggering reset
    rerender(
      <ErrorBoundary onError={mockOnError} resetOnPropsChange={false}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    // Should still show error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('handles multiple errors correctly', () => {
    const { rerender } = render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // First error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(mockOnError).toHaveBeenCalledTimes(1);

    // Reset
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    // Re-render with another error
    rerender(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should handle second error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(mockOnError).toHaveBeenCalledTimes(2);
  });

  it('provides error context to fallback component', () => {
    render(
      <ErrorBoundary fallback={CustomFallback} onError={mockOnError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const fallback = screen.getByText('Custom error: Test error');
    expect(fallback).toBeInTheDocument();
  });

  it('handles async errors correctly', async () => {
    const AsyncErrorComponent = () => {
      const [shouldThrow, setShouldThrow] = React.useState(false);

      React.useEffect(() => {
        if (shouldThrow) {
          throw new Error('Async error');
        }
      }, [shouldThrow]);

      return (
        <button onClick={() => setShouldThrow(true)}>
          Trigger Error
        </button>
      );
    };

    render(
      <ErrorBoundary onError={mockOnError}>
        <AsyncErrorComponent />
      </ErrorBoundary>
    );

    // Click button to trigger error
    fireEvent.click(screen.getByRole('button', { name: /trigger error/i }));

    // Should show error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(mockOnError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Object)
    );
  });
});
