# Fluent UI Custom Components

A comprehensive collection of specialized UI components built with Microsoft Fluent UI v9, designed specifically for dimension and color management applications with a sophisticated layout system for pixel-perfect alignment and Card-based Section components optimized for sidebar integration.

## 🎯 Purpose & Scope

This component library addresses the specific needs of applications requiring precise dimension controls, color management, and layout tools. Whether you're building design software, CAD applications, document editors, or template layout design tools, these components provide the building blocks for professional-grade user interfaces with consistent alignment, spacing, and organized Section-based layouts.

## 🏗️ Component Hierarchy

The components are organized into a 6-level hierarchy based on complexity and integration level:

- **Sections** (Level 5): High-level functional areas with Card-based containers
- **Panels** (Level 4): Layout containers with specific functionality areas
- **Compositions** (Level 3): Complex functional units combining multiple components
- **Components** (Level 2): Molecule-level combinations of primitives
- **Primitives** (Level 1): Atomic Fluent UI component wrappers
- **Legacy** (Level 6): Older components maintained for backward compatibility

See [Component Hierarchy Documentation](./src/components/README.md) for detailed information.

## 🎨 Layout System

The component library features a sophisticated layout system that ensures pixel-perfect alignment across all form components:

### Design Tokens (`src/styles/layoutTokens.ts`)
- Centralized layout constants for label widths, control widths, and spacing
- Responsive sizing support (small, medium, large)
- Consistent grid-based layouts

### Form Layout Context (`src/styles/FormLayoutContext.tsx`)
- React Context provider for layout specifications
- Automatic sizing calculations based on component size
- Seamless integration with all form components

### Key Features
- **Perfect Alignment**: All labels and controls align precisely across different component types
- **"Lego Brick" Architecture**: Components fit together naturally without manual adjustments
- **Responsive Design**: Automatic scaling based on component size
- **Context-Driven**: Layout specifications provided via React Context

## 🃏 Section Components

The library now includes high-level Section components that provide organized, Card-based containers for different functional areas:

### Section Features
- **Card-Based Design**: Each Section is wrapped in a Fluent UI Card with professional styling
- **Sidebar Optimized**: Dimensions and spacing optimized for sidebar menu integration
- **Clear Hierarchy**: Distinct Section titles with proper emphasis and visual separation
- **Integrated Panels**: Combines multiple related panels into cohesive functional areas
- **FormLayoutProvider**: Seamless integration with the layout system

### Available Sections
- **PaperSection**: Paper configuration including size, orientation, and margins
- **NotesSection**: Notes layout with size, position, and margin controls
- **SlidesSection**: Slides configuration with size, position, and margin settings

## 🚀 Quick Start

### Installation

```bash
npm install
npm start
```

### Basic Usage

```typescript
import { FormLayoutProvider } from './components/primitives';
import { PaperSection } from './components/sections/PaperSection';
import { NotesSection } from './components/sections/NotesSection';
import { SlidesSection } from './components/sections/SlidesSection';

// Use Section components for organized layouts
<PaperSection 
  paperSize={{ width: 21, height: 29.7, widthUnit: 'cm', heightUnit: 'cm', orientation: 'portrait', paperSize: 'A4' }}
  margins={{ top: 2.5, right: 2.5, bottom: 2.5, left: 2.5, topUnit: 'cm', rightUnit: 'cm', bottomUnit: 'cm', leftUnit: 'cm' }}
  onPaperSizeChange={handlePaperSizeChange}
  onMarginsChange={handleMarginsChange}
/>

// Or use individual panels with layout provider
<FormLayoutProvider size="medium">
  <PaperSizePanel onChange={handlePaperSizeChange} />
  <MarginsPanel onChange={handleMarginsChange} />
</FormLayoutProvider>
```

## 🛠️ Technology Stack

- **React 18+** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Fluent UI v9** - Microsoft's design system with Card components
- **CSS-in-JS** - Scoped styling with makeStyles
- **Design Tokens** - Consistent spacing, colors, and typography
- **React Context** - Layout system state management
- **Card Components** - Professional container styling for organized layouts

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/            # Level 5: High-level functional areas
│   ├── panels/              # Level 4: Layout containers
│   ├── compositions/        # Level 3: Complex functional units
│   ├── components/          # Level 2: Molecule-level components
│   ├── primitives/          # Level 1: Atomic components
│   ├── legacy/              # Level 6: Backward compatibility
│   └── inputs/              # Re-exports for backward compatibility
├── hooks/                   # Custom React hooks
├── styles/                  # Layout system and design tokens
│   ├── layoutTokens.ts      # Centralized layout constants
│   ├── FormLayoutContext.tsx # Layout context provider
│   └── commonStyles.ts      # Shared styles
├── types/                   # TypeScript type definitions
└── utils/                   # Utility functions
```

## 🎨 Component Categories

### Sections (Level 5)
High-level functional areas with Card-based containers:
- `PaperSection` - Complete paper configuration with Card styling
- `NotesSection` - Notes layout management with organized panels
- `SlidesSection` - Slides configuration with professional appearance

### Panels (Level 4)
Complete layout containers with integrated functionality:
- `MarginsPanel` - Margin settings with pixel-perfect alignment
- `PaddingPanel` - Padding settings with consistent spacing
- `PaperSizePanel` - Paper size, dimensions, and orientation selection
- `SizeAndPositionPanel` - Combined size and position controls
- `PositionFields` - Position selector with X/Y coordinates
- `SizeFields` - Width/height inputs with aspect ratio lock

### Compositions (Level 3)
Complex functional units combining multiple components:
- `ColorInput` - Complete color input with model selection
- `ColorPicker` - Full color picker with standard colors and custom input
- `ColorSelector` - Color palette selector with tooltips
- `DimensionInput` - Dimension input with unit selection (supports layout context)
- `ResponsiveColorPicker` - Responsive color picker with layout adaptation
- `ColorHexInput` - Hex input with color swatch and validation
- `MultipleSlidersInput` - Stack of sliders with aligned labels
- `RGBHSLColorSlidersInput` - RGB/HSL color sliders

### Components (Level 2)
Specialized combinations of atomic components:
- `AspectRatioSelector` - Aspect ratio selection with custom option
- `ColorModelSelector` - RGB/HSL color model selection
- `OrientationSelector` - Portrait/landscape orientation selection
- `PaperSelector` - Paper size selection dropdown (supports layout context)
- `PositionSelector` - Position selection (top, center, bottom, etc.) (supports layout context)
- `UniversalSelector` - Generic selector with custom options

### Primitives (Level 1)
Fundamental building blocks with integrated layout support:
- `HexInput` - Hex color input with validation
- `NumericInput` - Numeric input with precision control and stepper buttons
- `SliderInput` - Generic slider with label and value display
- `UnitSelector` - Unit selection dropdown
- `ColorSliderInput` - Color-specific slider with label
- `LockAspectRatio` - Aspect ratio lock checkbox with perfect positioning

### Legacy (Level 6)
Backward compatibility components:
- `FluentColorPicker` - Original Fluent UI color picker wrapper
- `HorizontalColorPicker` - Horizontal layout color picker
- `LegacyColorPicker` - Legacy color picker implementation

## 🔧 Development

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint
```

### Layout System Integration

When creating new components:

1. **Use FormLayoutProvider** at the panel level
2. **Consume useFormLayout()** in components that need alignment
3. **Follow sizing patterns** from existing components
4. **Test alignment** with other components in the same panel

Example:
```typescript
import { useFormLayout } from '../../styles/FormLayoutContext';

export const MyComponent = () => {
  const layout = useFormLayout();
  
  const labelStyle = {
    width: `${layout.labelWidth}px`,
    textAlign: 'right'
  };
  
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      <div style={labelStyle}>Label:</div>
      <input style={{ width: `${layout.combinedControlWidth}px` }} />
    </div>
  );
};
```

### Adding New Components

1. **Choose the appropriate level** based on component complexity
2. **Follow naming conventions**: PascalCase for components, `ComponentNameProps` for interfaces
3. **Integrate with layout system** if the component renders labels or form controls
4. **Add to index file**: Export from the appropriate level's index.ts
5. **Update documentation**: Add to this README and component hierarchy documentation
6. **Add to navigation**: Update the categories in App.tsx

### Import Guidelines

**For new development with layout system:**
```typescript
import { FormLayoutProvider } from './components/primitives';
import { PaperSection } from './components/sections/PaperSection';
import { PaperSizePanel } from './components/panels/PaperSizePanel';
import { DimensionInput } from './components/compositions/DimensionInput';
import { LockAspectRatio } from './components/primitives/LockAspectRatio';
```

**For backward compatibility:**
```typescript
import { HexInput, ColorInput } from './components/inputs';
```

## 🎯 Integration

All components are built on top of Fluent UI v9 and integrate seamlessly with existing Fluent UI applications. They follow the same design patterns, use the same design tokens, and maintain accessibility standards. The layout system extends Fluent UI's design philosophy with precise alignment capabilities, while the new Section components provide organized, Card-based layouts perfect for sidebar integration.

### Key Integration Features

- **Fluent UI v9 Compatible**: All components use Fluent UI tokens and patterns
- **Card-Based Sections**: Professional container styling for organized layouts
- **Sidebar Optimized**: Dimensions and spacing designed for sidebar menu integration
- **Accessibility First**: ARIA labels, keyboard navigation, screen reader support
- **Theme Integration**: Automatic adaptation to Fluent UI themes
- **Responsive Design**: Components adapt to different screen sizes
- **TypeScript Support**: Full type safety with comprehensive interfaces

## 📚 Documentation

- [Component Hierarchy](./src/components/README.md) - Detailed component organization
- [Layout System](./src/styles/) - Design tokens and context documentation
- [Individual Component Files](./src/components/) - Component-specific documentation
- [Example Usage](./src/App.tsx) - Live examples and demonstrations

## 🤝 Contributing

1. Follow the existing component hierarchy
2. Integrate with the layout system for form components
3. Maintain backward compatibility where possible
4. Add comprehensive TypeScript types
5. Include proper documentation
6. Test alignment with other components
7. Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:
1. Check the component hierarchy documentation
2. Review the layout system implementation in `/src/styles/`
3. Examine the example usage in App.tsx
4. Look at TypeScript definitions for prop interfaces
5. Open an issue with detailed information about your use case

---

## 🌟 Key Features

- **Pixel-Perfect Alignment**: Advanced layout system ensures consistent spacing and alignment
- **"Lego Brick" Architecture**: Components fit together seamlessly without manual adjustments
- **Card-Based Sections**: Professional container styling for organized, sidebar-ready layouts
- **Fluent UI v9 Integration**: Built on Microsoft's latest design system
- **Type Safety**: Comprehensive TypeScript support throughout
- **Responsive Design**: Automatic scaling and adaptation
- **Accessibility First**: WCAG compliance and screen reader support
- **Production Ready**: Battle-tested components for professional applications
- **Sidebar Optimized**: Perfect for template layout design tools and sidebar menus