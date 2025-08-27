import type { Meta, StoryObj } from '@storybook/react';
import { MultipleSlidersInput } from './MultipleSlidersInput';

const meta: Meta<typeof MultipleSlidersInput> = {
  title: '03-Compositions/MultipleSlidersInput',
  component: MultipleSlidersInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composition component that provides multiple slider inputs for various numeric values.',
      },
    },
  },
  argTypes: {
    sliders: {
      control: { type: 'object' },
      description: 'Array of slider configurations',
    },
    labelValueWidth: {
      control: { type: 'number' },
      description: 'The symmetric width for label and value areas',
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width for the container',
    },
    onError: {
      action: 'error',
      description: 'Callback when errors occur',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    values: [50, 75, 25],
    labels: ['Value 1', 'Value 2', 'Value 3'],
    min: 0,
    max: 100,
    step: 1,
  },
};

export const TwoSliders: Story = {
  args: {
    values: [30, 70],
    labels: ['Opacity', 'Brightness'],
    min: 0,
    max: 100,
    step: 5,
  },
};

export const FourSliders: Story = {
  args: {
    values: [10, 20, 30, 40],
    labels: ['Red', 'Green', 'Blue', 'Alpha'],
    min: 0,
    max: 255,
    step: 1,
  },
};

export const PercentageSliders: Story = {
  args: {
    values: [25, 50, 75],
    labels: ['Margin', 'Padding', 'Border'],
    min: 0,
    max: 100,
    step: 5,
  },
};
