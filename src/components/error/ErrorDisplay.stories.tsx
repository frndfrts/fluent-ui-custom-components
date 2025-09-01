import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ErrorDisplay } from './ErrorDisplay';

const meta: Meta<typeof ErrorDisplay> = {
  title: '08-Error/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for displaying error messages with consistent styling and layout.',
      },
    },
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    type: {
      control: { type: 'select' },
      options: ['error', 'warning', 'info', 'success'],
      description: 'Type of error message',
    },
    show: {
      control: { type: 'boolean' },
      description: 'Whether to show the error message',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name',
    },
    'aria-live': {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'ARIA live region behavior',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'An unexpected error occurred while processing your request.',
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning message that should be addressed.',
    type: 'warning',
  },
};

export const Info: Story = {
  args: {
    message: 'This is an informational message for the user.',
    type: 'info',
  },
};

export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
  },
};

export const ShortError: Story = {
  args: {
    message: 'Invalid input',
  },
};

export const LongError: Story = {
  args: {
    message: 'This is a very long error message that demonstrates how the component handles extended error text content and maintains proper formatting and layout while providing clear information about what went wrong.',
  },
};

export const Hidden: Story = {
  args: {
    message: 'This error is hidden',
    show: false,
  },
};
