import type { Meta, StoryObj } from '@storybook/react';
import { NotesSection } from './NotesSection';

const meta: Meta<typeof NotesSection> = {
  title: '01-Sections/NotesSection',
  component: NotesSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A section component for displaying notes content with proper formatting and layout.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'object' },
      description: 'Size configuration for the notes section',
    },
    position: {
      control: { type: 'object' },
      description: 'Position configuration for the notes section',
    },
    margins: {
      control: { type: 'object' },
      description: 'Margins configuration for the notes section',
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
    onMarginsChange: {
      action: 'marginsChanged',
      description: 'Callback when margins change',
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
      height: 200,
      widthUnit: 'px',
      heightUnit: 'px',
    },
    position: {
      position: 'bottom-left',
      x: 20,
      y: 50,
      xUnit: 'px',
      yUnit: 'px',
    },
    margins: {
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
    onMarginsChange: (margins: any) => console.log('Margins changed:', margins),
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: {
      width: 400,
      height: 300,
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

export const LargeMargins: Story = {
  args: {
    ...Default.args,
    margins: {
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
