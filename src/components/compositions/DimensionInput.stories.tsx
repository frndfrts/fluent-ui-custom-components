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
    label: {
      control: { type: 'text' },
      description: 'Visible label for the input',
    },
    value: {
      control: { type: 'number' },
      description: 'Current value in cm (internal storage)',
    },
    unit: {
      control: { type: 'select' },
      options: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
      description: 'Display unit (defaults to cm)',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for selection',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value or unit changes',
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
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    hideLabel: {
      control: { type: 'boolean' },
      description: 'Whether to hide the label',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    label: 'Width',
    value: 100,
    unit: 'px',
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (value: number | '', unit: string) => console.log('Changed:', value, unit),
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
