import type { Meta, StoryObj } from '@storybook/react';
import { SizeFields } from './SizeFields';

const meta: Meta<typeof SizeFields> = {
  title: '02-Panels/SizeFields',
  component: SizeFields,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing width, height, and aspect ratio locking with numeric inputs and unit selection.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number' },
      description: 'Current width value',
    },
    height: {
      control: { type: 'number' },
      description: 'Current height value',
    },
    unit: {
      control: { type: 'select' },
      options: ['px', 'cm', 'mm', 'in', 'pt'],
      description: 'Unit of measurement',
    },
    lockAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether aspect ratio is locked',
    },
    aspectRatio: {
      control: { type: 'number' },
      description: 'Current aspect ratio value',
    },
    onWidthChange: {
      action: 'widthChanged',
      description: 'Callback when width changes',
    },
    onHeightChange: {
      action: 'heightChanged',
      description: 'Callback when height changes',
    },
    onUnitChange: {
      action: 'unitChanged',
      description: 'Callback when unit changes',
    },
    onAspectRatioLockChange: {
      action: 'aspectRatioLockChanged',
      description: 'Callback when aspect ratio lock changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the panel',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the panel is disabled',
    },
    showUnitSelector: {
      control: { type: 'boolean' },
      description: 'Whether to show unit selector',
    },
    showAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether to show aspect ratio display',
    },
    minWidth: {
      control: { type: 'number' },
      description: 'Minimum allowed width',
    },
    maxWidth: {
      control: { type: 'number' },
      description: 'Maximum allowed width',
    },
    minHeight: {
      control: { type: 'number' },
      description: 'Minimum allowed height',
    },
    maxHeight: {
      control: { type: 'number' },
      description: 'Maximum allowed height',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the panel',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    width: 800,
    height: 600,
    unit: 'px',
    lockAspectRatio: false,
    aspectRatio: 1.33,
    onWidthChange: (width: number) => console.log('Width changed:', width),
    onHeightChange: (height: number) => console.log('Height changed:', height),
    onUnitChange: (unit: string) => console.log('Unit changed:', unit),
    onAspectRatioLockChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
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

// Centimeters
export const Centimeters: Story = {
  args: {
    ...Default.args,
    unit: 'cm',
    width: 21.0,
    height: 29.7,
  },
};

// Inches
export const Inches: Story = {
  args: {
    ...Default.args,
    unit: 'in',
    width: 8.5,
    height: 11.0,
  },
};

// Locked aspect ratio
export const LockedAspectRatio: Story = {
  args: {
    ...Default.args,
    lockAspectRatio: true,
    aspectRatio: 1.5,
  },
};

// With constraints
export const WithConstraints: Story = {
  args: {
    ...Default.args,
    minWidth: 100,
    maxWidth: 2000,
    minHeight: 100,
    maxHeight: 2000,
  },
};

// Without unit selector
export const NoUnitSelector: Story = {
  args: {
    ...Default.args,
    showUnitSelector: false,
  },
};

// Without aspect ratio display
export const NoAspectRatio: Story = {
  args: {
    ...Default.args,
    showAspectRatio: false,
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
    label: 'Document Dimensions',
  },
};

// Square dimensions
export const Square: Story = {
  args: {
    ...Default.args,
    width: 1000,
    height: 1000,
    aspectRatio: 1.0,
  },
};

// Portrait dimensions
export const Portrait: Story = {
  args: {
    ...Default.args,
    width: 600,
    height: 800,
    aspectRatio: 0.75,
  },
};

// Landscape dimensions
export const Landscape: Story = {
  args: {
    ...Default.args,
    width: 1200,
    height: 800,
    aspectRatio: 1.5,
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    unit: 'cm',
    width: 21.0,
    height: 29.7,
    lockAspectRatio: true,
    aspectRatio: 1.41,
    minWidth: 5,
    maxWidth: 100,
    minHeight: 5,
    maxHeight: 100,
    label: 'Page Size Configuration',
    showUnitSelector: true,
    showAspectRatio: true,
  },
};
