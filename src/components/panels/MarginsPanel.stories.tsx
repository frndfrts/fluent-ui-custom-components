import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { MarginsPanel } from './MarginsPanel';

const meta: Meta<typeof MarginsPanel> = {
  title: '02-Panels/MarginsPanel',
  component: MarginsPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing margin values (top, right, bottom, left).',
      },
    },
  },
  argTypes: {
    margins: {
      control: { type: 'object' },
      description: 'Current margin values',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for margins',
    },
    onChange: {
      action: 'marginsChanged',
      description: 'Callback when margins change',
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
    const [margins, setMargins] = React.useState(args.margins || {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    });

    const handleChange = (newMargins: any) => {
      setMargins(newMargins);
      args.onChange?.(newMargins);
    };

    return (
      <div style={{ padding: '20px' }}>
        <MarginsPanel
          margins={margins}
          units={args.units}
          onChange={handleChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Margins:</strong></div>
          <div>Top: {margins.top} {margins.topUnit}</div>
          <div>Right: {margins.right} {margins.rightUnit}</div>
          <div>Bottom: {margins.bottom} {margins.bottomUnit}</div>
          <div>Left: {margins.left} {margins.leftUnit}</div>
        </div>
      </div>
    );
  },
  args: {
    margins: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    },
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (margins: any) => console.log('Margins changed:', margins),
  },
};

export const UniformMargins: Story = {
  render: (args) => {
    const [margins, setMargins] = React.useState({
      top: 30,
      right: 30,
      bottom: 30,
      left: 30,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    });

    const handleChange = (newMargins: any) => {
      setMargins(newMargins);
      args.onChange?.(newMargins);
    };

    return (
      <div style={{ padding: '20px' }}>
        <MarginsPanel
          margins={margins}
          units={args.units}
          onChange={handleChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Margins:</strong></div>
          <div>Top: {margins.top} {margins.topUnit}</div>
          <div>Right: {margins.right} {margins.rightUnit}</div>
          <div>Bottom: {margins.bottom} {margins.bottomUnit}</div>
          <div>Left: {margins.left} {margins.leftUnit}</div>
        </div>
      </div>
    );
  },
  args: {
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (margins: any) => console.log('Margins changed:', margins),
  },
};

export const AsymmetricMargins: Story = {
  render: (args) => {
    const [margins, setMargins] = React.useState({
      top: 10,
      right: 25,
      bottom: 15,
      left: 35,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    });

    const handleChange = (newMargins: any) => {
      setMargins(newMargins);
      args.onChange?.(newMargins);
    };

    return (
      <div style={{ padding: '20px' }}>
        <MarginsPanel
          margins={margins}
          units={args.units}
          onChange={handleChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Margins:</strong></div>
          <div>Top: {margins.top} {margins.topUnit}</div>
          <div>Right: {margins.right} {margins.rightUnit}</div>
          <div>Bottom: {margins.bottom} {margins.bottomUnit}</div>
          <div>Left: {margins.left} {margins.leftUnit}</div>
        </div>
      </div>
    );
  },
  args: {
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (margins: any) => console.log('Margins changed:', margins),
  },
};

export const ZeroMargins: Story = {
  render: (args) => {
    const [margins, setMargins] = React.useState({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    });

    const handleChange = (newMargins: any) => {
      setMargins(newMargins);
      args.onChange?.(newMargins);
    };

    return (
      <div style={{ padding: '20px' }}>
        <MarginsPanel
          margins={margins}
          units={args.units}
          onChange={handleChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Margins:</strong></div>
          <div>Top: {margins.top} {margins.topUnit}</div>
          <div>Right: {margins.right} {margins.rightUnit}</div>
          <div>Bottom: {margins.bottom} {margins.bottomUnit}</div>
          <div>Left: {margins.left} {margins.leftUnit}</div>
        </div>
      </div>
    );
  },
  args: {
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (margins: any) => console.log('Margins changed:', margins),
  },
};
