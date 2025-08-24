import type { Meta, StoryObj } from '@storybook/react';
import { HexInput } from './HexInput';

const meta: Meta<typeof HexInput> = {
  title: 'Primitives/HexInput',
  component: HexInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A hex color input component with validation, color swatch preview, and accessibility features.',
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
      description: 'Callback when the hex value changes',
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
    length: {
      control: { type: 'select' },
      options: [3, 6, 8],
      description: 'Length of hex value (3, 6, or 8 characters)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when value is empty',
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
    value: '#FF0000',
    onChange: (value: string) => console.log('Hex changed:', value),
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

// With different hex lengths
export const ThreeChar: Story = {
  args: {
    ...Default.args,
    length: 3,
    value: '#F00',
  },
};

export const SixChar: Story = {
  args: {
    ...Default.args,
    length: 6,
    value: '#FF0000',
  },
};

export const EightChar: Story = {
  args: {
    ...Default.args,
    length: 8,
    value: '#FF0000FF',
  },
};

// With custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 200,
    value: '#FF8800',
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    value: '',
    placeholder: '#RRGGBB',
  },
};

// With accessibility features
export const Accessible: Story = {
  args: {
    ...Default.args,
    ariaLabel: 'Hex color code',
    ariaDescribedBy: 'hex-desc',
    value: '#8800FF',
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows the HexInput with comprehensive accessibility features.',
      },
    },
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

// Invalid hex example
export const InvalidHex: Story = {
  args: {
    ...Default.args,
    value: '#INVALID',
    onError: (error: Error) => console.error('Invalid hex:', error),
  },
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates error handling for invalid hex values.',
      },
    },
  },
};

// Various color examples
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

// Complex example with all features
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    width: 250,
    length: 6,
    ariaLabel: 'Primary brand color',
    ariaDescribedBy: 'brand-desc',
    placeholder: '#RRGGBB',
    value: '#1E90FF',
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example showing all the features of HexInput working together.',
      },
    },
  },
};
