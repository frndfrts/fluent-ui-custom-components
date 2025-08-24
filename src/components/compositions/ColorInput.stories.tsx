import type { Meta, StoryObj } from '@storybook/react';
import { ColorInput } from './ColorInput';

const meta: Meta<typeof ColorInput> = {
  title: 'Compositions/ColorInput',
  component: ColorInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive color input component with RGB/HSL sliders, hex input, and color model selection.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The current hex color value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the color changes',
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
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    value: '#FF0000',
    onChange: (color: string) => console.log('Color changed:', color),
    onError: (error: Error) => console.error('Error:', error),
  },
};

// With different sizes
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    value: '#00FF00',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    value: '#0000FF',
  },
};

// With different colors
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

export const Purple: Story = {
  args: {
    ...Default.args,
    value: '#800080',
  },
};

export const Orange: Story = {
  args: {
    ...Default.args,
    value: '#FFA500',
  },
};

export const Pink: Story = {
  args: {
    ...Default.args,
    value: '#FFC0CB',
  },
};

export const Brown: Story = {
  args: {
    ...Default.args,
    value: '#A52A2A',
  },
};

export const Gray: Story = {
  args: {
    ...Default.args,
    value: '#808080',
  },
};

export const Black: Story = {
  args: {
    ...Default.args,
    value: '#000000',
  },
};

export const White: Story = {
  args: {
    ...Default.args,
    value: '#FFFFFF',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: '#FF0000',
  },
};

// Error state example
export const WithError: Story = {
  args: {
    ...Default.args,
    value: '#INVALID',
    onError: (error: Error) => console.error('Color error:', error),
  },
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates error handling for invalid color values.',
      },
    },
  },
};

// Complex example with all features
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    value: '#1E90FF',
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example showing all the features of ColorInput working together.',
      },
    },
  },
};
