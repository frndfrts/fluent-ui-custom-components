import type { Meta, StoryObj } from '@storybook/react';
import { SliderInput } from './SliderInput';

const meta: Meta<typeof SliderInput> = {
  title: '05-Primitives/SliderInput',
  component: SliderInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A slider input component with customizable range, step, and accessibility features.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current slider value',
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
      description: 'Step increment for the slider',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the slider',
    },
    width: {
      control: { type: 'number' },
      description: 'Custom width in pixels',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the slider is disabled',
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Whether to show the current value',
    },
    showMinMax: {
      control: { type: 'boolean' },
      description: 'Whether to show min/max labels',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the slider',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA label for screen readers',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    onChange: (value: number) => console.log('Value changed:', value),
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

// Custom range
export const CustomRange: Story = {
  args: {
    ...Default.args,
    min: -50,
    max: 50,
    value: 0,
  },
};

// With step
export const WithStep: Story = {
  args: {
    ...Default.args,
    step: 5,
    value: 25,
  },
};

// Custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 300,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Brightness',
  },
};

// Show value
export const ShowValue: Story = {
  args: {
    ...Default.args,
    showValue: true,
  },
};

// Show min/max
export const ShowMinMax: Story = {
  args: {
    ...Default.args,
    showMinMax: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Percentage range
export const PercentageRange: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 100,
    value: 75,
    label: 'Opacity',
    showValue: true,
    showMinMax: true,
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 200,
    value: 100,
    step: 10,
    size: 'large',
    width: 400,
    label: 'Volume Level',
    showValue: true,
    showMinMax: true,
    ariaLabel: 'Adjust volume level from 0 to 200',
  },
};
