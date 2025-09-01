import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';
import { UniversalSelector } from './UniversalSelector';

const meta: Meta<typeof UniversalSelector> = {
  title: '05-Primitives/UniversalSelector',
  component: UniversalSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A universal selector component that can be configured for various selection types with customizable options.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Currently selected value',
    },
    options: {
      control: { type: 'object' },
      description: 'Available options for selection',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    width: {
      control: { type: 'number' },
      description: 'Custom width in pixels',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the selector is disabled',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when no value is selected',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether to use full width',
    },
    sortAlphabetically: {
      control: { type: 'boolean' },
      description: 'Whether to sort options alphabetically',
    },
    showCustomOption: {
      control: { type: 'boolean' },
      description: 'Whether to show a custom option',
    },
    customOptionText: {
      control: { type: 'text' },
      description: 'Text for the custom option',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with interactive state
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'option1');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UniversalSelector
          value={value}
          onChange={handleChange}
          options={args.options}
          disabled={args.disabled}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          customOptionText={args.customOptionText}
          showCustomOption={args.showCustomOption}
          sortAlphabetically={args.sortAlphabetically}
          placeholder={args.placeholder}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    value: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    onChange: (value: string) => console.log('Selection changed:', value),
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UniversalSelector
          value={value}
          onChange={handleChange}
          options={args.options}
          disabled={args.disabled}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          customOptionText={args.customOptionText}
          showCustomOption={args.showCustomOption}
          sortAlphabetically={args.sortAlphabetically}
          placeholder="Select an option..."
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value || 'None'}
        </div>
      </div>
    );
  },
  args: {
    value: '',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
      { value: 'elderberry', label: 'Elderberry' },
    ],
  },
};

// Custom width
export const CustomWidth: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'option1');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px' }}>
        <UniversalSelector
          value={value}
          onChange={handleChange}
          options={args.options}
          disabled={args.disabled}
          width={300}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          customOptionText={args.customOptionText}
          showCustomOption={args.showCustomOption}
          sortAlphabetically={args.sortAlphabetically}
          placeholder={args.placeholder}
          onError={args.onError}
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

// Color options
export const ColorOptions: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'red');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UniversalSelector
          value={value}
          onChange={handleChange}
          options={args.options}
          disabled={args.disabled}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          customOptionText={args.customOptionText}
          showCustomOption={args.showCustomOption}
          sortAlphabetically={args.sortAlphabetically}
          placeholder={args.placeholder}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    value: 'red',
    options: [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'purple', label: 'Purple' },
    ],
  },
};

// Size options
export const SizeOptions: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'medium');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UniversalSelector
          value={value}
          onChange={handleChange}
          options={args.options}
          disabled={args.disabled}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          customOptionText={args.customOptionText}
          showCustomOption={args.showCustomOption}
          sortAlphabetically={args.sortAlphabetically}
          placeholder={args.placeholder}
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value}
        </div>
      </div>
    );
  },
  args: {
    value: 'medium',
    options: [
      { value: 'xs', label: 'Extra Small' },
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'xl', label: 'Extra Large' },
    ],
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// With custom option
export const WithCustomOption: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'option1');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UniversalSelector
          value={value}
          onChange={handleChange}
          options={args.options}
          disabled={args.disabled}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          customOptionText="Custom Option"
          showCustomOption={true}
          sortAlphabetically={args.sortAlphabetically}
          placeholder={args.placeholder}
          onError={args.onError}
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

// Sorted alphabetically
export const SortedAlphabetically: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      args.onChange?.(newValue);
    };

    return (
      <div style={{ padding: '20px', minWidth: '300px' }}>
        <UniversalSelector
          value={value}
          onChange={handleChange}
          options={args.options}
          disabled={args.disabled}
          width={args.width}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
          fullWidth={args.fullWidth}
          customOptionText={args.customOptionText}
          showCustomOption={args.showCustomOption}
          sortAlphabetically={true}
          placeholder="Select an option..."
          onError={args.onError}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Selected: {value || 'None'}
        </div>
      </div>
    );
  },
  args: {
    value: '',
    options: [
      { value: 'zebra', label: 'Zebra' },
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
    ],
  },
};
