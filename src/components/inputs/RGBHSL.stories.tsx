import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ColorInput } from './RGBHSL';

const meta: Meta<typeof ColorInput> = {
  title: '06-Inputs/RGBHSL',
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
    hue: {
      control: { type: 'number' },
      description: 'Hue component value (0-360)',
    },
    saturation: {
      control: { type: 'number' },
      description: 'Saturation component value (0-100)',
    },
    lightness: {
      control: { type: 'number' },
      description: 'Lightness component value (0-100)',
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

export const Red: Story = {
  args: {
    ...Default.args,
    hexValue: '#FF0000',
    red: 255,
    green: 0,
    blue: 0,
    hue: 0,
    saturation: 100,
    lightness: 50,
  },
};

export const Green: Story = {
  args: {
    ...Default.args,
    hexValue: '#00FF00',
    red: 0,
    green: 255,
    blue: 0,
    hue: 120,
    saturation: 100,
    lightness: 50,
  },
};

export const Blue: Story = {
  args: {
    ...Default.args,
    hexValue: '#0000FF',
    red: 0,
    green: 0,
    blue: 255,
    hue: 240,
    saturation: 100,
    lightness: 50,
  },
};

export const White: Story = {
  args: {
    ...Default.args,
    hexValue: '#FFFFFF',
    red: 255,
    green: 255,
    blue: 255,
    hue: 0,
    saturation: 0,
    lightness: 100,
  },
};

export const Black: Story = {
  args: {
    ...Default.args,
    hexValue: '#000000',
    red: 0,
    green: 0,
    blue: 0,
    hue: 0,
    saturation: 0,
    lightness: 0,
  },
};
