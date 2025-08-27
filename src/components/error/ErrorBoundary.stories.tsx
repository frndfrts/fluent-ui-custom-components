import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';
import React from 'react';

// Component that throws an error for testing
const BuggyComponent = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error for the ErrorBoundary component');
  }
  return <div>This component works normally</div>;
};

// Component that throws an error on render
const AlwaysThrows = () => {
  throw new Error('This component always throws an error');
};

// Component that throws an error after a delay
const DelayedError = ({ delay = 1000 }: { delay?: number }) => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldThrow(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (shouldThrow) {
    throw new Error('Error thrown after delay');
  }

  return <div>Component will throw an error in {delay}ms</div>;
};

const meta: Meta<typeof ErrorBoundary> = {
  title: '08-Error/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An error boundary component that catches JavaScript errors anywhere in the component tree and displays a fallback UI.',
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'React components to render',
    },
    fallback: {
      control: false,
      description: 'Component to render when an error occurs',
    },
    onError: {
      action: 'error',
      description: 'Callback when an error is caught',
    },
    resetOnPropsChange: {
      control: { type: 'boolean' },
      description: 'Whether to reset error state when props change',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with working component
export const Default: Story = {
  args: {
    children: <BuggyComponent />,
    fallback: ({ error, resetError }: { error: Error; resetError: () => void }) => (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h3>Something went wrong</h3>
        <p>Error: {error.message}</p>
        <button onClick={resetError}>Try again</button>
      </div>
    ),
    onError: (error: Error, errorInfo: React.ErrorInfo) => console.error('Error caught:', error, errorInfo),
  },
};

// With error thrown
export const WithError: Story = {
  args: {
    ...Default.args,
    children: <BuggyComponent shouldThrow={true} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows the ErrorBoundary catching an error and displaying the fallback UI.',
      },
    },
  },
};

// With custom fallback
export const CustomFallback: Story = {
  args: {
    ...Default.args,
    children: <AlwaysThrows />,
    fallback: ({ error, resetError }: { error: Error; resetError: () => void }) => (
      <div style={{ 
        padding: '20px', 
        border: '2px solid #ff6b6b', 
        borderRadius: '8px',
        backgroundColor: '#fff5f5',
        color: '#c53030'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#c53030' }}>🚨 Error Detected</h3>
        <p style={{ margin: '0 0 15px 0' }}><strong>Message:</strong> {error.message}</p>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.8 }}>
          The component encountered an unexpected error. Please try again.
        </p>
        <button 
          onClick={resetError}
          style={{
            padding: '8px 16px',
            backgroundColor: '#c53030',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset & Retry
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows a custom fallback UI with better styling and user experience.',
      },
    },
  },
};

// With error callback
export const WithErrorCallback: Story = {
  args: {
    ...Default.args,
    children: <AlwaysThrows />,
    onError: (error: Error, errorInfo: React.ErrorInfo) => {
      console.error('Error caught by boundary:', error);
      console.error('Error info:', errorInfo);
      // In a real app, you might send this to an error reporting service
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates how to handle errors with the onError callback.',
      },
    },
  },
};

// With reset on props change
export const ResetOnPropsChange: Story = {
  args: {
    ...Default.args,
    children: <BuggyComponent shouldThrow={true} />,
    resetOnPropsChange: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows the ErrorBoundary automatically resetting when props change.',
      },
    },
  },
};

// With delayed error
export const DelayedErrorExample: Story = {
  args: {
    ...Default.args,
    children: <DelayedError delay={2000} />,
    fallback: ({ error, resetError }: { error: Error; resetError: () => void }) => (
      <div style={{ padding: '20px', border: '1px solid #fbbf24', borderRadius: '4px', backgroundColor: '#fffbeb' }}>
        <h3>⏰ Delayed Error</h3>
        <p>Error: {error.message}</p>
        <button onClick={resetError}>Reset</button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows the ErrorBoundary catching an error that occurs after a delay.',
      },
    },
  },
};

// Complex example with multiple error boundaries
export const NestedErrorBoundaries: Story = {
  args: {
    children: (
      <div>
        <h3>Nested Error Boundaries Example</h3>
        <ErrorBoundary
          fallback={({ error, resetError }: { error: Error; resetError: () => void }) => (
            <div style={{ padding: '10px', border: '1px solid #ef4444', margin: '10px 0' }}>
              <p>Inner boundary caught: {error.message}</p>
              <button onClick={resetError}>Reset Inner</button>
            </div>
          )}
        >
          <BuggyComponent shouldThrow={true} />
        </ErrorBoundary>
        <p>This text will still be visible even if the inner component throws an error.</p>
      </div>
    ),
    fallback: ({ error, resetError }: { error: Error; resetError: () => void }) => (
      <div style={{ padding: '20px', border: '2px solid #dc2626', borderRadius: '8px' }}>
        <h3>Outer boundary caught: {error.message}</h3>
        <button onClick={resetError}>Reset Outer</button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates nested error boundaries and how they handle errors at different levels.',
      },
    },
  },
};
