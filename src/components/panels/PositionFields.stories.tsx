import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { PositionFields } from './PositionFields';
import { UnitConversionProvider } from '../../contexts/UnitConversionContext';
import { unitConversionService } from '../../services/UnitConversionService';

const meta: Meta<typeof PositionFields> = {
  title: '02-Panels/PositionFields',
  component: PositionFields,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A panel component for managing position fields with X and Y coordinates.',
      },
    },
  },
  argTypes: {
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
      description: 'Available units for coordinates',
    },
    onChange: {
      action: 'positionChanged',
      description: 'Callback when position or coordinates change',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the fields are disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to get display value, now with axis awareness
const getDisplayValue = (internalValue: number, unit: string, systemId: string, context?: any): number => {
  try {
    return unitConversionService.fromInternalUnit(internalValue, unit, systemId, { ...context, axis: context?.axis || 'width' });
  } catch {
    return internalValue; // Fallback to internal value if conversion fails
  }
};

export const Default: Story = {
  args: {
    position: 'Custom',
    positions: ['Custom', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    x: 10,
    y: 15,
    xUnit: 'cm',
    yUnit: 'cm',
    units: ['cm', 'mm', 'in', 'pt', 'px'],
    onChange: (fields: any) => console.log('Position changed:', fields),
  },
};

export const ZeroPosition: Story = {
  args: {
    ...Default.args,
    x: 0,
    y: 0,
  },
};

export const LargeValues: Story = {
  args: {
    ...Default.args,
    x: 1000,
    y: 800,
  },
};

export const NegativeValues: Story = {
  args: {
    ...Default.args,
    x: -50,
    y: -100,
  },
};

export const AxisAwarePercentage: Story = {
  render: (args) => {
    const refWidth = 27.7;
    const refHeight = 19.0;

    // 50% of refWidth for X, 50% of refHeight for Y
    const [xValue, setXValue] = React.useState(refWidth / 2);
    const [xUnit, setXUnit] = React.useState('%');
    const [yValue, setYValue] = React.useState(refHeight / 2);
    const [yUnit, setYUnit] = React.useState('%');
    const [position, setPosition] = React.useState('Custom');

    const handleChange = (fields: any) => {
      setXValue(fields.x);
      setXUnit(fields.xUnit);
      setYValue(fields.y);
      setYUnit(fields.yUnit);
      setPosition(fields.position);
      args.onChange?.(fields);
    };

    const displayX = getDisplayValue(xValue, xUnit, 'length', { referenceWidth: refWidth, referenceHeight: refHeight, axis: 'width' });
    const displayY = getDisplayValue(yValue, yUnit, 'length', { referenceWidth: refWidth, referenceHeight: refHeight, axis: 'height' });

    return (
      <UnitConversionProvider referenceWidth={refWidth} referenceHeight={refHeight}>
        <div style={{ padding: '20px', minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PositionFields
            {...args}
            x={xValue}
            y={yValue}
            xUnit={xUnit}
            yUnit={yUnit}
            position={position}
            onChange={handleChange}
          />
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            <div><strong>Display Horizontal (X):</strong> {displayX.toFixed(2)} {xUnit}</div>
            <div><strong>Internal X:</strong> {xValue.toFixed(2)} cm</div>
            <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #ccc' }} />
            <div><strong>Display Vertical (Y):</strong> {displayY.toFixed(2)} {yUnit}</div>
            <div><strong>Internal Y:</strong> {yValue.toFixed(2)} cm</div>
          </div>
          <small>Context: {refWidth}cm ref width, {refHeight}cm ref height. Horizontal and Vertical inputs should both show 50.00%.</small>
        </div>
      </UnitConversionProvider>
    );
  },
  args: {
    ...Default.args,
    position: 'Custom',
    units: ['cm', 'mm', 'in', '%'],
  },
};
