# Fluent UI Custom Components - Component Hierarchy

This document describes the organization and hierarchy of custom Fluent UI components in this project.

## 🆕 What's New in v1.1.0

### ✨ **Storybook 9 Upgrade**
- **Upgraded from v8.6.14 to v9.1.3**
- **Modern framework-based configuration**
- **Built-in addons**: Actions, Controls, Viewport, Backgrounds
- **Enhanced performance**: 566ms manager startup, 19s preview
- **Webpack 5 optimization**: Bundle splitting and caching

### 🔄 **Comprehensive Unit Conversion System**
- **5 Unit Systems**: Length, Temperature, Volume, Weight, Energy
- **Full Precision**: Internal storage in standard units (cm, °C, ml, g, J)
- **Smart Conversion**: Automatic unit conversion with proper precision
- **Context-Aware**: Support for relative units (%, vw, vh, em, rem)

### 🆕 **New Components**
- **TabbedNavbar**: Navigation component with focus management
- **PreviewSection**: Section-level preview component
- **PreviewPanel**: Panel-level preview component

### 🎯 **Interactive Storybook Stories**
- **State Management**: Proper React.useState for all stories
- **Real-time Updates**: Live component interaction
- **Enhanced Documentation**: Better examples and usage

## Component Hierarchy Overview

The components are organized into 5 levels based on their complexity and integration level:

### Level 5: Sections (`/sections`)
**Purpose**: Complete UI sections that integrate panels for end-user functionality.

**Components**:
- `PaperSection` - Complete paper configuration section
- `NotesSection` - Notes configuration section
- `SlidesSection` - Slides configuration section
- `PreviewSection` - Preview area for content display 🆕
- `ColorsSection` - Complete color theme configuration section
- `BodyPlaceholderSection` - Body content placeholder
- `TitlePlaceholderSection` - Title placeholder
- `SubtitlePlaceholderSection` - Subtitle placeholder
- `SourcePlaceholderSection` - Source placeholder
- `PageNumberPlaceholderSection` - Page number placeholder
- `LogoPlaceholderSection` - Logo placeholder
- `FootnotePlaceholderSection` - Footnote placeholder

**Characteristics**:
- Complete functional areas
- Multiple panels integrated
- End-user functionality
- Full feature sets

### Level 4: Panels (`/panels`)
**Purpose**: Layout containers with specific functionality areas.

**Components**:
- `MarginsPanel` - Margin settings panel
- `PaddingPanel` - Padding settings panel
- `PaperSizePanel` - Paper size and orientation panel
- `PositionFields` - Position and alignment fields
- `SizeAndPositionPanel` - Combined size and position panel
- `SizeFields` - Size and aspect ratio fields with unit conversion
- `ResponsiveColorPicker` - Responsive color picker with layout adaptation
- `PreviewPanel` - Preview container with header and content area 🆕

**Characteristics**:
- Layout containers
- Multiple compositions
- Form sections
- Specific functionality areas
- Unit conversion support

### Level 3: Compositions (`/compositions`)
**Purpose**: Complex functional units combining multiple components.

**Components**:
- `ColorHexInput` - Hex input with color swatch and validation
- `ColorInput` - Complete color input with model selection
- `ColorPicker` - Full color picker with standard colors and custom input
- `ColorSelector` - Color palette selector with tooltips
- `DimensionInput` - Enhanced dimension input with unit conversion and context awareness
- `MultipleSlidersInput` - Stack of sliders with aligned labels
- `ResponsiveColorPicker` - Responsive color picker with layout adaptation
- `RGBHSLColorSlidersInput` - RGB/HSL color sliders
- `LabeledColorHexInput` - Color input with label
- `LabeledColorPicker` - Color picker with label
- `TabbedNavbar` - Complete tabbed navigation bar with focus management 🆕

**Characteristics**:
- Complex state management
- Multiple components combined
- Business logic implementation
- Complete functional units
- Unit conversion integration

### Level 2: Components (`/components`)
**Purpose**: Molecule-level combinations of primitives for specific use cases.

**Components**:
- `AspectRatioSelector` - Aspect ratio selection with custom option
- `ColorModelSelector` - RGB/HSL color model selection
- `OrientationSelector` - Portrait/landscape orientation selection
- `PaperSelector` - Paper size selection dropdown
- `PositionSelector` - Position selection (top, center, bottom, etc.)
- `UniversalSelector` - Generic selector with custom options and interactive state management
- `UnitSelector` - Enhanced unit selector with 5 unit systems support

**Characteristics**:
- Combine 2-3 primitives
- Simple state management
- Domain-specific functionality
- Used by compositions and panels
- Unit system awareness

### Level 1: Primitives (`/primitives`)
**Purpose**: Atomic Fluent UI component wrappers - the fundamental building blocks.

**Components**:
- `ColorSliderInput` - Color-specific slider with label
- `HexInput` - Hex color input with validation
- `NumericInput` - Numeric input with precision control and unit-aware step values
- `SliderInput` - Generic slider with label and value display
- `UnitSelector` - Unit selection dropdown with comprehensive unit system support
- `LockAspectRatio` - Aspect ratio lock toggle

**Characteristics**:
- Direct Fluent UI component inheritance
- Single responsibility
- Minimal customization
- Reusable across the entire application
- Unit conversion foundation

### Level 0: Legacy (`/legacy`)
**Purpose**: Older components maintained for backward compatibility.

**Components**:
- `FluentColorPicker` - Legacy Fluent UI color picker
- `HorizontalColorPicker` - Legacy horizontal color picker
- `LegacyColorPicker` - Legacy color picker component
- `LegacyHexInput` - Legacy hex input component

**Characteristics**:
- Deprecated components
- Maintained for compatibility
- Not recommended for new development

## Import Guidelines

### For New Development
```typescript
// Import from the appropriate level
import { PaperSection } from './components/sections/PaperSection';
import { PaperSizePanel } from './components/panels/PaperSizePanel';
import { ColorInput } from './components/compositions/ColorInput';
import { ColorModelSelector } from './components/components/ColorModelSelector';
import { HexInput } from './components/primitives/HexInput';
import { TabbedNavbar } from './components/compositions/TabbedNavbar';
import { PreviewSection } from './components/sections/PreviewSection';
```

### For Backward Compatibility
```typescript
// Import from inputs (re-exports all levels)
import { HexInput, ColorInput, PaperSizePanel } from './components/inputs';
```

### For Unit Conversion
```typescript
// Import unit conversion utilities
import { unitConversionService, UnitConversionProvider } from './services/UnitConversionService';
import { LENGTH_SYSTEM, TEMPERATURE_SYSTEM } from './systems/UnitSystems';
```

## Migration Guide

### From Old Structure
If you were importing from the old `inputs/` folder:

**Before**:
```typescript
import { HexInput } from './components/inputs/HexInput';
import { ColorInput } from './components/inputs/ColorInput';
```

**After**:
```typescript
import { HexInput } from './components/primitives/HexInput';
import { ColorInput } from './components/compositions/ColorInput';
```

### Recommended Approach
1. **For new components**: Import directly from the appropriate level folder
2. **For existing code**: Continue using the `inputs/` re-exports for now
3. **For refactoring**: Gradually migrate to direct imports from the new structure
4. **For unit conversion**: Use the new unit conversion system for dimension inputs

## Best Practices

### Component Selection
- **Use primitives** for basic input needs
- **Use components** for domain-specific selections
- **Use compositions** for complex functional requirements
- **Use panels** for layout and form sections
- **Use sections** for complete functional areas
- **Avoid legacy** components for new development

### Naming Conventions
- All components follow PascalCase naming
- Props interfaces use `ComponentNameProps` pattern
- Export names match component names exactly

### File Organization
- Each component has its own file
- Index files provide clean exports
- Types are re-exported for convenience
- Backward compatibility is maintained through re-exports

### Unit Conversion Best Practices
- **Use appropriate unit systems** for different measurement types
- **Provide context** for relative units (%, vw, vh, em, rem)
- **Leverage unit-aware step values** for better UX
- **Store values in internal units** for consistency
- **Display values in user-selected units** for clarity

## Unit Conversion System

### Supported Unit Systems

#### **1. Length System**
- **Internal Unit**: `cm` (centimeters)
- **Units**: `cm`, `mm`, `in`, `px`, `pt`, `%`, `vw`, `vh`, `em`, `rem`
- **Precision**: Full floating-point precision
- **Context**: Required for relative units

#### **2. Temperature System**
- **Internal Unit**: `°C` (celsius)
- **Units**: `°C`, `°F`, `K` (kelvin)
- **Precision**: 1 decimal place
- **Conversions**: Automatic temperature scale conversion

#### **3. Volume System**
- **Internal Unit**: `ml` (milliliters)
- **Units**: `ml`, `l`, `oz`, `gal`, `pt`
- **Precision**: 2 decimal places
- **Conversions**: Metric and imperial volume units

#### **4. Weight System**
- **Internal Unit**: `g` (grams)
- **Units**: `g`, `kg`, `oz`, `lb`
- **Precision**: 2 decimal places
- **Conversions**: Metric and imperial weight units

#### **5. Energy System**
- **Internal Unit**: `J` (joules)
- **Units**: `J`, `cal`, `kcal`, `Wh`
- **Precision**: 2 decimal places
- **Conversions**: Various energy measurement units

### Usage Examples

#### Basic Unit Conversion
```typescript
import { unitConversionService } from './services/UnitConversionService';

// Length conversion
const inches = unitConversionService.fromInternalUnit(10, 'in', 'length');
const cm = unitConversionService.toInternalUnit(3.94, 'in', 'length');

// Temperature conversion
const fahrenheit = unitConversionService.fromInternalUnit(25, '°F', 'temperature');
const celsius = unitConversionService.toInternalUnit(77, '°F', 'temperature');
```

#### Component Integration
```tsx
<DimensionInput
  label="Width"
  value={10}
  unit="cm"
  unitSystem="length"
  units={['cm', 'mm', 'in', 'px', 'pt', '%', 'vw', 'vh']}
  onChange={(value, unit) => console.log(`${value} ${unit}`)}
  context={{
    referenceWidth: 20,
    referenceHeight: 15,
    containerWidth: 30,
    containerHeight: 20,
    fontSize: 0.4,
    rootFontSize: 0.35,
  }}
/>
```

## Positioning System and Defaults

- Default position at the lowest level: top-left
- Default positions list at the lowest level: full 3x3 grid plus Custom
- X/Y coordinate fields are only editable when position is Custom; for presets, fields are disabled but reflect computed values
- Preset coordinates are computed in SizeAndPositionPanel using inner size and outer active area and are clamped to prevent overflow
- Active area origin (0,0) is the top-left of the usable region inside outer padding/margins

### Providing the active area to SizeAndPositionPanel

You can pass either:
- Explicit active area (recommended for papers with margins): `activeX`, `activeY`, `activeWidth`, `activeHeight` (cm)
- Or outer dimensions with padding: `outerWidth`, `outerHeight`, `outerPaddingTop`, `outerPaddingRight`, `outerPaddingBottom`, `outerPaddingLeft` (cm)

When `position !== 'Custom'`, x/y are recomputed automatically on size/position/outer changes.

## Future Considerations

1. **Documentation**: Add Storybook stories for each component level
2. **Testing**: Implement comprehensive tests for each level
3. **Performance**: Monitor bundle size impact of the new structure
4. **Migration**: Plan gradual migration away from legacy components
5. **Unit Conversion**: Expand unit systems and improve precision
6. **Interactive Stories**: Enhance Storybook with more interactive examples

## Support

For questions about the component hierarchy or migration, refer to:
- Component documentation in individual files
- TypeScript definitions for prop interfaces
- Example usage in the main App.tsx file
- Unit conversion documentation: [UNIT_CONVERSION_IMPLEMENTATION.md](../UNIT_CONVERSION_IMPLEMENTATION.md)
- Unit system architecture: [UNIT_SYSTEM_ARCHITECTURE.md](../UNIT_SYSTEM_ARCHITECTURE.md)

**Current Version**: 1.1.0
**Storybook Version**: 9.1.3
**Last Updated**: December 2024