# Fluent UI Custom Components - Usage Instructions

This document provides comprehensive instructions on how to use the Fluent UI Custom Components library in your projects, including basic, intermediate, and advanced examples.

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
npm install @frndfrts/fluent-ui-custom-components
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
      value: 'file',
      label: 'File',
      type: 'menu',
      menuItems: [
        { key: 'new', label: 'New', onClick: () => console.log('New clicked') },
        { key: 'open', label: 'Open', onClick: () => console.log('Open clicked') },
        { key: 'save', label: 'Save', onClick: () => console.log('Save clicked') },
      ],
    },
    {
      value: 'edit',
      label: 'Edit',
      type: 'menu',
      menuItems: [
        { key: 'undo', label: 'Undo', onClick: () => console.log('Undo clicked') },
        { key: 'redo', label: 'Redo', onClick: () => console.log('Redo clicked') },
      ],
    },
    { value: 'paper', label: 'Paper', type: 'simple' },
    { value: 'notes', label: 'Notes', type: 'simple' },
    { value: 'slides', label: 'Slides', type: 'simple' },
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TabbedNavbar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        tabs={tabs}
      />
      <PreviewSection previewTitle="Document Preview">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Content for {selectedTab}</h3>
          <p>This is the content area for the selected tab.</p>
        </div>
      </PreviewSection>
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

### Example 2: Dimension Input with Units

```tsx
import React, { useState } from 'react';
import { DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  const [width, setWidth] = useState(100);
  const [unit, setUnit] = useState('px');

  const handleChange = (value: number | '', newUnit: string) => {
    setWidth(value as number);
    setUnit(newUnit);
  };

  return (
    <div>
      <h2>Width Input</h2>
      <DimensionInput
        label="Width"
        value={width}
        unit={unit}
        units={['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm']}
        onChange={handleChange}
        size="medium"
      />
      <p>Width: {width} {unit}</p>
    </div>
  );
}
```

### Example 2a: Enhanced Dimension Input with Context-Aware Units

```tsx
import React, { useState } from 'react';
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function MyApp() {
  const [width, setWidth] = useState(10); // cm
  const [unit, setUnit] = useState('cm');

  const handleChange = (value: number | '', newUnit: string) => {
    setWidth(value as number);
    setUnit(newUnit);
  };

  return (
    <UnitConversionProvider
      referenceWidth={20}    // 20cm reference width
      referenceHeight={15}  // 15cm reference height
      containerWidth={30}   // 30cm container width
      containerHeight={20}  // 20cm container height
      fontSize={0.4}        // 0.4cm font size
      rootFontSize={0.35}  // 0.35cm root font size
    >
      <div>
        <h2>Enhanced Width Input</h2>
        <DimensionInput
          label="Width"
          value={width}
          unit={unit}
          units={['px', 'em', 'rem', '%', 'vw', 'vh', 'pt', 'in', 'cm', 'mm']}
          onChange={handleChange}
          size="medium"
        />
        <p>Width: {width} {unit}</p>
        <p><small>Supports context-aware percentage, viewport, and font-relative units</small></p>
      </div>
    </UnitConversionProvider>
  );
}
```

### Example 3: Color Selector Grid

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

### Example 4: Aspect Ratio Selector

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

### Form Validation

```tsx
import React, { useState } from 'react';
import { NumericInput, DimensionInput } from '@frndfrts/fluent-ui-custom-components';

function FormExample() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    const newErrors = [];
    if (width <= 0) newErrors.push('Width must be positive');
    if (height <= 0) newErrors.push('Height must be positive');
    
    setErrors(newErrors);
    
    if (newErrors.length === 0) {
      console.log('Form submitted:', { width, height });
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div>
        <DimensionInput
          label="Width"
          value={width}
          unit="px"
          onChange={(value) => setWidth(value as number)}
          onError={(error) => console.error('Width error:', error)}
        />
      </div>
      
      <div>
        <DimensionInput
          label="Height"
          value={height}
          unit="px"
          onChange={(value) => setHeight(value as number)}
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
  ErrorBoundary 
} from '@frndfrts/fluent-ui-custom-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  app: {
    padding: '20px',
    maxWidth: '800px',
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
  const [width, setWidth] = useState(100);
  const [unit, setUnit] = useState('px');
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const handleDimensionChange = (value: number | '', newUnit: string) => {
    setWidth(value as number);
    setUnit(newUnit);
  };

  return (
    <div className={styles.app}>
      <h1>My Fluent UI App</h1>
      
      <ErrorBoundary>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h2 className={styles.title}>Color Input</h2>
            <ColorInput
              value={color}
              onChange={setColor}
              size="medium"
            />
            <p>Selected: {color}</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.title}>Dimension Input</h2>
            <DimensionInput
              label="Width"
              value={width}
              unit={unit}
              units={['px', 'em', 'rem', '%', 'pt', 'in', 'cm', 'mm']}
              onChange={handleDimensionChange}
              size="medium"
            />
            <p>Width: {width} {unit}</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.title}>Color Palette</h2>
            <ColorSelector
              value={selectedColor}
              onChange={setSelectedColor}
              columns={6}
              showTooltips={true}
            />
            <p>Selected: {selectedColor}</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.title}>Aspect Ratio</h2>
            <AspectRatioSelector
              value={aspectRatio}
              onChange={setAspectRatio}
              size="medium"
            />
            <p>Ratio: {aspectRatio}</p>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
```

### Custom Hook Integration

```tsx
import React, { useState, useEffect } from 'react';
import { ColorInput, ColorSelector } from '@frndfrts/fluent-ui-custom-components';
import { useLocalStorage, useDebounce } from '@frndfrts/fluent-ui-custom-components';

function AdvancedColorApp() {
  const [color, setColor] = useLocalStorage('selectedColor', '#FF6B35');
  const [debouncedColor] = useDebounce(color, 500);
  const [recentColors, setRecentColors] = useState<string[]>([]);

  // Save color to recent colors when it changes
  useEffect(() => {
    if (debouncedColor && !recentColors.includes(debouncedColor)) {
      setRecentColors(prev => [debouncedColor, ...prev.slice(0, 9)]);
    }
  }, [debouncedColor, recentColors]);

  return (
    <div>
      <h2>Advanced Color App</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <ColorInput
          value={color}
          onChange={setColor}
          size="large"
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
  DimensionInput 
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
          orientation={orientation}
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
          units={['mm', 'cm', 'in', 'pt']}
          onChange={handleMarginChange}
          size="medium"
        />
      </div>

      <div className={styles.card}>
        <h3 className={styles.title}>Preview</h3>
        <div className={styles.preview}>
          <p><strong>Paper:</strong> {paperSize}</p>
          <p><strong>Orientation:</strong> {orientation}</p>
          <p><strong>Aspect Ratio:</strong> {aspectRatio}</p>
          <p><strong>Margin:</strong> {margin} {marginUnit}</p>
        </div>
      </div>
    </div>
  );
}
```

## 🆕 Enhanced Unit Conversion Features

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
  containerHeight={20}   // For viewport units
  fontSize={0.4}         // For em calculations
  rootFontSize={0.35}   // For rem calculations
>
  {/* Your components here */}
</UnitConversionProvider>
```

## 📚 Available Components

### Primitives (Level 1)
Basic building blocks for forms and inputs:
- `NumericInput` - Number input with validation and unit-aware steps
- `HexInput` - Hexadecimal color input
- `SliderInput` - Slider input component
- `ColorSliderInput` - Color-specific slider
- `UniversalSelector` - Generic selector component
- `LockAspectRatio` - Aspect ratio lock toggle

### Components (Level 2)
Molecule-level combinations:
- `AspectRatioSelector` - Aspect ratio selection
- `ColorModelSelector` - RGB/HSL model selection
- `OrientationSelector` - Portrait/landscape selection
- `PaperSelector` - Paper size selection
- `PositionSelector` - Position value selection

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
- `TabbedNavbar` - Complete tabbed navigation bar with menu support

### Panels (Level 4)
Layout containers with specific functionality:
- `PaperSizePanel` - Paper size configuration
- `SizeAndPositionPanel` - Size and position controls
- `SizeFields` - Size input fields
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

## 🔍 Troubleshooting

### Common Issues

1. **Authentication Error**: Make sure your `GITHUB_TOKEN` has `read:packages` permission
2. **Registry Error**: Verify `.npmrc` is in your project root
3. **Import Errors**: Check that you're importing from the correct path
4. **Build Errors**: Ensure you have the required peer dependencies

### Getting Help

- Check the [ORGANIZATION_SETUP.md](./ORGANIZATION_SETUP.md) for detailed setup
- Use Storybook locally to explore components: `npm run dev`
- Review component stories for usage examples
- Check GitHub issues for known problems

## Best Practices

1. **Use Error Boundaries** - Wrap components in ErrorBoundary for production
2. **Handle Errors** - Implement onError callbacks for better UX
3. **Consistent Sizing** - Use consistent size props across components
4. **Accessibility** - Components include built-in accessibility features
5. **Performance** - Components are memoized for optimal performance
6. **TypeScript** - Use TypeScript for better type safety and IntelliSense
7. **Responsive Design** - Components adapt to different screen sizes
8. **Theme Integration** - Components use Fluent UI design tokens

## Migration Guide

### From Previous Versions

If you're upgrading from a previous version:

1. **Update imports** - Check for any renamed components
2. **Review props** - Some component interfaces may have changed
3. **Test functionality** - Verify components work as expected
4. **Check peer dependencies** - Ensure Fluent UI v9 is installed

## Support

For additional support:

1. **Check Documentation** - Review component stories and examples
2. **Explore Storybook** - Run `npm run dev` to see components in action
3. **Review Issues** - Check GitHub issues for known problems
4. **Contact Team** - Reach out to the development team for help

---

*This library is designed to work seamlessly with Fluent UI v9 and provides enterprise-grade components for professional applications. All components are built with accessibility, performance, and maintainability in mind.*
