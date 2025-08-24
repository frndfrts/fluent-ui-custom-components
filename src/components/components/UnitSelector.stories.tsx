import type { Meta, StoryObj } from '@storybook/react';
import { UnitSelector } from '../components/UnitSelector';

const meta: Meta<typeof UnitSelector> = {
  title: 'Primitives/UnitSelector',
  component: UnitSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A unit selector component with customizable units, sorting, and accessibility features.',
      },
    },
  },
  argTypes: {

    onChange: {
      action: 'changed',
      description: 'Callback when the unit selection changes',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
    units: {
      control: { type: 'object' },
      description: 'Array of available units',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the selector',
    },
    width: {
      control: { type: 'number' },
      description: 'Width of the selector in pixels',
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
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA label for screen readers',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the selector',
    },
    ariaLabelledBy: {
      control: { type: 'text' },
      description: 'ID of element that labels the selector',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with common units
export const Default: Story = {
  args: {
    value: 'px',
    units: ['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm'],
    onChange: (event: React.FormEvent<HTMLDivElement>, data: { value: string }) => console.log('Unit changed:', data.value),
    onError: (error: Error) => console.error('Error:', error),
  },
};

// With different sizes
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    value: 'em',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    value: 'rem',
  },
};

// With custom width
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 150,
    value: '%',
  },
};

// With alphabetical sorting
export const Sorted: Story = {
  args: {
    ...Default.args,
    sortAlphabetically: true,
    value: 'cm',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Unit',
    value: 'pt',
  },
};

// With accessibility features
export const Accessible: Story = {
  args: {
    ...Default.args,
    label: 'Measurement Unit',
    ariaLabel: 'Select measurement unit',
    ariaDescribedBy: 'unit-desc',
    value: 'in',
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows the UnitSelector with comprehensive accessibility features.',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'px',
  },
};

// Length units
export const LengthUnits: Story = {
  args: {
    ...Default.args,
    units: ['px', 'em', 'rem', 'pt', 'in', 'cm', 'mm'],
    value: 'em',
  },
};

// Percentage units
export const PercentageUnits: Story = {
  args: {
    ...Default.args,
    units: ['%', 'px', 'em', 'rem'],
    value: '%',
  },
};

// Time units
export const TimeUnits: Story = {
  args: {
    ...Default.args,
    units: ['ms', 's', 'm', 'h'],
    value: 'ms',
  },
};

// Angle units
export const AngleUnits: Story = {
  args: {
    ...Default.args,
    units: ['deg', 'rad', 'grad', 'turn'],
    value: 'deg',
  },
};

// Complex example with all features
export const Complex: Story = {
  args: {
    ...Default.args,
    label: 'Dimension Unit',
    ariaLabel: 'Select dimension unit for layout',
    ariaDescribedBy: 'dimension-desc',
    size: 'large',
    width: 200,
    sortAlphabetically: true,
    units: ['px', 'em', 'rem', '%', 'vw', 'vh', 'pt', 'in', 'cm', 'mm'],
    value: 'vw',
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example showing all the features of UnitSelector working together.',
      },
    },
  },
};
