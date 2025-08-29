import type { Meta, StoryObj } from '@storybook/react';
import { PositionSelector } from './PositionSelector';

const meta: Meta<typeof PositionSelector> = {
  title: '04-Components/PositionSelector',
  component: PositionSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for selecting position values with predefined options.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right', 'Custom'],
      description: 'Current selected position (defaults to top-left at lowest level)',
    },
    options: {
      control: { type: 'object' },
      description: 'Available position options',
    },
    onChange: {
      action: 'position changed',
      description: 'Callback when position selection changes',
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
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'top-left',
  },
};

export const Top: Story = {
  args: {
    value: 'top',
  },
};

export const Bottom: Story = {
  args: {
    value: 'bottom',
  },
};

export const Left: Story = {
  args: {
    value: 'left',
  },
};

export const Right: Story = {
  args: {
    value: 'right',
  },
};

