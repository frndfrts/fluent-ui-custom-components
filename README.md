# Fluent UI Custom Components Library

A comprehensive, enterprise-grade React component library built on Microsoft Fluent UI v9, providing advanced form controls, layout systems, and specialized components for professional applications.

## 🏢 **Organization Library**

This is a **private organization library** published to GitHub Packages. For setup and usage instructions within your organization, see:

- **[ORGANIZATION_SETUP.md](./ORGANIZATION_SETUP.md)** - Complete setup guide for admins and team members
- **[USAGE_INSTRUCTIONS.md](./USAGE_INSTRUCTIONS.md)** - Detailed usage instructions for developers

## 🚀 **Quick Start (Organization Members)**

```bash
# Install the package
npm install @your-org/fluent-ui-custom-components

# Import components
import { ColorsSection } from '@your-org/fluent-ui-custom-components';
```

**Note**: Replace `your-org` with your actual GitHub organization name.

## 🏗️ **Project Overview**

This library implements a sophisticated 5-level component architecture designed for maximum reusability, maintainability, and consistency. Built with TypeScript, React 18, and Fluent UI v9, it provides a complete solution for building professional applications with pixel-perfect layouts and advanced functionality.

## 📚 **Table of Contents**

- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Component Architecture](#component-architecture)
- [Primitives (Level 1)](#primitives-level-1)
- [Components (Level 2)](#components-level-2)
- [Compositions (Level 3)](#compositions-level-3)
- [Panels (Level 4)](#panels-level-4)
- [Sections (Level 5)](#sections-level-5)
- [Hooks & Utilities](#hooks--utilities)
- [Type System](#type-system)
- [Styling & Layout](#styling--layout)
- [Error Handling](#error-handling)
- [Testing & Development](#testing--development)
- [API Reference](#api-reference)
- [Examples & Demos](#examples--demos)
- [Contributing](#contributing)

## 🏛️ **Architecture Overview**

The library follows a **5-level hierarchical architecture** that ensures proper separation of concerns and maximum reusability:

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

### **Design Principles**

- **Bottom-Up Architecture**: Defaults and core logic defined at primitive level
- **Composition Over Inheritance**: Components built by combining lower-level elements
- **Consistent API**: Uniform prop patterns across all levels
- **Error Boundaries**: Robust error handling at every level
- **Accessibility First**: ARIA support and keyboard navigation throughout
- **Type Safety**: Full TypeScript coverage with strict typing

## 🛠️ **Technology Stack**

### **Core Dependencies**
- **React**: 18.2.0 (Latest stable)
- **TypeScript**: 4.9.0 (Strict mode enabled)
- **Fluent UI**: 9.68.3 (Latest v9 release)
- **Build Tools**: React Scripts 5.0.1

### **Key Libraries**
- **@fluentui/react-components**: Core UI components
- **@fluentui/react-icons**: Icon system
- **@ctrl/tinycolor**: Advanced color manipulation
- **Web Vitals**: Performance monitoring

### **Development Tools**
- **Storybook**: 8.6.14 (Component documentation)
- **Jest**: 27.5.1 (Testing framework)
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting

## 🚀 **Installation & Setup**

### **Prerequisites**
- Node.js 16+ 
- npm 8+ or yarn 1.22+
- Modern browser with ES6+ support

### **Installation**
```bash
# Clone the repository
git clone https://github.com/your-org/fluent-ui-custom-components.git
cd fluent-ui-custom-components

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Start Storybook
npm run storybook
```

### **Environment Setup**
```bash
# Development
npm start          # http://localhost:3000

# Storybook
npm run storybook  # http://localhost:6006

# Testing
npm test           # Jest test runner
npm run test:coverage  # Coverage report
```

## 🧩 **Component Architecture**

### **Level 1: Primitives**
Basic building blocks with minimal dependencies and maximum reusability.

### **Level 2: Components**
Specialized components built from primitives with domain-specific logic.

### **Level 3: Compositions**
Logical combinations of components providing higher-level functionality.

### **Level 4: Panels**
Functional panels that combine compositions for specific use cases.

### **Level 5: Sections**
Complete UI sections that integrate panels for end-user functionality.

## 🔧 **Primitives (Level 1)**

### **NumericInput**
Advanced numeric input with stepper controls, validation, and accessibility.

**Features:**
- Step up/down buttons with continuous stepping
- Comprehensive validation (min/max, decimal places)
- Full ARIA support and keyboard navigation
- Multiple size variants (small, medium, large)
- Custom width support and error handling

**Props:**
```typescript
interface NumericInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
  decimalPlaces?: number;
  nonNegative?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  ariaLabel?: string;
}
```

**Usage:**
```tsx
<NumericInput
  value={100}
  onChange={setValue}
  min={0}
  max={1000}
  step={10}
  decimalPlaces={2}
  size="medium"
  label="Quantity"
/>
```

### **SliderInput**
Fluent UI Slider wrapper with label and value display.

**Features:**
- Standard Fluent UI Slider component
- Integrated label and value display
- CSS Grid layout for perfect alignment
- Small size variant for compact layouts

**Props:**
```typescript
interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
}
```

### **ColorSliderInput**
Width-constrained slider input for color applications.

**Features:**
- Matches ColorModelSelector width
- Responsive width calculation
- Integrated with form layout system

### **HexInput**
Hexadecimal color input with validation and formatting.

**Features:**
- Real-time hex color validation
- Automatic hash prefix handling
- Color preview swatch
- Full accessibility support

### **LockAspectRatio**
Checkbox component for aspect ratio locking functionality.

**Features:**
- Centered layout using pure CSS
- Standard Fluent UI Checkbox
- Self-contained styling
- Context-independent positioning

### **UniversalSelector**
Truly universal selector supporting both string arrays and label-value objects.

**Features:**
- Flexible options format
- Built-in sorting capabilities
- Custom option support
- Consistent with other selectors

## 🎯 **Components (Level 2)**

### **UnitSelector**
Dropdown for selecting units of measurement with cm as default.

**Features:**
- Default units: ['cm', 'mm', 'in', 'pt', 'px']
- Default unit: 'cm'
- Configurable unit list
- Alphabetical sorting option
- Full accessibility support

**Props:**
```typescript
interface UnitSelectorProps {
  unit?: string;
  units?: string[];
  onChange: (unit: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  sortAlphabetically?: boolean;
}
```

### **ColorModelSelector**
Radio group for selecting color models (RGB/HSL).

**Features:**
- RGB and HSL color model options
- Default selection (RGB)
- Proper value capitalization
- Integrated with color system

### **PositionSelector**
Selector for positioning with 9-position grid system.

**Features:**
- 3x3 position grid (top-left, top-center, top-right, etc.)
- Middle positions: middle-left, middle-center, middle-right
- Custom position option
- Proper capitalization display
- No duplicate "Custom" options

### **OrientationSelector**
Selector for paper/document orientation.

**Features:**
- Portrait/Landscape options
- Centered layout using FormLayoutProvider
- Consistent with other selectors

### **AspectRatioSelector**
Selector for common aspect ratios.

**Features:**
- Standard ratios (16:9, 4:3, 1:1, etc.)
- Custom ratio option
- Integrated with aspect ratio system

### **PaperSelector**
Selector for standard paper sizes.

**Features:**
- A4, Letter, Legal, etc.
- Custom size option
- Integrated with paper size management

## 🔗 **Compositions (Level 3)**

### **DimensionInput**
Combines NumericInput and UnitSelector for dimension input.

**Features:**
- Integrated numeric input and unit selection
- Automatic unit conversion
- Consistent form layout
- Error handling and validation

**Props:**
```typescript
interface DimensionInputProps {
  label: string;
  value: number | '';
  unit?: string;
  units?: string[];
  onChange: (value: number | '', unit: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  hideLabel?: boolean;
}
```

### **ColorInput**
Combines ColorSelector with additional controls.

**Features:**
- Color picker integration
- Model selection
- Hex input support
- Advanced color management

### **ColorHexInput**
Specialized hex color input with validation.

**Features:**
- Real-time validation
- Color preview
- Error handling
- Accessibility support

### **MultipleSlidersInput**
Multiple slider inputs in a single component.

**Features:**
- Configurable slider count
- Individual validation
- Consistent layout
- Error aggregation

### **RGBHSLColorSlidersInput**
Specialized sliders for RGB/HSL color components.

**Features:**
- RGB and HSL mode support
- Real-time color updates
- Integrated with color system
- Validation and error handling

### **ColorPicker**
Advanced color picker with multiple input methods.

**Features:**
- Multiple color input formats
- Real-time preview
- Validation and error handling
- Accessibility support

## 🎛️ **Panels (Level 4)**

### **SizeFields**
Panel for width and height input with aspect ratio lock.

**Features:**
- Width and height inputs
- Optional aspect ratio locking
- Full precision calculations
- Stepper button support
- Error handling and validation

**Props:**
```typescript
interface SizeFieldsProps {
  width?: number;
  height?: number;
  widthUnit?: string;
  heightUnit?: string;
  units?: string[];
  showLockAspectRatio?: boolean;
  lockAspectRatio?: boolean;
  onLockAspectRatioChange?: (locked: boolean) => void;
  onChange: (fields: SizeFieldsData) => void;
  disabled?: boolean;
}
```

**Aspect Ratio Locking:**
- Stores reference dimensions when locked
- Uses full precision float values for calculations
- Maintains perfect proportional relationships
- Works with all input methods (typing, stepper buttons)

### **PositionFields**
Panel for position and coordinate input.

**Features:**
- Position selector (9-position grid)
- X and Y coordinate inputs
- Unit selection
- Custom position support

### **SizeAndPositionPanel**
Combines SizeFields and PositionFields.

**Features:**
- Integrated size and position management
- Consistent unit handling
- Aspect ratio locking support
- Error handling and validation

### **PaperSizePanel**
Panel for paper size and orientation.

**Features:**
- Paper size selection
- Width and height inputs
- Orientation selection
- Integrated validation

### **MarginsPanel**
Panel for margin input and management.

**Features:**
- Top, right, bottom, left margins
- Unit selection
- Validation and error handling
- Consistent with other panels

### **PaddingPanel**
Panel for padding input and management.

**Features:**
- Top, right, bottom, left padding
- Unit selection
- Validation and error handling
- Consistent with other panels

### **ResponsiveColorPicker**
Advanced color picker panel with inline label support.

**Features:**
- Multiple color input methods
- Real-time preview
- Validation and error handling
- Accessibility support
- Inline label display (Label: Color Swatch Hex Input)
- Responsive layout switching

**Props:**
```typescript
interface ResponsiveColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string; // Optional label to display inline
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  allowEmpty?: boolean;
  validateOnChange?: boolean;
  breakpoint?: number;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
}
```

**Usage:**
```tsx
<ResponsiveColorPicker
  value="#FF0000"
  onChange={setColor}
  label="Primary Color"
  size="medium"
/>
```

## 🏠 **Sections (Level 5)**

### **PaperSection**
Complete paper configuration section.

**Features:**
- Paper size and orientation
- Margin settings
- Integrated validation
- Error handling

### **NotesSection**
Notes configuration section.

**Features:**
- Size and position management
- Margin settings
- Aspect ratio locking
- Integrated validation

### **SlidesSection**
Slides configuration section.

**Features:**
- Size and position management
- Margin settings
- Aspect ratio locking
- Integrated validation

### **Placeholder Sections**
Seven specialized placeholder sections:

#### **TitlePlaceholderSection**
- Size and position management
- Padding settings (not margins)
- Aspect ratio locking
- Integrated validation

#### **SubtitlePlaceholderSection**
- Size and position management
- Padding settings
- Aspect ratio locking
- Integrated validation

#### **BodyPlaceholderSection**
- Size and position management
- Padding settings
- Aspect ratio locking
- Integrated validation

#### **FootnotePlaceholderSection**
- Size and position management
- Padding settings
- Aspect ratio locking
- Integrated validation

#### **SourcePlaceholderSection**
- Size and position management
- Padding settings
- Aspect ratio locking
- Integrated validation

#### **LogoPlaceholderSection**
- Size and position management
- Padding settings
- Aspect ratio locking
- Integrated validation

#### **PageNumberPlaceholderSection**
- Size and position management
- Padding settings
- Aspect ratio locking
- Integrated validation

### **ColorsSection**
Complete color theme configuration section with inline labels.

**Features:**
- 12 standard PowerPoint color theme labels
- ResponsiveColorPicker integration for each color
- Inline label display (Label: Color Swatch Hex Input)
- Vertical arrangement in compact card layout
- Default PowerPoint theme colors
- Custom color override support
- Error handling and validation

**Color Theme Labels:**
- **Accent Colors**: Accent 1-6 (primary theme colors)
- **Dark Colors**: Dark 1-2 (text and emphasis colors)
- **Light Colors**: Light 1-2 (background and subtle colors)
- **Hyperlink Colors**: Hyperlink and Followed Hyperlink

**Props:**
```typescript
interface ColorsSectionProps {
  colors?: {
    accent1?: string;
    accent2?: string;
    accent3?: string;
    accent4?: string;
    accent5?: string;
    accent6?: string;
    dark1?: string;
    dark2?: string;
    light1?: string;
    light2?: string;
    hyperlink?: string;
    followedHyperlink?: string;
  };
  onColorChange?: (colorKey: string, color: string) => void;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  disabled?: boolean;
}
```

**Usage:**
```tsx
<ColorsSection
  colors={{
    accent1: '#FF6B35',
    accent2: '#00FF00',
    accent3: '#0000FF'
  }}
  onColorChange={(colorKey, color) => console.log(`${colorKey}: ${color}`)}
/>
```

## 🪝 **Hooks & Utilities**

### **useUnitConversion**
Comprehensive unit conversion system.

**Features:**
- CM as internal storage unit
- Support for: cm, mm, in, px, pt, %
- Precise conversion factors
- Decimal place management
- Error handling

**Usage:**
```typescript
const { cmToDisplay, displayToCm } = useUnitConversion();

// Convert cm to display unit
const displayValue = cmToDisplay(10, 'in'); // 3.94 inches

// Convert display unit to cm
const cmValue = displayToCm(3.94, 'in'); // 10 cm
```

### **usePaperSizeManager**
Paper size and orientation management.

**Features:**
- Paper size presets
- Orientation handling
- Dimension calculations
- Validation and error handling

### **useColorManager**
Advanced color management system.

**Features:**
- Multiple color formats
- Real-time conversion
- Validation and error handling
- Accessibility support

### **useFormValidation**
Comprehensive form validation.

**Features:**
- Multiple validation types
- Real-time validation
- Error aggregation
- Accessibility support

### **Utility Hooks**
- **useDebounce**: Input debouncing
- **useThrottle**: Event throttling
- **useLocalStorage**: Local storage management
- **useClickOutside**: Click outside detection
- **useHover**: Hover state management
- **useFocus**: Focus state management
- **useKeyPress**: Keyboard event handling
- **useScrollPosition**: Scroll position tracking
- **useWindowSize**: Window size management
- **useMediaQuery**: Media query handling
- **useNetworkStatus**: Network status monitoring
- **useGeolocation**: Geolocation support
- **useCopyToClipboard**: Clipboard operations
- **useAsync**: Async operation management
- **useInterval**: Interval management
- **useTimeout**: Timeout management

## 🏷️ **Type System**

### **Core Types**
```typescript
export type ComponentSize = 'small' | 'medium' | 'large';
export type Unit = 'cm' | 'mm' | 'in' | 'px' | 'pt' | '%';

export interface BaseComponentProps {
  size?: ComponentSize;
  disabled?: boolean;
  className?: string;
}
```

### **Data Interfaces**
```typescript
export interface SizeFieldsData {
  width: number;
  height: number;
  widthUnit?: string;
  heightUnit?: string;
}

export interface PositionFieldsData {
  position: string;
  x: number;
  y: number;
  xUnit?: string;
  yUnit?: string;
}

export interface MarginsData {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topUnit?: string;
  rightUnit?: string;
  bottomUnit?: string;
  leftUnit?: string;
}

export interface PaddingData {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topUnit?: string;
  rightUnit?: string;
  bottomUnit?: string;
  leftUnit?: string;
}

export interface PaperSizeData {
  width: number;
  height: number;
  widthUnit: string;
  heightUnit: string;
  orientation: string;
  paperSize: string;
}
```

### **Validation Types**
```typescript
export interface ValidationOptions {
  min?: number;
  max?: number;
  nonNegative?: boolean;
  allowEmpty?: boolean;
  allowNegative?: boolean;
  allowDecimal?: boolean;
  minValue?: number;
  maxValue?: number;
  maxDecimalPlaces?: number;
}

export interface ValidationResult {
  isValid: boolean;
  value: number | string | null;
  error: string | null;
}
```

### **Event Handler Types**
```typescript
export type ChangeHandler<T> = (value: T) => void;
export type UnitChangeHandler = (value: number | '', unit: string) => void;
export type SizeChangeHandler = (fields: SizeFieldsData) => void;
export type PositionChangeHandler = (fields: PositionFieldsData) => void;
export type MarginsChangeHandler = (margins: MarginsData) => void;
export type PaddingChangeHandler = (padding: PaddingData) => void;
export type PaperSizeChangeHandler = (paperSize: PaperSizeData) => void;
```

## 🎨 **Styling & Layout**

### **FormLayoutContext**
Consistent form layout system.

**Features:**
- Label width standardization
- Control width consistency
- Spacing uniformity
- Responsive adjustments

**Usage:**
```tsx
<FormLayoutProvider>
  <YourFormComponent />
</FormLayoutProvider>
```

### **Common Styles**
Shared styling utilities and tokens.

**Features:**
- Consistent spacing
- Color token usage
- Typography standards
- Layout patterns

### **Layout Tokens**
Standardized layout measurements.

**Features:**
- Consistent component sizes
- Spacing standardization
- Width and height tokens
- Responsive breakpoints

## 🚨 **Error Handling**

### **ErrorBoundary**
Robust error handling at component level.

**Features:**
- Component-level error isolation
- User-friendly error messages
- Recovery mechanisms
- Error reporting

### **Error Handling Patterns**
Consistent error handling throughout the library.

**Features:**
- Try-catch blocks in all handlers
- User-friendly error messages
- Error callback support
- Graceful degradation

## 🧪 **Testing & Development**

### **Testing Framework**
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Coverage Reports**: Comprehensive test coverage
- **Storybook**: Component development and documentation

### **Development Tools**
- **ESLint**: Code quality enforcement
- **TypeScript**: Static type checking
- **Hot Reloading**: Fast development iteration
- **Error Overlay**: Runtime error display

### **Testing Commands**
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- NumericInput.test.tsx
```

## 📖 **API Reference**

### **Component Props**
All components follow consistent prop patterns:

- **Base Props**: `size`, `disabled`, `className`
- **Value Props**: `value`, `onChange`
- **Validation Props**: `min`, `max`, `validationOptions`
- **Accessibility Props**: `ariaLabel`, `ariaDescribedBy`
- **Error Props**: `onError`, `errorBoundary`

### **Event Handling**
Consistent event handling patterns:

- **Change Events**: `onChange(value)`
- **Error Events**: `onError(error, errorInfo)`
- **Validation Events**: `onValidation(validationResult)`
- **Focus Events**: `onFocus`, `onBlur`

### **Styling System**
Flexible styling system:

- **Size Variants**: `small`, `medium`, `large`
- **Custom Widths**: `width`, `minWidth`, `maxWidth`
- **Responsive**: `fullWidth`, `responsive`
- **Theme Integration**: Fluent UI token system

## 🎯 **Examples & Demos**

### **Basic Usage**
```tsx
import { NumericInput, UnitSelector } from 'fluent-ui-custom-components';

function BasicExample() {
  const [value, setValue] = useState(100);
  const [unit, setUnit] = useState('cm');

  return (
    <div>
      <NumericInput
        value={value}
        onChange={setValue}
        min={0}
        max={1000}
        step={10}
        label="Width"
      />
      <UnitSelector
        unit={unit}
        onChange={setUnit}
        units={['cm', 'mm', 'in']}
      />
    </div>
  );
}
```

### **Advanced Usage**
```tsx
import { SizeFields, PositionFields } from 'fluent-ui-custom-components';

function AdvancedExample() {
  const [size, setSize] = useState({ width: 100, height: 50 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div>
      <SizeFields
        width={size.width}
        height={size.height}
        onChange={setSize}
        showLockAspectRatio={true}
        onLockAspectRatioChange={(locked) => console.log('Locked:', locked)}
      />
      <PositionFields
        x={position.x}
        y={position.y}
        onChange={setPosition}
        positions={['top-left', 'center', 'bottom-right']}
      />
    </div>
  );
}
```

### **Complete Section**
```tsx
import { TitlePlaceholderSection } from 'fluent-ui-custom-components';

function SectionExample() {
  const [size, setSize] = useState({ width: 200, height: 100 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [padding, setPadding] = useState({ top: 10, right: 15, bottom: 10, left: 15 });

  return (
    <TitlePlaceholderSection
      size={size}
      onSizeChange={setSize}
      position={position}
      onPositionChange={setPosition}
      padding={padding}
      onPaddingChange={setPadding}
      units={['cm', 'mm', 'in']}
      showLockAspectRatio={true}
    />
  );
}
```

## 🤝 **Contributing**

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Install dependencies: `npm install`
4. Start development server: `npm start`
5. Make your changes
6. Run tests: `npm test`
7. Submit a pull request

### **Code Standards**
- **TypeScript**: Strict mode enabled
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Testing**: Minimum 80% coverage
- **Documentation**: JSDoc comments required

### **Component Guidelines**
- **Architecture**: Follow 5-level hierarchy
- **Props**: Consistent naming and types
- **Error Handling**: Implement ErrorBoundary
- **Accessibility**: ARIA support required
- **Testing**: Unit tests for all components

### **Pull Request Process**
1. **Description**: Clear description of changes
2. **Testing**: All tests passing
3. **Documentation**: Updated README if needed
4. **Examples**: Storybook stories updated
5. **Review**: Code review required

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Microsoft Fluent UI Team**: For the excellent base component library
- **React Team**: For the amazing framework
- **TypeScript Team**: For the powerful type system
- **Open Source Community**: For inspiration and contributions

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/your-org/fluent-ui-custom-components/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/fluent-ui-custom-components/discussions)
- **Documentation**: [Storybook](http://localhost:6006) (when running locally)
- **Email**: support@your-org.com

---

**Built with ❤️ by the Fluent UI Custom Components Team**

*Last updated: December 2024*
*Version: 0.1.0*
*React: 18.2.0*
*Fluent UI: 9.68.3*