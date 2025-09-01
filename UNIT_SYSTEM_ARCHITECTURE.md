# Unit System Architecture

## Overview

The Fluent UI Custom Components library now includes a comprehensive unit system architecture that supports multiple measurement types (length, temperature, volume, weight, energy) with proper unit conversions and context-aware calculations.

## Key Features

### 🎯 **Multi-System Support**
- **Length**: cm, mm, in, px, pt, %, vw, vh, em, rem
- **Temperature**: °C, °F, K
- **Volume**: ml, l, oz, gal, pt
- **Weight**: g, kg, oz, lb
- **Energy**: J, cal, kcal, Wh

### 🔄 **Automatic Unit Conversion**
- Internal storage in standard units (cm, celsius, ml, g, joules)
- Real-time conversion between display units
- Context-aware relative unit calculations

### 🎛️ **Enhanced Components**
- **UnitSelector**: System-aware dropdown with unit metadata
- **DimensionInput**: Generic input for any measurement type
- **UnitConversionService**: Centralized conversion logic

## Architecture Components

### 1. Unit Systems (`src/systems/UnitSystems.ts`)

```typescript
interface UnitSystem {
  id: string;                      // 'length', 'volume', 'temperature', 'energy'
  name: string;                    // 'Length', 'Volume', 'Temperature', 'Energy'
  internalUnit: string;            // 'cm', 'ml', 'celsius', 'joules'
  units: UnitDefinition[];
  conversions: Record<string, number | ((value: number) => number)>;
}

interface UnitDefinition {
  symbol: string;                 // 'cm', 'in', '°C', '°F', 'ml', 'oz'
  name: string;                   // 'centimeters', 'inches', 'celsius', 'fahrenheit'
  category: 'absolute' | 'relative' | 'temperature' | 'custom';
  requiresContext?: boolean;
  contextType?: 'dimension' | 'font' | 'temperature' | 'volume';
  precision?: number;             // decimal places
  step?: number;                  // step value for input
}
```

### 2. Unit Conversion Service (`src/services/UnitConversionService.ts`)

```typescript
class UnitConversionService {
  // Convert between units within a system
  convert(value: number, fromUnit: string, toUnit: string, systemId: string, context?: UnitConversionContext): number;
  
  // Convert to/from internal unit
  toInternalUnit(value: number, unit: string, systemId: string, context?: UnitConversionContext): number;
  fromInternalUnit(value: number, unit: string, systemId: string, context?: UnitConversionContext): number;
  
  // Get unit metadata
  getStepValue(unit: string, systemId: string): number;
  getDecimalPlaces(unit: string, systemId: string): number;
  validateUnit(unit: string, systemId: string): boolean;
  requiresContext(unit: string, systemId: string): boolean;
}
```

### 3. Enhanced Components

#### UnitSelector
```typescript
interface UnitSelectorProps {
  unitSystem?: UnitSystem | string; // System object or ID
  unit?: string;                    // Legacy prop
  selectedUnit?: string;            // Enhanced prop
  availableUnits?: string[];        // Enhanced prop
  showUnitNames?: boolean;          // Show full names vs symbols
  filterUnits?: (unit: string) => boolean; // Filter function
  // ... other props
}
```

#### DimensionInput
```typescript
interface DimensionInputProps {
  unitSystem?: UnitSystem | string; // System object or ID
  value: number | '';               // Internal unit value
  unit?: string;                    // Display unit
  units?: string[];                 // Available units
  showUnitNames?: boolean;          // Show full unit names
  filterUnits?: (unit: string) => boolean; // Filter function
  // ... context props for relative units
}
```

## Usage Examples

### Basic Length Input
```tsx
import { DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function MyComponent() {
  const [value, setValue] = useState(10);
  const [unit, setUnit] = useState('cm');

  return (
    <DimensionInput
      label="Width"
      value={value}
      unit={unit}
      unitSystem="length"
      onChange={(newValue, newUnit) => {
        setValue(newValue);
        setUnit(newUnit);
      }}
    />
  );
}
```

### Temperature Input
```tsx
import { DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function TemperatureInput() {
  const [temp, setTemp] = useState(25);
  const [unit, setUnit] = useState('°C');

  return (
    <DimensionInput
      label="Temperature"
      value={temp}
      unit={unit}
      unitSystem="temperature"
      showUnitNames={true}
      onChange={(newValue, newUnit) => {
        setTemp(newValue);
        setUnit(newUnit);
      }}
    />
  );
}
```

### Volume Input with Filtering
```tsx
import { DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function VolumeInput() {
  const [volume, setVolume] = useState(500);
  const [unit, setUnit] = useState('ml');

  // Filter to show only metric units
  const filterMetricUnits = (unit: string) => {
    return ['ml', 'l'].includes(unit);
  };

  return (
    <DimensionInput
      label="Volume"
      value={volume}
      unit={unit}
      unitSystem="volume"
      filterUnits={filterMetricUnits}
      showUnitNames={true}
      onChange={(newValue, newUnit) => {
        setVolume(newValue);
        setUnit(newUnit);
      }}
    />
  );
}
```

### Context-Aware Relative Units
```tsx
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function ResponsiveInput() {
  const [width, setWidth] = useState(10);
  const [unit, setUnit] = useState('cm');

  return (
    <UnitConversionProvider
      referenceWidth={20}
      referenceHeight={15}
      containerWidth={30}
      containerHeight={20}
      fontSize={0.4}
      rootFontSize={0.35}
    >
      <DimensionInput
        label="Width"
        value={width}
        unit={unit}
        unitSystem="length"
        onChange={(newValue, newUnit) => {
          setWidth(newValue);
          setUnit(newUnit);
        }}
      />
    </UnitConversionProvider>
  );
}
```

## Unit Systems Reference

### Length System
- **Internal Unit**: cm
- **Units**: cm, mm, in, px, pt, %, vw, vh, em, rem
- **Relative Units**: %, vw, vh, em, rem (require context)

### Temperature System
- **Internal Unit**: celsius
- **Units**: °C, °F, K
- **Conversions**: Linear and non-linear (Fahrenheit)

### Volume System
- **Internal Unit**: ml
- **Units**: ml, l, oz, gal, pt
- **Conversions**: Linear scaling

### Weight System
- **Internal Unit**: g
- **Units**: g, kg, oz, lb
- **Conversions**: Linear scaling

### Energy System
- **Internal Unit**: joules
- **Units**: J, cal, kcal, Wh
- **Conversions**: Linear scaling

## Context Requirements

### Relative Units
- **%**: Requires `referenceWidth` or `referenceHeight`
- **vw**: Requires `containerWidth`
- **vh**: Requires `containerHeight`
- **em**: Requires `fontSize`
- **rem**: Requires `rootFontSize`

### Context Provider
```tsx
<UnitConversionProvider
  referenceWidth={20}    // cm
  referenceHeight={15}    // cm
  containerWidth={30}     // cm
  containerHeight={20}    // cm
  fontSize={0.4}          // cm
  rootFontSize={0.35}     // cm
>
  {/* Your components */}
</UnitConversionProvider>
```

## Migration Guide

### From Legacy to Enhanced

#### Before (Legacy)
```tsx
<DimensionInput
  label="Width"
  value={10}
  unit="cm"
  units={['cm', 'mm', 'in']}
  onChange={handleChange}
/>
```

#### After (Enhanced)
```tsx
<DimensionInput
  label="Width"
  value={10}
  unit="cm"
  unitSystem="length"
  showUnitNames={true}
  onChange={handleChange}
/>
```

### Backward Compatibility
- All legacy props are still supported
- Defaults to 'length' system if no `unitSystem` specified
- Gradual migration possible

## Advanced Features

### Custom Unit Systems
```typescript
const CUSTOM_SYSTEM: UnitSystem = {
  id: 'custom',
  name: 'Custom',
  internalUnit: 'base',
  units: [
    { symbol: 'base', name: 'base units', category: 'absolute', precision: 2, step: 0.01 },
    { symbol: 'custom', name: 'custom units', category: 'absolute', precision: 1, step: 0.1 },
  ],
  conversions: {
    'base': 1,
    'custom': 10,
  }
};

// Register with service
unitConversionService.registerSystem('custom', CUSTOM_SYSTEM);
```

### Unit Filtering
```tsx
// Show only absolute units
const filterAbsolute = (unit: string) => !['%', 'vw', 'vh', 'em', 'rem'].includes(unit);

// Show only metric units
const filterMetric = (unit: string) => ['cm', 'mm', 'ml', 'l', 'g', 'kg'].includes(unit);

<DimensionInput
  unitSystem="length"
  filterUnits={filterAbsolute}
  // ...
/>
```

### Unit Names Display
```tsx
// Show symbols: "cm", "in", "°C"
<DimensionInput showUnitNames={false} />

// Show names: "centimeters", "inches", "celsius"
<DimensionInput showUnitNames={true} />
```

## Error Handling

### Context Validation
```typescript
// Check if context is required
if (unitConversionService.requiresContext(unit, systemId)) {
  // Provide context or handle error
}

// Validate context
if (!unitConversionService.validateContext(unit, systemId, context)) {
  // Handle missing context
}
```

### Unit Validation
```typescript
// Check if unit exists in system
if (!unitConversionService.validateUnit(unit, systemId)) {
  // Handle invalid unit
}
```

## Performance Considerations

- Unit conversions are memoized using React.useMemo
- Service is singleton for consistent state
- Context validation is cached
- Minimal re-renders with proper dependency arrays

## Future Enhancements

1. **Custom Conversion Functions**: Support for complex conversion logic
2. **Unit Categories**: Group units by category (metric, imperial, etc.)
3. **Dynamic Units**: Runtime unit registration
4. **Conversion History**: Track conversion accuracy
5. **Unit Preferences**: User preference storage
6. **Internationalization**: Localized unit names and formats

## Testing

### Unit Tests
```typescript
// Test unit conversion
expect(unitConversionService.convert(10, 'cm', 'mm', 'length')).toBe(100);
expect(unitConversionService.convert(25, 'celsius', 'fahrenheit', 'temperature')).toBe(77);

// Test context validation
expect(unitConversionService.validateContext('%', 'length', { referenceWidth: 20 })).toBe(true);
expect(unitConversionService.validateContext('%', 'length', {})).toBe(false);
```

### Component Tests
```tsx
// Test component rendering
render(<DimensionInput unitSystem="temperature" value={25} unit="°C" />);
expect(screen.getByText('celsius')).toBeInTheDocument();

// Test unit change
fireEvent.change(screen.getByRole('combobox'), { target: { value: 'fahrenheit' } });
expect(onChange).toHaveBeenCalledWith(25, 'fahrenheit');
```

This architecture provides a robust, extensible foundation for handling various measurement types while maintaining backward compatibility and providing excellent developer experience.
