import type { Meta, StoryObj } from '@storybook/react';
import { LegacyColorPicker } from './LegacyColorPicker';

const meta: Meta<typeof LegacyColorPicker> = {
  title: '09-Legacy/LegacyColorPicker',
  component: LegacyColorPicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Legacy color picker component - maintained for backward compatibility.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current hex color value',
    },
    onChange: {
      action: 'colorChanged',
      description: 'Callback when color value changes',
    },
    className: {
      control: { type: 'text' },
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
    onChange: (color: string) => console.log('Color changed:', color),
  },
};
