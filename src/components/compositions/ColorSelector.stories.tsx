import type { Meta, StoryObj } from '@storybook/react';
import { ColorSelector } from './ColorSelector';

const meta: Meta<typeof ColorSelector> = {
  title: '03-Compositions/ColorSelector',
  component: ColorSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A color selection component that displays a grid of color swatches for easy color picking.',
      },
    },
  },
  argTypes: {
    colors: {
      control: { type: 'object' },
      description: 'Array of available colors',
    },
    selectedColor: {
      control: { type: 'color' },
      description: 'Currently selected color',
    },
    onColorSelect: {
      action: 'colorSelected',
      description: 'Callback when a color is selected',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the selector',
    },
    columns: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of columns in the color grid',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the selector is disabled',
    },
    showLabels: {
      control: { type: 'boolean' },
      description: 'Whether to show color labels',
    },
    showHexValues: {
      control: { type: 'boolean' },
      description: 'Whether to show hex color values',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the selector',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default color palette
const defaultColors = [
  '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00',
  '#00FF80', '#00FFFF', '#0080FF', '#0000FF', '#8000FF',
  '#FF00FF', '#FF0080', '#FFFFFF', '#E0E0E0', '#C0C0C0',
  '#808080', '#404040', '#000000', '#800000', '#804000',
];

// Basic usage
export const Default: Story = {
  args: {
    colors: defaultColors,
    selectedColor: '#FF0000',
    onColorSelect: (color: string) => console.log('Color selected:', color),
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

// Custom columns
export const CustomColumns: Story = {
  args: {
    ...Default.args,
    columns: 5,
  },
};

// With labels
export const WithLabels: Story = {
  args: {
    ...Default.args,
    showLabels: true,
  },
};

// With hex values
export const WithHexValues: Story = {
  args: {
    ...Default.args,
    showHexValues: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: [
      '#0078D4', '#107C10', '#FFB900', '#D13438', '#5C2D91',
      '#00B294', '#FF8C00', '#E81123', '#881798', '#FFD700',
    ],
    selectedColor: '#0078D4',
  },
};

// Minimal palette
export const MinimalPalette: Story = {
  args: {
    ...Default.args,
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
    columns: 3,
  },
};

// Extended palette
export const ExtendedPalette: Story = {
  args: {
    ...Default.args,
    colors: [
      ...defaultColors,
      '#FFE4E1', '#F0F8FF', '#F5F5DC', '#FFEFD5', '#DDA0DD',
      '#98FB98', '#F0E68C', '#FFB6C1', '#87CEEB', '#D8BFD8',
    ],
    columns: 6,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Theme Colors',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    columns: 7,
    showLabels: true,
    showHexValues: true,
    label: 'Professional Color Palette',
    colors: [
      '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
      '#FFFF00', '#FF00FF', '#00FFFF', '#800000', '#008000',
      '#000080', '#808000', '#800080', '#008080', '#C0C0C0',
      '#808080', '#400000', '#004000', '#000040', '#404000',
      '#400040', '#004040', '#FF8080', '#80FF80', '#8080FF',
      '#FFFF80', '#FF80FF', '#80FFFF', '#FF4000', '#40FF00',
      '#0040FF', '#FFFF40', '#FF40FF', '#40FFFF', '#FF0040',
      '#40FF40', '#4000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    ],
  },
};
