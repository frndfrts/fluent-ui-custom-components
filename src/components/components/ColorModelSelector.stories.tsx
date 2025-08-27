import type { Meta, StoryObj } from '@storybook/react';
import { ColorModelSelector } from './ColorModelSelector';

const meta: Meta<typeof ColorModelSelector> = {
  title: '04-Components/ColorModelSelector',
  component: ColorModelSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for selecting between different color models (RGB, HSL, HEX, etc.) with visual feedback.',
      },
    },
  },
  argTypes: {
    selectedModel: {
      control: { type: 'select' },
      options: ['rgb', 'hsl', 'hex', 'cmyk', 'hsv'],
      description: 'Currently selected color model',
    },
    availableModels: {
      control: { type: 'object' },
      description: 'Available color models to choose from',
    },
    onModelChange: {
      action: 'modelChanged',
      description: 'Callback when color model changes',
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
    showLabels: {
      control: { type: 'boolean' },
      description: 'Whether to show model labels',
    },
    showDescriptions: {
      control: { type: 'boolean' },
      description: 'Whether to show model descriptions',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the selector',
    },
    width: {
      control: { type: 'number' },
      description: 'Custom width in pixels',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    selectedModel: 'rgb',
    availableModels: ['rgb', 'hsl', 'hex'],
    onModelChange: (model: string) => console.log('Color model changed:', model),
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

// HSL model
export const HSLModel: Story = {
  args: {
    ...Default.args,
    selectedModel: 'hsl',
  },
};

// HEX model
export const HEXModel: Story = {
  args: {
    ...Default.args,
    selectedModel: 'hex',
  },
};

// CMYK model
export const CMYKModel: Story = {
  args: {
    ...Default.args,
    selectedModel: 'cmyk',
    availableModels: ['rgb', 'hsl', 'hex', 'cmyk'],
  },
};

// HSV model
export const HSVModel: Story = {
  args: {
    ...Default.args,
    selectedModel: 'hsv',
    availableModels: ['rgb', 'hsl', 'hex', 'hsv'],
  },
};

// With labels
export const WithLabels: Story = {
  args: {
    ...Default.args,
    showLabels: true,
  },
};

// With descriptions
export const WithDescriptions: Story = {
  args: {
    ...Default.args,
    showDescriptions: true,
  },
};

// Custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 300,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Color Model',
  },
};

// Extended models
export const ExtendedModels: Story = {
  args: {
    ...Default.args,
    availableModels: ['rgb', 'hsl', 'hex', 'cmyk', 'hsv', 'lab', 'xyz'],
    selectedModel: 'lab',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    width: 400,
    showLabels: true,
    showDescriptions: true,
    label: 'Advanced Color Model Selection',
    availableModels: ['rgb', 'hsl', 'hex', 'cmyk', 'hsv'],
    selectedModel: 'hsl',
  },
};

