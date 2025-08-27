# Fluent UI Custom Components - Usage Instructions

This document provides comprehensive step-by-step instructions on how to use the components from this library in a different React application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Component Categories](#component-categories)
5. [Detailed Component Examples](#detailed-component-examples)
6. [Advanced Configuration](#advanced-configuration)
7. [Troubleshooting](#troubleshooting)
8. [Migration Guide](#migration-guide)

## Prerequisites

Before using this component library, ensure your project has:

- **Node.js** version 16 or higher
- **React** version 18 or higher
- **TypeScript** (recommended) or JavaScript
- A modern bundler (Webpack, Vite, Parcel, etc.)
- **Organization Access**: Access to the private GitHub organization repository
- **GitHub Token**: Personal Access Token with appropriate permissions

## Organization Setup

This is a **private organization library** published to GitHub Packages. Before installation, you must:

1. **Configure npm for GitHub Packages** - Create `.npmrc` in your project root:
   ```ini
   @frndfrts:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

2. **Set GitHub Token** - Set your GitHub Personal Access Token:
   ```bash
   export GITHUB_TOKEN=your_github_personal_access_token
   ```

3. **Contact Organization Admin** - Ensure you have access to the repository and packages

For detailed setup instructions, see [ORGANIZATION_SETUP.md](./ORGANIZATION_SETUP.md).

## Installation

### Step 1: Install the Package

```bash
npm install @frndfrts/fluent-ui-custom-components
# or
yarn add @frndfrts/fluent-ui-custom-components
# or
pnpm add @frndfrts/fluent-ui-custom-components

### Step 2: Install Peer Dependencies

This library requires Fluent UI v9 as a peer dependency:

```bash
npm install @fluentui/react-components
# or
yarn add @fluentui/react-components
# or
pnpm add @fluentui/react-components
```

### Step 3: Install Additional Dependencies (if needed)

Some components may require additional packages:

```bash
npm install @fluentui/react-icons
# or
yarn add @fluentui/react-icons
# or
pnpm add @fluentui/react-icons
```

## Basic Usage

### Step 1: Import Components

```typescript
// Import individual components
import { ColorsSection } from '@frndfrts/fluent-ui-custom-components';

// Import multiple components
import { 
  ColorsSection, 
  ColorPicker, 
  HexInput,
  UnitSelector 
} from '@frndfrts/fluent-ui-custom-components';

// Import all components
import * as FluentComponents from '@frndfrts/fluent-ui-custom-components';
```

### Step 2: Set Up Providers

Wrap your app with the required Fluent UI providers:

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { FormLayoutProvider } from '@frndfrts/fluent-ui-custom-components';

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <FormLayoutProvider>
        {/* Your app content */}
        <MyComponent />
      </FormLayoutProvider>
    </FluentProvider>
  );
}
```

### Step 3: Use Components

```tsx
import { ColorsSection } from 'fluent-ui-custom-components';

function MyComponent() {
  const handleColorChange = (color: string) => {
    console.log('Selected color:', color);
  };

  return (
    <div>
      <h1>My Color Picker</h1>
      <ColorsSection
        selectedColor="#ff0000"
        onColorChange={handleColorChange}
        showHexInput={true}
        showRGBInput={true}
        showHSLInput={true}
      />
    </div>
  );
}
```

## Component Categories

### 1. Sections (High-Level Components)
- **ColorsSection**: Complete color management interface
- **AspectRatioSection**: Aspect ratio selection and management
- **SizeSection**: Size and dimension controls

### 2. Panels (Medium-Level Components)
- **ColorPicker**: Main color selection interface
- **AspectRatioSelector**: Aspect ratio selection panel
- **SizeFields**: Size input fields

### 3. Compositions (Combined Components)
- **ColorHexInput**: Hex color input with validation
- **ColorInput**: RGB/HSL color input
- **UnitSelector**: Unit selection with conversion

### 4. Components (Individual UI Elements)
- **Button**: Custom button component
- **Input**: Custom input component
- **Select**: Custom select component

### 5. Primitives (Base Components)
- **NumericInput**: Number input with validation
- **TextInput**: Text input with formatting
- **Toggle**: Toggle switch component

## Detailed Component Examples

### ColorsSection Component

```tsx
import { ColorsSection } from 'fluent-ui-custom-components';

function ColorManagementApp() {
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [showHexInput, setShowHexInput] = useState(true);
  const [showRGBInput, setShowRGBInput] = useState(true);
  const [showHSLInput, setShowHSLInput] = useState(false);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Additional logic: save to database, update theme, etc.
  };

  const handleError = (error: string) => {
    console.error('Color error:', error);
    // Handle errors: show notification, fallback to default, etc.
  };

  return (
    <div className="color-app">
      <h1>Color Management</h1>
      
      <ColorsSection
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
        onError={handleError}
        showHexInput={showHexInput}
        showRGBInput={showRGBInput}
        showHSLInput={showHSLInput}
        disabled={false}
        size="medium"
      />
      
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={showHexInput}
            onChange={(e) => setShowHexInput(e.target.checked)}
          />
          Show Hex Input
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={showRGBInput}
            onChange={(e) => setShowRGBInput(e.target.checked)}
          />
          Show RGB Input
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={showHSLInput}
            onChange={(e) => setShowHSLInput(e.target.checked)}
          />
          Show HSL Input
        </label>
      </div>
      
      <div className="current-color">
        <h3>Current Color: {selectedColor}</h3>
        <div 
          className="color-preview" 
          style={{ backgroundColor: selectedColor, width: '100px', height: '100px' }}
        />
      </div>
    </div>
  );
}
```

### AspectRatioSelector Component

```tsx
import { AspectRatioSelector } from 'fluent-ui-custom-components';

function ImageEditor() {
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [customRatio, setCustomRatio] = useState({ width: 16, height: 9 });
  const [showCustom, setShowCustom] = useState(false);

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio);
    // Update image canvas, crop guides, etc.
  };

  const handleCustomRatioChange = (width: number, height: number) => {
    setCustomRatio({ width, height });
    setAspectRatio(`${width}:${height}`);
  };

  const handleError = (error: string) => {
    console.error('Aspect ratio error:', error);
    // Show error message to user
  };

  const customPresets = [
    { label: 'Instagram Post', ratio: '1:1' },
    { label: 'Instagram Story', ratio: '9:16' },
    { label: 'Twitter Post', ratio: '16:9' },
    { label: 'LinkedIn Post', ratio: '1.91:1' }
  ];

  return (
    <div className="image-editor">
      <h2>Image Editor</h2>
      
      <AspectRatioSelector
        aspectRatio={aspectRatio}
        onChange={handleAspectRatioChange}
        customRatio={customRatio}
        onError={handleError}
        size="medium"
        disabled={false}
        showCustom={showCustom}
        presets={customPresets}
        label="Aspect Ratio"
      />
      
      <div className="editor-controls">
        <button onClick={() => setShowCustom(!showCustom)}>
          {showCustom ? 'Hide' : 'Show'} Custom Ratio
        </button>
      </div>
      
      <div className="canvas-preview">
        <div 
          className="canvas"
          style={{
            width: '400px',
            height: '400px',
            border: '2px solid #ccc',
            position: 'relative'
          }}
        >
          <div 
            className="crop-guide"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: aspectRatio === '16:9' ? '320px' : '200px',
              height: aspectRatio === '16:9' ? '180px' : '200px',
              border: '2px dashed #0078d4',
              backgroundColor: 'rgba(0, 120, 212, 0.1)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

### UnitSelector Component

```tsx
import { UnitSelector } from 'fluent-ui-custom-components';

function MeasurementApp() {
  const [value, setValue] = useState(100);
  const [unit, setUnit] = useState('cm');
  const [customUnits, setCustomUnits] = useState([
    { value: 'px', label: 'Pixels' },
    { value: 'pt', label: 'Points' },
    { value: 'in', label: 'Inches' }
  ]);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    // Convert and update other unit displays
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    // Convert value to new unit
  };

  const handleError = (error: string) => {
    console.error('Unit error:', error);
    // Show error notification
  };

  const handleCustomUnitAdd = (unit: string, label: string) => {
    setCustomUnits(prev => [...prev, { value: unit, label }]);
  };

  return (
    <div className="measurement-app">
      <h2>Measurement Converter</h2>
      
      <UnitSelector
        value={value}
        unit={unit}
        onValueChange={handleValueChange}
        onUnitChange={handleUnitChange}
        onError={handleError}
        customUnits={customUnits}
        onCustomUnitAdd={handleCustomUnitAdd}
        size="medium"
        disabled={false}
        showCustom={true}
        label="Measurement"
      />
      
      <div className="conversions">
        <h3>Conversions</h3>
        <div className="conversion-grid">
          <div className="conversion-item">
            <span>Centimeters:</span>
            <span>{unit === 'cm' ? value : (value * 2.54).toFixed(2)} cm</span>
          </div>
          <div className="conversion-item">
            <span>Inches:</span>
            <span>{unit === 'in' ? value : (value / 2.54).toFixed(2)} in</span>
          </div>
          <div className="conversion-item">
            <span>Pixels:</span>
            <span>{unit === 'px' ? value : (value * 37.795).toFixed(0)} px</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### SizeFields Component

```tsx
import { SizeFields } from 'fluent-ui-custom-components';

function LayoutEditor() {
  const [sizes, setSizes] = useState({
    width: 800,
    height: 600,
    depth: 100
  });
  const [units, setUnits] = useState({
    width: 'px',
    height: 'px',
    depth: 'mm'
  });

  const handleSizeChange = (dimension: string, value: number) => {
    setSizes(prev => ({ ...prev, [dimension]: value }));
    // Update layout preview, validate constraints, etc.
  };

  const handleUnitChange = (dimension: string, unit: string) => {
    setUnits(prev => ({ ...prev, [dimension]: unit }));
    // Convert values to new units
  };

  const handleError = (error: string) => {
    console.error('Size error:', error);
    // Show error message
  };

  return (
    <div className="layout-editor">
      <h2>Layout Editor</h2>
      
      <SizeFields
        sizes={sizes}
        units={units}
        onSizeChange={handleSizeChange}
        onUnitChange={handleUnitChange}
        onError={handleError}
        disabled={false}
        size="medium"
        showDepth={true}
        label="Dimensions"
      />
      
      <div className="layout-preview">
        <h3>Layout Preview</h3>
        <div 
          className="preview-container"
          style={{
            width: '400px',
            height: '300px',
            border: '2px solid #ccc',
            position: 'relative'
          }}
        >
          <div 
            className="preview-element"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${(sizes.width / 10)}px`,
              height: `${(sizes.height / 10)}px`,
              backgroundColor: '#0078d4',
              border: '1px solid #005a9e'
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

## Advanced Configuration

### Custom Theme Integration

```tsx
import { FluentProvider, createDarkTheme } from '@fluentui/react-components';
import { FormLayoutProvider } from 'fluent-ui-custom-components';

// Create custom theme
const customTheme = createDarkTheme({
  colorNeutralBackground1: '#1a1a1a',
  colorNeutralForeground1: '#ffffff',
  colorBrandBackground: '#0078d4',
  colorBrandForeground1: '#ffffff',
});

function App() {
  return (
    <FluentProvider theme={customTheme}>
      <FormLayoutProvider>
        <YourApp />
      </FormLayoutProvider>
    </FluentProvider>
  );
}
```

### Error Boundary Integration

```tsx
import { ErrorBoundary } from 'react-error-boundary';
import { ColorsSection } from 'fluent-ui-custom-components';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
      }}
    >
      <ColorsSection
        selectedColor="#ff0000"
        onColorChange={(color) => console.log(color)}
        onError={(error) => console.error(error)}
      />
    </ErrorBoundary>
  );
}
```

### Custom Validation

```tsx
import { ColorsSection } from 'fluent-ui-custom-components';

function App() {
  const validateColor = (color: string) => {
    // Custom validation logic
    if (color === '#000000') {
      throw new Error('Black is not allowed');
    }
    return true;
  };

  const handleColorChange = (color: string) => {
    try {
      if (validateColor(color)) {
        console.log('Valid color:', color);
        // Process color
      }
    } catch (error) {
      console.error('Invalid color:', error.message);
      // Handle validation error
    }
  };

  return (
    <ColorsSection
      selectedColor="#ff0000"
      onColorChange={handleColorChange}
      onError={(error) => console.error(error)}
    />
  );
}
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Components Not Rendering

**Problem**: Components appear blank or don't render
**Solution**: Ensure you have the required providers:

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { FormLayoutProvider } from 'fluent-ui-custom-components';

// Wrap your app with these providers
<FluentProvider theme={webLightTheme}>
  <FormLayoutProvider>
    <YourComponents />
  </FormLayoutProvider>
</FluentProvider>
```

#### 2. TypeScript Errors

**Problem**: TypeScript compilation errors
**Solution**: Check your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-jsx",
    "moduleResolution": "node"
  }
}
```

#### 3. Styling Issues

**Problem**: Components look unstyled
**Solution**: Ensure Fluent UI CSS is imported:

```tsx
import '@fluentui/react-components/dist/web-components.css';
```

#### 4. Event Handler Errors

**Problem**: Event handlers not working
**Solution**: Check prop names and types:

```tsx
// Correct
<ColorsSection onColorChange={handleColorChange} />

// Incorrect
<ColorsSection onChange={handleColorChange} />
```

#### 5. Bundle Size Issues

**Problem**: Large bundle size
**Solution**: Use tree-shaking imports:

```tsx
// Good - only imports what you need
import { ColorsSection } from 'fluent-ui-custom-components';

// Avoid - imports everything
import * as Components from 'fluent-ui-custom-components';
```

## Migration Guide

### From React App to Component Library

If you're migrating from using these components in a React app to using them as a library:

#### Step 1: Update Imports

```tsx
// Before (local components)
import { ColorsSection } from './components/sections/ColorsSection';

// After (library components)
import { ColorsSection } from 'fluent-ui-custom-components';
```

#### Step 2: Update Dependencies

```bash
# Remove local component dependencies
npm uninstall @fluentui/react-components

# Install library package
npm install fluent-ui-custom-components

# Reinstall peer dependencies
npm install @fluentui/react-components
```

#### Step 3: Update Build Configuration

```json
// package.json
{
  "scripts": {
    "build": "rollup -c",
    "dev": "storybook dev -p 6006"
  }
}
```

### From Other Component Libraries

#### Step 1: Identify Replacements

| Current Library | This Library | Notes |
|----------------|---------------|-------|
| `@mui/material` | `fluent-ui-custom-components` | Different design system |
| `antd` | `fluent-ui-custom-components` | Different design system |
| `chakra-ui` | `fluent-ui-custom-components` | Different design system |

#### Step 2: Update Component Usage

```tsx
// Before (Material-UI)
import { TextField } from '@mui/material';

<TextField label="Color" value={color} onChange={handleChange} />

// After (This Library)
import { HexInput } from 'fluent-ui-custom-components';

<HexInput value={color} onChange={handleChange} label="Color" />
```

#### Step 3: Update Styling

```tsx
// Before (Material-UI theme)
import { ThemeProvider, createTheme } from '@mui/material';

// After (Fluent UI theme)
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
```

## Best Practices

### 1. Component Organization

- Group related components together
- Use consistent naming conventions
- Implement proper error boundaries

### 2. Performance Optimization

- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Avoid unnecessary re-renders

### 3. Accessibility

- Provide proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

### 4. Testing

- Write unit tests for components
- Test error scenarios
- Validate prop types

### 5. Documentation

- Document component props
- Provide usage examples
- Include accessibility notes

## Support and Resources

### Documentation
- [Storybook Demo](http://localhost:6006) (when running locally)
- [Fluent UI Documentation](https://react.fluentui.dev/)
- [Component API Reference](./src/components/index.ts)

### Getting Help
- Check the troubleshooting section above
- Review component stories in Storybook
- Examine the source code for implementation details

### Contributing
- Report issues with detailed reproduction steps
- Suggest improvements through pull requests
- Follow the project's coding standards

---

**Note**: This library is designed to work with Fluent UI v9. If you encounter compatibility issues, ensure you're using the correct version of Fluent UI and React.
