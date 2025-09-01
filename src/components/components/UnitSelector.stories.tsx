import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { UnitSelector } from './UnitSelector';

const meta: Meta<typeof UnitSelector> = {
  title: '04-Components/UnitSelector',
  component: UnitSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown component for selecting units of measurement with accessibility features.',
      },
    },
  },
  argTypes: {
    unit: {
      control: { type: 'select' },
      options: ['cm', 'mm', 'in', 'pt', 'px'],
      description: 'Currently selected unit',
    },
    units: {
      control: { type: 'object' },
      description: 'Available units to choose from',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when unit selection changes',
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
    width: {
      control: { type: 'number' },
      description: 'Custom width in pixels',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the selector is disabled',
    },
    sortAlphabetically: {
      control: { type: 'boolean' },
      description: 'Whether to sort units alphabetically',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the selector',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with interactive state
export const Default: Story = {
  render: (args) => {
    const [unit, setUnit] = React.useState(args.unit || 'cm');
    
    const handleChange = (newUnit: string) => {
      setUnit(newUnit);
      args.onChange?.(newUnit);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UnitSelector
          unit={unit}
          onChange={handleChange}
          units={args.units}
          size={args.size}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          disabled={args.disabled}
          sortAlphabetically={args.sortAlphabetically}
          label={args.label}
          ariaLabel={args.ariaLabel}
          ariaDescribedBy={args.ariaDescribedBy}
          ariaLabelledBy={args.ariaLabelledBy}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {unit}
        </div>
      </div>
    );
  },
  args: {
    unit: 'cm',
    units: ['cm', 'mm', 'in', 'pt', 'px'],
    onChange: (unit: string) => console.log('Unit changed:', unit),
  },
};

// Small size
export const Small: Story = {
  render: (args) => {
    const [unit, setUnit] = React.useState(args.unit || 'cm');
    
    const handleChange = (newUnit: string) => {
      setUnit(newUnit);
      args.onChange?.(newUnit);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UnitSelector
          unit={unit}
          onChange={handleChange}
          units={args.units}
          size="small"
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          disabled={args.disabled}
          sortAlphabetically={args.sortAlphabetically}
          label={args.label}
          ariaLabel={args.ariaLabel}
          ariaDescribedBy={args.ariaDescribedBy}
          ariaLabelledBy={args.ariaLabelledBy}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {unit}
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
    const [unit, setUnit] = React.useState(args.unit || 'cm');
    
    const handleChange = (newUnit: string) => {
      setUnit(newUnit);
      args.onChange?.(newUnit);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UnitSelector
          unit={unit}
          onChange={handleChange}
          units={args.units}
          size="large"
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          disabled={args.disabled}
          sortAlphabetically={args.sortAlphabetically}
          label={args.label}
          ariaLabel={args.ariaLabel}
          ariaDescribedBy={args.ariaDescribedBy}
          ariaLabelledBy={args.ariaLabelledBy}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {unit}
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

// Custom width
export const CustomWidth: Story = {
  render: (args) => {
    const [unit, setUnit] = React.useState(args.unit || 'cm');
    
    const handleChange = (newUnit: string) => {
      setUnit(newUnit);
      args.onChange?.(newUnit);
    };

    return (
      <div style={{ padding: '20px' }}>
        <UnitSelector
          unit={unit}
          onChange={handleChange}
          units={args.units}
          size={args.size}
          width={200}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          disabled={args.disabled}
          sortAlphabetically={args.sortAlphabetically}
          label={args.label}
          ariaLabel={args.ariaLabel}
          ariaDescribedBy={args.ariaDescribedBy}
          ariaLabelledBy={args.ariaLabelledBy}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {unit}
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
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
    const [unit, setUnit] = React.useState(args.unit || 'cm');
    
    const handleChange = (newUnit: string) => {
      setUnit(newUnit);
      args.onChange?.(newUnit);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UnitSelector
          unit={unit}
          onChange={handleChange}
          units={args.units}
          size={args.size}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          disabled={args.disabled}
          sortAlphabetically={args.sortAlphabetically}
          label="Measurement Unit"
          ariaLabel={args.ariaLabel}
          ariaDescribedBy={args.ariaDescribedBy}
          ariaLabelledBy={args.ariaLabelledBy}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {unit}
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

// Custom units
export const CustomUnits: Story = {
  render: (args) => {
    const [unit, setUnit] = React.useState(args.unit || 'em');
    
    const handleChange = (newUnit: string) => {
      setUnit(newUnit);
      args.onChange?.(newUnit);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UnitSelector
          unit={unit}
          onChange={handleChange}
          units={['em', 'rem', 'vw', 'vh', '%']}
          size={args.size}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          disabled={args.disabled}
          sortAlphabetically={args.sortAlphabetically}
          label={args.label}
          ariaLabel={args.ariaLabel}
          ariaDescribedBy={args.ariaDescribedBy}
          ariaLabelledBy={args.ariaLabelledBy}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {unit}
        </div>
      </div>
    );
  },
  args: {
    unit: 'em',
    units: ['em', 'rem', 'vw', 'vh', '%'],
    onChange: (unit: string) => console.log('Unit changed:', unit),
  },
};

// Sorted alphabetically
export const SortedAlphabetically: Story = {
  render: (args) => {
    const [unit, setUnit] = React.useState(args.unit || 'cm');
    
    const handleChange = (newUnit: string) => {
      setUnit(newUnit);
      args.onChange?.(newUnit);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UnitSelector
          unit={unit}
          onChange={handleChange}
          units={args.units}
          size={args.size}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          disabled={args.disabled}
          sortAlphabetically={true}
          label={args.label}
          ariaLabel={args.ariaLabel}
          ariaDescribedBy={args.ariaDescribedBy}
          ariaLabelledBy={args.ariaLabelledBy}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {unit}
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};
