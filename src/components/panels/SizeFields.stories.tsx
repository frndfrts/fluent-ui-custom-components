import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { SizeFields } from './SizeFields';

const meta: Meta<typeof SizeFields> = {
  title: '02-Panels/SizeFields',
  component: SizeFields,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing width, height, and aspect ratio locking with numeric inputs and unit selection.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number' },
      description: 'Current width value',
    },
    height: {
      control: { type: 'number' },
      description: 'Current height value',
    },
    widthUnit: {
      control: { type: 'select' },
      options: ['px', 'cm', 'mm', 'in', 'pt'],
      description: 'Unit of measurement for width',
    },
    heightUnit: {
      control: { type: 'select' },
      options: ['px', 'cm', 'mm', 'in', 'pt'],
      description: 'Unit of measurement for height',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for selection',
    },
    lockAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether aspect ratio is locked',
    },
    showLockAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether to show aspect ratio lock control',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when dimensions change',
    },
    onLockAspectRatioChange: {
      action: 'aspectRatioLockChanged',
      description: 'Callback when aspect ratio lock changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the panel is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  render: (args) => {
    const [width, setWidth] = React.useState(args.width || 800);
    const [height, setHeight] = React.useState(args.height || 600);
    const [widthUnit, setWidthUnit] = React.useState(args.widthUnit || 'px');
    const [heightUnit, setHeightUnit] = React.useState(args.heightUnit || 'px');
    const [lockAspectRatio, setLockAspectRatio] = React.useState(args.lockAspectRatio || false);

    const handleChange = (fields: { width: number; height: number; widthUnit: string; heightUnit: string }) => {
      setWidth(fields.width);
      setHeight(fields.height);
      setWidthUnit(fields.widthUnit);
      setHeightUnit(fields.heightUnit);
      args.onChange?.(fields);
    };

    const handleLockAspectRatioChange = (locked: boolean) => {
      setLockAspectRatio(locked);
      args.onLockAspectRatioChange?.(locked);
    };

    return (
      <div style={{ padding: '20px' }}>
        <SizeFields
          width={width}
          height={height}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          units={args.units}
          lockAspectRatio={lockAspectRatio}
          showLockAspectRatio={args.showLockAspectRatio}
          onChange={handleChange}
          onLockAspectRatioChange={handleLockAspectRatioChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Values:</strong></div>
          <div>Width: {width} {widthUnit}</div>
          <div>Height: {height} {heightUnit}</div>
          <div>Aspect Ratio: {(width / height).toFixed(2)}</div>
          <div>Locked: {lockAspectRatio ? 'Yes' : 'No'}</div>
        </div>
      </div>
    );
  },
  args: {
    width: 800,
    height: 600,
    widthUnit: 'px',
    heightUnit: 'px',
    units: ['px', 'cm', 'mm', 'in', 'pt'],
    lockAspectRatio: false,
    showLockAspectRatio: true,
    onChange: (fields: any) => console.log('Dimensions changed:', fields),
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
  },
};

// Centimeters
export const Centimeters: Story = {
  render: (args) => {
    const [width, setWidth] = React.useState(args.width || 21.0);
    const [height, setHeight] = React.useState(args.height || 29.7);
    const [widthUnit, setWidthUnit] = React.useState(args.widthUnit || 'cm');
    const [heightUnit, setHeightUnit] = React.useState(args.heightUnit || 'cm');
    const [lockAspectRatio, setLockAspectRatio] = React.useState(args.lockAspectRatio || false);

    const handleChange = (fields: { width: number; height: number; widthUnit: string; heightUnit: string }) => {
      setWidth(fields.width);
      setHeight(fields.height);
      setWidthUnit(fields.widthUnit);
      setHeightUnit(fields.heightUnit);
      args.onChange?.(fields);
    };

    const handleLockAspectRatioChange = (locked: boolean) => {
      setLockAspectRatio(locked);
      args.onLockAspectRatioChange?.(locked);
    };

    return (
      <div style={{ padding: '20px' }}>
        <SizeFields
          width={width}
          height={height}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          units={args.units}
          lockAspectRatio={lockAspectRatio}
          showLockAspectRatio={args.showLockAspectRatio}
          onChange={handleChange}
          onLockAspectRatioChange={handleLockAspectRatioChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Values:</strong></div>
          <div>Width: {width} {widthUnit}</div>
          <div>Height: {height} {heightUnit}</div>
          <div>Aspect Ratio: {(width / height).toFixed(2)}</div>
          <div>Locked: {lockAspectRatio ? 'Yes' : 'No'}</div>
        </div>
      </div>
    );
  },
  args: {
    width: 21.0,
    height: 29.7,
    widthUnit: 'cm',
    heightUnit: 'cm',
    units: ['px', 'cm', 'mm', 'in', 'pt'],
    lockAspectRatio: false,
    showLockAspectRatio: true,
    onChange: (fields: any) => console.log('Dimensions changed:', fields),
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
  },
};

// Inches
export const Inches: Story = {
  render: (args) => {
    const [width, setWidth] = React.useState(args.width || 8.5);
    const [height, setHeight] = React.useState(args.height || 11.0);
    const [widthUnit, setWidthUnit] = React.useState(args.widthUnit || 'in');
    const [heightUnit, setHeightUnit] = React.useState(args.heightUnit || 'in');
    const [lockAspectRatio, setLockAspectRatio] = React.useState(args.lockAspectRatio || false);

    const handleChange = (fields: { width: number; height: number; widthUnit: string; heightUnit: string }) => {
      setWidth(fields.width);
      setHeight(fields.height);
      setWidthUnit(fields.widthUnit);
      setHeightUnit(fields.heightUnit);
      args.onChange?.(fields);
    };

    const handleLockAspectRatioChange = (locked: boolean) => {
      setLockAspectRatio(locked);
      args.onLockAspectRatioChange?.(locked);
    };

    return (
      <div style={{ padding: '20px' }}>
        <SizeFields
          width={width}
          height={height}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          units={args.units}
          lockAspectRatio={lockAspectRatio}
          showLockAspectRatio={args.showLockAspectRatio}
          onChange={handleChange}
          onLockAspectRatioChange={handleLockAspectRatioChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Values:</strong></div>
          <div>Width: {width} {widthUnit}</div>
          <div>Height: {height} {heightUnit}</div>
          <div>Aspect Ratio: {(width / height).toFixed(2)}</div>
          <div>Locked: {lockAspectRatio ? 'Yes' : 'No'}</div>
        </div>
      </div>
    );
  },
  args: {
    width: 8.5,
    height: 11.0,
    widthUnit: 'in',
    heightUnit: 'in',
    units: ['px', 'cm', 'mm', 'in', 'pt'],
    lockAspectRatio: false,
    showLockAspectRatio: true,
    onChange: (fields: any) => console.log('Dimensions changed:', fields),
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
  },
};

// Locked aspect ratio
export const LockedAspectRatio: Story = {
  render: (args) => {
    const [width, setWidth] = React.useState(args.width || 800);
    const [height, setHeight] = React.useState(args.height || 600);
    const [widthUnit, setWidthUnit] = React.useState(args.widthUnit || 'px');
    const [heightUnit, setHeightUnit] = React.useState(args.heightUnit || 'px');
    const [lockAspectRatio, setLockAspectRatio] = React.useState(args.lockAspectRatio || true);

    const handleChange = (fields: { width: number; height: number; widthUnit: string; heightUnit: string }) => {
      setWidth(fields.width);
      setHeight(fields.height);
      setWidthUnit(fields.widthUnit);
      setHeightUnit(fields.heightUnit);
      args.onChange?.(fields);
    };

    const handleLockAspectRatioChange = (locked: boolean) => {
      setLockAspectRatio(locked);
      args.onLockAspectRatioChange?.(locked);
    };

    return (
      <div style={{ padding: '20px' }}>
        <SizeFields
          width={width}
          height={height}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          units={args.units}
          lockAspectRatio={lockAspectRatio}
          showLockAspectRatio={args.showLockAspectRatio}
          onChange={handleChange}
          onLockAspectRatioChange={handleLockAspectRatioChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Values:</strong></div>
          <div>Width: {width} {widthUnit}</div>
          <div>Height: {height} {heightUnit}</div>
          <div>Aspect Ratio: {(width / height).toFixed(2)}</div>
          <div>Locked: {lockAspectRatio ? 'Yes' : 'No'}</div>
        </div>
      </div>
    );
  },
  args: {
    width: 800,
    height: 600,
    widthUnit: 'px',
    heightUnit: 'px',
    units: ['px', 'cm', 'mm', 'in', 'pt'],
    lockAspectRatio: true,
    showLockAspectRatio: true,
    onChange: (fields: any) => console.log('Dimensions changed:', fields),
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    width: 800,
    height: 600,
    widthUnit: 'px',
    heightUnit: 'px',
    units: ['px', 'cm', 'mm', 'in', 'pt'],
    lockAspectRatio: false,
    showLockAspectRatio: true,
    disabled: true,
    onChange: (fields: any) => console.log('Dimensions changed:', fields),
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
  },
};
