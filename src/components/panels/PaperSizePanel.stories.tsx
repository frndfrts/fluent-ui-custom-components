import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PaperSizePanel } from './PaperSizePanel';

const meta: Meta<typeof PaperSizePanel> = {
  title: '02-Panels/PaperSizePanel',
  component: PaperSizePanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing paper size, dimensions, and orientation settings.',
      },
    },
  },
  argTypes: {
    paperSize: {
      control: { type: 'select' },
      options: ['A4', 'Letter', 'Legal', 'A3', 'A5', 'Custom'],
      description: 'Selected paper size',
    },
    width: {
      control: { type: 'number' },
      description: 'Paper width in current units',
    },
    height: {
      control: { type: 'number' },
      description: 'Paper height in current units',
    },
    unit: {
      control: { type: 'select' },
      options: ['cm', 'mm', 'in', 'pt', 'px'],
      description: 'Unit of measurement',
    },
    orientation: {
      control: { type: 'select' },
      options: ['portrait', 'landscape'],
      description: 'Paper orientation',
    },
    onPaperSizeChange: {
      action: 'paperSizeChanged',
      description: 'Callback when paper size changes',
    },
    onDimensionsChange: {
      action: 'dimensionsChanged',
      description: 'Callback when dimensions change',
    },
    onUnitChange: {
      action: 'unitChanged',
      description: 'Callback when unit changes',
    },
    onOrientationChange: {
      action: 'orientationChanged',
      description: 'Callback when orientation changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for the panel',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the panel is disabled',
    },
    showCustomSize: {
      control: { type: 'boolean' },
      description: 'Whether to show custom size inputs',
    },
    showOrientation: {
      control: { type: 'boolean' },
      description: 'Whether to show orientation controls',
    },
    label: {
      control: { type: 'text' },
      description: 'Panel label',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    paperSize: 'A4',
    width: 21.0,
    height: 29.7,
    unit: 'cm',
    orientation: 'portrait',
    onPaperSizeChange: (size: string) => console.log('Paper size changed:', size),
    onDimensionsChange: (width: number, height: number) => console.log('Dimensions changed:', width, height),
    onUnitChange: (unit: string) => console.log('Unit changed:', unit),
    onOrientationChange: (orientation: string) => console.log('Orientation changed:', orientation),
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

// Letter size
export const Letter: Story = {
  args: {
    ...Default.args,
    paperSize: 'Letter',
    width: 8.5,
    height: 11.0,
    unit: 'in',
  },
};

// Legal size
export const Legal: Story = {
  args: {
    ...Default.args,
    paperSize: 'Legal',
    width: 8.5,
    height: 14.0,
    unit: 'in',
  },
};

// A3 size
export const A3: Story = {
  args: {
    ...Default.args,
    paperSize: 'A3',
    width: 29.7,
    height: 42.0,
    unit: 'cm',
  },
};

// Landscape orientation
export const Landscape: Story = {
  args: {
    ...Default.args,
    orientation: 'landscape',
  },
};

// Custom size
export const CustomSize: Story = {
  args: {
    ...Default.args,
    paperSize: 'Custom',
    width: 15.0,
    height: 20.0,
    unit: 'cm',
    showCustomSize: true,
  },
};

// Millimeters
export const Millimeters: Story = {
  args: {
    ...Default.args,
    unit: 'mm',
    width: 210,
    height: 297,
  },
};

// Inches
export const Inches: Story = {
  args: {
    ...Default.args,
    unit: 'in',
    width: 8.27,
    height: 11.69,
  },
};

// With custom size inputs
export const WithCustomSize: Story = {
  args: {
    ...Default.args,
    showCustomSize: true,
  },
};

// With orientation controls
export const WithOrientation: Story = {
  args: {
    ...Default.args,
    showOrientation: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Page Setup',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    showCustomSize: true,
    showOrientation: true,
    label: 'Advanced Paper Configuration',
    paperSize: 'Custom',
    width: 200,
    height: 300,
    unit: 'mm',
    orientation: 'landscape',
  },
};
