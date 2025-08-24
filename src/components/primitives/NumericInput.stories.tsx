import type { Meta, StoryObj } from '@storybook/react';
import { NumericInput } from './NumericInput';

const meta: Meta<typeof NumericInput> = {
  title: 'Primitives/NumericInput',
  component: NumericInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive numeric input component with step controls, validation, and accessibility features.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'The current numeric value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the value changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when validation errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the input',
    },
    width: {
      control: { type: 'number' },
      description: 'Width of the input in pixels',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment for up/down buttons',
    },
    decimalPlaces: {
      control: { type: 'number' },
      description: 'Number of decimal places to display',
    },
    nonNegative: {
      control: { type: 'boolean' },
      description: 'Whether to prevent negative values',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when value is empty',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the input',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA label for screen readers',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the input',
    },
    ariaLabelledBy: {
      control: { type: 'text' },
      description: 'ID of element that labels the input',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    value: 100,
    onChange: (value: number) => console.log('Value changed:', value),
    onError: (error: Error) => console.error('Error:', error),
  },
};

// With custom size
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    value: 50,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    value: 200,
  },
};

// With constraints
export const WithMinMax: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 1000,
    step: 10,
    value: 500,
  },
};

export const NonNegative: Story = {
  args: {
    ...Default.args,
    nonNegative: true,
    min: 0,
    value: 75,
  },
};

// With decimal places
export const Decimal: Story = {
  args: {
    ...Default.args,
    decimalPlaces: 2,
    step: 0.1,
    value: 3.14,
  },
};

// With custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 300,
    value: 150,
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    value: '',
    placeholder: 'Enter a number...',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Quantity',
    value: 25,
  },
};

// With accessibility features
export const Accessible: Story = {
  args: {
    ...Default.args,
    label: 'Temperature',
    ariaLabel: 'Temperature in Celsius',
    ariaDescribedBy: 'temp-desc',
    value: 22,
    min: -40,
    max: 50,
    step: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows the NumericInput with comprehensive accessibility features including ARIA labels and descriptions.',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 100,
  },
};

// Error state example
export const WithError: Story = {
  args: {
    ...Default.args,
    value: -10,
    min: 0,
    onError: (error: Error) => console.error('Validation error:', error),
  },
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates error handling when a value violates constraints.',
      },
    },
  },
};

// Complex example with all features
export const Complex: Story = {
  args: {
    ...Default.args,
    label: 'Price',
    ariaLabel: 'Product price in dollars',
    size: 'large',
    width: 250,
    min: 0,
    max: 9999.99,
    step: 0.01,
    decimalPlaces: 2,
    nonNegative: true,
    placeholder: '0.00',
    value: 29.99,
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example showing all the features of NumericInput working together.',
      },
    },
  },
};
