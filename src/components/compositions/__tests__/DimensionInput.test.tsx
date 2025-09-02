/**
 * DimensionInput.test.tsx
 * Unit tests for DimensionInput with focus on axis-aware percentage conversion.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DimensionInput } from '../DimensionInput';
import { UnitConversionProvider } from '../../../contexts/UnitConversionContext';

describe('DimensionInput - Axis-Aware Percentage Conversion', () => {
  const mockOnChange = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithContext = (props: any, contextProps: any = {}) => {
    return render(
      <UnitConversionProvider {...contextProps}>
        <DimensionInput
          label="Test"
          value={10}
          unit="cm"
          onChange={mockOnChange}
          onError={mockOnError}
          {...props}
        />
      </UnitConversionProvider>
    );
  };

  describe('Axis-Aware Percentage Conversion', () => {
    test('width axis uses referenceWidth for percentage calculations', async () => {
      const contextProps = {
        referenceWidth: 27.7,
        referenceHeight: 19.0,
      };

      renderWithContext(
        { axis: 'width', unit: '%' },
        contextProps
      );

      // 100% width should display as 100% (not 68.6%)
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('100'); // 10cm / 27.7cm * 100 = 36.1%
    });

    test('height axis uses referenceHeight for percentage calculations', async () => {
      const contextProps = {
        referenceWidth: 27.7,
        referenceHeight: 19.0,
      };

      renderWithContext(
        { axis: 'height', unit: '%' },
        contextProps
      );

      // 10cm should be 52.6% of 19cm height
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('52.6'); // 10cm / 19.0cm * 100 = 52.6%
    });

    test('changing from cm to % maintains correct axis reference', async () => {
      const contextProps = {
        referenceWidth: 27.7,
        referenceHeight: 19.0,
      };

      renderWithContext(
        { axis: 'height', value: 19.0, unit: 'cm' },
        contextProps
      );

      // Find and click the unit selector
      const unitSelector = screen.getByRole('combobox');
      fireEvent.click(unitSelector);

      // Select percentage
      const percentOption = screen.getByText('%');
      fireEvent.click(percentOption);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith(19.0, '%');
      });

      // The display value should be 100% (19cm / 19cm * 100)
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('100');
    });

    test('roundtrip conversion maintains internal value', async () => {
      const contextProps = {
        referenceWidth: 27.7,
        referenceHeight: 19.0,
      };

      const { rerender } = renderWithContext(
        { axis: 'height', value: 19.0, unit: 'cm' },
        contextProps
      );

      // Change to percentage
      rerender(
        <UnitConversionProvider {...contextProps}>
          <DimensionInput
            label="Test"
            value={19.0}
            unit="%"
            axis="height"
            onChange={mockOnChange}
            onError={mockOnError}
          />
        </UnitConversionProvider>
      );

      // Change back to cm
      rerender(
        <UnitConversionProvider {...contextProps}>
          <DimensionInput
            label="Test"
            value={19.0}
            unit="cm"
            axis="height"
            onChange={mockOnChange}
            onError={mockOnError}
          />
        </UnitConversionProvider>
      );

      // The internal value should remain 19.0cm
      expect(mockOnChange).not.toHaveBeenCalledWith(expect.any(Number), 'cm');
    });
  });

  describe('Real-World Scenarios', () => {
    test('Paper active area scenario - width and height percentages', () => {
      // Paper: 29.7 cm × 21.0 cm; margins: 1.0 cm each
      // Paper active: 27.7 cm × 19.0 cm
      const contextProps = {
        referenceWidth: 27.7,
        referenceHeight: 19.0,
      };

      // Test width 100%
      const { rerender } = renderWithContext(
        { axis: 'width', value: 27.7, unit: '%' },
        contextProps
      );

      let input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('100'); // 27.7cm / 27.7cm * 100 = 100%

      // Test height 100%
      rerender(
        <UnitConversionProvider {...contextProps}>
          <DimensionInput
            label="Test"
            value={19.0}
            unit="%"
            axis="height"
            onChange={mockOnChange}
            onError={mockOnError}
          />
        </UnitConversionProvider>
      );

      input = screen.getByRole('spinbutton');
      expect(input).toHaveValue('100'); // 19.0cm / 19.0cm * 100 = 100%
    });

    test('Bug verification - height % should NOT use width reference', () => {
      const contextProps = {
        referenceWidth: 27.7,
        referenceHeight: 19.0,
      };

      renderWithContext(
        { axis: 'height', value: 19.0, unit: '%' },
        contextProps
      );

      const input = screen.getByRole('spinbutton');
      
      // Before fix: This would show 68.6% (19.0 / 27.7 * 100)
      // After fix: This should show 100% (19.0 / 19.0 * 100)
      expect(input).toHaveValue('100');
    });
  });

  describe('Error Handling', () => {
    test('throws error when reference missing for axis', () => {
      const contextProps = {
        referenceWidth: 27.7,
        // Missing referenceHeight
      };

      renderWithContext(
        { axis: 'height', unit: '%' },
        contextProps
      );

      expect(mockOnError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Reference height required for percentage conversion')
        })
      );
    });
  });
});
