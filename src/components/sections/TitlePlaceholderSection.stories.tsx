import type { Meta, StoryObj } from '@storybook/react';
import { TitlePlaceholderSection } from './TitlePlaceholderSection';

const meta: Meta<typeof TitlePlaceholderSection> = {
  title: '01-Sections/TitlePlaceholderSection',
  component: TitlePlaceholderSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A section component for managing document title placeholder settings and configurations.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'object' },
      description: 'Size configuration for the title placeholder',
    },
    position: {
      control: { type: 'object' },
      description: 'Position configuration for the title placeholder',
    },
    padding: {
      control: { type: 'object' },
      description: 'Padding configuration for the title placeholder',
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
      width: 300,
      height: 100,
      widthUnit: 'px',
      heightUnit: 'px',
    },
    position: {
      position: 'Top Center',
      x: 150,
      y: 20,
      xUnit: 'px',
      yUnit: 'px',
    },
    padding: {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15,
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
      width: 400,
      height: 120,
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
      top: 25,
      right: 25,
      bottom: 25,
      left: 25,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    },
  },
};
