import type { Meta, StoryObj } from '@storybook/react';
import { SubtitlePlaceholderSection } from './SubtitlePlaceholderSection';

const meta: Meta<typeof SubtitlePlaceholderSection> = {
  title: '01-Sections/SubtitlePlaceholderSection',
  component: SubtitlePlaceholderSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A section component for displaying subtitle placeholder content with proper formatting and layout.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'object' },
      description: 'Size configuration for the subtitle placeholder',
    },
    position: {
      control: { type: 'object' },
      description: 'Position configuration for the subtitle placeholder',
    },
    padding: {
      control: { type: 'object' },
      description: 'Padding configuration for the subtitle placeholder',
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
      width: 300,
      height: 80,
      widthUnit: 'px',
      heightUnit: 'px',
    },
    position: {
      position: 'Top Center',
      x: 150,
      y: 80,
      xUnit: 'px',
      yUnit: 'px',
    },
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
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
      width: 400,
      height: 100,
      widthUnit: 'px',
      heightUnit: 'px',
    },
  },
};

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

export const LargePadding: Story = {
  args: {
    ...Default.args,
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
  },
};
