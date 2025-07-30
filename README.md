# Fluent UI Custom Components

A comprehensive collection of specialized UI components built with Microsoft Fluent UI v9, designed specifically for dimension and color management applications.

## 🎯 Purpose & Scope

This component library addresses the specific needs of applications requiring precise dimension controls, color management, and layout tools. Whether you're building design software, CAD applications, or document editors, these components provide the building blocks for professional-grade user interfaces.

## 🏗️ Component Hierarchy

The components are organized into a 5-level hierarchy based on complexity and integration level:

- **Primitives** (Level 1): Atomic Fluent UI component wrappers
- **Components** (Level 2): Molecule-level combinations of primitives
- **Compositions** (Level 3): Complex functional units combining multiple components
- **Panels** (Level 4): Layout containers with specific functionality areas
- **Legacy** (Level 5): Older components maintained for backward compatibility

See [Component Hierarchy Documentation](./src/components/README.md) for detailed information.

## 🚀 Quick Start

### Installation

```bash
npm install
npm start
```

### Basic Usage

```typescript
import { HexInput } from './components/primitives/HexInput';
import { ColorInput } from './components/compositions/ColorInput';
import { PaperSizePanel } from './components/panels/PaperSizePanel';

// Use components directly
<HexInput value="#FF0000" onChange={handleColorChange} />
<ColorInput value="#00FF00" onChange={handleColorChange} />
<PaperSizePanel onChange={handlePaperSizeChange} />
```

## 🛠️ Technology Stack

- **React 18+** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Fluent UI v9** - Microsoft's design system
- **CSS-in-JS** - Scoped styling with makeStyles
- **Design Tokens** - Consistent spacing, colors, and typography

## 📁 Project Structure

```
src/
├── components/
│   ├── primitives/          # Level 1: Atomic components
│   ├── components/          # Level 2: Molecule-level components
│   ├── compositions/        # Level 3: Complex functional units
│   ├── panels/             # Level 4: Layout containers
│   ├── legacy/             # Level 5: Backward compatibility
│   └── inputs/             # Re-exports for backward compatibility
├── hooks/                  # Custom React hooks
├── styles/                 # Shared styles and design tokens
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## 🎨 Component Categories

### Primitives (Level 1)
Fundamental building blocks like inputs, selectors, and sliders:
- `HexInput` - Hex color input with validation
- `NumericInput` - Numeric input with precision control
- `SliderInput` - Generic slider with label and value display
- `UnitSelector` - Unit selection dropdown
- `ColorSliderInput` - Color-specific slider with label

### Components (Level 2)
Specialized combinations of atomic components for specific use cases:
- `AspectRatioSelector` - Aspect ratio selection with custom option
- `ColorModelSelector` - RGB/HSL color model selection
- `OrientationSelector` - Portrait/landscape orientation selection
- `PaperSelector` - Paper size selection dropdown
- `PositionSelector` - Position selection (top, center, bottom, etc.)
- `UniversalSelector` - Generic selector with custom options

### Compositions (Level 3)
Complete panels and complex UI patterns ready for production use:
- `ColorInput` - Complete color input with model selection
- `ColorPicker` - Full color picker with standard colors and custom input
- `ColorSelector` - Color palette selector with tooltips
- `DimensionInput` - Dimension input with unit selection
- `ResponsiveColorPicker` - Responsive color picker with layout adaptation

### Panels (Level 4)
Layout containers with specific functionality areas:
- `MarginsPanel` - Margin settings panel
- `PaddingPanel` - Padding settings panel
- `PaperSizePanel` - Paper size and orientation panel
- `SizeAndPositionPanel` - Combined size and position panel

## 🔧 Development

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint
```

### Adding New Components

1. **Choose the appropriate level** based on component complexity
2. **Follow naming conventions**: PascalCase for components, `ComponentNameProps` for interfaces
3. **Add to index file**: Export from the appropriate level's index.ts
4. **Update documentation**: Add to the component hierarchy documentation
5. **Add to navigation**: Update the categories in App.tsx

### Import Guidelines

**For new development:**
```typescript
import { HexInput } from './components/primitives/HexInput';
import { ColorInput } from './components/compositions/ColorInput';
```

**For backward compatibility:**
```typescript
import { HexInput, ColorInput } from './components/inputs';
```

## 🎯 Integration

All components are built on top of Fluent UI v9 and integrate seamlessly with existing Fluent UI applications. They follow the same design patterns, use the same design tokens, and maintain accessibility standards.

## 📚 Documentation

- [Component Hierarchy](./src/components/README.md) - Detailed component organization
- [Individual Component Files](./src/components/) - Component-specific documentation
- [Example Usage](./src/App.tsx) - Live examples and demonstrations

## 🤝 Contributing

1. Follow the existing component hierarchy
2. Maintain backward compatibility where possible
3. Add comprehensive TypeScript types
4. Include proper documentation
5. Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:
1. Check the component hierarchy documentation
2. Review the example usage in App.tsx
3. Examine TypeScript definitions for prop interfaces
4. Open an issue with detailed information about your use case 