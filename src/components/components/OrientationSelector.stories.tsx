import type { Meta, StoryObj } from '@storybook/react';
import { OrientationSelector } from './OrientationSelector';

const meta: Meta<typeof OrientationSelector> = {
  title: '04-Components/OrientationSelector',
  component: OrientationSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for selecting orientation values with predefined options.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the orientation selector',
    },
    orientation: {
      control: { type: 'select' },
      options: ['portrait', 'landscape'],
      description: 'Current selected orientation',
    },
    onChange: {
      action: 'orientation changed',
      description: 'Callback when orientation selection changes',
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
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'portrait',
  },
};

export const Portrait: Story = {
  args: {
    orientation: 'portrait',
  },
};

export const Landscape: Story = {
  args: {
    orientation: 'landscape',
  },
};

