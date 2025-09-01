import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ResponsiveColorPicker } from './ResponsiveColorPicker';

const meta: Meta<typeof ResponsiveColorPicker> = {
  title: '02-Panels/ResponsiveColorPicker',
  component: ResponsiveColorPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive color picker panel that combines color swatch, hex input, and color selection tools.',
      },
    },
  },
  argTypes: {
    color: {
      control: { type: 'color' },
      description: 'Current color value',
    },
    onColorChange: {
      action: 'colorChanged',
      description: 'Callback when color changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the picker',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the picker is disabled',
    },
    showHexInput: {
      control: { type: 'boolean' },
      description: 'Whether to show hex input field',
    },
    showColorPicker: {
      control: { type: 'boolean' },
      description: 'Whether to show color picker tools',
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the color picker',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for hex input',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    color: '#FF6B35',
    onColorChange: (color: string) => console.log('Color changed:', color),
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

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Without hex input
export const NoHexInput: Story = {
  args: {
    ...Default.args,
    showHexInput: false,
  },
};

// Without color picker tools
export const NoColorPicker: Story = {
  args: {
    ...Default.args,
    showColorPicker: false,
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Enter hex color...',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    label: 'Theme Primary Color',
    size: 'large',
    placeholder: 'Choose your primary color...',
  },
};
