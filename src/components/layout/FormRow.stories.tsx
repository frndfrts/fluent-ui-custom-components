import type { Meta, StoryObj } from '@storybook/react';
import { FormRow } from './FormRow';

const meta: Meta<typeof FormRow> = {
  title: '07-Layout/FormRow',
  component: FormRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A layout component for organizing form elements in consistent rows with proper spacing and alignment.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the form row',
    },
    control: {
      control: { type: 'text' },
      description: 'Single control spanning numeric + gap + unit',
    },
    leftControl: {
      control: { type: 'text' },
      description: 'Left control in two-up layout',
    },
    rightControl: {
      control: { type: 'text' },
      description: 'Right control in two-up layout',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with single control
export const Default: Story = {
  args: {
    label: 'Width',
    control: (
      <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', gap: '8px' }}>
        <span>100</span>
        <span>px</span>
      </div>
    ),
  },
};

// Two-up layout
export const TwoUpLayout: Story = {
  args: {
    label: 'Position',
    leftControl: (
      <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>X: 50</div>
    ),
    rightControl: (
      <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>Y: 100</div>
    ),
  },
};

// With long label
export const WithLongLabel: Story = {
  args: {
    label: 'Followed Hyperlink Color',
    control: (
      <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', gap: '8px' }}>
        <span>#0000FF</span>
      </div>
    ),
  },
};

// Complex control
export const ComplexControl: Story = {
  args: {
    label: 'Dimensions',
    control: (
      <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span>Width: 200</span>
        <span>×</span>
        <span>Height: 150</span>
        <span>px</span>
      </div>
    ),
  },
};
