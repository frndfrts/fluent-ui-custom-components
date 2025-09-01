import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { SizeAndPositionPanel } from './SizeAndPositionPanel';

const meta: Meta<typeof SizeAndPositionPanel> = {
  title: '02-Panels/SizeAndPositionPanel',
  component: SizeAndPositionPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing both size and position fields in a unified interface.',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number' },
      description: 'Width value',
    },
    height: {
      control: { type: 'number' },
      description: 'Height value',
    },
    widthUnit: {
      control: { type: 'text' },
      description: 'Unit for width',
    },
    heightUnit: {
      control: { type: 'text' },
      description: 'Unit for height',
    },
    position: {
      control: { type: 'select' },
      options: ['Custom', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Current position selection',
    },
    positions: {
      control: { type: 'object' },
      description: 'Available position options (defaults to full 3x3 + Custom at the lowest level)',
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
      description: 'Available units for dimensions and coordinates',
    },
    showLockAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether to show aspect ratio lock control',
    },
    lockAspectRatio: {
      control: { type: 'boolean' },
      description: 'Whether aspect ratio is locked',
    },
    onLockAspectRatioChange: {
      action: 'aspectRatioLockChanged',
      description: 'Callback when aspect ratio lock changes',
    },
    onSizeChange: {
      action: 'sizeChanged',
      description: 'Callback when size changes',
    },
    onPositionChange: {
      action: 'positionChanged',
      description: 'Callback when position changes',
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

export const Default: Story = {
  render: (args) => {
    const [width, setWidth] = React.useState(args.width || 10);
    const [height, setHeight] = React.useState(args.height || 7.5);
    const [widthUnit, setWidthUnit] = React.useState(args.widthUnit || 'cm');
    const [heightUnit, setHeightUnit] = React.useState(args.heightUnit || 'cm');
    const [position, setPosition] = React.useState(args.position || 'top-left');
    const [x, setX] = React.useState(args.x || 0);
    const [y, setY] = React.useState(args.y || 0);
    const [xUnit, setXUnit] = React.useState(args.xUnit || 'cm');
    const [yUnit, setYUnit] = React.useState(args.yUnit || 'cm');
    const [lockAspectRatio, setLockAspectRatio] = React.useState(args.lockAspectRatio || false);

    const handleSizeChange = (fields: any) => {
      setWidth(fields.width);
      setHeight(fields.height);
      setWidthUnit(fields.widthUnit);
      setHeightUnit(fields.heightUnit);
      args.onSizeChange?.(fields);
    };

    const handlePositionChange = (fields: any) => {
      setPosition(fields.position);
      setX(fields.x);
      setY(fields.y);
      setXUnit(fields.xUnit);
      setYUnit(fields.yUnit);
      args.onPositionChange?.(fields);
    };

    const handleLockAspectRatioChange = (locked: boolean) => {
      setLockAspectRatio(locked);
      args.onLockAspectRatioChange?.(locked);
    };

    return (
      <div style={{ padding: '20px' }}>
        <SizeAndPositionPanel
          width={width}
          height={height}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          position={position}
          positions={args.positions}
          x={x}
          y={y}
          xUnit={xUnit}
          yUnit={yUnit}
          units={args.units}
          showLockAspectRatio={args.showLockAspectRatio}
          lockAspectRatio={lockAspectRatio}
          onLockAspectRatioChange={handleLockAspectRatioChange}
          onSizeChange={handleSizeChange}
          onPositionChange={handlePositionChange}
          onError={args.onError}
          disabled={args.disabled}
          activeX={args.activeX}
          activeY={args.activeY}
          activeWidth={args.activeWidth}
          activeHeight={args.activeHeight}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Values:</strong></div>
          <div>Size: {width} {widthUnit} × {height} {heightUnit}</div>
          <div>Position: {position}</div>
          <div>Coordinates: ({x} {xUnit}, {y} {yUnit})</div>
          <div>Aspect Ratio: {(width / height).toFixed(2)}</div>
          <div>Locked: {lockAspectRatio ? 'Yes' : 'No'}</div>
        </div>
      </div>
    );
  },
  args: {
    width: 10,
    height: 7.5,
    widthUnit: 'cm',
    heightUnit: 'cm',
    position: 'top-left',
    positions: ['Custom', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    x: 0,
    y: 0,
    xUnit: 'cm',
    yUnit: 'cm',
    units: ['cm', 'mm', 'in', 'pt', 'px'],
    showLockAspectRatio: true,
    lockAspectRatio: false,
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
    onSizeChange: (fields: any) => console.log('Size changed:', fields),
    onPositionChange: (fields: any) => console.log('Position changed:', fields),
    // Active area example (e.g., 21x29.7 cm paper with 2cm margins)
    activeX: 2,
    activeY: 2,
    activeWidth: 21 - 2 - 2,
    activeHeight: 29.7 - 2 - 2,
  },
};

export const PresetsRecomputeOnSizeChange: Story = {
  render: (args) => {
    const [width, setWidth] = React.useState(args.width || 8);
    const [height, setHeight] = React.useState(args.height || 4);
    const [widthUnit, setWidthUnit] = React.useState(args.widthUnit || 'cm');
    const [heightUnit, setHeightUnit] = React.useState(args.heightUnit || 'cm');
    const [position, setPosition] = React.useState(args.position || 'middle-center');
    const [x, setX] = React.useState(args.x || 0);
    const [y, setY] = React.useState(args.y || 0);
    const [xUnit, setXUnit] = React.useState(args.xUnit || 'cm');
    const [yUnit, setYUnit] = React.useState(args.yUnit || 'cm');
    const [lockAspectRatio, setLockAspectRatio] = React.useState(args.lockAspectRatio || false);

    const handleSizeChange = (fields: any) => {
      setWidth(fields.width);
      setHeight(fields.height);
      setWidthUnit(fields.widthUnit);
      setHeightUnit(fields.heightUnit);
      args.onSizeChange?.(fields);
    };

    const handlePositionChange = (fields: any) => {
      setPosition(fields.position);
      setX(fields.x);
      setY(fields.y);
      setXUnit(fields.xUnit);
      setYUnit(fields.yUnit);
      args.onPositionChange?.(fields);
    };

    const handleLockAspectRatioChange = (locked: boolean) => {
      setLockAspectRatio(locked);
      args.onLockAspectRatioChange?.(locked);
    };

    return (
      <div style={{ padding: '20px' }}>
        <SizeAndPositionPanel
          width={width}
          height={height}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          position={position}
          positions={args.positions}
          x={x}
          y={y}
          xUnit={xUnit}
          yUnit={yUnit}
          units={args.units}
          showLockAspectRatio={args.showLockAspectRatio}
          lockAspectRatio={lockAspectRatio}
          onLockAspectRatioChange={handleLockAspectRatioChange}
          onSizeChange={handleSizeChange}
          onPositionChange={handlePositionChange}
          onError={args.onError}
          disabled={args.disabled}
          activeX={args.activeX}
          activeY={args.activeY}
          activeWidth={args.activeWidth}
          activeHeight={args.activeHeight}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Values:</strong></div>
          <div>Size: {width} {widthUnit} × {height} {heightUnit}</div>
          <div>Position: {position}</div>
          <div>Coordinates: ({x} {xUnit}, {y} {yUnit})</div>
          <div>Aspect Ratio: {(width / height).toFixed(2)}</div>
          <div>Locked: {lockAspectRatio ? 'Yes' : 'No'}</div>
        </div>
      </div>
    );
  },
  args: {
    width: 8,
    height: 4,
    widthUnit: 'cm',
    heightUnit: 'cm',
    position: 'middle-center',
    positions: ['Custom', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    x: 0,
    y: 0,
    xUnit: 'cm',
    yUnit: 'cm',
    units: ['cm', 'mm', 'in', 'pt', 'px'],
    showLockAspectRatio: true,
    lockAspectRatio: false,
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
    onSizeChange: (fields: any) => console.log('Size changed:', fields),
    onPositionChange: (fields: any) => console.log('Position changed:', fields),
    activeX: 1,
    activeY: 1,
    activeWidth: 20,
    activeHeight: 27,
  },
};

export const CustomAllowsManualCoordinates: Story = {
  render: (args) => {
    const [width, setWidth] = React.useState(args.width || 10);
    const [height, setHeight] = React.useState(args.height || 7.5);
    const [widthUnit, setWidthUnit] = React.useState(args.widthUnit || 'cm');
    const [heightUnit, setHeightUnit] = React.useState(args.heightUnit || 'cm');
    const [position, setPosition] = React.useState(args.position || 'Custom');
    const [x, setX] = React.useState(args.x || 3);
    const [y, setY] = React.useState(args.y || 5);
    const [xUnit, setXUnit] = React.useState(args.xUnit || 'cm');
    const [yUnit, setYUnit] = React.useState(args.yUnit || 'cm');
    const [lockAspectRatio, setLockAspectRatio] = React.useState(args.lockAspectRatio || false);

    const handleSizeChange = (fields: any) => {
      setWidth(fields.width);
      setHeight(fields.height);
      setWidthUnit(fields.widthUnit);
      setHeightUnit(fields.heightUnit);
      args.onSizeChange?.(fields);
    };

    const handlePositionChange = (fields: any) => {
      setPosition(fields.position);
      setX(fields.x);
      setY(fields.y);
      setXUnit(fields.xUnit);
      setYUnit(fields.yUnit);
      args.onPositionChange?.(fields);
    };

    const handleLockAspectRatioChange = (locked: boolean) => {
      setLockAspectRatio(locked);
      args.onLockAspectRatioChange?.(locked);
    };

    return (
      <div style={{ padding: '20px' }}>
        <SizeAndPositionPanel
          width={width}
          height={height}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          position={position}
          positions={args.positions}
          x={x}
          y={y}
          xUnit={xUnit}
          yUnit={yUnit}
          units={args.units}
          showLockAspectRatio={args.showLockAspectRatio}
          lockAspectRatio={lockAspectRatio}
          onLockAspectRatioChange={handleLockAspectRatioChange}
          onSizeChange={handleSizeChange}
          onPositionChange={handlePositionChange}
          onError={args.onError}
          disabled={args.disabled}
          activeX={args.activeX}
          activeY={args.activeY}
          activeWidth={args.activeWidth}
          activeHeight={args.activeHeight}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Values:</strong></div>
          <div>Size: {width} {widthUnit} × {height} {heightUnit}</div>
          <div>Position: {position}</div>
          <div>Coordinates: ({x} {xUnit}, {y} {yUnit})</div>
          <div>Aspect Ratio: {(width / height).toFixed(2)}</div>
          <div>Locked: {lockAspectRatio ? 'Yes' : 'No'}</div>
        </div>
      </div>
    );
  },
  args: {
    width: 10,
    height: 7.5,
    widthUnit: 'cm',
    heightUnit: 'cm',
    position: 'Custom',
    positions: ['Custom', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    x: 3,
    y: 5,
    xUnit: 'cm',
    yUnit: 'cm',
    units: ['cm', 'mm', 'in', 'pt', 'px'],
    showLockAspectRatio: true,
    lockAspectRatio: false,
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
    onSizeChange: (fields: any) => console.log('Size changed:', fields),
    onPositionChange: (fields: any) => console.log('Position changed:', fields),
    activeX: 2,
    activeY: 2,
    activeWidth: 21 - 2 - 2,
    activeHeight: 29.7 - 2 - 2,
  },
};

export const Disabled: Story = {
  args: {
    width: 10,
    height: 7.5,
    widthUnit: 'cm',
    heightUnit: 'cm',
    position: 'top-left',
    positions: ['Custom', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    x: 0,
    y: 0,
    xUnit: 'cm',
    yUnit: 'cm',
    units: ['cm', 'mm', 'in', 'pt', 'px'],
    showLockAspectRatio: true,
    lockAspectRatio: false,
    disabled: true,
    onLockAspectRatioChange: (locked: boolean) => console.log('Aspect ratio lock changed:', locked),
    onSizeChange: (fields: any) => console.log('Size changed:', fields),
    onPositionChange: (fields: any) => console.log('Position changed:', fields),
    activeX: 2,
    activeY: 2,
    activeWidth: 21 - 2 - 2,
    activeHeight: 29.7 - 2 - 2,
  },
};
