import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { PaperSelector } from './PaperSelector';

const meta: Meta<typeof PaperSelector> = {
  title: '04-Components/PaperSelector',
  component: PaperSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for selecting standard paper sizes with dimensions and orientation options.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['A4', 'Letter', 'Legal', 'A3', 'A5', 'Custom'],
      description: 'Currently selected paper size',
    },
    onChange: {
      action: 'sizeChanged',
      description: 'Callback when paper size changes',
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
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the selector is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with interactive state
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'A4');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PaperSelector
          value={value}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    value: 'A4',
    onChange: (size: string) => console.log('Paper size changed:', size),
  },
};

// Small size
export const Small: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'A4');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PaperSelector
          value={value}
          onChange={handleChange}
          onError={args.onError}
          size="small"
          disabled={args.disabled}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

// Large size
export const Large: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'A4');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PaperSelector
          value={value}
          onChange={handleChange}
          onError={args.onError}
          size="large"
          disabled={args.disabled}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

// Letter size
export const Letter: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('Letter');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PaperSelector
          value={value}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    onChange: (size: string) => console.log('Paper size changed:', size),
  },
};

// Legal size
export const Legal: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('Legal');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PaperSelector
          value={value}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    onChange: (size: string) => console.log('Paper size changed:', size),
  },
};

// A3 size
export const A3: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('A3');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PaperSelector
          value={value}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    onChange: (size: string) => console.log('Paper size changed:', size),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
