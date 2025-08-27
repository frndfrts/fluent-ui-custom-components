import type { Meta, StoryObj } from '@storybook/react';
import { ColorInput } from './RGBHSL';

const meta: Meta<typeof ColorInput> = {
  title: '06-Inputs/ColorInput',
  component: ColorInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for RGB and HSL color input with sliders and numeric inputs.',
      },
    },
  },
  argTypes: {
    hexValue: {
      control: { type: 'text' },
      description: 'Current hex color value',
    },
    onHexChange: {
      action: 'hexChanged',
      description: 'Callback when hex value changes',
    },
    red: {
      control: { type: 'number' },
      description: 'Red component value (0-255)',
    },
    green: {
      control: { type: 'number' },
      description: 'Green component value (0-255)',
    },
    blue: {
      control: { type: 'number' },
      description: 'Blue component value (0-255)',
    },
    colorModel: {
      control: { type: 'select' },
      options: ['rgb', 'hsl'],
      description: 'Current color model',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hexValue: '#FF6B35',
    red: 255,
    green: 107,
    blue: 53,
    hue: 15,
    saturation: 100,
    lightness: 60,
    colorModel: 'rgb' as const,
    onHexChange: (hex: string) => console.log('Hex changed:', hex),
    onRedChange: (value: number) => console.log('Red changed:', value),
    onGreenChange: (value: number) => console.log('Green changed:', value),
    onBlueChange: (value: number) => console.log('Blue changed:', value),
    onHueChange: (value: number) => console.log('Hue changed:', value),
    onSaturationChange: (value: number) => console.log('Saturation changed:', value),
    onLightnessChange: (value: number) => console.log('Lightness changed:', value),
    onColorModelChange: (model: 'rgb' | 'hsl') => console.log('Color model changed:', model),
  },
};
