import type { Meta, StoryObj } from '@storybook/react';
import { MarginsPanel } from './MarginsPanel';

const meta: Meta<typeof MarginsPanel> = {
  title: '02-Panels/MarginsPanel',
  component: MarginsPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing margin values (top, right, bottom, left).',
      },
    },
  },
  argTypes: {
    margins: {
      control: { type: 'object' },
      description: 'Current margin values',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for margins',
    },
    onChange: {
      action: 'marginsChanged',
      description: 'Callback when margins change',
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
    margins: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (margins: any) => console.log('Margins changed:', margins),
  },
};

export const UniformMargins: Story = {
  args: {
    ...Default.args,
    margins: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30,
    },
  },
};

export const AsymmetricMargins: Story = {
  args: {
    ...Default.args,
    margins: {
      top: 10,
      right: 25,
      bottom: 15,
      left: 35,
    },
  },
};

export const ZeroMargins: Story = {
  args: {
    ...Default.args,
    margins: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
};
