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
      options: ['Custom', 'Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'],
      description: 'Current position selection',
    },
    positions: {
      control: { type: 'object' },
      description: 'Available position options',
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
    width: 200,
    height: 150,
    widthUnit: 'px',
    heightUnit: 'px',
    position: 'Custom',
    positions: ['Custom', 'Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'],
    x: 100,
    y: 200,
    xUnit: 'px',
    yUnit: 'px',
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    showLockAspectRatio: true,
    lockAspectRatio: false,
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
    onSizeChange: (fields: any) => console.log('Size changed:', fields),
    onPositionChange: (fields: any) => console.log('Position changed:', fields),
  },
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
