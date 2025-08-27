import type { Meta, StoryObj } from '@storybook/react';
import { DimensionInput } from './DimensionInput';

const meta: Meta<typeof DimensionInput> = {
  title: '03-Compositions/DimensionInput',
  component: DimensionInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A composition component that combines numeric input with unit selection for dimension values.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Current dimension value',
    },
    unit: {
      control: { type: 'select' },
      options: ['cm', 'mm', 'in', 'pt', 'px'],
      description: 'Current unit of measurement',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units to choose from',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
    },
    onUnitChange: {
      action: 'unitChanged',
      description: 'Callback when unit changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the input',
    },
    width: {
      control: { type: 'number' },
      description: 'Custom width in pixels',
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
    showUnitSelector: {
      control: { type: 'boolean' },
      description: 'Whether to show unit selector',
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
    unit: 'px',
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (value: number) => console.log('Value changed:', value),
    onUnitChange: (unit: string) => console.log('Unit changed:', unit),
  },
};

// Small size
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

// Large size
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

// Centimeters
export const Centimeters: Story = {
  args: {
    ...Default.args,
    value: 21.0,
    unit: 'cm',
    units: ['cm', 'mm', 'in'],
  },
};

// Inches
export const Inches: Story = {
  args: {
    ...Default.args,
    value: 8.5,
    unit: 'in',
    units: ['in', 'cm', 'mm'],
  },
};

// With constraints
export const WithConstraints: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 1000,
    step: 10,
    nonNegative: true,
  },
};

// Custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 300,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Width',
  },
};

// Without unit selector
export const NoUnitSelector: Story = {
  args: {
    ...Default.args,
    showUnitSelector: false,
  },
};

// Percentage units
export const PercentageUnits: Story = {
  args: {
    ...Default.args,
    value: 50,
    unit: '%',
    units: ['%', 'px', 'em', 'rem'],
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    value: 15.5,
    unit: 'cm',
    units: ['cm', 'mm', 'in', 'pt'],
    size: 'large',
    width: 250,
    min: 0.1,
    max: 100,
    step: 0.5,
    decimalPlaces: 1,
    nonNegative: true,
    label: 'Page Margin',
    placeholder: 'Enter margin value...',
  },
};
