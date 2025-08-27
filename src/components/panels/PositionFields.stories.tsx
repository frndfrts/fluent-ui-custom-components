import type { Meta, StoryObj } from '@storybook/react';
import { PositionFields } from './PositionFields';

const meta: Meta<typeof PositionFields> = {
  title: '02-Panels/PositionFields',
  component: PositionFields,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing position fields with X and Y coordinates.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['Custom', 'Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'],
      description: 'Current position selection',
    },
    positions: {
      control: { type: 'object' },
      description: 'Available position options',
    },
    x: {
      control: { type: 'number' },
      description: 'X coordinate value',
    },
    y: {
      control: { type: 'number' },
      description: 'Y coordinate value',
    },
    xUnit: {
      control: { type: 'text' },
      description: 'Unit for X coordinate',
    },
    yUnit: {
      control: { type: 'text' },
      description: 'Unit for Y coordinate',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for coordinates',
    },
    onChange: {
      action: 'positionChanged',
      description: 'Callback when position or coordinates change',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the fields are disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'Custom',
    positions: ['Custom', 'Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'],
    x: 100,
    y: 200,
    xUnit: 'px',
    yUnit: 'px',
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (fields: any) => console.log('Position changed:', fields),
  },
};

export const ZeroPosition: Story = {
  args: {
    ...Default.args,
    x: 0,
    y: 0,
  },
};

export const LargeValues: Story = {
  args: {
    ...Default.args,
    x: 1000,
    y: 800,
  },
};

export const NegativeValues: Story = {
  args: {
    ...Default.args,
    x: -50,
    y: -100,
  },
};
