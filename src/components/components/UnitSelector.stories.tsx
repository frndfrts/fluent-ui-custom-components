import type { Meta, StoryObj } from '@storybook/react';
import { UnitSelector } from './UnitSelector';

const meta: Meta<typeof UnitSelector> = {
  title: '04-Components/UnitSelector',
  component: UnitSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown component for selecting units of measurement with accessibility features.',
      },
    },
  },
  argTypes: {
    unit: {
      control: { type: 'select' },
      options: ['cm', 'mm', 'in', 'pt', 'px'],
      description: 'Currently selected unit',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units to choose from',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when unit selection changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the selector',
    },
    width: {
      control: { type: 'number' },
      description: 'Custom width in pixels',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the selector is disabled',
    },
    sortAlphabetically: {
      control: { type: 'boolean' },
      description: 'Whether to sort units alphabetically',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the selector',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    unit: 'cm',
    units: ['cm', 'mm', 'in', 'pt', 'px'],
    onChange: (unit: string) => console.log('Unit changed:', unit),
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

// Custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 200,
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
    label: 'Measurement Unit',
  },
};

// Custom units
export const CustomUnits: Story = {
  args: {
    ...Default.args,
    units: ['em', 'rem', 'vw', 'vh', '%'],
    unit: 'em',
  },
};

// Sorted alphabetically
export const SortedAlphabetically: Story = {
  args: {
    ...Default.args,
    sortAlphabetically: true,
  },
};
