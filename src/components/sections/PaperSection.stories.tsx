import type { Meta, StoryObj } from '@storybook/react';
import { PaperSection } from './PaperSection';

const meta: Meta<typeof PaperSection> = {
  title: '01-Sections/PaperSection',
  component: PaperSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive paper configuration section for managing paper size, margins, and layout settings.',
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
    margins: {
      control: { type: 'object' },
      description: 'Margin settings object',
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
    onMarginsChange: {
      action: 'marginsChanged',
      description: 'Callback when margins change',
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
    showMargins: {
      control: { type: 'boolean' },
      description: 'Whether to show margin controls',
    },
    showCustomSize: {
      control: { type: 'boolean' },
      description: 'Whether to show custom size inputs',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default A4 settings
const defaultSettings = {
  paperSize: 'A4',
  width: 21.0,
  height: 29.7,
  unit: 'cm',
  margins: {
    top: 2.5,
    right: 2.5,
    bottom: 2.5,
    left: 2.5,
  },
};

// Basic usage
export const Default: Story = {
  args: {
    ...defaultSettings,
    onPaperSizeChange: (size: string) => console.log('Paper size changed:', size),
    onDimensionsChange: (width: number, height: number) => console.log('Dimensions changed:', width, height),
    onUnitChange: (unit: string) => console.log('Unit changed:', unit),
    onMarginsChange: (margins: any) => console.log('Margins changed:', margins),
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

// Small size variant
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

// Large size variant
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

// Without margins
export const NoMargins: Story = {
  args: {
    ...Default.args,
    showMargins: false,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
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
