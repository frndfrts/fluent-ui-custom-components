import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LockAspectRatio } from './LockAspectRatio';

const meta: Meta<typeof LockAspectRatio> = {
  title: '05-Primitives/LockAspectRatio',
  component: LockAspectRatio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A primitive component for toggling aspect ratio locking with visual feedback and accessibility features.',
      },
    },
  },
  argTypes: {
    locked: {
      control: { type: 'boolean' },
      description: 'Whether aspect ratio is currently locked',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when lock state changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the component',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Whether to show the lock label',
    },
    label: {
      control: { type: 'text' },
      description: 'Custom label text',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA label for screen readers',
    },
    tooltip: {
      control: { type: 'text' },
      description: 'Tooltip text on hover',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage - unlocked
export const Default: Story = {
  args: {
    locked: false,
    onChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
  },
};

// Locked state
export const Locked: Story = {
  args: {
    ...Default.args,
    locked: true,
  },
};

// Small size
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

// Large size
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    showLabel: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    ...Default.args,
    showLabel: true,
    label: 'Lock Proportions',
  },
};

// With tooltip
export const WithTooltip: Story = {
  args: {
    ...Default.args,
    tooltip: 'Click to lock/unlock aspect ratio',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Disabled locked
export const DisabledLocked: Story = {
  args: {
    ...Default.args,
    locked: true,
    disabled: true,
  },
};

// With ARIA label
export const WithAriaLabel: Story = {
  args: {
    ...Default.args,
    ariaLabel: 'Toggle aspect ratio locking',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    showLabel: true,
    label: 'Maintain Proportions',
    tooltip: 'Lock the width-to-height ratio to maintain proportions when resizing',
    ariaLabel: 'Toggle proportion locking for consistent scaling',
  },
};
