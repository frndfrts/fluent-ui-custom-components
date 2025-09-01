/**
 * DimensionInput.stories.tsx
 * Storybook stories for the DimensionInput component.
 * Demonstrates enhanced unit conversion with context-aware calculations and unit systems.
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { DimensionInput } from './DimensionInput';
import { UnitConversionProvider } from '../../contexts/UnitConversionContext';
import { LENGTH_SYSTEM, TEMPERATURE_SYSTEM, VOLUME_SYSTEM } from '../../systems/UnitSystems';
import { unitConversionService } from '../../services/UnitConversionService';

const meta: Meta<typeof DimensionInput> = {
  title: '03-Compositions/DimensionInput',
  component: DimensionInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the dimension input',
    },
    value: {
      control: 'number',
      description: 'Current value in internal unit (e.g., cm for length, celsius for temperature)',
    },
    unit: {
      control: 'select',
      options: ['px', 'em', 'rem', '%', 'vw', 'vh', 'pt', 'in', 'cm', 'mm'],
      description: 'Display unit',
    },
    units: {
      control: 'object',
      description: 'Available units',
    },
    unitSystem: {
      control: 'select',
      options: ['length', 'temperature', 'volume'],
      description: 'Unit system to use',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    hideLabel: {
      control: 'boolean',
      description: 'Whether to hide the label',
    },
    showUnitNames: {
      control: 'boolean',
      description: 'Show full unit names instead of symbols',
    },
    referenceWidth: {
      control: 'number',
      description: 'Reference width for percentage calculations (in internal unit)',
    },
    referenceHeight: {
      control: 'number',
      description: 'Reference height for percentage calculations (in internal unit)',
    },
    containerWidth: {
      control: 'number',
      description: 'Container width for viewport units (in internal unit)',
    },
    containerHeight: {
      control: 'number',
      description: 'Container height for viewport units (in internal unit)',
    },
    fontSize: {
      control: 'number',
      description: 'Font size for em calculations (in internal unit)',
    },
    rootFontSize: {
      control: 'number',
      description: 'Root font size for rem calculations (in internal unit)',
    },
  },
  args: {
    label: 'Width',
    value: 10,
    unit: 'cm',
    units: ['px', 'em', 'rem', '%', 'vw', 'vh', 'pt', 'in', 'cm', 'mm'],
    size: 'medium',
    disabled: false,
    hideLabel: false,
    showUnitNames: false,
    referenceWidth: 20,
    referenceHeight: 15,
    containerWidth: 30,
    containerHeight: 20,
    fontSize: 0.4,
    rootFontSize: 0.35,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to get display value
const getDisplayValue = (internalValue: number, unit: string, systemId: string, context?: any): number => {
  try {
    return unitConversionService.fromInternalUnit(internalValue, unit, systemId, context);
  } catch {
    return internalValue; // Fallback to internal value if conversion fails
  }
};

// Basic usage with interactive state
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const [unit, setUnit] = React.useState(args.unit);

    const handleChange = (newValue: number | '', newUnit: string) => {
      setValue(newValue as number);
      setUnit(newUnit);
    };

    // Get display value for current unit
    const displayValue = getDisplayValue(value || 0, unit || 'cm', 'length', {
      referenceWidth: 20,
      referenceHeight: 15,
      containerWidth: 30,
      containerHeight: 20,
      fontSize: 0.4,
      rootFontSize: 0.35,
    });

    return (
      <UnitConversionProvider
        referenceWidth={20}
        referenceHeight={15}
        containerWidth={30}
        containerHeight={20}
        fontSize={0.4}
        rootFontSize={0.35}
      >
        <div style={{ padding: '20px', minWidth: '300px' }}>
          <DimensionInput
            label={args.label}
            value={value}
            unit={unit}
            units={args.units}
            onChange={handleChange}
            size={args.size}
            disabled={args.disabled}
            hideLabel={args.hideLabel}
            showUnitNames={args.showUnitNames}
          />
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            <div><strong>Display:</strong> {displayValue.toFixed(2)} {unit}</div>
            <div><strong>Internal:</strong> {value} cm</div>
            <small>Context: 20cm ref width, 15cm ref height, 0.4cm font size</small>
          </div>
        </div>
      </UnitConversionProvider>
    );
  },
  args: {
    label: 'Width',
    value: 10,
    unit: 'cm',
  },
};

// Temperature Unit System Example
export const TemperatureSystem: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(25); // 25°C internal
    const [unit, setUnit] = React.useState('°C');

    const handleChange = (newValue: number | '', newUnit: string) => {
      setValue(newValue as number);
      setUnit(newUnit);
    };

    // Get display value for current unit
    const displayValue = getDisplayValue(value || 0, unit || '°C', 'temperature');

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <DimensionInput
          label="Temperature"
          value={value}
          unit={unit}
          unitSystem="temperature"
          onChange={handleChange}
          size={args.size}
          disabled={args.disabled}
          hideLabel={args.hideLabel}
          showUnitNames={true}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <div><strong>Display:</strong> {displayValue.toFixed(1)} {unit}</div>
          <div><strong>Internal:</strong> {value} °C</div>
          <small>Internal unit: Celsius</small>
        </div>
      </div>
    );
  },
  args: {
    label: 'Temperature',
    value: 25,
    unit: '°C',
  },
};

// Volume Unit System Example
export const VolumeSystem: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(500); // 500ml internal
    const [unit, setUnit] = React.useState('ml');

    const handleChange = (newValue: number | '', newUnit: string) => {
      setValue(newValue as number);
      setUnit(newUnit);
    };

    // Get display value for current unit
    const displayValue = getDisplayValue(value || 0, unit || 'ml', 'volume');

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <DimensionInput
          label="Volume"
          value={value}
          unit={unit}
          unitSystem="volume"
          onChange={handleChange}
          size={args.size}
          disabled={args.disabled}
          hideLabel={args.hideLabel}
          showUnitNames={true}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <div><strong>Display:</strong> {displayValue.toFixed(1)} {unit}</div>
          <div><strong>Internal:</strong> {value} ml</div>
          <small>Internal unit: Milliliters</small>
        </div>
      </div>
    );
  },
  args: {
    label: 'Volume',
    value: 500,
    unit: 'ml',
  },
};

// Small size
export const Small: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const [unit, setUnit] = React.useState(args.unit);

    const handleChange = (newValue: number | '', newUnit: string) => {
      setValue(newValue as number);
      setUnit(newUnit);
    };

    // Get display value for current unit
    const displayValue = getDisplayValue(value || 0, unit || 'cm', 'length');

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <DimensionInput
          label={args.label}
          value={value}
          unit={unit}
          units={args.units}
          onChange={handleChange}
          size="small"
          disabled={args.disabled}
          hideLabel={args.hideLabel}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <div><strong>Display:</strong> {displayValue.toFixed(1)} {unit}</div>
          <div><strong>Internal:</strong> {value} cm</div>
        </div>
      </div>
    );
  },
  args: {
    label: 'Height',
    value: 5,
    unit: 'mm',
  },
};

// Large size
export const Large: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const [unit, setUnit] = React.useState(args.unit);

    const handleChange = (newValue: number | '', newUnit: string) => {
      setValue(newValue as number);
      setUnit(newUnit);
    };

    // Get display value for current unit
    const displayValue = getDisplayValue(value || 0, unit || 'cm', 'length');

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <DimensionInput
          label={args.label}
          value={value}
          unit={unit}
          units={args.units}
          onChange={handleChange}
          size="large"
          disabled={args.disabled}
          hideLabel={args.hideLabel}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <div><strong>Display:</strong> {displayValue.toFixed(3)} {unit}</div>
          <div><strong>Internal:</strong> {value} cm</div>
        </div>
      </div>
    );
  },
  args: {
    label: 'Margin',
    value: 2,
    unit: 'in',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: 10,
    unit: 'cm',
    disabled: true,
  },
};

// Without label
export const WithoutLabel: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const [unit, setUnit] = React.useState(args.unit);

    const handleChange = (newValue: number | '', newUnit: string) => {
      setValue(newValue as number);
      setUnit(newUnit);
    };

    // Get display value for current unit
    const displayValue = getDisplayValue(value || 0, unit || 'cm', 'length');

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <DimensionInput
          label={args.label}
          value={value}
          unit={unit}
          units={args.units}
          onChange={handleChange}
          size={args.size}
          disabled={args.disabled}
          hideLabel={true}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <div><strong>Display:</strong> {displayValue.toFixed(2)} {unit}</div>
          <div><strong>Internal:</strong> {value} cm</div>
          <small>Label hidden</small>
        </div>
      </div>
    );
  },
  args: {
    label: 'Hidden Label',
    value: 10,
    unit: 'cm',
  },
};
