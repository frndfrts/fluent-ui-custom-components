# Fluent UI Custom Components - Usage Instructions

*This library is designed to work seamlessly with Fluent UI v9 and provides enterprise-grade components for professional applications. All components are built with accessibility, performance, and maintainability in mind. Version 1.1.1 introduces critical percentage conversion fixes, while v1.1.0 brought comprehensive unit conversion, Storybook 9 upgrade, and enhanced interactive features.*

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

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm 8+ or yarn 1.22+
- React 18+ and Fluent UI v9

### Install the Package

```bash
npm install @frndfrts/fluent-ui-custom-components@1.1.1
```

### Import Components

```tsx
import { 
  DimensionInput, 
  UnitConversionProvider,
  TabbedNavbar,
  PreviewSection 
} from '@frndfrts/fluent-ui-custom-components';
```

## 🚀 Basic Usage

### Simple Dimension Input

```tsx
import React, { useState } from 'react';
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function BasicExample() {
  const [width, setWidth] = useState(15);
  const [widthUnit, setWidthUnit] = useState('cm');

  return (
    <UnitConversionProvider 
      referenceWidth={27.7} 
      referenceHeight={19.0}
    >
      <DimensionInput
        label="Width"
        value={width}
        unit={widthUnit}
        axis="width"
        onChange={(value, unit) => {
          setWidth(value);
          setWidthUnit(unit);
        }}
      />
    </UnitConversionProvider>
  );
}
```

### Multiple Dimensions with Unit Conversion

```tsx
import React, { useState } from 'react';
import { SizeFields, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function SizeExample() {
  const [size, setSize] = useState({
    width: 15,
    height: 10,
    widthUnit: 'cm',
    heightUnit: 'cm'
  });

  return (
    <UnitConversionProvider 
      referenceWidth={27.7} 
      referenceHeight={19.0}
    >
      <SizeFields
        width={size.width}
        height={size.height}
        widthUnit={size.widthUnit}
        heightUnit={size.heightUnit}
        onChange={(fields) => setSize(fields)}
        showLockAspectRatio={true}
        onLockAspectRatioChange={(locked) => console.log('Aspect ratio locked:', locked)}
      />
    </UnitConversionProvider>
  );
}
```

## 🔄 Intermediate Usage

### Temperature Input with Unit Conversion

```tsx
import React, { useState } from 'react';
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function TemperatureExample() {
  const [temperature, setTemperature] = useState(25);
  const [unit, setUnit] = useState('°C');

  return (
    <DimensionInput
      label="Temperature"
      value={temperature}
      unit={unit}
      unitSystem="temperature"
      onChange={(value, newUnit) => {
        setTemperature(value);
        setUnit(newUnit);
        console.log(`Temperature: ${value} ${newUnit}`);
      }}
    />
  );
}
```

### Navigation with TabbedNavbar

```tsx
import React, { useState } from 'react';
import { TabbedNavbar, PaperSection, NotesSection, SlidesSection } from '@frndfrts/fluent-ui-custom-components';

function NavigationExample() {
  const [selectedTab, setSelectedTab] = useState('paper');

  const tabs = [
    { id: 'paper', label: 'Paper', content: <PaperSection /> },
    { id: 'notes', label: 'Notes', content: <NotesSection /> },
    { id: 'slides', label: 'Slides', content: <SlidesSection /> }
  ];

  return (
    <div>
      <TabbedNavbar
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />
      
      <div style={{ marginTop: '20px' }}>
        {tabs.find(tab => tab.id === selectedTab)?.content}
      </div>
    </div>
  );
}
```

### Preview Section with Content

```tsx
import React from 'react';
import { PreviewSection, PreviewPanel } from '@frndfrts/fluent-ui-custom-components';

function PreviewExample() {
  return (
    <PreviewSection
      width={1200}
      height={800}
      backgroundColor="#f5f5f5"
    >
      <PreviewPanel
        content={<div>Your content here</div>}
        width={800}
        height={600}
        backgroundColor="#ffffff"
        shadow={true}
      />
    </PreviewSection>
  );
}
```

## 🔧 Advanced Usage

### Complete Application with Unit Conversion

```tsx
import React, { useState } from 'react';
import { 
  UnitConversionProvider,
  TabbedNavbar,
  PreviewSection,
  DimensionInput,
  SizeFields,
  PositionFields
} from '@frndfrts/fluent-ui-custom-components';

function AdvancedApp() {
  const [selectedTab, setSelectedTab] = useState('paper');
  const [paperSize, setPaperSize] = useState({ width: 29.7, height: 21.0 });
  const [notesSize, setNotesSize] = useState({ width: 27.7, height: 19.0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Paper active area context
  const paperContext = {
    referenceWidth: paperSize.width,
    referenceHeight: paperSize.height,
    containerWidth: 30.0,
    containerHeight: 20.0
  };

  const tabs = [
    {
      id: 'paper',
      label: 'Paper',
      content: (
        <div>
          <h3>Paper Settings</h3>
          <SizeFields
            width={paperSize.width}
            height={paperSize.height}
            onChange={setPaperSize}
            showLockAspectRatio={true}
          />
        </div>
      )
    },
    {
      id: 'notes',
      label: 'Notes',
      content: (
        <UnitConversionProvider {...paperContext}>
          <div>
            <h3>Notes Layout</h3>
            <SizeFields
              width={notesSize.width}
              height={notesSize.height}
              onChange={setNotesSize}
              showLockAspectRatio={true}
            />
            <PositionFields
              x={position.x}
              y={position.y}
              onChange={setPosition}
            />
          </div>
        </UnitConversionProvider>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <TabbedNavbar
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />
      
      <PreviewSection
        width={1200}
        height={800}
        backgroundColor="#f5f5f5"
      >
        <div style={{ 
          width: notesSize.width, 
          height: notesSize.height,
          backgroundColor: '#ffffff',
          border: '1px solid #ccc',
          position: 'absolute',
          left: position.x,
          top: position.y
        }}>
          Notes Content
        </div>
      </PreviewSection>
    </div>
  );
}
```

### Custom Unit Systems

```tsx
import React from 'react';
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function CustomUnitsExample() {
  return (
    <UnitConversionProvider 
      referenceWidth={27.7} 
      referenceHeight={19.0}
      containerWidth={30.0}
      containerHeight={20.0}
      fontSize={0.4}
      rootFontSize={0.35}
    >
      {/* Length units */}
      <DimensionInput
        label="Width"
        value={15}
        unit="cm"
        unitSystem="length"
        axis="width"
        onChange={(value, unit) => console.log(`Width: ${value} ${unit}`)}
      />

      {/* Temperature units */}
      <DimensionInput
        label="Temperature"
        value={25}
        unit="°C"
        unitSystem="temperature"
        onChange={(value, unit) => console.log(`Temperature: ${value} ${unit}`)}
      />

      {/* Volume units */}
      <DimensionInput
        label="Volume"
        value={100}
        unit="ml"
        unitSystem="volume"
        onChange={(value, unit) => console.log(`Volume: ${value} ${unit}`)}
      />

      {/* Relative units */}
      <DimensionInput
        label="Position X"
        value={50}
        unit="%"
        axis="x"
        onChange={(value, unit) => console.log(`X Position: ${value} ${unit}`)}
      />
    </UnitConversionProvider>
  );
}
```

## 🎯 Enhanced Unit Conversion Features

### Supported Unit Systems

#### 1. **Length System** (Internal: cm)
- **Absolute Units**: cm, mm, in, px, pt
- **Relative Units**: %, vw, vh, em, rem
- **Context Required**: For relative units

#### 2. **Temperature System** (Internal: °C)
- **Units**: °C, °F, K
- **Automatic Conversion**: Between temperature scales
- **Precision**: 1 decimal place

#### 3. **Volume System** (Internal: ml)
- **Units**: ml, l, oz, gal, pt
- **Metric/Imperial**: Automatic conversion
- **Precision**: 2 decimal places

#### 4. **Weight System** (Internal: g)
- **Units**: g, kg, oz, lb
- **Metric/Imperial**: Automatic conversion
- **Precision**: 2 decimal places

#### 5. **Energy System** (Internal: J)
- **Units**: J, cal, kcal, Wh
- **Various Energy Units**: Automatic conversion
- **Precision**: 2 decimal places

### Context-Aware Calculations

```tsx
// For relative units, provide context
const context = {
  referenceWidth: 27.7,    // For width/x percentage calculations
  referenceHeight: 19.0,   // For height/y percentage calculations
  containerWidth: 30.0,    // For vw units
  containerHeight: 20.0,   // For vh units
  fontSize: 0.4,          // For em units
  rootFontSize: 0.35,     // For rem units
};

<UnitConversionProvider {...context}>
  <DimensionInput
    label="Width"
    value={15}
    unit="%"
    axis="width"  // Uses referenceWidth for calculation
    onChange={(value, unit) => console.log(value, unit)}
  />
  
  <DimensionInput
    label="Height"
    value={10}
    unit="%"
    axis="height"  // Uses referenceHeight for calculation
    onChange={(value, unit) => console.log(value, unit)}
  />
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

## 🎨 Component Examples

### Color Management

```tsx
import React, { useState } from 'react';
import { ColorsSection, ResponsiveColorPicker } from '@frndfrts/fluent-ui-custom-components';

function ColorExample() {
  const [colors, setColors] = useState({
    accent1: '#FF6B35',
    accent2: '#00FF00',
    accent3: '#0000FF'
  });

  return (
    <ColorsSection
      colors={colors}
      onColorChange={(colorKey, color) => {
        setColors(prev => ({ ...prev, [colorKey]: color }));
      }}
    />
  );
}
```

### Form Validation

```tsx
import React, { useState } from 'react';
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function ValidationExample() {
  const [value, setValue] = useState(10);

  return (
    <UnitConversionProvider referenceWidth={20} referenceHeight={15}>
      <DimensionInput
        label="Width"
        value={value}
        unit="cm"
        axis="width"
        onChange={(newValue, unit) => setValue(newValue)}
        onError={(error) => {
          console.error('Validation error:', error.message);
          // Handle error appropriately
        }}
      />
    </UnitConversionProvider>
  );
}
```

## 🔧 Error Handling

### Error Boundaries

All components include error boundaries for graceful error handling:

```tsx
import React from 'react';
import { DimensionInput, UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

function ErrorHandlingExample() {
  return (
    <UnitConversionProvider referenceWidth={20} referenceHeight={15}>
      <DimensionInput
        label="Width"
        value={10}
        unit="cm"
        axis="width"
        onChange={(value, unit) => console.log(value, unit)}
        onError={(error, errorInfo) => {
          console.error('Component error:', error);
          console.error('Error info:', errorInfo);
          // Handle error appropriately
        }}
      />
    </UnitConversionProvider>
  );
}
```

### Validation Errors

Components provide detailed validation error messages:

```tsx
// Example error messages
"Reference width required for percentage conversion"
"Reference height required for percentage conversion"
"Context required for unit '%' but not provided"
"Unit 'invalid-unit' not found in system 'length'"
```

## 🎯 Best Practices

### 1. **Always Provide Context for Relative Units**

```tsx
// ✅ Good: Provide context for relative units
<UnitConversionProvider 
  referenceWidth={27.7} 
  referenceHeight={19.0}
  containerWidth={30.0}
  containerHeight={20.0}
>
  <DimensionInput unit="%" axis="width" />
</UnitConversionProvider>

// ❌ Bad: Missing context for relative units
<DimensionInput unit="%" /> // Will throw error
```

### 2. **Use Correct Axis for Percentage Calculations**

```tsx
// ✅ Good: Use correct axis
<DimensionInput unit="%" axis="width" />  // For width/x coordinates
<DimensionInput unit="%" axis="height" /> // For height/y coordinates

// ❌ Bad: Missing axis (defaults to width)
<DimensionInput unit="%" /> // May cause confusion
```

### 3. **Handle Unit Conversion Properly**

```tsx
// ✅ Good: Let the component handle conversion
<DimensionInput
  value={internalValue} // Always in internal unit (cm, °C, etc.)
  unit={displayUnit}    // Display unit (in, °F, etc.)
  onChange={(displayValue, unit) => {
    // Component automatically converts displayValue to internal unit
    setInternalValue(displayValue);
    setDisplayUnit(unit);
  }}
/>

// ❌ Bad: Manual conversion
<DimensionInput
  value={displayValue} // Wrong: should be internal value
  unit={displayUnit}
  onChange={(value, unit) => {
    // Don't manually convert - let the component handle it
  }}
/>
```

### 4. **Use Appropriate Unit Systems**

```tsx
// ✅ Good: Use correct unit system
<DimensionInput unitSystem="temperature" unit="°C" />
<DimensionInput unitSystem="length" unit="cm" />
<DimensionInput unitSystem="volume" unit="ml" />

// ❌ Bad: Mismatched unit and system
<DimensionInput unitSystem="temperature" unit="cm" /> // Wrong unit for temperature
```

## 📚 Additional Resources

- **[Organization Setup](ORGANIZATION_SETUP.md)**: Development and contribution guidelines
- **[Component Documentation](src/components/README.md)**: Detailed component reference
- **[Storybook](http://localhost:6006)**: Interactive component examples (when running locally)

---

**Current Version**: 1.1.1  
**Storybook Version**: 9.1.3  
**Last Updated**: December 2024
