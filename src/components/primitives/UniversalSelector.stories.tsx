import type { Meta, StoryObj } from '@storybook/react';
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
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when no value is selected',
    },
    label: {
      control: { type: 'text' },
      description: 'Visible label for the selector',
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Whether the selector supports searching',
    },
    multiSelect: {
      control: { type: 'boolean' },
      description: 'Whether multiple selections are allowed',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether the selection can be cleared',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
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

// Small size
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

// Large size
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    value: '',
    placeholder: 'Select an option...',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Choose Option',
  },
};

// Searchable
export const Searchable: Story = {
  args: {
    ...Default.args,
    searchable: true,
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
      { value: 'elderberry', label: 'Elderberry' },
    ],
  },
};

// Multi-select
export const MultiSelect: Story = {
  args: {
    ...Default.args,
    multiSelect: true,
    value: ['option1', 'option2'],
    onChange: (value: string | string[]) => console.log('Selection changed:', value),
  },
};

// Clearable
export const Clearable: Story = {
  args: {
    ...Default.args,
    clearable: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 300,
  },
};

// Color options
export const ColorOptions: Story = {
  args: {
    ...Default.args,
    value: 'red',
    options: [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'purple', label: 'Purple' },
    ],
    label: 'Color Selection',
  },
};

// Size options
export const SizeOptions: Story = {
  args: {
    ...Default.args,
    value: 'medium',
    options: [
      { value: 'xs', label: 'Extra Small' },
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'xl', label: 'Extra Large' },
    ],
    label: 'Size Selection',
  },
};

// Complex example
export const Complex: Story = {
  args: {
    ...Default.args,
    size: 'large',
    width: 400,
    searchable: true,
    clearable: true,
    label: 'Advanced Selection',
    placeholder: 'Search and select an option...',
    options: [
      { value: 'design', label: 'Design System' },
      { value: 'development', label: 'Development' },
      { value: 'testing', label: 'Testing' },
      { value: 'deployment', label: 'Deployment' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'documentation', label: 'Documentation' },
      { value: 'research', label: 'Research' },
      { value: 'planning', label: 'Planning' },
    ],
  },
};
