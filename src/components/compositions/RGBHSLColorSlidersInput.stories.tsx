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
    value: {
      control: 'text',
      description: 'Current hex color value',
    },
    onChange: {
      action: 'color changed',
      description: 'Callback when color value changes',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#FF6B35',
  },
};

export const Red: Story = {
  args: {
    value: '#FF0000',
  },
};

export const Green: Story = {
  args: {
    value: '#00FF00',
  },
};

export const Blue: Story = {
  args: {
    value: '#0000FF',
  },
};

export const White: Story = {
  args: {
    value: '#FFFFFF',
  },
};

export const Black: Story = {
  args: {
    value: '#000000',
  },
};
