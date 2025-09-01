import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { PositionSelector } from './PositionSelector';

const meta: Meta<typeof PositionSelector> = {
  title: '04-Components/PositionSelector',
  component: PositionSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for selecting position values with predefined options.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right', 'Custom'],
      description: 'Current selected position (defaults to top-left at lowest level)',
    },
    options: {
      control: { type: 'object' },
      description: 'Available position options',
    },
    onChange: {
      action: 'position changed',
      description: 'Callback when position selection changes',
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

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'top-left');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PositionSelector
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
    value: 'top-left',
    onChange: (position: string) => console.log('Position changed:', position),
  },
};

export const Top: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('top');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PositionSelector
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
    onChange: (position: string) => console.log('Position changed:', position),
  },
};

export const Bottom: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('bottom');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PositionSelector
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
    onChange: (position: string) => console.log('Position changed:', position),
  },
};

export const Left: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('left');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PositionSelector
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
    onChange: (position: string) => console.log('Position changed:', position),
  },
};

export const Right: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('right');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <PositionSelector
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
    onChange: (position: string) => console.log('Position changed:', position),
  },
};

