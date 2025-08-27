import type { Meta, StoryObj } from '@storybook/react';
import { ErrorHandlingTemplate } from './ErrorHandlingTemplate';

const meta: Meta<typeof ErrorHandlingTemplate> = {
  title: '10-Templates/ErrorHandlingTemplate',
  component: ErrorHandlingTemplate,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A template component demonstrating error handling patterns for new components.',
      },
    },
  },
  argTypes: {
    initialValue: {
      control: { type: 'number' },
      description: 'Initial numeric value',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed value',
    },
    nonNegative: {
      control: { type: 'boolean' },
      description: 'Whether to allow only non-negative values',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the component',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when value changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: 100,
    onValueChange: (value: number | '') => console.log('Value changed:', value),
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const WithConstraints: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 1000,
    nonNegative: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
