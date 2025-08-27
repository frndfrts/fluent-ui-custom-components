import type { Meta, StoryObj } from '@storybook/react';
import { PaperSelector } from './PaperSelector';

const meta: Meta<typeof PaperSelector> = {
  title: '04-Components/PaperSelector',
  component: PaperSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for selecting standard paper sizes with dimensions and orientation options.',
      },
    },
  },
  argTypes: {
    selectedSize: {
      control: { type: 'select' },
      options: ['A4', 'Letter', 'Legal', 'A3', 'A5', 'Custom'],
      description: 'Currently selected paper size',
    },
    orientation: {
      control: { type: 'select' },
      options: ['portrait', 'landscape'],
      description: 'Paper orientation',
    },
    onSizeChange: {
      action: 'sizeChanged',
      description: 'Callback when paper size changes',
    },
    onOrientationChange: {
      action: 'orientationChanged',
      description: 'Callback when orientation changes',
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
    showDimensions: {
      control: { type: 'boolean' },
      description: 'Whether to show paper dimensions',
    },
    showOrientation: {
      control: { type: 'boolean' },
      description: 'Whether to show orientation controls',
    },
    customSizes: {
      control: { type: 'object' },
      description: 'Custom paper size definitions',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the selector',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    selectedSize: 'A4',
    orientation: 'portrait',
    onSizeChange: (size: string) => console.log('Paper size changed:', size),
    onOrientationChange: (orientation: string) => console.log('Orientation changed:', orientation),
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

// Letter size
export const Letter: Story = {
  args: {
    ...Default.args,
    selectedSize: 'Letter',
  },
};

// Legal size
export const Legal: Story = {
  args: {
    ...Default.args,
    selectedSize: 'Legal',
  },
};

// A3 size
export const A3: Story = {
  args: {
    ...Default.args,
    selectedSize: 'A3',
  },
};

// Landscape orientation
export const Landscape: Story = {
  args: {
    ...Default.args,
    orientation: 'landscape',
  },
};

// With dimensions
export const WithDimensions: Story = {
  args: {
    ...Default.args,
    showDimensions: true,
  },
};

// With orientation controls
export const WithOrientation: Story = {
  args: {
    ...Default.args,
    showOrientation: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Custom sizes
export const CustomSizes: Story = {
  args: {
    ...Default.args,
    customSizes: {
      'Business Card': { width: 85, height: 55, unit: 'mm' },
      'Postcard': { width: 148, height: 105, unit: 'mm' },
      'Brochure': { width: 210, height: 297, unit: 'mm' },
    },
    selectedSize: 'Business Card',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Document Paper Size',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    showDimensions: true,
    showOrientation: true,
    label: 'Page Setup',
    customSizes: {
      'Custom 1': { width: 200, height: 300, unit: 'mm' },
      'Custom 2': { width: 8, height: 12, unit: 'in' },
    },
  },
};
