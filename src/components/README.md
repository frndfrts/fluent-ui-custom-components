# Fluent UI Custom Components - Component Hierarchy

This document describes the organization and hierarchy of custom Fluent UI components in this project.

## Component Hierarchy Overview

The components are organized into 5 levels based on their complexity and integration level:

### Level 1: Primitives (`/primitives`)
**Purpose**: Atomic Fluent UI component wrappers - the fundamental building blocks.

**Components**:
- `ColorSliderInput` - Color-specific slider with label
- `HexInput` - Hex color input with validation
- `NumericInput` - Numeric input with precision control
- `SliderInput` - Generic slider with label and value display
- `UnitSelector` - Unit selection dropdown

**Characteristics**:
- Direct Fluent UI component inheritance
- Single responsibility
- Minimal customization
- Reusable across the entire application

### Level 2: Components (`/components`)
**Purpose**: Molecule-level combinations of primitives for specific use cases.

**Components**:
- `AspectRatioSelector` - Aspect ratio selection with custom option
- `ColorModelSelector` - RGB/HSL color model selection
- `OrientationSelector` - Portrait/landscape orientation selection
- `PaperSelector` - Paper size selection dropdown
- `PositionSelector` - Position selection (top, center, bottom, etc.)
- `UniversalSelector` - Generic selector with custom options

**Characteristics**:
- Combine 2-3 primitives
- Simple state management
- Domain-specific functionality
- Used by compositions and panels

### Level 3: Compositions (`/compositions`)
**Purpose**: Complex functional units combining multiple components.

**Components**:
- `ColorHexInput` - Hex input with color swatch and validation
- `ColorInput` - Complete color input with model selection
- `ColorPicker` - Full color picker with standard colors and custom input
- `ColorSelector` - Color palette selector with tooltips
- `DimensionInput` - Dimension input with unit selection
- `MultipleSlidersInput` - Stack of sliders with aligned labels
- `ResponsiveColorPicker` - Responsive color picker with layout adaptation
- `RGBHSLColorSlidersInput` - RGB/HSL color sliders

**Characteristics**:
- Complex state management
- Multiple components combined
- Business logic implementation
- Complete functional units

### Level 4: Panels (`/panels`)
**Purpose**: Layout containers with specific functionality areas.

**Components**:
- `MarginsPanel` - Margin settings panel
- `PaddingPanel` - Padding settings panel
- `PaperSizePanel` - Paper size and orientation panel
- `PositionFields` - Position and alignment fields
- `SizeAndPositionPanel` - Combined size and position panel
- `SizeFields` - Size and aspect ratio fields

**Characteristics**:
- Layout containers
- Multiple compositions
- Form sections
- Specific functionality areas

### Level 5: Legacy (`/legacy`)
**Purpose**: Older components maintained for backward compatibility.

**Components**:
- `FluentColorPicker` - Legacy Fluent UI color picker
- `HorizontalColorPicker` - Legacy horizontal color picker

**Characteristics**:
- Deprecated components
- Maintained for compatibility
- Not recommended for new development

## Import Guidelines

### For New Development
```typescript
// Import from the appropriate level
import { HexInput } from './components/primitives/HexInput';
import { ColorModelSelector } from './components/components/ColorModelSelector';
import { ColorInput } from './components/compositions/ColorInput';
import { PaperSizePanel } from './components/panels/PaperSizePanel';
```

### For Backward Compatibility
```typescript
// Import from inputs (re-exports all levels)
import { HexInput, ColorInput, PaperSizePanel } from './components/inputs';
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

## Best Practices

### Component Selection
- **Use primitives** for basic input needs
- **Use components** for domain-specific selections
- **Use compositions** for complex functional requirements
- **Use panels** for layout and form sections
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

## Future Considerations

1. **Documentation**: Add Storybook stories for each component level
2. **Testing**: Implement comprehensive tests for each level
3. **Performance**: Monitor bundle size impact of the new structure
4. **Migration**: Plan gradual migration away from legacy components

## Support

For questions about the component hierarchy or migration, refer to:
- Component documentation in individual files
- TypeScript definitions for prop interfaces
- Example usage in the main App.tsx file 