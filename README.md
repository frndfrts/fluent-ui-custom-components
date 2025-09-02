# Fluent UI Custom Components

A comprehensive library of custom Fluent UI components with a 5-level architecture, designed for enterprise applications. This library provides enhanced components that extend Fluent UI v9 with additional functionality, better UX patterns, and advanced features.

## 🆕 What's New in v1.2.0

### 🎨 ColorsSection Width Consistency
- **Fixed**: ColorsSection now uses 320px width to match other main sections
- **Enhanced**: Optimized label width allocation for "Followed Hyperlink:" and other labels
- **Improved**: Reduced hex input field size for better space utilization
- **Maintained**: Full functionality while achieving consistent layout

### 🔧 Component Optimizations
- **Enhanced**: LabeledColorPicker supports custom label widths
- **Improved**: HexInput uses small size (60px) for compact layouts
- **Optimized**: Better space allocation across all color picker components
- **Maintained**: Full backward compatibility with existing implementations

## 🆕 What's New in v1.1.3

### 🔧 Export Fixes
- **Fixed**: ColorsSection import now works from top-level library import
- **Fixed**: All placeholder sections now properly exported
- **Added**: Complete type exports for all sections
- **Maintained**: Full backward compatibility with existing implementations

### 📦 Library Improvements
- **Enhanced**: All sections now available via top-level import
- **Added**: Complete TypeScript support for all section components
- **Verified**: TypeScript compilation and library build successful
- **Improved**: Consistent export structure across all component levels

## 🆕 What's New in v1.1.2

### 🎯 Unified Min/Max Clamping
- **Added**: Unified clamping system based on unit system constraints and context
- **Enhanced**: Automatic min/max calculation for percentage units (0-100%)
- **Improved**: Support for custom min/max constraints in internal units
- **Maintained**: Full backward compatibility with existing implementations

### 🔧 Technical Improvements
- **Enhanced**: NumericInput handles all clamping at the primitive level
- **Added**: DimensionInput calculates appropriate min/max based on unit system
- **Improved**: Axis-aware percentage bounds calculation
- **Maintained**: Free-form typing during input with final clamp on commit

### 🧪 Testing & Quality
- **Added**: Comprehensive unit tests for unified clamping functionality
- **Verified**: Roundtrip stability and edge case handling
- **Confirmed**: Integration with SizeFields and PositionFields components

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

## 🚀 Quick Start

### Installation

```bash
npm install @frndfrts/fluent-ui-custom-components
```

### Basic Usage

```tsx
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function App() {
  return (
    <UnitConversionProvider 
      referenceWidth={27.7} 
      referenceHeight={19.0}
    >
      <DimensionInput
        label="Width"
        value={15}
        unit="cm"
        axis="width"
        onChange={(value, unit) => console.log(value, unit)}
      />
    </UnitConversionProvider>
  );
}
```

### Advanced Usage with Unit Conversion

```tsx
import { 
  DimensionInput, 
  UnitConversionProvider,
  TabbedNavbar,
  PreviewSection 
} from '@frndfrts/fluent-ui-custom-components';

function AdvancedApp() {
  return (
    <UnitConversionProvider 
      referenceWidth={27.7} 
      referenceHeight={19.0}
      containerWidth={30.0}
      containerHeight={20.0}
    >
      <TabbedNavbar
        tabs={[
          { id: 'paper', label: 'Paper', content: 'Paper settings' },
          { id: 'notes', label: 'Notes', content: 'Notes layout' },
          { id: 'slides', label: 'Slides', content: 'Slides configuration' }
        ]}
      />
      
      <PreviewSection>
        <DimensionInput
          label="Temperature"
          value={25}
          unit="°C"
          unitSystem="temperature"
          onChange={(value, unit) => console.log(value, unit)}
        />
      </PreviewSection>
    </UnitConversionProvider>
  );
}
```

## 🏗️ Architecture

This library follows a 5-level component hierarchy:

### 1. **Primitives** (`05-Primitives/`)
- Basic building blocks: `NumericInput`, `UnitSelector`, `LockAspectRatio`
- Minimal dependencies, maximum reusability
- Handle core functionality and user interactions

### 2. **Components** (`04-Components/`)
- Simple compositions: `ColorSelector`, `PaperSelector`, `OrientationSelector`
- Combine primitives with specific business logic
- Provide focused, reusable functionality

### 3. **Compositions** (`03-Compositions/`)
- Complex combinations: `DimensionInput`, `TabbedNavbar`, `RGBHSLColorSlidersInput`
- Integrate multiple components with advanced features
- Handle complex state management and interactions

### 4. **Panels** (`02-Panels/`)
- Feature-specific panels: `SizeFields`, `ColorPanel`, `PreviewPanel`
- Organize related controls into logical groups
- Provide comprehensive functionality for specific domains

### 5. **Sections** (`01-Sections/`)
- High-level sections: `PaperSection`, `NotesSection`, `PreviewSection`
- Complete feature areas with full functionality
- Integrate multiple panels with navigation and layout

## 🎯 Key Features

### **Enhanced Unit Conversion**
- **Multi-System Support**: Length, temperature, volume, weight, energy
- **Context-Aware**: Relative units with proper reference handling
- **Axis-Aware**: Width/height and x/y coordinates use correct references
- **Precision Preservation**: Full internal precision with appropriate display

### **Advanced Navigation**
- **TabbedNavbar**: Tab management with focus handling
- **PreviewSection**: Integrated layout management
- **Responsive Design**: Adapts to different screen sizes

### **Interactive Components**
- **Real-time Updates**: All components reflect user selections immediately
- **State Management**: Built-in state handling for complex interactions
- **Error Handling**: Comprehensive error boundaries and validation

### **Accessibility**
- **ARIA Support**: Full accessibility compliance
- **Keyboard Navigation**: Complete keyboard support
- **Screen Reader**: Optimized for assistive technologies

## 📚 Documentation

- **[Usage Instructions](USAGE_INSTRUCTIONS.md)**: Detailed usage examples and patterns
- **[Organization Setup](ORGANIZATION_SETUP.md)**: Development and contribution guidelines
- **[Component Documentation](src/components/README.md)**: Detailed component reference

## 🛠️ Technology Stack

- **React 18**: Latest React features and hooks
- **Fluent UI v9**: Microsoft's design system
- **TypeScript**: Full type safety and IntelliSense
- **Storybook 9.1.3**: Component development and documentation
- **Rollup**: Modern module bundling
- **Jest**: Comprehensive testing framework

## 🤝 Contributing

We welcome contributions! Please see our [Organization Setup](ORGANIZATION_SETUP.md) guide for development guidelines and contribution process.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Current Version**: 1.2.0  
**Storybook Version**: 9.1.3  
**Last Updated**: December 2024