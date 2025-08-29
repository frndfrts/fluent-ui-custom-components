import type { Meta, StoryObj } from '@storybook/react';
import { SizeAndPositionPanel } from './SizeAndPositionPanel';

const meta: Meta<typeof SizeAndPositionPanel> = {
  title: '02-Panels/SizeAndPositionPanel',
  component: SizeAndPositionPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing both size and position fields in a unified interface.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number' },
      description: 'Width value',
    },
    height: {
      control: { type: 'number' },
      description: 'Height value',
    },
    widthUnit: {
      control: { type: 'text' },
      description: 'Unit for width',
    },
    heightUnit: {
      control: { type: 'text' },
      description: 'Unit for height',
    },
    position: {
      control: { type: 'select' },
      options: ['Custom', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Current position selection',
    },
    positions: {
      control: { type: 'object' },
      description: 'Available position options (defaults to full 3x3 + Custom at the lowest level)',
    },
    x: {
      control: { type: 'number' },
      description: 'X coordinate value',
    },
    y: {
      control: { type: 'number' },
      description: 'Y coordinate value',
    },
    xUnit: {
      control: { type: 'text' },
      description: 'Unit for X coordinate',
    },
    yUnit: {
      control: { type: 'text' },
      description: 'Unit for Y coordinate',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for dimensions and coordinates',
    },
    showLockAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether to show aspect ratio lock control',
    },
    lockAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether aspect ratio is locked',
    },
    onLockAspectRatioChange: {
      action: 'aspectRatioLockChanged',
      description: 'Callback when aspect ratio lock changes',
    },
    onSizeChange: {
      action: 'sizeChanged',
      description: 'Callback when size changes',
    },
    onPositionChange: {
      action: 'positionChanged',
      description: 'Callback when position changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the panel is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 10,
    height: 7.5,
    widthUnit: 'cm',
    heightUnit: 'cm',
    position: 'top-left',
    positions: ['Custom', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    x: 0,
    y: 0,
    xUnit: 'cm',
    yUnit: 'cm',
    units: ['cm', 'mm', 'in', 'pt', 'px'],
    showLockAspectRatio: true,
    lockAspectRatio: false,
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
    onSizeChange: (fields: any) => console.log('Size changed:', fields),
    onPositionChange: (fields: any) => console.log('Position changed:', fields),
    // Active area example (e.g., 21x29.7 cm paper with 2cm margins)
    activeX: 2,
    activeY: 2,
    activeWidth: 21 - 2 - 2,
    activeHeight: 29.7 - 2 - 2,
  },

  export const PresetsRecomputeOnSizeChange: Story = {
    args: {
      ...Default.args,
      position: 'middle-center',
      width: 8,
      height: 4,
      activeX: 1,
      activeY: 1,
      activeWidth: 20,
      activeHeight: 27,
      onSizeChange: (fields: any) => console.log('Size changed:', fields),
      onPositionChange: (fields: any) => console.log('Position changed:', fields),
    },
  };

  export const CustomAllowsManualCoordinates: Story = {
    args: {
      ...Default.args,
      position: 'Custom',
      x: 3,
      y: 5,
    },
  };

};

export const Square: Story = {
  args: {
    ...Default.args,
    width: 100,
    height: 100,
    x: 50,
    y: 50,
  },
};

export const LargeElement: Story = {
  args: {
    ...Default.args,
    width: 500,
    height: 300,
    x: 200,
    y: 100,
  },
};

export const SmallElement: Story = {
  args: {
    ...Default.args,
    width: 50,
    height: 30,
    x: 10,
    y: 10,
  },
};
