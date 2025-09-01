import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ColorsSection } from './ColorsSection';

const meta: Meta<typeof ColorsSection> = {
  title: '01-Sections/ColorsSection',
  component: ColorsSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive color theme configuration section with PowerPoint-style color labels and pickers.',
      },
    },
  },
  argTypes: {
    colors: {
      control: { type: 'object' },
      description: 'Object containing color values for each theme label',
    },
    onColorChange: {
      action: 'colorChanged',
      description: 'Callback when any color value changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for the section',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the section is disabled',
    },
    showLabels: {
      control: { type: 'boolean' },
      description: 'Whether to show color labels',
    },
    compact: {
      control: { type: 'boolean' },
      description: 'Whether to use compact layout',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default PowerPoint theme colors
const defaultColors = {
  'Dark 1': '#000000',
  'Light 1': '#FFFFFF',
  'Dark 2': '#44546A',
  'Light 2': '#E7E6E6',
  'Accent 1': '#5B9BD5',
  'Accent 2': '#ED7D31',
  'Accent 3': '#A5A5A5',
  'Accent 4': '#FFC000',
  'Accent 5': '#4472C4',
  'Accent 6': '#70AD47',
  'Hyperlink': '#0563C1',
  'Followed Hyperlink': '#954F72',
};

// Basic usage
export const Default: Story = {
  args: {
    colors: defaultColors,
    onColorChange: (label: string, color: string) => console.log(`${label} changed to:`, color),
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

// Compact layout
export const Compact: Story = {
  args: {
    ...Default.args,
    compact: true,
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    colors: {
      'Primary': '#0078D4',
      'Secondary': '#605E5C',
      'Success': '#107C10',
      'Warning': '#FFB900',
      'Error': '#D13438',
      'Info': '#0078D4',
    },
    onColorChange: (label: string, color: string) => console.log(`${label} changed to:`, color),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Without labels
export const NoLabels: Story = {
  args: {
    ...Default.args,
    showLabels: false,
  },
};
