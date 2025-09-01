import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { PaddingPanel } from './PaddingPanel';

const meta: Meta<typeof PaddingPanel> = {
  title: '02-Panels/PaddingPanel',
  component: PaddingPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing padding values (top, right, bottom, left).',
      },
    },
  },
  argTypes: {
    padding: {
      control: { type: 'object' },
      description: 'Current padding values',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units for padding',
    },
    onChange: {
      action: 'paddingChanged',
      description: 'Callback when padding changes',
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
    const [padding, setPadding] = React.useState(args.padding || {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    });

    const handleChange = (newPadding: any) => {
      setPadding(newPadding);
      args.onChange?.(newPadding);
    };

    return (
      <div style={{ padding: '20px' }}>
        <PaddingPanel
          padding={padding}
          units={args.units}
          onChange={handleChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Padding:</strong></div>
          <div>Top: {padding.top} {padding.topUnit}</div>
          <div>Right: {padding.right} {padding.rightUnit}</div>
          <div>Bottom: {padding.bottom} {padding.bottomUnit}</div>
          <div>Left: {padding.left} {padding.leftUnit}</div>
        </div>
      </div>
    );
  },
  args: {
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    },
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (padding: any) => console.log('Padding changed:', padding),
  },
};

export const UniformPadding: Story = {
  render: (args) => {
    const [padding, setPadding] = React.useState({
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    });

    const handleChange = (newPadding: any) => {
      setPadding(newPadding);
      args.onChange?.(newPadding);
    };

    return (
      <div style={{ padding: '20px' }}>
        <PaddingPanel
          padding={padding}
          units={args.units}
          onChange={handleChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Padding:</strong></div>
          <div>Top: {padding.top} {padding.topUnit}</div>
          <div>Right: {padding.right} {padding.rightUnit}</div>
          <div>Bottom: {padding.bottom} {padding.bottomUnit}</div>
          <div>Left: {padding.left} {padding.leftUnit}</div>
        </div>
      </div>
    );
  },
  args: {
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (padding: any) => console.log('Padding changed:', padding),
  },
};

export const AsymmetricPadding: Story = {
  render: (args) => {
    const [padding, setPadding] = React.useState({
      top: 5,
      right: 15,
      bottom: 10,
      left: 25,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    });

    const handleChange = (newPadding: any) => {
      setPadding(newPadding);
      args.onChange?.(newPadding);
    };

    return (
      <div style={{ padding: '20px' }}>
        <PaddingPanel
          padding={padding}
          units={args.units}
          onChange={handleChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Padding:</strong></div>
          <div>Top: {padding.top} {padding.topUnit}</div>
          <div>Right: {padding.right} {padding.rightUnit}</div>
          <div>Bottom: {padding.bottom} {padding.bottomUnit}</div>
          <div>Left: {padding.left} {padding.leftUnit}</div>
        </div>
      </div>
    );
  },
  args: {
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (padding: any) => console.log('Padding changed:', padding),
  },
};

export const ZeroPadding: Story = {
  render: (args) => {
    const [padding, setPadding] = React.useState({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      topUnit: 'px',
      rightUnit: 'px',
      bottomUnit: 'px',
      leftUnit: 'px',
    });

    const handleChange = (newPadding: any) => {
      setPadding(newPadding);
      args.onChange?.(newPadding);
    };

    return (
      <div style={{ padding: '20px' }}>
        <PaddingPanel
          padding={padding}
          units={args.units}
          onChange={handleChange}
          onError={args.onError}
          disabled={args.disabled}
        />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div><strong>Current Padding:</strong></div>
          <div>Top: {padding.top} {padding.topUnit}</div>
          <div>Right: {padding.right} {padding.rightUnit}</div>
          <div>Bottom: {padding.bottom} {padding.bottomUnit}</div>
          <div>Left: {padding.left} {padding.leftUnit}</div>
        </div>
      </div>
    );
  },
  args: {
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (padding: any) => console.log('Padding changed:', padding),
  },
};
