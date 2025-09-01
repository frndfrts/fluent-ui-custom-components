# Personal GitHub Account Setup Guide - GitHub Packages

This guide explains how to set up and use this component library under your personal GitHub account using GitHub Packages.

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

- GitHub personal account (`frndfrts`)
- Repository access permissions
- Node.js and npm installed
- GitHub Personal Access Token (PAT) with appropriate permissions

## Step 1: Personal Repository Setup

### 1.1 Create Personal Repository

1. Go to your GitHub account (`frndfrts`)
2. Click "New repository"
3. Name: `fluent-ui-custom-components`
4. Set to **Private** (or Public if you prefer)
5. Add description: "Custom Fluent UI component library with 5-level architecture"
6. Initialize with README, .gitignore, and license

### 1.2 Push This Code

```bash
# Clone the new repository
git clone https://github.com/frndfrts/fluent-ui-custom-components.git
cd fluent-ui-custom-components

# Copy all files from this project
# (You'll need to manually copy the source code)

# Commit and push
git add .
git commit -m "Initial commit: Fluent UI Custom Components library v1.1.0"
git push origin main
```

## Step 2: Configure GitHub Packages

### 2.1 Update Package Configuration

The `package.json` has been updated with:
- Personal account scope: `@frndfrts/fluent-ui-custom-components`
- Version: `1.1.0`
- GitHub Packages registry configuration
- Repository URL format

### 2.2 Create .npmrc File

The `.npmrc` file is configured for your personal account:
```ini
@frndfrts:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Step 3: First Publication

### 3.1 Manual Publication (First Time)

```bash
# Login to GitHub Packages
npm login --scope=@frndfrts --registry=https://npm.pkg.github.com

# When prompted:
# Username: your-github-username
# Password: your-github-personal-access-token
# Email: your-github-email

# Build the package
npm run build:all

# Publish
npm publish
```

### 3.2 Automated Publication (Future)

The GitHub Actions workflow will automatically publish when you:
1. Create a new release on GitHub
2. Tag a new version
3. Push to main branch (if configured)

## Step 4: Team Member Onboarding

### 4.1 Install the Package

Team members can install the package using:

```bash
# Install from GitHub Packages
npm install @frndfrts/fluent-ui-custom-components@1.1.0
```

### 4.2 Configure .npmrc in Consuming Projects

Team members need to create `.npmrc` in their project root:

```ini
@frndfrts:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 4.3 Set GitHub Token

```bash
# Set as environment variable
export GITHUB_TOKEN=your_github_personal_access_token

# Or add to .env file
echo "GITHUB_TOKEN=your_github_personal_access_token" >> .env
```

## Step 5: Usage in Team Projects

### 5.1 Import Components

```tsx
import { ColorsSection, DimensionInput, TabbedNavbar } from '@frndfrts/fluent-ui-custom-components';
```

### 5.2 Update package.json

```json
{
  "dependencies": {
    "@frndfrts/fluent-ui-custom-components": "^1.1.0"
  }
}
```

### 5.3 Unit Conversion Setup

For advanced unit conversion features:

```tsx
import { UnitConversionProvider } from '@frndfrts/fluent-ui-custom-components';

<UnitConversionProvider
  referenceWidth={20}
  referenceHeight={15}
  containerWidth={30}
  containerHeight={20}
  fontSize={0.4}
  rootFontSize={0.35}
>
  {/* Your components here */}
</UnitConversionProvider>
```

## Step 6: Version Management

### 6.1 Semantic Versioning

Follow semantic versioning for releases:
- `1.0.0` - Initial release
- `1.0.1` - Bug fixes
- `1.1.0` - New features (Storybook 9, Unit Conversion)
- `2.0.0` - Breaking changes

### 6.2 Creating Releases

```bash
# Update version
npm version patch  # 1.1.0 -> 1.1.1
npm version minor  # 1.1.1 -> 1.2.0
npm version major  # 1.2.0 -> 2.0.0

# Push tags
git push origin main --tags

# Create GitHub release (this triggers auto-publish)
```

## Step 7: Access Control

### 7.1 Repository Permissions

- **Admin**: Full access to repository and packages
- **Maintain**: Can manage releases and packages
- **Write**: Can push code and create releases
- **Read**: Can view and install packages

### 7.2 Package Permissions

- **Read**: Can install packages
- **Write**: Can publish packages
- **Admin**: Can manage package settings

## Step 8: Troubleshooting

### 8.1 Common Issues

#### Authentication Errors
```bash
# Re-authenticate
npm logout --registry=https://npm.pkg.github.com
npm login --scope=@frndfrts --registry=https://npm.pkg.github.com
```

#### Package Not Found
```bash
# Check registry configuration
npm config get @frndfrts:registry

# Should return: https://npm.pkg.github.com
```

#### Build Errors
```bash
# Clean and rebuild
npm run clean
npm run build:all
```

#### Storybook Issues
```bash
# Clear Storybook cache
rm -rf node_modules/.cache/storybook
npm run dev
```

### 8.2 Debug Commands

```bash
# Check npm configuration
npm config list

# Check package info
npm view @frndfrts/fluent-ui-custom-components

# List published versions
npm view @frndfrts/fluent-ui-custom-components versions

# Check Storybook version
npx storybook --version
```

## Step 9: CI/CD Integration

### 9.1 GitHub Actions

The workflow automatically:
- Builds the package
- Publishes to GitHub Packages
- Runs on release creation
- Tests Storybook build

### 9.2 Custom CI/CD

For other CI/CD systems, use:
```bash
npm login --scope=@frndfrts --registry=https://npm.pkg.github.com
npm run build:all
npm publish
```

## Step 10: Monitoring and Maintenance

### 10.1 Package Analytics

Monitor package usage in GitHub:
- Download statistics
- Version adoption
- Dependency graphs

### 10.2 Regular Maintenance

- Update dependencies monthly
- Review and merge PRs
- Monitor for security vulnerabilities
- Update documentation
- Test Storybook functionality
- Verify unit conversion features

### 10.3 Storybook Maintenance

```bash
# Update Storybook
npx storybook@latest upgrade

# Check for updates
npm outdated

# Test Storybook build
npm run build-storybook
```

## Step 11: New Features in v1.1.0

### 11.1 Unit Conversion System

The library now includes a comprehensive unit conversion system:

```tsx
import { unitConversionService } from '@frndfrts/fluent-ui-custom-components';

// Length conversion
const inches = unitConversionService.fromInternalUnit(10, 'in', 'length');
const cm = unitConversionService.toInternalUnit(3.94, 'in', 'length');

// Temperature conversion
const fahrenheit = unitConversionService.fromInternalUnit(25, '°F', 'temperature');
const celsius = unitConversionService.toInternalUnit(77, '°F', 'temperature');
```

### 11.2 New Components

#### TabbedNavbar
```tsx
<TabbedNavbar
  tabs={[
    { id: 'paper', label: 'Paper', content: <PaperSection /> },
    { id: 'notes', label: 'Notes', content: <NotesSection /> },
  ]}
  selectedTab="paper"
  onTabSelect={setSelectedTab}
/>
```

#### PreviewSection
```tsx
<PreviewSection
  content={<YourContent />}
  width={1200}
  height={800}
  backgroundColor="#f5f5f5"
/>
```

### 11.3 Enhanced DimensionInput

```tsx
<DimensionInput
  label="Width"
  value={10}
  unit="cm"
  unitSystem="length"
  units={['cm', 'mm', 'in', 'px', 'pt', '%', 'vw', 'vh']}
  onChange={(value, unit) => console.log(`${value} ${unit}`)}
  context={{
    referenceWidth: 20,
    referenceHeight: 15,
    containerWidth: 30,
    containerHeight: 20,
    fontSize: 0.4,
    rootFontSize: 0.35,
  }}
/>
```

## Support

For issues:
1. Check this troubleshooting guide
2. Review GitHub Actions logs
3. Check package permissions
4. Contact organization admins
5. Review unit conversion documentation: [UNIT_CONVERSION_IMPLEMENTATION.md](./UNIT_CONVERSION_IMPLEMENTATION.md)
6. Check Storybook documentation for v9.1.3

---

**Note**: This guide is configured for the GitHub account `frndfrts`. If you're using a different account, replace `frndfrts` with your actual GitHub username throughout this guide.

**Current Version**: 1.1.0
**Storybook Version**: 9.1.3
**Last Updated**: December 2024
