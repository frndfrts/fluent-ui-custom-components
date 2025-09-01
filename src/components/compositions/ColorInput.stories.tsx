import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ColorInput } from './ColorInput';

const meta: Meta<typeof ColorInput> = {
  title: '03-Compositions/ColorInput',
  component: ColorInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A composition component that combines color selection with input controls for comprehensive color management.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'color' },
      description: 'Current hex color value',
    },
    onChange: {
      action: 'colorChanged',
      description: 'Callback when color changes',
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
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    value: '#FF6B35',
    onChange: (color: string) => console.log('Color changed:', color),
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

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Background Color',
  },
};

// Custom color
export const CustomColor: Story = {
  args: {
    ...Default.args,
    color: '#00FF00',
  },
};

// Without hex input
export const NoHexInput: Story = {
  args: {
    ...Default.args,
    showHexInput: false,
  },
};

// Without color picker
export const NoColorPicker: Story = {
  args: {
    ...Default.args,
    showColorPicker: false,
  },
};

// Without swatch
export const NoSwatch: Story = {
  args: {
    ...Default.args,
    showSwatch: false,
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Enter hex color...',
  },
};

// Custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 300,
  },
};

// Required
export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    width: 400,
    label: 'Theme Primary Color',
    placeholder: 'Choose your primary color...',
    required: true,
    showHexInput: true,
    showColorPicker: true,
    showSwatch: true,
  },
};
