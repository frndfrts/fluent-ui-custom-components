import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { ColorModelSelector } from './ColorModelSelector';
import type { ColorModel } from '../compositions/ColorInput';

const meta: Meta<typeof ColorModelSelector> = {
  title: '04-Components/ColorModelSelector',
  component: ColorModelSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for selecting between different color models (RGB, HSL, HEX, etc.) with visual feedback.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the color model selector',
    },
    colorModel: {
      control: { type: 'select' },
      options: ['rgb', 'hsl'],
      description: 'Currently selected color model',
    },
    onChange: {
      action: 'modelChanged',
      description: 'Callback when color model changes',
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

// Basic usage with interactive state
export const Default: Story = {
  render: (args) => {
    const [colorModel, setColorModel] = React.useState<ColorModel>(args.colorModel || 'rgb');
    
    const handleChange = (newModel: ColorModel) => {
      setColorModel(newModel);
      args.onChange?.(newModel);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <ColorModelSelector
          colorModel={colorModel}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
          label={args.label}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {colorModel}
        </div>
      </div>
    );
  },
  args: {
    colorModel: 'rgb' as ColorModel,
    onChange: (model: ColorModel) => console.log('Color model changed:', model),
  },
};

// Small size
export const Small: Story = {
  render: (args) => {
    const [colorModel, setColorModel] = React.useState<ColorModel>(args.colorModel || 'rgb');
    
    const handleChange = (newModel: ColorModel) => {
      setColorModel(newModel);
      args.onChange?.(newModel);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <ColorModelSelector
          colorModel={colorModel}
          onChange={handleChange}
          onError={args.onError}
          size="small"
          disabled={args.disabled}
          label={args.label}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {colorModel}
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
    const [colorModel, setColorModel] = React.useState<ColorModel>(args.colorModel || 'rgb');
    
    const handleChange = (newModel: ColorModel) => {
      setColorModel(newModel);
      args.onChange?.(newModel);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <ColorModelSelector
          colorModel={colorModel}
          onChange={handleChange}
          onError={args.onError}
          size="large"
          disabled={args.disabled}
          label={args.label}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {colorModel}
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

// HSL model
export const HSLModel: Story = {
  render: (args) => {
    const [colorModel, setColorModel] = React.useState<ColorModel>('hsl');
    
    const handleChange = (newModel: ColorModel) => {
      setColorModel(newModel);
      args.onChange?.(newModel);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <ColorModelSelector
          colorModel={colorModel}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
          label={args.label}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {colorModel}
        </div>
      </div>
    );
  },
  args: {
    onChange: (model: ColorModel) => console.log('Color model changed:', model),
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
  render: (args) => {
    const [colorModel, setColorModel] = React.useState<ColorModel>(args.colorModel || 'rgb');
    
    const handleChange = (newModel: ColorModel) => {
      setColorModel(newModel);
      args.onChange?.(newModel);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <ColorModelSelector
          colorModel={colorModel}
          onChange={handleChange}
          onError={args.onError}
          size={args.size}
          disabled={args.disabled}
          label="Color Model"
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {colorModel}
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

