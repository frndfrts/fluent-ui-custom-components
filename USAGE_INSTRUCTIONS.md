# Fluent UI Custom Components - Usage Instructions

This document provides comprehensive instructions on how to use the Fluent UI Custom Components library in your projects, including basic, intermediate, and advanced examples.

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

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **React** (version 18 or higher)
- **TypeScript** (recommended) or JavaScript
- A modern bundler (Webpack, Vite, Parcel, etc.)
- **GitHub Access**: Access to the private GitHub repository
- **GitHub Token**: Personal Access Token with `read:packages` permission

## Setup & Installation

### Step 1: Configure npm for GitHub Packages

In your new project, create a `.npmrc` file in the root directory:

```ini
@frndfrts:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### Step 2: Set GitHub Token

Set your GitHub Personal Access Token as an environment variable:

```bash
# Windows (PowerShell)
$env:GITHUB_TOKEN="your_github_personal_access_token"

# Windows (Command Prompt)
set GITHUB_TOKEN=your_github_personal_access_token

# macOS/Linux
export GITHUB_TOKEN=your_github_personal_access_token
```

**Note**: You need a token with `read:packages` permission.

### Step 3: Install the Package

```bash
npm install @frndfrts/fluent-ui-custom-components@1.1.0
```

## 🚀 Basic Usage Examples

### Example 1: Tabbed Navigation with Preview

```tsx
import React, { useState } from 'react';
import { TabbedNavbar, PreviewSection } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  const [selectedTab, setSelectedTab] = useState('paper');

  const tabs = [
    {
      id: 'paper',
      label: 'Paper',
      content: <div>Paper configuration content</div>,
    },
    {
      id: 'notes',
      label: 'Notes',
      content: <div>Notes configuration content</div>,
    },
    {
      id: 'slides',
      label: 'Slides',
      content: <div>Slides configuration content</div>,
    },
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TabbedNavbar
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />
      <PreviewSection
        content={<div>Preview content for {selectedTab}</div>}
        width={1200}
        height={800}
        backgroundColor="#f5f5f5"
      />
    </div>
  );
}
```

### Example 2: Basic Color Input

```tsx
import React, { useState } from 'react';
import { ColorInput } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  const [color, setColor] = useState('#FF6B35');

  return (
    <div>
      <h2>Color Picker</h2>
      <ColorInput
        value={color}
        onChange={setColor}
        size="medium"
      />
      <p>Selected color: {color}</p>
    </div>
  );
}
```

### Example 3: Dimension Input with Unit Conversion

```tsx
import React, { useState } from 'react';
import { DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  const [width, setWidth] = useState(10); // cm
  const [unit, setUnit] = useState('cm');

  const handleChange = (value: number | '', newUnit: string) => {
    setWidth(value as number);
    setUnit(newUnit);
  };

  return (
    <div>
      <h2>Width Input with Unit Conversion</h2>
      <DimensionInput
        label="Width"
        value={width}
        unit={unit}
        unitSystem="length"
        units={['cm', 'mm', 'in', 'px', 'pt', '%', 'vw', 'vh', 'em', 'rem']}
        onChange={handleChange}
        size="medium"
        context={{
          referenceWidth: 20,
          referenceHeight: 15,
          containerWidth: 30,
          containerHeight: 20,
          fontSize: 0.4,
          rootFontSize: 0.35,
        }}
      />
      <p>Width: {width} {unit}</p>
      <p><small>Supports automatic unit conversion with full precision</small></p>
    </div>
  );
}
```

### Example 4: Temperature Input

```tsx
import React, { useState } from 'react';
import { DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  const [temperature, setTemperature] = useState(25); // °C
  const [unit, setUnit] = useState('°C');

  const handleChange = (value: number | '', newUnit: string) => {
    setTemperature(value as number);
    setUnit(newUnit);
  };

  return (
    <div>
      <h2>Temperature Input</h2>
      <DimensionInput
        label="Temperature"
        value={temperature}
        unit={unit}
        unitSystem="temperature"
        units={['°C', '°F', 'K']}
        onChange={handleChange}
        size="medium"
      />
      <p>Temperature: {temperature} {unit}</p>
      <p><small>Automatic conversion between Celsius, Fahrenheit, and Kelvin</small></p>
    </div>
  );
}
```

### Example 5: Color Selector Grid

```tsx
import React, { useState } from 'react';
import { ColorSelector } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  const [selectedColor, setSelectedColor] = useState('#FF0000');

  return (
    <div>
      <h2>Color Palette</h2>
      <ColorSelector
        value={selectedColor}
        onChange={setSelectedColor}
        columns={8}
        showTooltips={true}
        colorModel="rgb"
      />
      <p>Selected: {selectedColor}</p>
    </div>
  );
}
```

### Example 6: Aspect Ratio Selector

```tsx
import React, { useState } from 'react';
import { AspectRatioSelector } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  const [aspectRatio, setAspectRatio] = useState('16:9');

  return (
    <div>
      <h2>Aspect Ratio</h2>
      <AspectRatioSelector
        value={aspectRatio}
        onChange={setAspectRatio}
        size="medium"
      />
      <p>Current ratio: {aspectRatio}</p>
    </div>
  );
}
```

## 🔧 Intermediate Usage Examples

### Error Handling

```tsx
import { ErrorBoundary } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  return (
    <ErrorBoundary>
      <ColorInput
        value="#invalid"
        onChange={setColor}
        onError={(error) => console.error('Color error:', error)}
      />
    </ErrorBoundary>
  );
}
```

### Custom Styling with Fluent UI

```tsx
import { makeStyles } from '@fluentui/react-components';
import { ColorInput } from '@frndfrts/fluent-ui-custom-components';

const useStyles = makeStyles({
  container: {
    padding: '20px',
    backgroundColor: 'var(--colorNeutralBackground1)',
    borderRadius: 'var(--borderRadiusMedium)',
  },
  title: {
    color: 'var(--colorNeutralForeground1)',
    fontSize: 'var(--fontSizeBase500)',
    marginBottom: 'var(--spacingVerticalM)',
  },
});

function MyApp() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Custom Styled App</h2>
      <ColorInput
        value="#FF6B35"
        onChange={setColor}
        size="large"
      />
    </div>
  );
}
```

### Form Validation with Unit Conversion

```tsx
import React, { useState } from 'react';
import { NumericInput, DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function FormExample() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [unit, setUnit] = useState('cm');
  const [errors, setErrors] = useState<string[]>([]);

  const handleDimensionChange = (value: number | '', newUnit: string) => {
    setWidth(value as number);
    setUnit(newUnit);
  };

  const handleSubmit = () => {
    const newErrors = [];
    if (width <= 0) newErrors.push('Width must be positive');
    if (height <= 0) newErrors.push('Height must be positive');
    
    setErrors(newErrors);
    
    if (newErrors.length === 0) {
      console.log('Form submitted:', { width, height, unit });
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div>
        <DimensionInput
          label="Width"
          value={width}
          unit={unit}
          unitSystem="length"
          onChange={handleDimensionChange}
          onError={(error) => console.error('Width error:', error)}
        />
      </div>
      
      <div>
        <DimensionInput
          label="Height"
          value={height}
          unit={unit}
          unitSystem="length"
          onChange={(value, newUnit) => {
            setHeight(value as number);
            setUnit(newUnit);
          }}
          onError={(error) => console.error('Height error:', error)}
        />
      </div>
      
      {errors.length > 0 && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 🚀 Advanced Usage Examples

### Complete Application Example

Here's a complete React app that demonstrates multiple components working together:

```tsx
import React, { useState } from 'react';
import { 
  ColorInput, 
  DimensionInput, 
  ColorSelector,
  AspectRatioSelector,
  TabbedNavbar,
  PreviewSection,
  ErrorBoundary 
} from '@frndfrts/fluent-ui-custom-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  app: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid var(--colorNeutralBorder1)',
    borderRadius: 'var(--borderRadiusMedium)',
  },
  title: {
    color: 'var(--colorNeutralForeground1)',
    fontSize: 'var(--fontSizeBase600)',
    marginBottom: 'var(--spacingVerticalM)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
});

function App() {
  const styles = useStyles();
  const [color, setColor] = useState('#FF6B35');
  const [width, setWidth] = useState(10);
  const [unit, setUnit] = useState('cm');
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [selectedTab, setSelectedTab] = useState('design');

  const handleDimensionChange = (value: number | '', newUnit: string) => {
    setWidth(value as number);
    setUnit(newUnit);
  };

  const tabs = [
    {
      id: 'design',
      label: 'Design',
      content: (
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.title}>Color Input</h3>
            <ColorInput
              value={color}
              onChange={setColor}
              size="medium"
            />
            <p>Selected: {color}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Dimension Input</h3>
            <DimensionInput
              label="Width"
              value={width}
              unit={unit}
              unitSystem="length"
              units={['cm', 'mm', 'in', 'px', 'pt', '%', 'vw', 'vh']}
              onChange={handleDimensionChange}
              size="medium"
              context={{
                referenceWidth: 20,
                referenceHeight: 15,
                containerWidth: 30,
                containerHeight: 20,
                fontSize: 0.4,
                rootFontSize: 0.35,
              }}
            />
            <p>Width: {width} {unit}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'preview',
      label: 'Preview',
      content: (
        <PreviewSection
          content={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3>Design Preview</h3>
              <div style={{ 
                width: `${width}${unit}`, 
                height: '100px', 
                backgroundColor: color,
                margin: '0 auto',
                borderRadius: '8px'
              }}></div>
              <p>Aspect Ratio: {aspectRatio}</p>
            </div>
          }
          width={800}
          height={600}
          backgroundColor="#f5f5f5"
        />
      ),
    },
  ];

  return (
    <div className={styles.app}>
      <h1>My Fluent UI App v1.1.0</h1>
      
      <ErrorBoundary>
        <TabbedNavbar
          tabs={tabs}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;
```

### Custom Hook Integration with Unit Conversion

```tsx
import React, { useState, useEffect } from 'react';
import { ColorInput, ColorSelector, DimensionInput } from '@frndfrts/fluent-ui-custom-components';
import { useLocalStorage, useDebounce } from '@frndfrts/fluent-ui-custom-components';

function AdvancedColorApp() {
  const [color, setColor] = useLocalStorage('selectedColor', '#FF6B35');
  const [debouncedColor] = useDebounce(color, 500);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [size, setSize] = useState(100);
  const [unit, setUnit] = useState('cm');

  // Save color to recent colors when it changes
  useEffect(() => {
    if (debouncedColor && !recentColors.includes(debouncedColor)) {
      setRecentColors(prev => [debouncedColor, ...prev.slice(0, 9)]);
    }
  }, [debouncedColor, recentColors]);

  return (
    <div>
      <h2>Advanced Color App with Unit Conversion</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <ColorInput
          value={color}
          onChange={setColor}
          size="large"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <DimensionInput
          label="Size"
          value={size}
          unit={unit}
          unitSystem="length"
          units={['cm', 'mm', 'in', 'px', 'pt']}
          onChange={(value, newUnit) => {
            setSize(value as number);
            setUnit(newUnit);
          }}
          size="medium"
        />
      </div>
      
      <div>
        <h3>Recent Colors</h3>
        <ColorSelector
          value={color}
          onChange={setColor}
          colors={recentColors}
          columns={5}
          showTooltips={true}
        />
      </div>
      
      <p>Current: {color}</p>
      <p>Size: {size} {unit}</p>
      <p>Debounced: {debouncedColor}</p>
    </div>
  );
}
```

### Responsive Layout with Multiple Components

```tsx
import React, { useState } from 'react';
import { 
  PaperSelector, 
  OrientationSelector, 
  AspectRatioSelector,
  DimensionInput,
  PreviewPanel
} from '@frndfrts/fluent-ui-custom-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    padding: '20px',
    border: '1px solid var(--colorNeutralBorder2)',
    borderRadius: 'var(--borderRadiusMedium)',
    backgroundColor: 'var(--colorNeutralBackground1)',
  },
  title: {
    fontSize: 'var(--fontSizeBase500)',
    fontWeight: 'var(--fontWeightSemibold)',
    marginBottom: 'var(--spacingVerticalM)',
    color: 'var(--colorNeutralForeground1)',
  },
  preview: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'var(--colorNeutralBackground2)',
    borderRadius: 'var(--borderRadiusSmall)',
    textAlign: 'center',
  },
});

function DocumentSetup() {
  const styles = useStyles();
  const [paperSize, setPaperSize] = useState('A4');
  const [orientation, setOrientation] = useState('portrait');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [margin, setMargin] = useState(20);
  const [marginUnit, setMarginUnit] = useState('mm');

  const handleMarginChange = (value: number | '', unit: string) => {
    setMargin(value as number);
    setMarginUnit(unit);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>Paper Settings</h3>
        <PaperSelector
          value={paperSize}
          onChange={setPaperSize}
          size="medium"
        />
        <OrientationSelector
          value={orientation}
          onChange={setOrientation}
          size="medium"
        />
      </div>

      <div className={styles.card}>
        <h3 className={styles.title}>Layout Settings</h3>
        <AspectRatioSelector
          value={aspectRatio}
          onChange={setAspectRatio}
          size="medium"
        />
        <DimensionInput
          label="Margin"
          value={margin}
          unit={marginUnit}
          unitSystem="length"
          units={['mm', 'cm', 'in', 'pt']}
          onChange={handleMarginChange}
          size="medium"
        />
      </div>

      <div className={styles.card}>
        <h3 className={styles.title}>Preview</h3>
        <PreviewPanel
          content={
            <div className={styles.preview}>
              <p><strong>Paper:</strong> {paperSize}</p>
              <p><strong>Orientation:</strong> {orientation}</p>
              <p><strong>Aspect Ratio:</strong> {aspectRatio}</p>
              <p><strong>Margin:</strong> {margin} {marginUnit}</p>
            </div>
          }
          width={300}
          height={200}
          backgroundColor="#ffffff"
          shadow={true}
        />
      </div>
    </div>
  );
}
```

## 🔄 Enhanced Unit Conversion Features

### 5 Unit Systems Support

The library now supports comprehensive unit conversion across 5 different unit systems:

#### **1. Length System**
- **Internal Unit**: `cm` (centimeters)
- **Units**: `cm`, `mm`, `in`, `px`, `pt`, `%`, `vw`, `vh`, `em`, `rem`
- **Precision**: Full floating-point precision
- **Context**: Required for relative units (`%`, `vw`, `vh`, `em`, `rem`)

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

### Context-Aware Unit Conversions

The library now supports advanced unit conversion with context awareness:

- **Percentage (%)**: Requires reference dimensions for proper calculations
- **Viewport Units (vw/vh)**: Uses container dimensions for relative calculations  
- **Font-Relative Units (em/rem)**: Uses font size context for proper scaling
- **Absolute Units**: Standard conversions (cm, mm, in, px, pt)

### Unit-Specific Step Values

Each unit type has appropriate step values for precise control:
- **px/pt**: Step by 1 (whole numbers)
- **mm**: Step by 0.1 (1 decimal place)
- **cm**: Step by 0.01 (2 decimal places)
- **in**: Step by 0.001 (3 decimal places)
- **%**: Step by 0.1 (1 decimal place)
- **vw/vh**: Step by 0.1 (1 decimal place)
- **em/rem**: Step by 0.01 (2 decimal places)

### Context Provider System

```tsx
import { UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

<UnitConversionProvider
  referenceWidth={20}    // For percentage calculations
  referenceHeight={15}   // For percentage calculations
  containerWidth={30}    // For viewport units
  containerHeight={20}    // For viewport units
  fontSize={0.4}         // For em calculations
  rootFontSize={0.35}   // For rem calculations
>
  {/* Your components here */}
</UnitConversionProvider>
```

### Direct Service Usage

```tsx
import { unitConversionService } from '@frndfrts/fluent-ui-custom-components';

// Length conversion
const inches = unitConversionService.fromInternalUnit(10, 'in', 'length'); // 3.94
const cm = unitConversionService.toInternalUnit(3.94, 'in', 'length'); // 10

// Temperature conversion
const fahrenheit = unitConversionService.fromInternalUnit(25, '°F', 'temperature'); // 77
const celsius = unitConversionService.toInternalUnit(77, '°F', 'temperature'); // 25

// Context-aware conversion
const context = {
  referenceWidth: 20,
  referenceHeight: 15,
  containerWidth: 30,
  containerHeight: 20,
  fontSize: 0.4,
  rootFontSize: 0.35,
};

const percentage = unitConversionService.fromInternalUnit(10, '%', 'length', context);
```

## 📚 Available Components

### Primitives (Level 1)
Basic building blocks for forms and inputs:
- `NumericInput` - Number input with validation and unit-aware steps
- `HexInput` - Hexadecimal color input
- `SliderInput` - Slider input component
- `ColorSliderInput` - Color-specific slider
- `UniversalSelector` - Generic selector component with interactive state management
- `LockAspectRatio` - Aspect ratio lock toggle

### Components (Level 2)
Molecule-level combinations:
- `AspectRatioSelector` - Aspect ratio selection
- `ColorModelSelector` - RGB/HSL model selection
- `OrientationSelector` - Portrait/landscape selection
- `PaperSelector` - Paper size selection
- `PositionSelector` - Position value selection
- `UnitSelector` - Enhanced unit selector with 5 unit systems support

### Compositions (Level 3)
Complex functional units:
- `ColorInput` - Full color input with picker
- `ColorHexInput` - Hex color input with swatch
- `ColorSelector` - Color palette grid
- `DimensionInput` - Enhanced number + unit input with context-aware conversions
- `RGBHSLColorSlidersInput` - RGB/HSL sliders
- `LabeledColorHexInput` - Color input with label
- `LabeledColorPicker` - Color picker with label
- `MultipleSlidersInput` - Multiple slider inputs
- `TabbedNavbar` - Complete tabbed navigation bar with focus management

### Panels (Level 4)
Layout containers with specific functionality:
- `PaperSizePanel` - Paper size configuration
- `SizeAndPositionPanel` - Size and position controls
- `SizeFields` - Size input fields with unit conversion
- `PositionFields` - Position input fields
- `MarginsPanel` - Margin configuration
- `PaddingPanel` - Padding configuration
- `ResponsiveColorPicker` - Responsive color picker
- `PreviewPanel` - Preview container with header and content area

### Sections (Level 5)
High-level functional areas:
- `PaperSection` - Paper configuration section
- `NotesSection` - Notes and annotations
- `SlidesSection` - Presentation slides
- `PreviewSection` - Preview area for content display
- `BodyPlaceholderSection` - Body content placeholder
- `TitlePlaceholderSection` - Title placeholder
- `SubtitlePlaceholderSection` - Subtitle placeholder
- `SourcePlaceholderSection` - Source placeholder
- `PageNumberPlaceholderSection` - Page number placeholder
- `LogoPlaceholderSection` - Logo placeholder
- `FootnotePlaceholderSection` - Footnote placeholder

### Hooks & Utilities
Custom React hooks and utilities:
- `useInputValidation` - Input validation logic
- `useComponentSize` - Component size management
- `useColorManager` - Color state management
- `useFormValidation` - Form validation
- `useLocalStorage` - Local storage persistence
- `useDebounce` - Debounced value updates
- `usePrevious` - Previous value tracking
- `useToggle` - Boolean toggle state
- `useWindowSize` - Window size tracking
- `useClickOutside` - Click outside detection
- `useHover` - Hover state management
- `useAsync` - Async operation handling
- `useThrottle` - Throttled function calls
- `useKeyPress` - Keyboard event handling
- `useIntersectionObserver` - Intersection observer
- `useMediaQuery` - Media query responses
- `useScrollPosition` - Scroll position tracking
- `useOnlineStatus` - Online/offline status
- `useCopyToClipboard` - Clipboard operations
- `useGeolocation` - Geolocation data
- `useNetworkStatus` - Network status
- `useFocus` - Focus state management
- `useEventListener` - Event listener management
- `useInterval` - Interval timer
- `useTimeout` - Timeout timer
- `useUpdateEffect` - Update-only effect
- `useWhyDidYouUpdate` - Update debugging
- `useForceUpdate` - Force re-render
- `useIsMounted` - Mount state tracking
- `useUnmountEffect` - Unmount cleanup
- `useMountEffect` - Mount-only effect
- `useDeepCompareEffect` - Deep comparison effect
- `useShallowCompareEffect` - Shallow comparison effect
- `useFirstMountState` - First mount state
- `useIsFirstRender` - First render detection
- `useIsLastRender` - Last render detection
- `useIsMountedRef` - Mount state ref
- `useUnitConversion` - Enhanced unit conversion with context awareness
- `UnitConversionProvider` - Context provider for unit conversion reference dimensions
- `unitConversionService` - Direct service for unit conversions

## 🔍 Troubleshooting

### Common Issues

1. **Authentication Error**: Make sure your `GITHUB_TOKEN` has `read:packages` permission
2. **Registry Error**: Verify `.npmrc` is in your project root
3. **Import Errors**: Check that you're importing from the correct path
4. **Build Errors**: Ensure you have the required peer dependencies
5. **Unit Conversion Errors**: Verify unit system and context are properly configured

### Getting Help

- Check the [ORGANIZATION_SETUP.md](./ORGANIZATION_SETUP.md) for detailed setup
- Use Storybook locally to explore components: `npm run dev`
- Review component stories for usage examples
- Check GitHub issues for known problems
- Review unit conversion documentation: [UNIT_CONVERSION_IMPLEMENTATION.md](./UNIT_CONVERSION_IMPLEMENTATION.md)

## Best Practices

1. **Use Error Boundaries** - Wrap components in ErrorBoundary for production
2. **Handle Errors** - Implement onError callbacks for better UX
3. **Consistent Sizing** - Use consistent size props across components
4. **Accessibility** - Components include built-in accessibility features
5. **Performance** - Components are memoized for optimal performance
6. **TypeScript** - Use TypeScript for better type safety and IntelliSense
7. **Responsive Design** - Components adapt to different screen sizes
8. **Theme Integration** - Components use Fluent UI design tokens
9. **Unit Conversion** - Use appropriate unit systems and context for conversions
10. **Interactive Stories** - Leverage Storybook's interactive features for testing

## Migration Guide

### From Previous Versions

If you're upgrading from a previous version:

1. **Update imports** - Check for any renamed components
2. **Review props** - Some component interfaces may have changed
3. **Test functionality** - Verify components work as expected
4. **Check peer dependencies** - Ensure Fluent UI v9 is installed
5. **Update unit conversion** - Migrate to new unit conversion system
6. **Test Storybook** - Verify Storybook 9 compatibility

### Breaking Changes in v1.1.0

1. **Storybook Configuration** - Updated to framework-based configuration
2. **Unit Conversion** - New architecture with 5 unit systems
3. **Component Props** - Some components have new unit-related props
4. **Context System** - New UnitConversionProvider for relative units

## Support

For additional support:

1. **Check Documentation** - Review component stories and examples
2. **Explore Storybook** - Run `npm run dev` to see components in action
3. **Review Issues** - Check GitHub issues for known problems
4. **Contact Team** - Reach out to the development team for help
5. **Unit Conversion** - Review unit conversion documentation for advanced usage

---

*This library is designed to work seamlessly with Fluent UI v9 and provides enterprise-grade components for professional applications. All components are built with accessibility, performance, and maintainability in mind. Version 1.1.0 introduces comprehensive unit conversion, Storybook 9 upgrade, and enhanced interactive features.*
