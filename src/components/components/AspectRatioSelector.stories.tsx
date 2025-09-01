import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { AspectRatioSelector } from './AspectRatioSelector';

const meta: Meta<typeof AspectRatioSelector> = {
  title: '04-Components/AspectRatioSelector',
  component: AspectRatioSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for selecting and managing aspect ratios with preset options and custom values.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['1:1', '4:3', '16:9', '3:2', '5:4', 'Custom'],
      description: 'Current aspect ratio',
    },
    options: {
      control: { type: 'object' },
      description: 'Available aspect ratio options',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when aspect ratio changes',
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
    const [value, setValue] = React.useState(args.value || '16:9');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <AspectRatioSelector
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
    value: '16:9',
    onChange: (ratio: string) => console.log('Aspect ratio changed:', ratio),
  },
};

// Small size
export const Small: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '16:9');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <AspectRatioSelector
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
    const [value, setValue] = React.useState(args.value || '16:9');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <AspectRatioSelector
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

// 4:3 ratio
export const FourByThree: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('4:3');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <AspectRatioSelector
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
    onChange: (ratio: string) => console.log('Aspect ratio changed:', ratio),
  },
};

// Square ratio
export const Square: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('1:1');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <AspectRatioSelector
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
    onChange: (ratio: string) => console.log('Aspect ratio changed:', ratio),
  },
};

// Portrait ratio
export const Portrait: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('3:4');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <AspectRatioSelector
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
    onChange: (ratio: string) => console.log('Aspect ratio changed:', ratio),
  },
};

// With custom ratio
export const CustomRatio: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('Custom');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <AspectRatioSelector
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
    onChange: (ratio: string) => console.log('Aspect ratio changed:', ratio),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Custom presets
export const CustomPresets: Story = {
  args: {
    ...Default.args,
    presets: ['2:1', '3:1', '5:4', '7:5', 'golden'],
    aspectRatio: '2:1',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    showCustom: true,
    label: 'Document Aspect Ratio',
    presets: ['16:9', '4:3', '3:2', '1:1', 'A4', 'Letter', 'Legal'],
    aspectRatio: 'A4',
  },
};
