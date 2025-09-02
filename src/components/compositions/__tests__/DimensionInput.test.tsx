/**
 * DimensionInput.test.tsx
 * Unit tests for DimensionInput with focus on axis-aware percentage conversion.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DimensionInput } from '../DimensionInput';
import { UnitConversionProvider } from '../../../contexts/UnitConversionContext';

// Mock the unit conversion service
jest.mock('../../../services/UnitConversionService', () => ({
  unitConversionService: {
    fromInternalUnit: jest.fn((value, unit) => {
      if (unit === '%') {
        // Mock conversion from cm to percentage
        return value * 2; // Simple mock: 1cm = 2%
      }
      return value;
    }),
    toInternalUnit: jest.fn((value, unit) => {
      if (unit === '%') {
        // Mock conversion from percentage to cm
        return value / 2; // Simple mock: 2% = 1cm
      }
      return value;
    }),
    validateContext: jest.fn(() => true),
    getStepValue: jest.fn(() => 1),
    getDecimalPlaces: jest.fn(() => 2),
    getSystem: jest.fn(() => ({ id: 'length', internalUnit: 'cm' })),
  },
}));

describe('DimensionInput - Unified Min/Max Clamping', () => {
  const defaultProps = {
    label: 'Test Input',
    value: 10, // 10cm = 20% in our mock
    unit: '%',
    onChange: jest.fn(),
    onError: jest.fn(),
  };

  const renderWithContext = (props = {}) => {
    return render(
      <UnitConversionProvider
        referenceWidth={50}
        referenceHeight={30}
        containerWidth={100}
        containerHeight={80}
        fontSize={16}
        rootFontSize={16}
      >
        <DimensionInput {...defaultProps} {...props} />
      </UnitConversionProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Unified clamping on commit', () => {
    it('should clamp values above max on blur', async () => {
      const onChange = jest.fn();
      renderWithContext({ onChange });

      const input = screen.getByRole('spinbutton');
      
      // Enter a value above 100%
      await userEvent.clear(input);
      await userEvent.type(input, '120');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should clamp to 100% and emit the clamped value
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(50, '%'); // 100% = 50cm in our mock
      });
    });

    it('should clamp values below min on blur', async () => {
      const onChange = jest.fn();
      renderWithContext({ onChange });

      const input = screen.getByRole('spinbutton');
      
      // Enter a negative value
      await userEvent.clear(input);
      await userEvent.type(input, '-10');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should clamp to 0% and emit the clamped value
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(0, '%'); // 0% = 0cm in our mock
      });
    });

    it('should handle empty input on blur by accepting empty value', async () => {
      const onChange = jest.fn();
      renderWithContext({ onChange });

      const input = screen.getByRole('spinbutton');
      
      // Clear the input
      await userEvent.clear(input);
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should accept empty value
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('', '%');
      });
    });
  });

  describe('Spin button clamping', () => {
    it('should clamp increment to max', async () => {
      const onChange = jest.fn();
      renderWithContext({ value: 49, onChange }); // 98% in our mock

      const incrementButton = screen.getByLabelText('Increment');
      
      // Click increment button
      await userEvent.click(incrementButton);

      // Should clamp to 100% and emit the clamped value
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(50, '%'); // 100% = 50cm in our mock
      });
    });

    it('should clamp decrement to min', async () => {
      const onChange = jest.fn();
      renderWithContext({ value: 1, onChange }); // 2% in our mock

      const decrementButton = screen.getByLabelText('Decrement');
      
      // Click decrement button
      await userEvent.click(decrementButton);

      // Should clamp to 0% and emit the clamped value
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(0, '%'); // 0% = 0cm in our mock
      });
    });
  });

  describe('Roundtrip stability', () => {
    it('should maintain value stability through unit conversion roundtrip', async () => {
      const onChange = jest.fn();
      const originalValue = 25; // 50% in our mock
      
      renderWithContext({ value: originalValue, onChange });

      const input = screen.getByRole('spinbutton');
      
      // Enter a valid percentage value
      await userEvent.clear(input);
      await userEvent.type(input, '75');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should convert to internal unit and back to display unit
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(37.5, '%'); // 75% = 37.5cm in our mock
      });
    });
  });

  describe('Axis-aware min/max calculation', () => {
    it('should use referenceWidth for width axis percentage bounds', async () => {
      const onChange = jest.fn();
      renderWithContext({ axis: 'width', onChange });

      const input = screen.getByRole('spinbutton');
      
      // Enter 50%
      await userEvent.clear(input);
      await userEvent.type(input, '50');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should use referenceWidth (50) for conversion
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(25, '%'); // 50% of 50 = 25cm
      });
    });

    it('should use referenceHeight for height axis percentage bounds', async () => {
      const onChange = jest.fn();
      renderWithContext({ axis: 'height', onChange });

      const input = screen.getByRole('spinbutton');
      
      // Enter 50%
      await userEvent.clear(input);
      await userEvent.type(input, '50');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should use referenceHeight (30) for conversion
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(15, '%'); // 50% of 30 = 15cm
      });
    });
  });

  describe('Custom min/max constraints', () => {
    it('should use provided min/max values in internal units', async () => {
      const onChange = jest.fn();
      renderWithContext({ 
        min: 5, // 5cm = 10% in our mock
        max: 25, // 25cm = 50% in our mock
        onChange 
      });

      const input = screen.getByRole('spinbutton');
      
      // Enter a value above max
      await userEvent.clear(input);
      await userEvent.type(input, '60');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should clamp to max (50%)
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(25, '%'); // 50% = 25cm in our mock
      });
    });

    it('should clamp to provided min value', async () => {
      const onChange = jest.fn();
      renderWithContext({ 
        min: 5, // 5cm = 10% in our mock
        max: 25, // 25cm = 50% in our mock
        onChange 
      });

      const input = screen.getByRole('spinbutton');
      
      // Enter a value below min
      await userEvent.clear(input);
      await userEvent.type(input, '5');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should clamp to min (10%)
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(5, '%'); // 10% = 5cm in our mock
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle non-numeric paste correctly', async () => {
      const onChange = jest.fn();
      renderWithContext({ onChange });

      const input = screen.getByRole('spinbutton');
      
      // Paste non-numeric content
      await userEvent.clear(input);
      fireEvent.paste(input, { clipboardData: { getData: () => '120%' } });
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should strip non-numeric and clamp to 100%
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(50, '%'); // 100% = 50cm in our mock
      });
    });

    it('should not clamp non-percent units without custom min/max', async () => {
      const onChange = jest.fn();
      renderWithContext({ unit: 'cm', value: 150, onChange });

      const input = screen.getByRole('spinbutton');
      
      // Enter a value above 100
      await userEvent.clear(input);
      await userEvent.type(input, '200');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should not clamp for non-percent units without custom constraints
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(200, 'cm');
      });
    });

    it('should apply custom min/max to non-percent units', async () => {
      const onChange = jest.fn();
      renderWithContext({ 
        unit: 'cm', 
        value: 150, 
        min: 0,
        max: 100,
        onChange 
      });

      const input = screen.getByRole('spinbutton');
      
      // Enter a value above max
      await userEvent.clear(input);
      await userEvent.type(input, '200');
      
      // Trigger blur event
      fireEvent.blur(input);

      // Should clamp to max
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(100, 'cm');
      });
    });
  });

  describe('HTML constraints', () => {
    it('should set min and max attributes for percentage inputs', () => {
      renderWithContext();

      const input = screen.getByRole('spinbutton');
      
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });

    it('should set min and max for custom constraints', () => {
      renderWithContext({ min: 10, max: 90 });

      const input = screen.getByRole('spinbutton');
      
      expect(input).toHaveAttribute('min', '20'); // 10cm = 20% in our mock
      expect(input).toHaveAttribute('max', '180'); // 90cm = 180% in our mock
    });

    it('should not set min and max for non-percent inputs without constraints', () => {
      renderWithContext({ unit: 'cm' });

      const input = screen.getByRole('spinbutton');
      
      expect(input).not.toHaveAttribute('min');
      expect(input).not.toHaveAttribute('max');
    });
  });
});
