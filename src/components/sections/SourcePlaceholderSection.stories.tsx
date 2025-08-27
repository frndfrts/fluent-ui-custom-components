import type { Meta, StoryObj } from '@storybook/react';
import { SourcePlaceholderSection } from './SourcePlaceholderSection';

const meta: Meta<typeof SourcePlaceholderSection> = {
  title: '01-Sections/SourcePlaceholderSection',
  component: SourcePlaceholderSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A section component for displaying source placeholder content with proper formatting and layout.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'object' },
      description: 'Size configuration for the source placeholder',
    },
    position: {
      control: { type: 'object' },
      description: 'Position configuration for the source placeholder',
    },
    padding: {
      control: { type: 'object' },
      description: 'Padding configuration for the source placeholder',
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

export const Default: Story = {
  args: {
    size: {
      width: 250,
      height: 60,
      widthUnit: 'px',
      heightUnit: 'px',
    },
    position: {
      position: 'Bottom Left',
      x: 20,
      y: 20,
      xUnit: 'px',
      yUnit: 'px',
    },
    padding: {
      top: 8,
      right: 8,
      bottom: 8,
      left: 8,
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

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: {
      width: 350,
      height: 80,
      widthUnit: 'px',
      heightUnit: 'px',
    },
  },
};

export const CustomPosition: Story = {
  args: {
    ...Default.args,
    position: {
      position: 'Top Right',
      x: 300,
      y: 20,
      xUnit: 'px',
      yUnit: 'px',
    },
  },
};

export const LargePadding: Story = {
  args: {
    ...Default.args,
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
  },
};
