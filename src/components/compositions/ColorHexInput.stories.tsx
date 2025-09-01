import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ColorHexInput } from './ColorHexInput';

const meta: Meta<typeof ColorHexInput> = {
  title: '03-Compositions/ColorHexInput',
  component: ColorHexInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composition component that combines a color swatch with a hex input field.',
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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for the input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for empty state',
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
