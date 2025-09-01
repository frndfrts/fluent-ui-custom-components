import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SlidesSection } from './SlidesSection';

const meta: Meta<typeof SlidesSection> = {
  title: '01-Sections/SlidesSection',
  component: SlidesSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A section component for displaying slides content with proper formatting and layout.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'object' },
      description: 'Size configuration for the slides section',
    },
    position: {
      control: { type: 'object' },
      description: 'Position configuration for the slides section',
    },
    margins: {
      control: { type: 'object' },
      description: 'Margins configuration for the slides section',
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
      width: 400,
      height: 300,
      widthUnit: 'px',
      heightUnit: 'px',
    },
    position: {
      position: 'middle-center',
      x: 100,
      y: 100,
      xUnit: 'px',
      yUnit: 'px',
    },
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
    positions: ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
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
      width: 600,
      height: 450,
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

export const LargeMargins: Story = {
  args: {
    ...Default.args,
    margins: {
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
