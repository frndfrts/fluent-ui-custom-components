# Fluent UI Custom Components - Organization Setup Guide

*This guide provides comprehensive setup instructions for the Fluent UI Custom Components library within your organization. It covers installation, development workflow, contribution guidelines, and troubleshooting. Version 1.2.0 brings ColorsSection width consistency, while v1.1.3 fixed ColorsSection export issues, v1.1.2 introduced unified min/max clamping, v1.1.1 brought critical percentage conversion fixes, and v1.1.0 brought comprehensive unit conversion, Storybook 9 upgrade, and enhanced interactive features.*

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
- **Interactive Stories**: Real-time component interaction
- **Enhanced Documentation**: Comprehensive examples and usage patterns

### 🎯 Component Improvements
- **DimensionInput**: Enhanced with unit systems and axis-aware calculations
- **UnitSelector**: Universal selector with built-in display mapping
- **Interactive Panels**: All panels now reflect real-time user selections

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [Version Management](#version-management)
- [Unit Conversion System](#unit-conversion-system)
- [Storybook Development](#storybook-development)
- [Testing](#testing)
- [Building](#building)
- [Publishing](#publishing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🔧 Prerequisites

### System Requirements
- **Node.js**: 16.0.0 or higher
- **npm**: 8.0.0 or higher (or yarn 1.22.0+)
- **Git**: Latest stable version
- **GitHub Access**: Access to the organization repository
- **GitHub Token**: Personal Access Token with appropriate permissions

### Required Permissions
Your GitHub Personal Access Token needs these permissions:
- `repo` - Full control of private repositories
- `read:packages` - Download packages from GitHub Package Registry
- `write:packages` - Upload packages to GitHub Package Registry
- `delete:packages` - Delete packages from GitHub Package Registry

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/frndfrts/fluent-ui-custom-components.git
cd fluent-ui-custom-components
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# GitHub Personal Access Token
GITHUB_TOKEN=your_github_personal_access_token

# NPM Registry Configuration
NPM_REGISTRY=https://npm.pkg.github.com
```

### Step 4: Configure npm for GitHub Packages

Create `.npmrc` file in the root directory:

```ini
@frndfrts:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## 🛠️ Development Setup

### Start Development Server

```bash
# Start Storybook for component development
npm run dev

# Or start Storybook directly
npm run storybook
```

### Available Scripts

```bash
# Development
npm run dev              # Start Storybook development server
npm run storybook        # Start Storybook (same as dev)

# Building
npm run build            # Build the library
npm run build:types      # Generate TypeScript declarations
npm run build:all        # Build everything (types + library)
npm run build:ci         # Build for CI with optimized settings

# Testing
npm test                 # Run all tests
npm run test:coverage    # Run tests with coverage report

# Storybook
npm run build-storybook  # Build static Storybook

# Utilities
npm run clean            # Clean build artifacts
npm run prepublishOnly   # Pre-publish checks
```

## 🔄 Version Management

### Current Version: 1.2.0

The library follows semantic versioning (SemVer):

- **Major** (1.x.x): Breaking changes
- **Minor** (1.1.x): New features, backward compatible
- **Patch** (1.1.3): Bug fixes, backward compatible

### Version History

- **v1.2.0** (Current): ColorsSection width consistency
- **v1.1.3**: ColorsSection export fixes
- **v1.1.2**: Unified min/max clamping system
- **v1.1.1**: Critical percentage conversion fixes
- **v1.1.0**: Storybook 9 upgrade, enhanced unit conversion, new components
- **v1.0.4**: Interactive stories and unit conversion improvements
- **v1.0.3**: Initial release with core components

### Updating Version

```bash
# Update version in package.json
npm version patch  # 1.2.0 -> 1.2.1
npm version minor  # 1.2.0 -> 1.3.0
npm version major  # 1.2.0 -> 2.0.0
```

## 🔄 Unit Conversion System

### Overview

The library includes a comprehensive unit conversion system with 5 unit types:

1. **Length System** (Internal: cm)
2. **Temperature System** (Internal: °C)
3. **Volume System** (Internal: ml)
4. **Weight System** (Internal: g)
5. **Energy System** (Internal: J)

### Key Features

- **Axis-Aware Percentage**: Width/height and x/y coordinates use correct references
- **Context-Aware**: Relative units (%, vw, vh, em, rem) with proper context
- **Precision Preservation**: Full internal precision with appropriate display
- **Backward Compatibility**: Existing code continues to work

### Usage in Development

```tsx
// Provide context for relative units
<UnitConversionProvider 
  referenceWidth={27.7} 
  referenceHeight={19.0}
  containerWidth={30.0}
  containerHeight={20.0}
>
  <DimensionInput
    label="Width"
    value={15}
    unit="%"
    axis="width"  // Uses referenceWidth
    onChange={(value, unit) => console.log(value, unit)}
  />
  
  <DimensionInput
    label="Height"
    value={10}
    unit="%"
    axis="height"  // Uses referenceHeight
    onChange={(value, unit) => console.log(value, unit)}
  />
</UnitConversionProvider>
```

### Testing Unit Conversion

```bash
# Run unit conversion tests
npm test -- --testPathPattern=UnitConversionService.test.ts

# Run component tests
npm test -- --testPathPattern=DimensionInput.test.tsx
```

## 📚 Storybook Development

### Storybook 9.1.3 Features

- **Framework-based Configuration**: Modern architecture
- **Interactive Stories**: Real-time component interaction
- **Enhanced Performance**: Faster startup and build times
- **Webpack 5**: Optimized bundling

### Development Workflow

1. **Start Storybook**:
   ```bash
   npm run dev
   ```

2. **Navigate to**: `http://localhost:6006`

3. **Edit Stories**: Modify `.stories.tsx` files for component examples

4. **Interactive Testing**: Use Storybook controls to test components

### Story Structure

```tsx
// Example story structure
export default {
  title: 'Compositions/DimensionInput',
  component: DimensionInput,
  parameters: {
    docs: {
      description: {
        component: 'Enhanced dimension input with unit conversion'
      }
    }
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'number' },
    unit: { control: 'select', options: ['cm', 'mm', 'in', '%'] },
    axis: { control: 'select', options: ['width', 'height'] }
  }
} as Meta<DimensionInputProps>;

// Interactive story with state management
export const Interactive = (args: DimensionInputProps) => {
  const [value, setValue] = useState(args.value);
  const [unit, setUnit] = useState(args.unit);

  return (
    <UnitConversionProvider 
      referenceWidth={27.7} 
      referenceHeight={19.0}
    >
      <DimensionInput
        {...args}
        value={value}
        unit={unit}
        onChange={(newValue, newUnit) => {
          setValue(newValue);
          setUnit(newUnit);
        }}
      />
    </UnitConversionProvider>
  );
};
```

### Storybook Maintenance

```bash
# Update Storybook dependencies
npm update @storybook/*

# Rebuild Storybook
npm run build-storybook

# Check for deprecated addons
npm run storybook -- --help
```

## 🧪 Testing

### Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── DimensionInput.test.tsx
│   │   └── ...
│   └── ...
├── services/
│   ├── __tests__/
│   │   ├── UnitConversionService.test.ts
│   │   └── ...
│   └── ...
└── ...
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- DimensionInput.test.tsx

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage Requirements

- **Minimum Coverage**: 80% for branches, functions, lines, and statements
- **Critical Components**: 90%+ coverage for core functionality
- **Unit Conversion**: 100% coverage for conversion logic

### Writing Tests

```tsx
// Example test for unit conversion
describe('UnitConversionService - Percentage Conversion', () => {
  test('height percentage uses referenceHeight', () => {
    const context = { 
      referenceWidth: 27.7, 
      referenceHeight: 19.0,
      axis: 'height' as const 
    };
    
    const heightCm = unitConversionService.toInternalUnit(100, '%', 'length', context);
    expect(heightCm).toBeCloseTo(19.0, 2);
  });
});
```

## 🏗️ Building

### Build Process

1. **Type Generation**: Generate TypeScript declarations
2. **Library Build**: Bundle components with Rollup
3. **Optimization**: Tree shaking and minification
4. **Validation**: Type checking and linting

### Build Commands

```bash
# Full build process
npm run build:all

# Build types only
npm run build:types

# Build library only
npm run build

# CI build (optimized)
npm run build:ci
```

### Build Output

```
dist/
├── index.js              # CommonJS bundle
├── index.esm.js          # ES modules bundle
├── index.d.ts            # TypeScript declarations
└── types/                # Detailed type definitions
```

### Build Configuration

- **Rollup**: Modern module bundler
- **TypeScript**: Strict type checking
- **Tree Shaking**: Dead code elimination
- **Minification**: Production optimization

## 📦 Publishing

### Pre-publish Checklist

1. **Tests Passing**: All tests must pass
2. **Build Successful**: Library builds without errors
3. **Type Checking**: TypeScript compilation successful
4. **Documentation Updated**: README and docs current
5. **Version Updated**: Package.json version incremented

### Publishing Process

```bash
# 1. Update version
npm version patch  # or minor/major

# 2. Build and test
npm run build:all
npm test

# 3. Commit changes
git add .
git commit -m "Release v1.2.0"

# 4. Push to GitHub
git push origin main
git push --tags

# 5. Create GitHub release
# Go to GitHub repository -> Releases -> Create new release

# 6. Publish to npm (if needed)
npm publish
```

### GitHub Packages Configuration

```json
{
  "name": "@frndfrts/fluent-ui-custom-components",
  "version": "1.2.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. **Authentication Errors**

```bash
# Error: 401 Unauthorized
# Solution: Check GitHub token permissions
```

**Fix**: Ensure your GitHub token has `read:packages` and `write:packages` permissions.

#### 2. **Build Errors**

```bash
# Error: Cannot find module
# Solution: Check imports and dependencies
```

**Fix**: Run `npm install` and check for missing dependencies.

#### 3. **TypeScript Errors**

```bash
# Error: Type 'X' is not assignable to type 'Y'
# Solution: Check type definitions
```

**Fix**: Update TypeScript types or fix component interfaces.

#### 4. **Storybook Issues**

```bash
# Error: Cannot resolve module
# Solution: Check Storybook configuration
```

**Fix**: Update `.storybook/main.ts` and check addon compatibility.

#### 5. **Unit Conversion Errors**

```bash
# Error: Reference width required for percentage conversion
# Solution: Provide context for relative units
```

**Fix**: Wrap components in `UnitConversionProvider` with proper context.

### Performance Issues

#### 1. **Slow Build Times**

```bash
# Solution: Optimize build configuration
npm run build:ci  # Use optimized build
```

#### 2. **Large Bundle Size**

```bash
# Solution: Check for unused dependencies
npm run build -- --analyze
```

#### 3. **Memory Issues**

```bash
# Solution: Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Check specific areas
DEBUG=storybook:* npm run dev
DEBUG=rollup:* npm run build
```

## 🤝 Contributing

### Development Workflow

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/percentage-conversion-fix
   ```

2. **Make Changes**: Implement your feature or fix

3. **Run Tests**:
   ```bash
   npm test
   npm run build:all
   ```

4. **Update Documentation**: Update README and component docs

5. **Create Pull Request**: Submit PR with detailed description

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Testing**: Minimum 80% coverage
- **Documentation**: JSDoc comments required

### Component Guidelines

- **Architecture**: Follow 5-level hierarchy
- **Props**: Consistent naming and types
- **Error Handling**: Implement ErrorBoundary
- **Accessibility**: ARIA support required
- **Testing**: Unit tests for all components
- **Unit Conversion**: Integrate with unit system

### Pull Request Process

1. **Description**: Clear description of changes
2. **Testing**: All tests passing
3. **Documentation**: Updated README if needed
4. **Examples**: Storybook stories updated
5. **Review**: Code review required

### Release Process

1. **Feature Complete**: All features implemented and tested
2. **Documentation Updated**: README and docs current
3. **Version Bumped**: Package.json version updated
4. **Build Successful**: Library builds without errors
5. **Tests Passing**: All tests pass
6. **Release Created**: GitHub release with changelog

## 📞 Support

### Getting Help

1. **Check Documentation**: Review README and component docs
2. **Explore Storybook**: Run `npm run dev` to see components
3. **Review Issues**: Check GitHub issues for known problems
4. **Contact Team**: Reach out to development team
5. **Unit Conversion**: Review unit conversion documentation

### Resources

- **[Usage Instructions](USAGE_INSTRUCTIONS.md)**: Detailed usage examples
- **[Component Documentation](src/components/README.md)**: Component reference
- **[Storybook](http://localhost:6006)**: Interactive examples
- **[GitHub Issues](https://github.com/frndfrts/fluent-ui-custom-components/issues)**: Bug reports and feature requests

---

**Current Version**: 1.2.0  
**Storybook Version**: 9.1.3  
**Last Updated**: December 2024
