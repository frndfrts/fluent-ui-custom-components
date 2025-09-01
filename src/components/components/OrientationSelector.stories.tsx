import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { OrientationSelector } from './OrientationSelector';

const meta: Meta<typeof OrientationSelector> = {
  title: '04-Components/OrientationSelector',
  component: OrientationSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for selecting orientation values with predefined options.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the orientation selector',
    },
    orientation: {
      control: { type: 'select' },
      options: ['portrait', 'landscape'],
      description: 'Current selected orientation',
    },
    onChange: {
      action: 'orientation changed',
      description: 'Callback when orientation selection changes',
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
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [orientation, setOrientation] = React.useState(args.orientation || 'portrait');
    
    const handleChange = (newOrientation: string) => {
      setOrientation(newOrientation);
      args.onChange?.(newOrientation);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <OrientationSelector
          orientation={orientation}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
          label={args.label}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {orientation}
        </div>
      </div>
    );
  },
  args: {
    orientation: 'portrait',
    onChange: (orientation: string) => console.log('Orientation changed:', orientation),
  },
};

export const Portrait: Story = {
  render: (args) => {
    const [orientation, setOrientation] = React.useState('portrait');
    
    const handleChange = (newOrientation: string) => {
      setOrientation(newOrientation);
      args.onChange?.(newOrientation);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <OrientationSelector
          orientation={orientation}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
          label={args.label}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {orientation}
        </div>
      </div>
    );
  },
  args: {
    onChange: (orientation: string) => console.log('Orientation changed:', orientation),
  },
};

export const Landscape: Story = {
  render: (args) => {
    const [orientation, setOrientation] = React.useState('landscape');
    
    const handleChange = (newOrientation: string) => {
      setOrientation(newOrientation);
      args.onChange?.(newOrientation);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <OrientationSelector
          orientation={orientation}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
          label={args.label}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {orientation}
        </div>
      </div>
    );
  },
  args: {
    onChange: (orientation: string) => console.log('Orientation changed:', orientation),
  },
};

