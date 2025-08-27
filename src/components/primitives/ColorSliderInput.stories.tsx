import type { Meta, StoryObj } from '@storybook/react';
import { ColorSliderInput } from './ColorSliderInput';

const meta: Meta<typeof ColorSliderInput> = {
  title: '05-Primitives/ColorSliderInput',
  component: ColorSliderInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A color slider input component for adjusting individual color channels (RGB, HSL, etc.) with visual feedback.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 255, step: 1 },
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
    colorType: {
      control: { type: 'select' },
      options: ['red', 'green', 'blue', 'hue', 'saturation', 'lightness'],
      description: 'Type of color channel',
    },
    baseColor: {
      control: { type: 'color' },
      description: 'Base color for visual feedback',
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

// Red channel
export const RedChannel: Story = {
  args: {
    value: 255,
    min: 0,
    max: 255,
    step: 1,
    colorType: 'red',
    baseColor: '#FF0000',
    onChange: (value: number) => console.log('Red value changed:', value),
  },
};

// Green channel
export const GreenChannel: Story = {
  args: {
    ...RedChannel.args,
    value: 128,
    colorType: 'green',
    baseColor: '#00FF00',
    onChange: (value: number) => console.log('Green value changed:', value),
  },
};

// Blue channel
export const BlueChannel: Story = {
  args: {
    ...RedChannel.args,
    value: 0,
    colorType: 'blue',
    baseColor: '#0000FF',
    onChange: (value: number) => console.log('Blue value changed:', value),
  },
};

// Hue channel
export const HueChannel: Story = {
  args: {
    ...RedChannel.args,
    value: 180,
    min: 0,
    max: 360,
    step: 1,
    colorType: 'hue',
    baseColor: '#00FFFF',
    onChange: (value: number) => console.log('Hue value changed:', value),
  },
};

// Saturation channel
export const SaturationChannel: Story = {
  args: {
    ...RedChannel.args,
    value: 100,
    min: 0,
    max: 100,
    step: 1,
    colorType: 'saturation',
    baseColor: '#FF8080',
    onChange: (value: number) => console.log('Saturation value changed:', value),
  },
};

// Lightness channel
export const LightnessChannel: Story = {
  args: {
    ...RedChannel.args,
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    colorType: 'lightness',
    baseColor: '#808080',
    onChange: (value: number) => console.log('Lightness value changed:', value),
  },
};

// Small size
export const Small: Story = {
  args: {
    ...RedChannel.args,
    size: 'small',
  },
};

// Large size
export const Large: Story = {
  args: {
    ...RedChannel.args,
    size: 'large',
  },
};

// Custom width
export const CustomWidth: Story = {
  args: {
    ...RedChannel.args,
    width: 300,
  },
};

// With value display
export const WithValue: Story = {
  args: {
    ...RedChannel.args,
    showValue: true,
  },
};

// With min/max labels
export const WithMinMax: Story = {
  args: {
    ...RedChannel.args,
    showMinMax: true,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...RedChannel.args,
    label: 'Red Intensity',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...RedChannel.args,
    disabled: true,
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...RedChannel.args,
    size: 'large',
    width: 400,
    showValue: true,
    showMinMax: true,
    label: 'Color Channel Control',
    ariaLabel: 'Adjust red color channel from 0 to 255',
    baseColor: '#FF6B35',
  },
};
