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
    value: {
      control: 'select',
      options: ['portrait', 'landscape'],
      description: 'Current selected orientation',
    },
    onChange: {
      action: 'orientation changed',
      description: 'Callback when orientation selection changes',
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
    value: 'portrait',
  },
};

export const Portrait: Story = {
  args: {
    value: 'portrait',
  },
};

export const Landscape: Story = {
  args: {
    value: 'landscape',
  },
};

