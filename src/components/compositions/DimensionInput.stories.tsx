import type { Meta, StoryObj } from '@storybook/react';
import { DimensionInput } from './DimensionInput';

const meta: Meta<typeof DimensionInput> = {
  title: 'Compositions/DimensionInput',
  component: DimensionInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A composite component that combines numeric input with unit selection for dimension values.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'object' },
      description: 'The dimension value object with numeric value and unit',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the dimension value changes',
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

    label: {
      control: { type: 'text' },
      description: 'Label for the dimension input',
    },
    units: {
      control: { type: 'object' },
      description: 'Array of available units',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    value: { value: 100, unit: 'px' },
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (dimension: { value: number; unit: string }) => console.log('Dimension changed:', dimension),
    onError: (error: Error) => console.error('Error:', error),
  },
};

// With different sizes
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    value: { value: 50, unit: 'em' },
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    value: { value: 200, unit: 'rem' },
  },
};

// With custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 300,
    value: { value: 150, unit: '%' },
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Width',
    value: { value: 75, unit: 'pt' },
  },
};

// With constraints
export const WithMinMax: Story = {
  args: {
    ...Default.args,
    value: { value: 500, unit: 'px' },
  },
};

export const NonNegative: Story = {
  args: {
    ...Default.args,
    value: { value: 25, unit: 'em' },
  },
};

// With decimal places
export const Decimal: Story = {
  args: {
    ...Default.args,
    value: { value: 3.14, unit: 'in' },
  },
};

// With sorted units
export const SortedUnits: Story = {
  args: {
    ...Default.args,
    value: { value: 100, unit: 'cm' },
  },
};

// With specific unit sets
export const LengthUnits: Story = {
  args: {
    ...Default.args,
    units: ['px', 'em', 'rem', 'pt', 'in', 'cm', 'mm'],
    value: { value: 100, unit: 'em' },
  },
};

export const PercentageUnits: Story = {
  args: {
    ...Default.args,
    units: ['%', 'px', 'em', 'rem'],
    value: { value: 50, unit: '%' },
  },
};

export const PrintUnits: Story = {
  args: {
    ...Default.args,
    units: ['pt', 'in', 'cm', 'mm'],
    value: { value: 72, unit: 'pt' },
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    value: { value: '', unit: 'px' },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: { value: 100, unit: 'px' },
  },
};

// Error state example
export const WithError: Story = {
  args: {
    ...Default.args,
    value: { value: -10, unit: 'px' },
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
    label: 'Page Margin',
    size: 'large',

    units: ['pt', 'in', 'cm', 'mm'],
    value: { value: 72.0, unit: 'pt' },
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example showing all the features of DimensionInput working together.',
      },
    },
  },
};
