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
      control: 'select',
      options: ['top', 'center', 'bottom', 'left', 'right'],
      description: 'Current selected position',
    },
    onChange: {
      action: 'position changed',
      description: 'Callback when position selection changes',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'center',
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

