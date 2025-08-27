import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalColorPicker } from './HorizontalColorPicker';

const meta: Meta<typeof HorizontalColorPicker> = {
  title: '09-Legacy/HorizontalColorPicker',
  component: HorizontalColorPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Legacy horizontal color picker component - maintained for backward compatibility.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current hex color value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
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
