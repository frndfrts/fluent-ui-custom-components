# Fluent UI Custom Components - Component Documentation

*This document provides detailed information about the component architecture, hierarchy, and usage patterns for the Fluent UI Custom Components library. Version 1.1.1 introduces critical percentage conversion fixes, while v1.1.0 brought comprehensive unit conversion, Storybook 9 upgrade, and enhanced interactive features.*

## 🆕 What's New in v1.1.1

### 🐛 Critical Bug Fixes
- **Fixed**: Height percentage calculations now use correct referenceHeight instead of referenceWidth
- **Fixed**: Y-coordinate percentage calculations use proper axis reference
- **Fixed**: Eliminates UX confusion where height % showed incorrect values (e.g., 68.6% instead of 100%)

### 🔧 Technical Improvements
- **Enhanced**: UnitConversionService with axis-aware percentage conversion
- **Added**: Axis property to UnitConversionContext interface for precise coordinate handling
- **Improved**: Error messages for missing axis references
- **Maintained**: Full backward compatibility with existing implementations

### 🧪 Testing & Quality
- **Added**: Comprehensive unit tests for axis-aware percentage conversion
- **Verified**: Real-world paper active area scenarios
- **Confirmed**: Roundtrip conversion stability across all axes

## 🆕 What's New in v1.1.0

### 🎨 New Components
- **TabbedNavbar**: Advanced navigation component with tab management and focus handling
- **PreviewSection**: Comprehensive preview area with integrated layout management
- **PreviewPanel**: Flexible panel system for content organization

### 🔄 Enhanced Unit Conversion System
- **Multi-System Support**: Length, temperature, volume, weight, and energy units
- **Context-Aware Calculations**: Relative units (%, vw, vh, em, rem) with proper reference handling
- **Axis-Aware Percentage**: Width/height and x/y coordinates use correct reference dimensions
- **Precision Preservation**: Full internal precision with appropriate display formatting

### 📚 Storybook 9 Upgrade
- **Latest Version**: Upgraded to Storybook 9.1.3 with modern architecture
- **Interactive Stories**: Real-time component interaction and state management
- **Enhanced Documentation**: Comprehensive examples and usage patterns

### 🎯 Component Improvements
- **DimensionInput**: Enhanced with unit systems and axis-aware calculations
- **UnitSelector**: Universal selector with built-in display mapping
- **Interactive Panels**: All panels now reflect real-time user selections

## 🏗️ Component Hierarchy

This library follows a **5-level hierarchical architecture** designed for maximum reusability, maintainability, and consistency:

```
┌─────────────────────────────────────────────────────────────┐
│                    Level 5: Sections                       │
│              (Complete UI Sections)                        │
├─────────────────────────────────────────────────────────────┤
│                    Level 4: Panels                         │
│              (Functional Panels)                           │
├─────────────────────────────────────────────────────────────┤
│                  Level 3: Compositions                     │
│              (Component Combinations)                      │
├─────────────────────────────────────────────────────────────┤
│                   Level 2: Components                      │
│              (Specialized Components)                      │
├─────────────────────────────────────────────────────────────┤
│                   Level 1: Primitives                      │
│              (Basic Building Blocks)                       │
└─────────────────────────────────────────────────────────────┘
```

### Design Principles

- **Bottom-Up Architecture**: Defaults and core logic defined at primitive level
- **Composition Over Inheritance**: Components built by combining lower-level elements
- **Consistent API**: Uniform prop patterns across all levels
- **Error Boundaries**: Robust error handling at every level
- **Accessibility First**: ARIA support and keyboard navigation throughout
- **Type Safety**: Full TypeScript coverage with strict typing
- **Unit Conversion**: Built-in unit conversion system with full precision

## 📁 Directory Structure

```
src/components/
├── 01-sections/          # Level 5: Complete UI Sections
│   ├── PaperSection.tsx
│   ├── NotesSection.tsx
│   ├── SlidesSection.tsx
│   ├── PreviewSection.tsx
│   └── ...
├── 02-panels/            # Level 4: Functional Panels
│   ├── SizeFields.tsx
│   ├── PositionFields.tsx
│   ├── ColorPanel.tsx
│   ├── PreviewPanel.tsx
│   └── ...
├── 03-compositions/      # Level 3: Component Combinations
│   ├── DimensionInput.tsx
│   ├── TabbedNavbar.tsx
│   ├── ColorInput.tsx
│   └── ...
├── 04-components/        # Level 2: Specialized Components
│   ├── UnitSelector.tsx
│   ├── ColorSelector.tsx
│   ├── PaperSelector.tsx
│   └── ...
├── 05-primitives/        # Level 1: Basic Building Blocks
│   ├── NumericInput.tsx
│   ├── HexInput.tsx
│   ├── LockAspectRatio.tsx
│   └── ...
├── error/                # Error handling components
│   └── ErrorBoundary.tsx
├── index.ts              # Main export file
└── README.md             # This file
```

## 🧩 Component Levels

### Level 1: Primitives (`05-primitives/`)

Basic building blocks with minimal dependencies and maximum reusability.

#### Available Primitives

- **NumericInput**: Advanced numeric input with stepper controls and validation
- **HexInput**: Hexadecimal color input with validation and formatting
- **SliderInput**: Fluent UI Slider wrapper with label and value display
- **ColorSliderInput**: Width-constrained slider for color applications
- **LockAspectRatio**: Checkbox component for aspect ratio locking
- **UniversalSelector**: Truly universal selector supporting various option formats

#### Usage Guidelines

```tsx
// Import primitives directly
import { NumericInput, HexInput } from '@frndfrts/fluent-ui-custom-components';

// Use with consistent prop patterns
<NumericInput
  value={100}
  onChange={setValue}
  min={0}
  max={1000}
  step={10}
  size="medium"
  disabled={false}
/>
```

### Level 2: Components (`04-components/`)

Specialized components built from primitives with domain-specific logic.

#### Available Components

- **UnitSelector**: Enhanced unit selector with 5 unit systems support
- **ColorModelSelector**: Radio group for RGB/HSL color model selection
- **PositionSelector**: 9-position grid selector for positioning
- **OrientationSelector**: Portrait/landscape orientation selector
- **AspectRatioSelector**: Common aspect ratio selector
- **PaperSelector**: Standard paper size selector

#### Usage Guidelines

```tsx
// Import components
import { UnitSelector, ColorModelSelector } from '@frndfrts/fluent-ui-custom-components';

// Use with domain-specific props
<UnitSelector
  unit="cm"
  unitSystem="length"
  units={['cm', 'mm', 'in', 'px', 'pt', '%']}
  onChange={setUnit}
  showUnitNames={true}
/>
```

### Level 3: Compositions (`03-compositions/`)

Complex functional units that combine multiple components.

#### Available Compositions

- **DimensionInput**: Enhanced number + unit input with context-aware conversions
- **TabbedNavbar**: Complete tabbed navigation bar with focus management
- **ColorInput**: Full color input with picker integration
- **ColorHexInput**: Specialized hex color input with validation
- **ColorSelector**: Color palette grid with selection
- **RGBHSLColorSlidersInput**: RGB/HSL sliders for color components
- **MultipleSlidersInput**: Multiple slider inputs in a single component

#### Usage Guidelines

```tsx
// Import compositions
import { DimensionInput, TabbedNavbar } from '@frndfrts/fluent-ui-custom-components';

// Use with complex functionality
<DimensionInput
  label="Width"
  value={15}
  unit="cm"
  unitSystem="length"
  axis="width"
  onChange={(value, unit) => console.log(value, unit)}
/>
```

### Level 4: Panels (`02-panels/`)

Functional panels that combine compositions for specific use cases.

#### Available Panels

- **SizeFields**: Width and height input with aspect ratio lock
- **PositionFields**: Position selector with X/Y coordinate inputs
- **SizeAndPositionPanel**: Combined size and position management
- **PaperSizePanel**: Paper size and orientation configuration
- **MarginsPanel**: Margin configuration for all sides
- **PaddingPanel**: Padding configuration for all sides
- **ResponsiveColorPicker**: Responsive color picker with inline labels
- **PreviewPanel**: Preview container with header and content area

#### Usage Guidelines

```tsx
// Import panels
import { SizeFields, PositionFields } from '@frndfrts/fluent-ui-custom-components';

// Use for specific functional areas
<SizeFields
  width={100}
  height={50}
  showLockAspectRatio={true}
  onChange={setSize}
  onLockAspectRatioChange={setLocked}
/>
```

### Level 5: Sections (`01-sections/`)

High-level functional areas that integrate panels for end-user functionality.

#### Available Sections

- **PaperSection**: Complete paper configuration section
- **NotesSection**: Notes and annotations configuration
- **SlidesSection**: Presentation slides configuration
- **PreviewSection**: Preview area for content display
- **ColorsSection**: Complete color theme configuration
- **Placeholder Sections**: Various placeholder sections for content areas

#### Usage Guidelines

```tsx
// Import sections
import { PaperSection, NotesSection, PreviewSection } from '@frndfrts/fluent-ui-custom-components';

// Use for complete feature areas
<PaperSection
  onPaperChange={handlePaperChange}
  onError={handleError}
/>
```

## 🔄 Unit Conversion System

### Overview

The library includes a comprehensive unit conversion system integrated at the composition level and above.

### Key Features

- **5 Unit Systems**: Length, Temperature, Volume, Weight, Energy
- **Axis-Aware Percentage**: Width/height and x/y coordinates use correct references
- **Context-Aware**: Relative units (%, vw, vh, em, rem) with proper context
- **Precision Preservation**: Full internal precision with appropriate display

### Unit Conversion Context

```tsx
import { UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

// Provide context for relative units
<UnitConversionProvider 
  referenceWidth={27.7} 
  referenceHeight={19.0}
  containerWidth={30.0}
  containerHeight={20.0}
  fontSize={0.4}
  rootFontSize={0.35}
>
  {/* Your components here */}
</UnitConversionProvider>
```

### Axis-Aware Percentage Conversion

The library now correctly handles percentage calculations for different axes:

- **Width/X Axis**: Uses `referenceWidth` for percentage calculations
- **Height/Y Axis**: Uses `referenceHeight` for percentage calculations

This ensures that:
- Width 100% = referenceWidth (e.g., 27.7 cm)
- Height 100% = referenceHeight (e.g., 19.0 cm)
- No more confusion between width and height references

### Usage in Components

```tsx
// DimensionInput with axis-aware conversion
<DimensionInput
  label="Width"
  value={15}
  unit="%"
  axis="width"  // Uses referenceWidth
  onChange={(value, unit) => console.log(value, unit)}
/>

<DimensionInput
  label="Height"
  value={10}
  unit="%"
  axis="height"  // Uses referenceHeight
  onChange={(value, unit) => console.log(value, unit)}
/>
```

## 📦 Import Guidelines

### Recommended Import Patterns

#### For End Users (Sections and Panels)

```tsx
// Import high-level sections for complete functionality
import { 
  PaperSection, 
  NotesSection, 
  PreviewSection,
  TabbedNavbar 
} from '@frndfrts/fluent-ui-custom-components';
```

#### For Custom Implementations (Compositions and Components)

```tsx
// Import compositions for custom layouts
import { 
  DimensionInput, 
  ColorInput, 
  UnitSelector 
} from '@frndfrts/fluent-ui-custom-components';
```

#### For Advanced Usage (Primitives)

```tsx
// Import primitives for maximum customization
import { 
  NumericInput, 
  HexInput, 
  UniversalSelector 
} from '@frndfrts/fluent-ui-custom-components';
```

### Import Best Practices

1. **Start High**: Begin with sections and panels for complete functionality
2. **Go Lower**: Use compositions and components for custom layouts
3. **Use Primitives**: Only when you need maximum customization
4. **Consistent Patterns**: Use the same import pattern throughout your app

## 🎯 Component Best Practices

### 1. **Error Handling**

All components include error boundaries and error callbacks:

```tsx
<DimensionInput
  label="Width"
  value={10}
  onChange={setValue}
  onError={(error) => {
    console.error('Dimension input error:', error);
    // Handle error appropriately
  }}
/>
```

### 2. **Accessibility**

Components include built-in accessibility features:

```tsx
<DimensionInput
  label="Width"
  value={10}
  ariaLabel="Width input field"
  ariaDescribedBy="width-description"
  onChange={setValue}
/>
```

### 3. **Consistent Sizing**

Use consistent size props across components:

```tsx
<DimensionInput size="medium" />
<UnitSelector size="medium" />
<ColorInput size="medium" />
```

### 4. **Unit Conversion**

Always provide context for relative units:

```tsx
<UnitConversionProvider 
  referenceWidth={27.7} 
  referenceHeight={19.0}
>
  <DimensionInput unit="%" axis="width" />
</UnitConversionProvider>
```

### 5. **Type Safety**

Use TypeScript for better type safety:

```tsx
import { DimensionInputProps } from '@frndfrts/fluent-ui-custom-components';

const props: DimensionInputProps = {
  label: "Width",
  value: 10,
  unit: "cm",
  onChange: (value, unit) => console.log(value, unit)
};
```

## 🔧 Development Guidelines

### Creating New Components

1. **Choose the Right Level**: Determine the appropriate hierarchy level
2. **Follow Naming Conventions**: Use PascalCase for component names
3. **Implement Error Boundaries**: Include error handling
4. **Add TypeScript Types**: Define proper interfaces
5. **Write Tests**: Include unit tests for all functionality
6. **Update Documentation**: Add to this README and Storybook

### Component Template

```tsx
import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { ErrorBoundary } from '../error/ErrorBoundary';

const useStyles = makeStyles({
  // Component styles
});

export interface ComponentNameProps {
  // Component props
}

export const ComponentName = React.memo<ComponentNameProps>(({
  // Destructure props
}) => {
  const styles = useStyles();
  
  // Component logic
  
  return (
    <ErrorBoundary
      fallback={ComponentNameErrorFallback}
      onError={handleError}
    >
      {/* Component JSX */}
    </ErrorBoundary>
  );
});

ComponentName.displayName = 'ComponentName';
```

### Testing Components

```tsx
// Example test structure
describe('ComponentName', () => {
  test('renders correctly', () => {
    // Test rendering
  });
  
  test('handles user interactions', () => {
    // Test interactions
  });
  
  test('handles errors gracefully', () => {
    // Test error handling
  });
});
```

## 📚 Additional Resources

- **[Usage Instructions](../USAGE_INSTRUCTIONS.md)**: Detailed usage examples
- **[Organization Setup](../ORGANIZATION_SETUP.md)**: Development and contribution guidelines
- **[Storybook](http://localhost:6006)**: Interactive component examples
- **[Unit Conversion Documentation](../UNIT_SYSTEM_ARCHITECTURE.md)**: Unit system architecture

---

**Current Version**: 1.1.1  
**Storybook Version**: 9.1.3  
**Last Updated**: December 2024