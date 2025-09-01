import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LabeledColorHexInput } from './LabeledColorHexInput';

const meta: Meta<typeof LabeledColorHexInput> = {
  title: '03-Compositions/LabeledColorHexInput',
  component: LabeledColorHexInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composition component that combines a label with a ColorHexInput for consistent form layout.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text to display',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the label should be required (adds asterisk)',
    },
    labelWidth: {
      control: { type: 'text' },
      description: 'Custom width for the label container',
    },
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
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Primary Color',
    value: '#FF6B35',
  },
};

export const WithLongLabel: Story = {
  args: {
    label: 'Followed Hyperlink',
    value: '#0000FF',
  },
};

export const EmptyColor: Story = {
  args: {
    label: 'Background Color',
    value: '',
  },
};

export const CustomColor: Story = {
  args: {
    label: 'Accent Color',
    value: '#00FF00',
  },
};
