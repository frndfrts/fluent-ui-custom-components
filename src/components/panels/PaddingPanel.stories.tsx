import type { Meta, StoryObj } from '@storybook/react';
import { PaddingPanel } from './PaddingPanel';

const meta: Meta<typeof PaddingPanel> = {
  title: '02-Panels/PaddingPanel',
  component: PaddingPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing padding values (top, right, bottom, left).',
      },
    },
  },
  argTypes: {
    padding: {
      control: { type: 'object' },
      description: 'Current padding values',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for padding',
    },
    onChange: {
      action: 'paddingChanged',
      description: 'Callback when padding changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the panel is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (padding: any) => console.log('Padding changed:', padding),
  },
};

export const UniformPadding: Story = {
  args: {
    ...Default.args,
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  },
};

export const AsymmetricPadding: Story = {
  args: {
    ...Default.args,
    padding: {
      top: 5,
      right: 15,
      bottom: 10,
      left: 25,
    },
  },
};

export const ZeroPadding: Story = {
  args: {
    ...Default.args,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
};
