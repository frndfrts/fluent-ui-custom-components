import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LegacyHexInput } from './LegacyHexInput';

const meta: Meta<typeof LegacyHexInput> = {
  title: '09-Legacy/LegacyHexInput',
  component: LegacyHexInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Legacy hex input component - maintained for backward compatibility.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current hex color value',
    },
    onChange: {
      action: 'color changed',
      description: 'Callback when color value changes',
    },
    length: {
      control: 'number',
      description: 'Length of hex code (3 or 6 digits)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'auto'],
      description: 'Size variant for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for empty state',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#FF6B35',
    length: 6,
  },
};

export const Small: Story = {
  args: {
    value: '#00FF00',
    size: 'small',
    length: 6,
  },
};

export const Large: Story = {
  args: {
    value: '#0000FF',
    size: 'large',
    length: 6,
  },
};

export const ThreeDigits: Story = {
  args: {
    value: '#F0F',
    length: 3,
  },
};

export const Disabled: Story = {
  args: {
    value: '#FF0000',
    disabled: true,
    length: 6,
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Enter hex color',
    length: 6,
  },
};
