import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatioSelector } from './AspectRatioSelector';

const meta: Meta<typeof AspectRatioSelector> = {
  title: '04-Components/AspectRatioSelector',
  component: AspectRatioSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for selecting and managing aspect ratios with preset options and custom values.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['1:1', '4:3', '16:9', '3:2', '5:4', 'Custom'],
      description: 'Current aspect ratio',
    },
    options: {
      control: { type: 'object' },
      description: 'Available aspect ratio options',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when aspect ratio changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the selector',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the selector is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    value: '16:9',
    onChange: (ratio: string) => console.log('Aspect ratio changed:', ratio),
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

// 4:3 ratio
export const FourByThree: Story = {
  args: {
    ...Default.args,
    value: '4:3',
  },
};

// Square ratio
export const Square: Story = {
  args: {
    ...Default.args,
    value: '1:1',
  },
};

// Portrait ratio
export const Portrait: Story = {
  args: {
    ...Default.args,
    value: '3:4',
  },
};

// With custom ratio
export const CustomRatio: Story = {
  args: {
    ...Default.args,
    value: 'Custom',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Page Aspect Ratio',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Custom presets
export const CustomPresets: Story = {
  args: {
    ...Default.args,
    presets: ['2:1', '3:1', '5:4', '7:5', 'golden'],
    aspectRatio: '2:1',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    showCustom: true,
    label: 'Document Aspect Ratio',
    presets: ['16:9', '4:3', '3:2', '1:1', 'A4', 'Letter', 'Legal'],
    aspectRatio: 'A4',
  },
};
