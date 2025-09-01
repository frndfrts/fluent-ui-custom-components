import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LabeledColorPicker } from './LabeledColorPicker';

const meta: Meta<typeof LabeledColorPicker> = {
  title: '03-Compositions/LabeledColorPicker',
  component: LabeledColorPicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composition component that combines a label with a ResponsiveColorPicker for consistent form layout.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text to display',
    },
    value: {
      control: 'text',
      description: 'Current hex color value',
    },
    onChange: {
      action: 'color changed',
      description: 'Callback when color value changes',
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
