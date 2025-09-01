import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RecentColors } from './RecentColors';

const meta: Meta<typeof RecentColors> = {
  title: '06-Inputs/RecentColors',
  component: RecentColors,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for displaying and selecting from recently used colors.',
      },
    },
  },
  argTypes: {
    colors: {
      control: { type: 'object' },
      description: 'Array of recent colors',
    },
    onColorSelect: {
      action: 'colorSelected',
      description: 'Callback when a color is selected',
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
    label: {
      control: { type: 'text' },
      description: 'Label for the recent colors section',
    },
    maxColors: {
      control: { type: 'number' },
      description: 'Maximum number of colors to display',
    },
    showTooltips: {
      control: { type: 'boolean' },
      description: 'Whether to show color tooltips',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
    maxColors: 5,
  },
};

export const FewColors: Story = {
  args: {
    colors: ['#FF6B35', '#4ECDC4'],
    maxColors: 10,
  },
};

export const ManyColors: Story = {
  args: {
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF8800', '#8800FF'],
    maxColors: 8,
  },
};

export const Empty: Story = {
  args: {
    colors: [],
    maxColors: 5,
  },
};
