import type { Meta, StoryObj } from '@storybook/react';
import { RGBHSLColorSlidersInput } from './RGBHSLColorSlidersInput';

const meta: Meta<typeof RGBHSLColorSlidersInput> = {
  title: '03-Compositions/RGBHSLColorSlidersInput',
  component: RGBHSLColorSlidersInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composition component that provides RGB and HSL color input controls with sliders.',
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['rgb', 'hsl'],
      description: 'Color mode (RGB or HSL)',
    },
    rgbValues: {
      control: { type: 'object' },
      description: 'RGB color values object',
    },
    hslValues: {
      control: { type: 'object' },
      description: 'HSL color values object',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the component',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'rgb',
    rgbValues: { r: 255, g: 107, b: 53 },
  },
};

export const RGBMode: Story = {
  args: {
    mode: 'rgb',
    rgbValues: { r: 255, g: 0, b: 0 },
  },
};

export const HSLMode: Story = {
  args: {
    mode: 'hsl',
    hslValues: { h: 120, s: 100, l: 50 },
  },
};

export const CustomWidth: Story = {
  args: {
    mode: 'rgb',
    rgbValues: { r: 0, g: 0, b: 255 },
    width: '300px',
  },
};
