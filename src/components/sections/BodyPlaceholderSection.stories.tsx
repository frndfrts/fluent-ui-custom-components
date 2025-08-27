import type { Meta, StoryObj } from '@storybook/react';
import { BodyPlaceholderSection } from './BodyPlaceholderSection';

const meta: Meta<typeof BodyPlaceholderSection> = {
  title: '01-Sections/BodyPlaceholderSection',
  component: BodyPlaceholderSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A section component for managing body content placeholder settings and configurations.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'object' },
      description: 'Size configuration for the body placeholder',
    },
    position: {
      control: { type: 'object' },
      description: 'Position configuration for the body placeholder',
    },
    padding: {
      control: { type: 'object' },
      description: 'Padding configuration for the body placeholder',
    },
    positions: {
      control: { type: 'object' },
      description: 'Available position options',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for dimensions and coordinates',
    },
    showLockAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether to show aspect ratio lock control',
    },
    onSizeChange: {
      action: 'sizeChanged',
      description: 'Callback when size changes',
    },
    onPositionChange: {
      action: 'positionChanged',
      description: 'Callback when position changes',
    },
    onPaddingChange: {
      action: 'paddingChanged',
      description: 'Callback when padding changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the section is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    size: {
      width: 400,
      height: 300,
      widthUnit: 'px',
      heightUnit: 'px',
    },
    position: {
      position: 'Middle Center',
      x: 100,
      y: 100,
      xUnit: 'px',
      yUnit: 'px',
    },
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    },
    positions: ['Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'],
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    showLockAspectRatio: true,
    onSizeChange: (size: any) => console.log('Size changed:', size),
    onPositionChange: (position: any) => console.log('Position changed:', position),
    onPaddingChange: (padding: any) => console.log('Padding changed:', padding),
  },
};

// Large size
export const Large: Story = {
  args: {
    ...Default.args,
    size: {
      width: 600,
      height: 450,
      widthUnit: 'px',
      heightUnit: 'px',
    },
  },
};

// Custom position
export const CustomPosition: Story = {
  args: {
    ...Default.args,
    position: {
      position: 'Top Left',
      x: 20,
      y: 20,
      xUnit: 'px',
      yUnit: 'px',
    },
  },
};

// Large padding
export const LargePadding: Story = {
  args: {
    ...Default.args,
    padding: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    },
  },
};
