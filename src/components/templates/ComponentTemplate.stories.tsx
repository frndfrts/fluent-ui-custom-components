import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ComponentTemplate } from './ComponentTemplate';

const meta: Meta<typeof ComponentTemplate> = {
  title: '10-Templates/ComponentTemplate',
  component: ComponentTemplate,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A template component demonstrating the standard structure for new components.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Current numeric value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for empty state',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the component',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment for value changes',
    },
    nonNegative: {
      control: { type: 'boolean' },
      description: 'Whether to allow only non-negative values',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 100,
    onChange: (value: number | string) => console.log('Value changed:', value),
    placeholder: 'Enter a value...',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const WithConstraints: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 1000,
    step: 10,
    nonNegative: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
