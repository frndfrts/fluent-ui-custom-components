/**
 * UnitConversionService.test.ts
 * Unit tests for UnitConversionService with focus on axis-aware percentage conversion.
 */
import { unitConversionService, UnitConversionContext } from '../UnitConversionService';

describe('UnitConversionService - Percentage Conversion', () => {
  const testContext: UnitConversionContext = {
    referenceWidth: 27.7,  // cm
    referenceHeight: 19.0, // cm
    containerWidth: 30.0,   // cm
    containerHeight: 20.0,  // cm
    fontSize: 0.4,         // cm
    rootFontSize: 0.35,    // cm
  };

  describe('Axis-Aware Percentage Conversion', () => {
    test('width percentage uses referenceWidth', () => {
      // Test width axis
      const widthContext = { ...testContext, axis: 'width' as const };
      
      // 100% width should equal referenceWidth
      const widthCm = unitConversionService.toInternalUnit(100, '%', 'length', widthContext);
      expect(widthCm).toBeCloseTo(27.7, 2);
      
      // Convert back to percentage
      const widthPercent = unitConversionService.fromInternalUnit(widthCm, '%', 'length', widthContext);
      expect(widthPercent).toBeCloseTo(100, 2);
    });

    test('height percentage uses referenceHeight', () => {
      // Test height axis
      const heightContext = { ...testContext, axis: 'height' as const };
      
      // 100% height should equal referenceHeight
      const heightCm = unitConversionService.toInternalUnit(100, '%', 'length', heightContext);
      expect(heightCm).toBeCloseTo(19.0, 2);
      
      // Convert back to percentage
      const heightPercent = unitConversionService.fromInternalUnit(heightCm, '%', 'length', heightContext);
      expect(heightPercent).toBeCloseTo(100, 2);
    });

    test('x coordinate uses referenceWidth', () => {
      // Test x axis
      const xContext = { ...testContext, axis: 'x' as const };
      
      // 50% x should equal half of referenceWidth
      const xCm = unitConversionService.toInternalUnit(50, '%', 'length', xContext);
      expect(xCm).toBeCloseTo(13.85, 2); // 27.7 / 2
      
      // Convert back to percentage
      const xPercent = unitConversionService.fromInternalUnit(xCm, '%', 'length', xContext);
      expect(xPercent).toBeCloseTo(50, 2);
    });

    test('y coordinate uses referenceHeight', () => {
      // Test y axis
      const yContext = { ...testContext, axis: 'y' as const };
      
      // 50% y should equal half of referenceHeight
      const yCm = unitConversionService.toInternalUnit(50, '%', 'length', yContext);
      expect(yCm).toBeCloseTo(9.5, 2); // 19.0 / 2
      
      // Convert back to percentage
      const yPercent = unitConversionService.fromInternalUnit(yCm, '%', 'length', yContext);
      expect(yPercent).toBeCloseTo(50, 2);
    });

    test('backward compatibility - no axis defaults to width', () => {
      // Test backward compatibility
      const noAxisContext = { ...testContext };
      delete (noAxisContext as any).axis;
      
      // Should default to width reference
      const cm = unitConversionService.toInternalUnit(100, '%', 'length', noAxisContext);
      expect(cm).toBeCloseTo(27.7, 2); // Uses referenceWidth
    });

    test('roundtrip stability for width', () => {
      const widthContext = { ...testContext, axis: 'width' as const };
      const originalCm = 15.0;
      
      // Convert cm to % and back
      const percent = unitConversionService.fromInternalUnit(originalCm, '%', 'length', widthContext);
      const finalCm = unitConversionService.toInternalUnit(percent, '%', 'length', widthContext);
      
      expect(finalCm).toBeCloseTo(originalCm, 2);
    });

    test('roundtrip stability for height', () => {
      const heightContext = { ...testContext, axis: 'height' as const };
      const originalCm = 10.0;
      
      // Convert cm to % and back
      const percent = unitConversionService.fromInternalUnit(originalCm, '%', 'length', heightContext);
      const finalCm = unitConversionService.toInternalUnit(percent, '%', 'length', heightContext);
      
      expect(finalCm).toBeCloseTo(originalCm, 2);
    });
  });

  describe('Error Handling', () => {
    test('throws error when referenceWidth missing for width axis', () => {
      const context = { ...testContext, axis: 'width' as const };
      delete context.referenceWidth;
      
      expect(() => {
        unitConversionService.toInternalUnit(100, '%', 'length', context);
      }).toThrow('Reference width required for percentage conversion');
    });

    test('throws error when referenceHeight missing for height axis', () => {
      const context = { ...testContext, axis: 'height' as const };
      delete context.referenceHeight;
      
      expect(() => {
        unitConversionService.toInternalUnit(100, '%', 'length', context);
      }).toThrow('Reference height required for percentage conversion');
    });
  });

  describe('Real-World Scenarios', () => {
    test('Paper active area scenario', () => {
      // Paper: 29.7 cm × 21.0 cm; margins: 1.0 cm each
      // Paper active: 27.7 cm × 19.0 cm
      const paperContext: UnitConversionContext = {
        referenceWidth: 27.7,
        referenceHeight: 19.0,
      };

      // Notes width 100% should be 27.7 cm
      const widthContext = { ...paperContext, axis: 'width' as const };
      const widthCm = unitConversionService.toInternalUnit(100, '%', 'length', widthContext);
      expect(widthCm).toBeCloseTo(27.7, 2);

      // Notes height 100% should be 19.0 cm (not 68.6%!)
      const heightContext = { ...paperContext, axis: 'height' as const };
      const heightCm = unitConversionService.toInternalUnit(100, '%', 'length', heightContext);
      expect(heightCm).toBeCloseTo(19.0, 2);

      // Verify the bug is fixed: height % should NOT use width reference
      const heightPercent = unitConversionService.fromInternalUnit(19.0, '%', 'length', heightContext);
      expect(heightPercent).toBeCloseTo(100, 2); // Should be 100%, not 68.6%
    });

    test('Clamping behavior', () => {
      const widthContext = { ...testContext, axis: 'width' as const };
      const heightContext = { ...testContext, axis: 'height' as const };

      // Test clamping for width
      const overWidthCm = unitConversionService.toInternalUnit(120, '%', 'length', widthContext);
      expect(overWidthCm).toBeCloseTo(33.24, 2); // 120% of 27.7
      
      const underWidthCm = unitConversionService.toInternalUnit(-10, '%', 'length', widthContext);
      expect(underWidthCm).toBeCloseTo(-2.77, 2); // -10% of 27.7

      // Test clamping for height
      const overHeightCm = unitConversionService.toInternalUnit(120, '%', 'length', heightContext);
      expect(overHeightCm).toBeCloseTo(22.8, 2); // 120% of 19.0
      
      const underHeightCm = unitConversionService.toInternalUnit(-10, '%', 'length', heightContext);
      expect(underHeightCm).toBeCloseTo(-1.9, 2); // -10% of 19.0
    });
  });
});
