import { NumericInput } from './NumericInput';

export default {
  title: 'Primitives/NumericInput',
  component: NumericInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive numeric input component with step controls, validation, and accessibility features.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'The current numeric value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the value changes',
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    step: {
      control: 'number',
      description: 'Step increment for navigation',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
};

export const Default = {
  args: {
    value: 100,
    onChange: (value) => console.log('Value changed:', value),
  },
};

export const Small = {
  args: {
    value: 50,
    size: 'small',
    onChange: (value) => console.log('Value changed:', value),
  },
};

export const Large = {
  args: {
    value: 200,
    size: 'large',
    onChange: (value) => console.log('Value changed:', value),
  },
};

export const WithMinMax = {
  args: {
    value: 75,
    min: 0,
    max: 100,
    onChange: (value) => console.log('Value changed:', value),
  },
};

export const Disabled = {
  args: {
    value: 100,
    disabled: true,
    onChange: (value) => console.log('Value changed:', value),
  },
};
