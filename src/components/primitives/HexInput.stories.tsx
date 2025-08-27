import type { Meta, StoryObj } from '@storybook/react';
import { HexInput } from './HexInput';

const meta: Meta<typeof HexInput> = {
  title: '05-Primitives/HexInput',
  component: HexInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A hex color input component with real-time validation, formatting, and accessibility features.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current hex color value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    length: {
      control: { type: 'select' },
      options: [3, 6, 8],
      description: 'Length of hex code (3, 6, or 8 digits)',
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
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for empty state',
    },

    label: {
      control: { type: 'text' },
      description: 'Visible label for the input',
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

// Basic usage - 6 characters
export const Default: Story = {
  args: {
    value: '#FF6B35',
    length: 6,
    onChange: (value: string) => console.log('Hex value changed:', value),
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

// 3 characters
export const ThreeCharacters: Story = {
  args: {
    ...Default.args,
    value: '#F00',
    length: 3,
  },
};

// 8 characters (with alpha)
export const EightCharacters: Story = {
  args: {
    ...Default.args,
    value: '#FF6B35FF',
    length: 8,
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    value: '',
    placeholder: 'Enter hex color...',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Color Value',
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

// With ARIA label
export const WithAriaLabel: Story = {
  args: {
    ...Default.args,
    ariaLabel: 'Enter hex color value',
  },
};

// Different colors
export const Red: Story = {
  args: {
    ...Default.args,
    value: '#FF0000',
  },
};

export const Green: Story = {
  args: {
    ...Default.args,
    value: '#00FF00',
  },
};

export const Blue: Story = {
  args: {
    ...Default.args,
    value: '#0000FF',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    width: 300,
    length: 8,
    label: 'Primary Color with Alpha',
    placeholder: 'Enter 8-character hex color...',

    ariaLabel: 'Enter primary color with alpha channel',
    value: '#FF6B35CC',
  },
};
