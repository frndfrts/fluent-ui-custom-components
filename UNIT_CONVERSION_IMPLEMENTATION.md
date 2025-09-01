# Enhanced Unit Conversion Implementation

## Overview

This document describes the comprehensive enhancement of unit conversion functionality in the Fluent UI Custom Components library. The implementation provides context-aware unit conversions, unit-specific step values, and proper precision handling for all dimension-related components.

## Key Features

### ✅ **Context-Aware Unit Conversions**
- **Percentage (%)**: Requires reference dimensions (width/height) for proper calculations
- **Viewport Units (vw/vh)**: Uses container dimensions for relative calculations
- **Font-Relative Units (em/rem)**: Uses font size context for proper scaling
- **Absolute Units**: Standard conversions (cm, mm, in, px, pt)

### ✅ **Unit-Specific Step Values**
- **px/pt**: Step by 1 (whole numbers)
- **mm**: Step by 0.1 (1 decimal place)
- **cm**: Step by 0.01 (2 decimal places)
- **in**: Step by 0.001 (3 decimal places)
- **%**: Step by 0.1 (1 decimal place)
- **vw/vh**: Step by 0.1 (1 decimal place)
- **em/rem**: Step by 0.01 (2 decimal places)

### ✅ **Precision Preservation**
- Internal storage always in cm with full precision
- Display values formatted according to unit-specific decimal places
- No precision loss during unit conversions

### ✅ **Context Provider System**
- `UnitConversionProvider` for sharing reference dimensions
- Fallback to props when context not available
- Hierarchical context resolution

## Implementation Details

### Core Hook: `useUnitConversion`

```typescript
export interface UnitConversionContext {
  referenceWidth?: number;   // For percentage calculations (in cm)
  referenceHeight?: number;  // For percentage calculations (in cm)
  containerWidth?: number;   // For viewport-relative units (in cm)
  containerHeight?: number;  // For viewport-relative units (in cm)
  fontSize?: number;         // For em calculations (in cm)
  rootFontSize?: number;     // For rem calculations (in cm)
}

export interface UnitConversionState {
  cmToDisplay: (cmValue: number, targetUnit: Unit, context?: UnitConversionContext) => number;
  displayToCm: (displayValue: number, sourceUnit: Unit, context?: UnitConversionContext) => number;
  formatDisplayValue: (cmValue: number, targetUnit: Unit, context?: UnitConversionContext) => string;
  getStepValue: (unit: Unit) => number;
  getDecimalPlaces: (unit: Unit) => number;
  validateContext: (unit: Unit, context?: UnitConversionContext) => boolean;
}
```

### Unit-Specific Step Values

```typescript
export const UNIT_STEPS: Record<Unit, number> = {
  'px': 1,      // Whole pixels
  'pt': 1,      // Whole points
  'mm': 0.1,    // 0.1mm precision
  'cm': 0.01,   // 0.01cm precision
  'in': 0.001,  // 0.001in precision
  '%': 0.1,     // 0.1% precision
  'vw': 0.1,    // 0.1vw precision
  'vh': 0.1,    // 0.1vh precision
  'em': 0.01,   // 0.01em precision
  'rem': 0.01,  // 0.01rem precision
};
```

### Context Provider

```typescript
export const UnitConversionProvider: React.FC<UnitConversionProviderProps> = ({
  children,
  referenceWidth,
  referenceHeight,
  containerWidth,
  containerHeight,
  fontSize,
  rootFontSize,
}) => {
  // Provides context to all child components
};
```

## Usage Examples

### Basic Usage

```tsx
import { DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function MyComponent() {
  const [width, setWidth] = useState(10); // cm
  const [unit, setUnit] = useState('cm');

  return (
    <DimensionInput
      label="Width"
      value={width}
      unit={unit}
      onChange={(value, newUnit) => {
        setWidth(value);
        setUnit(newUnit);
      }}
    />
  );
}
```

### With Context Provider

```tsx
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function MyComponent() {
  return (
    <UnitConversionProvider
      referenceWidth={20}    // 20cm reference width
      referenceHeight={15}   // 15cm reference height
      containerWidth={30}    // 30cm container width
      containerHeight={20}   // 20cm container height
      fontSize={0.4}         // 0.4cm font size
      rootFontSize={0.35}   // 0.35cm root font size
    >
      <DimensionInput
        label="Width"
        value={5}           // 5cm = 25% of 20cm reference
        unit="%"
        onChange={handleChange}
      />
    </UnitConversionProvider>
  );
}
```

### Multiple Inputs with Shared Context

```tsx
function DocumentEditor() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(5);

  return (
    <UnitConversionProvider
      referenceWidth={width}
      referenceHeight={height}
      containerWidth={30}
      containerHeight={20}
    >
      <div>
        <DimensionInput
          label="Width"
          value={width}
          unit="cm"
          onChange={(value, unit) => setWidth(value)}
        />
        <DimensionInput
          label="Height"
          value={height}
          unit="cm"
          onChange={(value, unit) => setHeight(value)}
        />
        <DimensionInput
          label="Margin"
          value={2}         // 2cm = 20% of 10cm width
          unit="%"
          onChange={handleMarginChange}
        />
      </div>
    </UnitConversionProvider>
  );
}
```

## Conversion Examples

### Percentage Calculations

```typescript
// Input: 5cm with 20cm reference width
// Output: 25% (5/20 * 100)

// Input: 25% with 20cm reference width  
// Output: 5cm (25/100 * 20)
```

### Viewport Unit Calculations

```typescript
// Input: 7.5cm with 30cm container width
// Output: 25vw (7.5/30 * 100)

// Input: 25vw with 30cm container width
// Output: 7.5cm (25/100 * 30)
```

### Font-Relative Calculations

```typescript
// Input: 0.8cm with 0.4cm font size
// Output: 2em (0.8/0.4)

// Input: 2em with 0.4cm font size
// Output: 0.8cm (2 * 0.4)
```

## Error Handling

### Context Validation

```typescript
// Throws error if context missing for relative units
if (!validateContext(unit, context)) {
  throw new Error(`Context required for unit '${unit}' but not provided`);
}
```

### Precision Preservation

```typescript
// Internal storage always in cm
const cmValue = displayToCm(displayValue, sourceUnit, context);

// Display formatting per unit
const displayValue = cmToDisplay(cmValue, targetUnit, context);
const formattedValue = displayValue.toFixed(getDecimalPlaces(targetUnit));
```

## Component Integration

### Updated Components

1. **DimensionInput**: Enhanced with context support and unit-aware steps
2. **UnitSelector**: Extended with new units (vw, vh, em, rem)
3. **NumericInput**: Uses unit-specific step values and decimal places
4. **All Panels**: Updated to use enhanced unit conversion

### Backward Compatibility

- Existing components continue to work without changes
- Context is optional - components fall back to absolute units
- No breaking changes to existing APIs

## Testing

### Storybook Stories

The implementation includes comprehensive Storybook stories demonstrating:

- Basic unit conversions
- Context-aware percentage calculations
- Viewport unit handling
- Font-relative unit conversions
- Interactive examples with context providers
- Multiple inputs with shared context

### Unit Tests

All conversion functions are thoroughly tested with:

- Edge cases and error conditions
- Precision validation
- Context validation
- Unit-specific behavior

## Performance Considerations

### Optimizations

- Memoized conversion functions
- Context object memoization
- Step value caching
- Decimal place caching

### Memory Usage

- Minimal overhead for context providers
- Efficient context resolution
- No unnecessary re-renders

## Migration Guide

### For Existing Users

No changes required - existing code continues to work.

### For New Features

1. **Add Context Provider** for relative unit support
2. **Use Enhanced DimensionInput** with context props
3. **Leverage Unit-Specific Steps** for better UX

### For Advanced Usage

1. **Custom Context Providers** for specific use cases
2. **Context Hierarchies** for complex layouts
3. **Dynamic Context Updates** for responsive designs

## Future Enhancements

### Planned Features

1. **CSS Unit Support**: ch, ex, vmin, vmax
2. **Dynamic Context**: Auto-detection of reference dimensions
3. **Unit Preferences**: User-configurable default units
4. **Conversion History**: Track unit changes for undo/redo

### Performance Improvements

1. **Web Workers**: Offload heavy conversions
2. **Caching**: Cache frequently used conversions
3. **Lazy Loading**: Load unit conversion logic on demand

## Conclusion

The enhanced unit conversion implementation provides a robust, flexible, and user-friendly system for handling dimension inputs with proper precision, context awareness, and unit-specific behavior. The implementation maintains backward compatibility while adding powerful new capabilities for modern web applications.
