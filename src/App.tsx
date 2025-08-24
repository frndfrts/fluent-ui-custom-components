/**
 * App.tsx
 * Comprehensive sample application demonstrating all primitives, components, compositions, and panels
 * with the integrated layout system for pixel-perfect alignment across all form components.
 */
import {
  FluentProvider,
  webLightTheme,
  Title1,
  Title2,
  Title3,
  Subtitle1,
  Body1,
  Body2,
  Text,
  TabList,
  Tab,
  tokens,
  makeStyles,
  shorthands,
  Divider,
  Link,
  Badge,
} from '@fluentui/react-components';
import React from 'react';
import { NumericInput } from './components/primitives/NumericInput';
import { HexInput } from './components/primitives/HexInput';
import { ColorSelector } from './components/compositions/ColorSelector';
import { SliderInput } from './components/primitives/SliderInput';
import { ColorSliderInput } from './components/primitives/ColorSliderInput';
import { MultipleSlidersInput } from './components/compositions/MultipleSlidersInput';


import { ColorHexInput } from './components/compositions/ColorHexInput';
import { LabeledColorPicker } from './components/compositions/LabeledColorPicker';
import { ColorModelSelector } from './components/components/ColorModelSelector';
import { AspectRatioSelector } from './components/components/AspectRatioSelector';
import { PaperSelector } from './components/components/PaperSelector';
import { PositionSelector, DEFAULT_POSITIONS } from './components/components/PositionSelector';
import { OrientationSelector } from './components/components/OrientationSelector';
import { UnitSelector } from './components/components/UnitSelector';
import { UniversalSelector } from './components/primitives/UniversalSelector';
import { ColorInput } from './components/compositions/ColorInput';
import { DimensionInput } from './components/compositions/DimensionInput';
import { FluentColorPicker } from './components/legacy/FluentColorPicker';
import { HorizontalColorPicker } from './components/legacy/HorizontalColorPicker';
import { ResponsiveColorPicker } from './components/panels/ResponsiveColorPicker';
import { RGBHSLColorSlidersInput } from './components/compositions/RGBHSLColorSlidersInput';
import { MarginsPanel } from './components/panels/MarginsPanel';
import { PaddingPanel } from './components/panels/PaddingPanel';
import { PaperSizePanel } from './components/panels/PaperSizePanel';
import { PositionFields } from './components/panels/PositionFields';
import { SizeFields } from './components/panels/SizeFields';
import { SizeAndPositionPanel } from './components/panels/SizeAndPositionPanel';
import { LockAspectRatio } from './components/primitives/LockAspectRatio';
import { PaperSection } from './components/sections/PaperSection';
import { NotesSection } from './components/sections/NotesSection';
import { SlidesSection } from './components/sections/SlidesSection';
import { TitlePlaceholderSection } from './components/sections/TitlePlaceholderSection';
import { SubtitlePlaceholderSection } from './components/sections/SubtitlePlaceholderSection';
import { BodyPlaceholderSection } from './components/sections/BodyPlaceholderSection';
import { FootnotePlaceholderSection } from './components/sections/FootnotePlaceholderSection';
import { SourcePlaceholderSection } from './components/sections/SourcePlaceholderSection';
import { LogoPlaceholderSection } from './components/sections/LogoPlaceholderSection';
import { PageNumberPlaceholderSection } from './components/sections/PageNumberPlaceholderSection';
import { ColorsSection } from './components/sections/ColorsSection';

interface ComponentExample {
  description: string;
  demo: React.ReactNode;
  settings: Record<string, unknown>;
}

interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  nav: {
    width: '280px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    overflowY: 'auto',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: tokens.spacingVerticalL,
    maxWidth: '900px',
    margin: '0 auto',
  },
  pageNav: {
    width: '240px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    overflowY: 'auto',
    flexShrink: 0,
    padding: tokens.spacingVerticalM,
  },
  pageNavTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  pageNavItem: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground2,
    padding: tokens.spacingVerticalXS,
    cursor: 'pointer',
    borderRadius: tokens.borderRadiusSmall,
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1,
      color: tokens.colorNeutralForeground1,
    },
  },
  pageNavItemActive: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
    fontSize: tokens.fontSizeBase200,
  },
  breadcrumbSeparator: {
    color: tokens.colorNeutralForeground3,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: '1.6',
    color: tokens.colorNeutralForeground2,
  },
  demoSection: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  demoTitle: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground1,
  },
  demoDescription: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: '1.5',
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalM,
  },
  navGroup: {
    marginBottom: tokens.spacingVerticalL,
  },
  navGroupTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    padding: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalXS,
  },
  navItem: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground2,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    cursor: 'pointer',
    borderRadius: tokens.borderRadiusSmall,
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1,
      color: tokens.colorNeutralForeground1,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  // New fluid layout styles
  heroSection: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  introText: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: '1.6',
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalL,
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground1,
  },
  sectionContent: {
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.5',
    marginBottom: tokens.spacingVerticalL,
  },
  featureList: {
    marginBottom: tokens.spacingVerticalL,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalS,
  },
  featureBullet: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: '2px',
  },
  featureText: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: '1.5',
    color: tokens.colorNeutralForeground2,
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
  },
  techTag: {
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusSmall,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightMedium,
  },
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL,
  },
  componentCard: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium,
  },
  navHeader: {
    padding: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalM,
  },
  navHeaderTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  navHeaderSubtitle: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground2,
  },
});

// Add the OnThisPage component
const OnThisPage: React.FC<{ sections: { id: string; title: string }[] }> = ({ sections }) => {
  const styles = useStyles();
  const [activeSection, setActiveSection] = React.useState<string>('');

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageNav}>
      <div className={styles.pageNavTitle}>On this page</div>
      {sections.map((section) => (
        <div
          key={section.id}
          className={styles.pageNavItem}
          style={activeSection === section.id ? { fontWeight: tokens.fontWeightMedium } : {}}
          onClick={() => scrollToSection(section.id)}
        >
          {section.title}
        </div>
      ))}
    </div>
  );
};

const categories = [
  {
    name: 'Sections',
    items: [
      { name: 'PaperSection', key: 'paperSection' },
      { name: 'NotesSection', key: 'notesSection' },
      { name: 'SlidesSection', key: 'slidesSection' },
      { name: 'TitlePlaceholderSection', key: 'titlePlaceholderSection' },
      { name: 'SubtitlePlaceholderSection', key: 'subtitlePlaceholderSection' },
      { name: 'BodyPlaceholderSection', key: 'bodyPlaceholderSection' },
      { name: 'FootnotePlaceholderSection', key: 'footnotePlaceholderSection' },
      { name: 'SourcePlaceholderSection', key: 'sourcePlaceholderSection' },
      { name: 'LogoPlaceholderSection', key: 'logoPlaceholderSection' },
      { name: 'PageNumberPlaceholderSection', key: 'pageNumberPlaceholderSection' },
      { name: 'ColorsSection', key: 'colorsSection' },
    ]
  },
  {
    name: 'Panels',
    items: [
      { name: 'MarginsPanel', key: 'marginsPanel' },
      { name: 'PaddingPanel', key: 'paddingPanel' },
      { name: 'PaperSizePanel', key: 'paperSizePanel' },
      { name: 'PositionFields', key: 'positionFields' },
      { name: 'SizeAndPositionPanel', key: 'sizeAndPositionPanel' },
      { name: 'SizeFields', key: 'sizeFields' },
    ]
  },
  {
    name: 'Compositions',
    items: [
      { name: 'ColorHexInput', key: 'colorHexInput' },
      { name: 'ColorInput', key: 'colorInput' },
      { name: 'ColorPicker', key: 'colorPicker' },
      { name: 'ColorSelector', key: 'colorSelector' },
      { name: 'DimensionInput', key: 'dimensionInput' },
      { name: 'LabeledColorPicker', key: 'labeledColorPicker' },
      { name: 'Large Swatch ColorHexInput', key: 'largeSwatchColorHexInput' },
      { name: 'MultipleSlidersInput', key: 'multipleSlidersInput' },
      { name: 'ResponsiveColorPicker', key: 'responsiveColorPicker' },
      { name: 'RGBHSLColorSlidersInput', key: 'rgbhslColorSlidersInput' },
    ]
  },
  {
    name: 'Components',
    items: [
      { name: 'AspectRatioSelector', key: 'aspectRatioSelector' },
      { name: 'ColorModelSelector', key: 'colorModelSelector' },
      { name: 'OrientationSelector', key: 'orientationSelector' },
      { name: 'PaperSelector', key: 'paperSelector' },
      { name: 'PositionSelector', key: 'positionSelector' },
      { name: 'UniversalSelector', key: 'universalSelector' },
    ]
  },
  {
    name: 'Primitives',
    items: [
      { name: 'ColorSliderInput', key: 'colorSliderInput' },
      { name: 'HexInput', key: 'hexInput' },
      
      { name: 'LockAspectRatio', key: 'lockAspectRatio' },
      { name: 'NumericInput', key: 'numericInput' },
              { name: 'HexInput', key: 'newNumericInput' },
      { name: 'SliderInput', key: 'sliderInput' },
      { name: 'UnitSelector', key: 'unitSelector' },
    ]
  },
  {
    name: 'Legacy',
    items: [
      { name: 'FluentColorPicker', key: 'fluentColorPicker' },
      { name: 'HorizontalColorPicker', key: 'horizontalColorPicker' },
    ]
  }
];



const getComponentExamples = (key: string): ComponentExample[] => {
  switch (key) {
    case 'numericInput':
      return [
        {
          description: "Basic numeric input with default settings",
          demo: <NumericInput value={42.5} onChange={() => {}} />,
          settings: { value: 42.5, min: 0, max: 10000, step: 0.1, decimalPlaces: 2 }
        },
        {
          description: "Small size with custom range and precision",
          demo: <NumericInput value={15.75} min={0} max={100} step={0.25} decimalPlaces={2} size="small" onChange={() => {}} />,
          settings: { value: 15.75, min: 0, max: 100, step: 0.25, decimalPlaces: 2, size: "small" }
        },
        {
          description: "Large size with negative values allowed",
          demo: <NumericInput value={-25.5} min={-100} max={100} step={1} decimalPlaces={1} size="large" onChange={() => {}} />,
          settings: { value: -25.5, min: -100, max: 100, step: 1, decimalPlaces: 1, size: "large" }
        },
        {
          description: "Custom width with placeholder",
          demo: <NumericInput value={''} placeholder="Enter value" width={150} onChange={() => {}} />,
          settings: { value: '', placeholder: "Enter value", width: 150 }
        }
      ];
    case 'newNumericInput':
      return [
        {
          description: "Basic hexadecimal input with default settings (6 digits)",
          demo: <HexInput value="#FF6B35" onChange={() => {}} />,
          settings: { value: "#FF6B35", length: 6 }
        },
        {
          description: "3-digit hex input (short format)",
          demo: <HexInput value="#F0A" length={3} onChange={() => {}} />,
          settings: { value: "#F0A", length: 3 }
        },
        {
          description: "Demonstrates left-padding behavior (123 → #000123)",
          demo: <HexInput value="#000123" placeholder="Try typing '123'" onChange={() => {}} />,
          settings: { value: "#000123", length: 6, placeholder: "Try typing '123'" }
        },
        {
          description: "Small size with custom placeholder",
          demo: <HexInput value="#00FF00" size="small" placeholder="Enter hex" onChange={() => {}} />,
          settings: { value: "#00FF00", size: "small", placeholder: "Enter hex", length: 6 }
        },
        {
          description: "Large size with custom width",
          demo: <HexInput value="#0000FF" size="large" width={200} onChange={() => {}} />,
          settings: { value: "#0000FF", size: "large", width: 200, length: 6 }
        }
      ];
    case 'colorSelector':
      return [
        {
          description: "Default color selector with 64 standard colors",
          demo: <ColorSelector value="#FF0000" onChange={() => {}} />,
          settings: { value: "#FF0000", colors: "STANDARD_COLORS", columns: 8, showTooltips: true, colorModel: "rgb" }
        },
        {
          description: "Custom color palette with HSL tooltips",
          demo: <ColorSelector value="#00FF00" colors={['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']} colorModel="hsl" onChange={() => {}} />,
          settings: { value: "#00FF00", colors: "custom", columns: 6, showTooltips: true, colorModel: "hsl" }
        },
        {
          description: "Disabled state without tooltips",
          demo: <ColorSelector value="#0000FF" disabled showTooltips={false} onChange={() => {}} />,
          settings: { value: "#0000FF", disabled: true, showTooltips: false }
        }
      ];
    case 'sliderInput':
      return [
        {
          description: "Basic slider with percentage values",
          demo: <SliderInput value={50} min={0} max={100} label="Opacity" onChange={() => {}} />,
          settings: { value: 50, min: 0, max: 100, label: "Opacity" }
        },

        {
          description: "Slider with step increments",
          demo: <SliderInput value={25} min={0} max={100} step={5} label="Volume" onChange={() => {}} />,
          settings: { value: 25, min: 0, max: 100, step: 5, label: "Volume" }
        }
      ];
    case 'lockAspectRatio':
      return [
        {
          description: "Basic lock aspect ratio checkbox",
          demo: <LockAspectRatio checked={false} onChange={() => {}} />,
          settings: { checked: false, disabled: false }
        },
        {
          description: "Checked state",
          demo: <LockAspectRatio checked={true} onChange={() => {}} />,
          settings: { checked: true, disabled: false }
        },
        {
          description: "Disabled state",
          demo: <LockAspectRatio checked={false} disabled={true} onChange={() => {}} />,
          settings: { checked: false, disabled: true }
        }
      ];
    case 'colorSliderInput':
      return [
        {
          description: "Hue slider for color picker",
          demo: <ColorSliderInput value={180} label="Hue" onChange={() => {}} />,
          settings: { value: 180, label: "Hue" }
        },
        {
          description: "Saturation slider with percentage",
          demo: <ColorSliderInput value={75} label="Sat" onChange={() => {}} />,
          settings: { value: 75, label: "Sat", suffix: "%" }
        },
        {
          description: "Lightness slider for HSL color model",
          demo: <ColorSliderInput value={60} label="Lum" onChange={() => {}} />,
          settings: { value: 60, label: "Lum", suffix: "%" }
        }
      ];
    case 'multipleSlidersInput':
      return [
        {
          description: "Multiple sliders with aligned labels",
          demo: <MultipleSlidersInput sliders={[{ value: 50, min: 0, max: 100, label: "Red", onChange: () => {} }, { value: 75, min: 0, max: 100, label: "Green", onChange: () => {} }, { value: 25, min: 0, max: 100, label: "Blue", onChange: () => {} }]} labelValueWidth={60} />,
          settings: { sliders: "3 RGB sliders", labelValueWidth: 60 }
        },
        {
          description: "HSL color sliders",
          demo: <MultipleSlidersInput sliders={[{ value: 180, min: 0, max: 360, label: "Hue", onChange: () => {} }, { value: 50, min: 0, max: 100, label: "Sat", onChange: () => {} }, { value: 60, min: 0, max: 100, label: "Lum", onChange: () => {} }]} labelValueWidth={50} />,
          settings: { sliders: "3 HSL sliders", labelValueWidth: 50 }
        }
      ];
    case 'rgbhslColorSlidersInput':
      return [
        {
          description: "RGB color sliders with ColorSliderInput components",
          demo: <RGBHSLColorSlidersInput mode="rgb" rgbValues={{ r: 128, g: 64, b: 240 }} onRGBChange={() => {}} />,
          settings: { mode: "rgb", rgbValues: { r: 128, g: 64, b: 240 } }
        },
        {
          description: "HSL color sliders with ColorSliderInput components",
          demo: <RGBHSLColorSlidersInput mode="hsl" hslValues={{ h: 180, s: 75, l: 60 }} onHSLChange={() => {}} />,
          settings: { mode: "hsl", hslValues: { h: 180, s: 75, l: 60 } }
        },
        {
          description: "RGB sliders with custom width",
          demo: <RGBHSLColorSlidersInput mode="rgb" rgbValues={{ r: 255, g: 128, b: 0 }} width={300} onRGBChange={() => {}} />,
          settings: { mode: "rgb", rgbValues: { r: 255, g: 128, b: 0 }, width: 300 }
        }
      ];
    case 'hexInput':
      return [
        {
          description: "Standard 6-digit hex input",
          demo: <HexInput value="#FF6B35" onChange={() => {}} />,
          settings: { value: "#FF6B35", length: 6 }
        },
        {
          description: "Small size with custom placeholder",
          demo: <HexInput value="#00FF00" size="small" placeholder="Enter hex" onChange={() => {}} />,
          settings: { value: "#00FF00", size: "small", placeholder: "Enter hex" }
        },
        {
          description: "Large size with custom width",
          demo: <HexInput value="#0000FF" size="large" width={200} onChange={() => {}} />,
          settings: { value: "#0000FF", size: "large", width: 200 }
        }
      ];

    case 'colorHexInput':
      return [
        {
          description: "Color hex input with preview swatch",
          demo: <ColorHexInput value="#FF6B35" onChange={() => {}} />,
          settings: { value: "#FF6B35", swatchClickable: false }
        },
        {
          description: "Clickable swatch with custom size",
          demo: <ColorHexInput value="#00FF00" size="large" swatchClickable onSwatchClick={() => {}} onChange={() => {}} />,
          settings: { value: "#00FF00", size: "large", swatchClickable: true }
        },
        {
          description: "Full width with placeholder",
          demo: <ColorHexInput value="" placeholder="#000000" fullWidth onChange={() => {}} />,
          settings: { value: "", placeholder: "#000000", fullWidth: true }
        },
        {
          description: "Large 120px swatch with hex input",
          demo: <ColorHexInput 
            value="#8B4513" 
            swatchSize={120} 
            hexInputWidth={60} 
            containerWidth={180} 
            onChange={() => {}} 
          />,
          settings: { 
            value: "#8B4513", 
            swatchSize: 120, 
            hexInputWidth: 60, 
            containerWidth: 180 
          }
        }
      ];
    case 'colorModelSelector':
      return [
        {
          description: "RGB/HSL color model selector",
          demo: <ColorModelSelector colorModel="rgb" onChange={() => {}} />,
          settings: { colorModel: "rgb", label: "Color Model" }
        },
        {
          description: "Small size with custom label",
          demo: <ColorModelSelector colorModel="hsl" label="Model" size="small" onChange={() => {}} />,
          settings: { colorModel: "hsl", label: "Model", size: "small" }
        },
        {
          description: "Large size disabled state",
          demo: <ColorModelSelector colorModel="rgb" size="large" disabled onChange={() => {}} />,
          settings: { colorModel: "rgb", size: "large", disabled: true }
        }
      ];
    case 'aspectRatioSelector':
      return [
        {
          description: "Aspect ratio selector with common ratios",
          demo: <AspectRatioSelector value="16:9" options={["1:1", "4:3", "16:9", "21:9", "Custom"]} onChange={() => {}} />,
          settings: { aspectRatio: "16:9", aspectRatios: "['1:1', '4:3', '16:9', '21:9', 'Custom']" }
        },
        {
          description: "Small size with custom options",
          demo: <AspectRatioSelector value="4:3" options={["3:2", "4:3", "5:4", "Custom"]} size="small" onChange={() => {}} />,
          settings: { aspectRatio: "4:3", aspectRatios: "['3:2', '4:3', '5:4', 'Custom']", size: "small" }
        }
      ];
    case 'paperSelector':
      return [
        {
          description: "Paper size selector with standard sizes",
                      demo: <PaperSelector value="A4" onChange={() => {}} />,
          settings: { paperSize: "A4", paperSizes: "['A3', 'A4', 'A5', 'Letter', 'Legal', 'Custom']" }
        },
        {
          description: "Large size with custom options",
                      demo: <PaperSelector value="Letter" size="large" onChange={() => {}} />,
          settings: { paperSize: "Letter", paperSizes: "['A4', 'Letter', 'Legal', 'Tabloid', 'Custom']", size: "large" }
        }
      ];
    case 'positionSelector':
      return [
        {
          description: "Position selector with preset positions",
          demo: <PositionSelector value="middle-center" options={DEFAULT_POSITIONS} onChange={() => {}} />,
          settings: { position: "middle-center", positions: "DEFAULT_POSITIONS" }
        },
        {
          description: "Small size with custom positions",
          demo: <PositionSelector value="Custom" options={["left", "center", "right", "Custom"]} size="small" onChange={() => {}} />,
          settings: { position: "Custom", positions: "['left', 'center', 'right', 'Custom']", size: "small" }
        }
      ];
    case 'orientationSelector':
      return [
        {
          description: "Orientation selector for portrait/landscape",
          demo: <OrientationSelector orientation="portrait" onChange={() => {}} />,
          settings: { orientation: "portrait", label: "Orientation" }
        },
        {
          description: "Large size with custom label",
          demo: <OrientationSelector orientation="landscape" label="Layout" size="large" onChange={() => {}} />,
          settings: { orientation: "landscape", label: "Layout", size: "large" }
        }
      ];
    case 'unitSelector':
      return [
        {
          description: "Unit selector for measurement units",
                      demo: <UnitSelector onChange={() => {}} />,
          settings: { unit: "cm", units: "['px', 'pt', 'cm', 'mm', 'in']" }
        },
        {
          description: "Small size with percentage units",
          demo: <UnitSelector unit="%" units={["px", "%", "em", "rem"]} size="small" onChange={() => {}} />,
          settings: { unit: "%", units: "['px', '%', 'em', 'rem']", size: "small" }
        }
      ];
    case 'universalSelector':
      return [
        {
          description: "Universal selector with custom options",
          demo: <UniversalSelector value="option1" options={["option1", "option2", "option3"]} onChange={() => {}} />,
          settings: { value: "option1", options: "['option1', 'option2', 'option3']" }
        },
        {
          description: "With custom option and placeholder",
          demo: <UniversalSelector value="Other" options={["A", "B", "C"]} showCustomOption customOptionText="Other" placeholder="Select option" onChange={() => {}} />,
          settings: { value: "Other", options: "['A', 'B', 'C']", showCustomOption: true, customOptionText: "Other", placeholder: "Select option" }
        },
        {
          description: "With alphabetical sorting",
          demo: <UniversalSelector value="Banana" options={["Apple", "Banana", "Cherry", "Date"]} sortAlphabetically onChange={() => {}} />,
          settings: { value: "Banana", options: "['Apple', 'Banana', 'Cherry', 'Date']", sortAlphabetically: true }
        }
      ];
    case 'colorInput':
      return [
        {
          description: "Color input with RGB sliders",
          demo: <ColorInput value="#FF6B35" onChange={() => {}} />,
          settings: { value: "#FF6B35", size: "medium" }
        },
        {
          description: "Large size color input",
          demo: <ColorInput value="#00FF00" size="large" onChange={() => {}} />,
          settings: { value: "#00FF00", size: "large" }
        },
        {
          description: "Disabled color input",
          demo: <ColorInput value="#0000FF" disabled onChange={() => {}} />,
          settings: { value: "#0000FF", disabled: true }
        }
      ];
    case 'labeledColorPicker':
      return [
        {
          description: "Basic labeled color picker",
          demo: <LabeledColorPicker value="#FF6B35" label="Primary Color" onChange={() => {}} />,
          settings: { value: "#FF6B35", label: "Primary Color" }
        },
        {
          description: "Required field with custom label width",
          demo: <LabeledColorPicker value="#00FF00" label="Accent Color" required labelWidth={150} onChange={() => {}} />,
          settings: { value: "#00FF00", label: "Accent Color", required: true, labelWidth: 150 }
        },
        {
          description: "Disabled labeled color picker",
          demo: <LabeledColorPicker value="#0000FF" label="Background" disabled onChange={() => {}} />,
          settings: { value: "#0000FF", label: "Background", disabled: true }
        }
      ];
    case 'dimensionInput':
      return [
        {
          description: "Dimension input with width and height",
                      demo: <DimensionInput label="Width" value={100} onChange={() => {}} />,
          settings: { label: "Width", value: 100, unit: "cm", units: "['cm', 'mm', 'in']" }
        },
        {
          description: "Dimension input with aspect ratio lock",
                      demo: <DimensionInput label="Height" value={200} size="large" onChange={() => {}} />,
          settings: { label: "Height", value: 200, unit: "px", units: "['px', 'pt', 'cm']", size: "large" }
        }
      ];
    case 'fluentColorPicker':
      return [
        {
          description: "Fluent UI color picker integration",
          demo: <FluentColorPicker value="#FF6B35" onChange={() => {}} />,
          settings: { value: "#FF6B35" }
        },
        {
          description: "Color picker with custom size",
          demo: <FluentColorPicker value="#FF6B35" size="large" onChange={() => {}} />,
          settings: { value: "#FF6B35", size: "large" }
        }
      ];
    case 'horizontalColorPicker':
      return [
        {
          description: "Horizontal color picker layout",
          demo: <HorizontalColorPicker value="#FF6B35" onChange={() => {}} />,
          settings: { value: "#FF6B35" }
        },
        {
          description: "Large size horizontal picker",
          demo: <HorizontalColorPicker value="#00FF00" size="large" onChange={() => {}} />,
          settings: { value: "#00FF00", size: "large" }
        }
      ];
    case 'responsiveColorPicker':
      return [
        {
          description: "Responsive color picker that adapts to screen size",
          demo: <ResponsiveColorPicker value="#FF6B35" onChange={() => {}} />,
          settings: { value: "#FF6B35" }
        },
        {
          description: "Large size responsive picker",
          demo: <ResponsiveColorPicker value="#0000FF" size="large" onChange={() => {}} />,
          settings: { value: "#0000FF", size: "large" }
        }
      ];
    case 'positionFields':
      return [
        {
          description: "Position fields for X and Y coordinates",
          demo: <PositionFields position="Custom" positions={DEFAULT_POSITIONS} x={100} y={200} xUnit="px" yUnit="px" units={["px", "%", "cm"]} onChange={() => {}} />,
          settings: { position: "Custom", x: 100, y: 200, xUnit: "px", yUnit: "px", units: "['px', '%', 'cm']" }
        },
        {
          description: "Position fields with percentage units",
          demo: <PositionFields position="Custom" positions={DEFAULT_POSITIONS} x={50} y={75} xUnit="%" yUnit="%" units={["px", "%", "cm"]} onChange={() => {}} />,
          settings: { position: "Custom", x: 50, y: 75, xUnit: "%", yUnit: "%", units: "['px', '%', 'cm']" }
        }
      ];
    case 'sizeFields':
      return [
        {
          description: "Size fields for width and height",
                      demo: <SizeFields width={300} height={200} onChange={() => {}} />,
          settings: { width: 300, height: 200, widthUnit: "px", heightUnit: "px", units: "['px', 'pt', 'cm']" }
        },
        {
          description: "Size fields with aspect ratio lock",
                      demo: <SizeFields width={400} height={300} showLockAspectRatio onChange={() => {}} />,
          settings: { width: 400, height: 300, widthUnit: "cm", heightUnit: "cm", units: "['px', 'pt', 'cm']", showLockAspectRatio: true }
        }
      ];
    case 'colorPicker':
      return [
        {
          description: "Comprehensive color picker component",
          demo: <ResponsiveColorPicker value="#FF6B35" onChange={() => {}} />,
          settings: { value: "#FF6B35" }
        },
        {
          description: "Color picker with placeholder",
          demo: <ResponsiveColorPicker value="#00FF00" placeholder="Select color" onChange={() => {}} />,
          settings: { value: "#00FF00", placeholder: "Select color" }
        }
      ];
    case 'marginsPanel':
      return [
        {
          description: "Margins panel for setting all margin values",
                      demo: <MarginsPanel onChange={() => {}} />,
          settings: { margins: "object with top/right/bottom/left values and units", units: "['px', 'pt', 'cm']" }
        },
        {
          description: "Uniform margins",
                      demo: <MarginsPanel margins={{ top: 15, right: 15, bottom: 15, left: 15, topUnit: "cm", rightUnit: "cm", bottomUnit: "cm", leftUnit: "cm" }} onChange={() => {}} />,
          settings: { margins: "uniform 15cm margins", units: "['px', 'pt', 'cm']" }
        }
      ];
    case 'paddingPanel':
      return [
        {
          description: "Padding panel for setting all padding values",
                      demo: <PaddingPanel onChange={() => {}} />,
          settings: { padding: "object with top/right/bottom/left values and units", units: "['px', 'pt', 'cm']" }
        },
        {
          description: "Uniform padding",
                      demo: <PaddingPanel padding={{ top: 8, right: 8, bottom: 8, left: 8, topUnit: "cm", rightUnit: "cm", bottomUnit: "cm", leftUnit: "cm" }} onChange={() => {}} />,
          settings: { padding: "uniform 8cm padding", units: "['px', 'pt', 'cm']" }
        }
      ];
    case 'paperSizePanel':
      return [
        {
          description: "Paper size panel with A4 selection",
                      demo: <PaperSizePanel onChange={() => {}} />,
          settings: { paperSize: "A4 portrait", units: "['mm', 'cm', 'in']" }
        },
        {
          description: "Custom paper size",
                      demo: <PaperSizePanel paperSize={{ width: 300, height: 400, widthUnit: "mm", heightUnit: "mm", orientation: "portrait", paperSize: "custom" }} onChange={() => {}} />,
          settings: { paperSize: "custom 300x400mm", units: "['mm', 'cm', 'in']" }
        }
      ];
    case 'paperSection':
      return [
        {
          description: "Paper section with paper size and margins panels",
          demo: <PaperSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']" }
        },
        {
          description: "Paper section with custom paper size and margins",
          demo: <PaperSection 
            paperSize={{ width: 21, height: 29.7, widthUnit: 'cm', heightUnit: 'cm', orientation: 'portrait', paperSize: 'A4' }}
            margins={{ top: 2.5, right: 2.5, bottom: 2.5, left: 2.5, topUnit: 'cm', rightUnit: 'cm', bottomUnit: 'cm', leftUnit: 'cm' }}
          />,
          settings: { paperSize: "A4 (21x29.7cm)", margins: "2.5cm all sides" }
        }
      ];
    case 'notesSection':
      return [
        {
          description: "Notes section with size, position, and margins panels",
          demo: <NotesSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Notes section with custom size and position",
          demo: <NotesSection 
            size={{ width: 800, height: 600, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'center', x: 0, y: 0, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "800x600px", position: "center" }
        }
      ];
    case 'slidesSection':
      return [
        {
          description: "Slides section with size, position, and margins panels",
          demo: <SlidesSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Slides section with HD resolution",
          demo: <SlidesSection 
            size={{ width: 1920, height: 1080, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'center', x: 0, y: 0, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "1920x1080px (HD)", position: "center" }
        }
      ];
    case 'titlePlaceholderSection':
      return [
        {
          description: "Title placeholder section with size, position, and padding panels",
          demo: <TitlePlaceholderSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Title placeholder with custom size and position",
          demo: <TitlePlaceholderSection 
            size={{ width: 800, height: 200, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'top-center', x: 0, y: 50, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "800x200px", position: "top-center" }
        }
      ];
    case 'subtitlePlaceholderSection':
      return [
        {
          description: "Subtitle placeholder section with size, position, and padding panels",
          demo: <SubtitlePlaceholderSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Subtitle placeholder with custom size and position",
          demo: <SubtitlePlaceholderSection 
            size={{ width: 600, height: 150, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'top-center', x: 0, y: 120, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "600x150px", position: "top-center" }
        }
      ];
    case 'bodyPlaceholderSection':
      return [
        {
          description: "Body placeholder section with size, position, and padding panels",
          demo: <BodyPlaceholderSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Body placeholder with custom size and position",
          demo: <BodyPlaceholderSection 
            size={{ width: 700, height: 400, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'center', x: 0, y: 0, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "700x400px", position: "center" }
        }
      ];
    case 'footnotePlaceholderSection':
      return [
        {
          description: "Footnote placeholder section with size, position, and padding panels",
          demo: <FootnotePlaceholderSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Footnote placeholder with custom size and position",
          demo: <FootnotePlaceholderSection 
            size={{ width: 500, height: 100, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'bottom-center', x: 0, y: -50, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "500x100px", position: "bottom-center" }
        }
      ];
    case 'sourcePlaceholderSection':
      return [
        {
          description: "Source placeholder section with size, position, and padding panels",
          demo: <SourcePlaceholderSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Source placeholder with custom size and position",
          demo: <SourcePlaceholderSection 
            size={{ width: 400, height: 80, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'bottom-left', x: 50, y: -30, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "400x80px", position: "bottom-left" }
        }
      ];
    case 'logoPlaceholderSection':
      return [
        {
          description: "Logo placeholder section with size, position, and padding panels",
          demo: <LogoPlaceholderSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Logo placeholder with custom size and position",
          demo: <LogoPlaceholderSection 
            size={{ width: 200, height: 100, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'top-left', x: 50, y: 50, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "200x100px", position: "top-left" }
        }
      ];
    case 'pageNumberPlaceholderSection':
      return [
        {
          description: "Page number placeholder section with size, position, and padding panels",
          demo: <PageNumberPlaceholderSection />,
          settings: { units: "['px', 'pt', 'cm', 'mm', 'in']", showLockAspectRatio: true }
        },
        {
          description: "Page number placeholder with custom size and position",
          demo: <PageNumberPlaceholderSection 
            size={{ width: 150, height: 50, widthUnit: 'px', heightUnit: 'px' }}
            position={{ position: 'bottom-right', x: -50, y: -30, xUnit: 'px', yUnit: 'px' }}
          />,
          settings: { size: "150x50px", position: "bottom-right" }
        }
      ];
    case 'colorsSection':
      return [
        {
          description: "Colors section with predefined colors",
          demo: <ColorsSection />,
          settings: { colors: "STANDARD_COLORS" }
        },
        {
          description: "Custom colors with custom accent colors",
          demo: <ColorsSection colors={{
            accent1: '#FF6B35',
            accent2: '#00FF00',
            accent3: '#0000FF',
            accent4: '#FFFF00',
            accent5: '#FF00FF',
            accent6: '#00FFFF'
          }} />,
          settings: { colors: "custom" }
        },
        {
          description: "Modified theme colors",
          demo: <ColorsSection colors={{
            accent1: '#FF0000',
            accent2: '#00FF00',
            accent3: '#0000FF',
            accent4: '#FFFF00',
            accent5: '#FF00FF',
            accent6: '#00FFFF',
            dark1: '#1A1A1A',
            dark2: '#333333'
          }} />,
          settings: { colors: "modified" }
        }
      ];
    case 'sizeAndPositionPanel':
      return [
        {
          description: "Combined size and position panel",
          demo: <SizeAndPositionPanel width={300} height={200} widthUnit="px" heightUnit="px" position="Custom" positions={["top-left", "top-center", "top-right", "center", "bottom-left", "bottom-center", "bottom-right", "Custom"]} x={50} y={100} xUnit="px" yUnit="px" units={["px", "%", "cm"]} onSizeChange={() => {}} onPositionChange={() => {}} />,
          settings: { width: 300, height: 200, position: "Custom", x: 50, y: 100, units: "['px', '%', 'cm']" }
        },
        {
          description: "Panel with aspect ratio lock",
          demo: <SizeAndPositionPanel width={400} height={300} widthUnit="cm" heightUnit="cm" position="Custom" positions={["top-left", "top-center", "top-right", "center", "bottom-left", "bottom-center", "bottom-right", "Custom"]} x={0} y={0} xUnit="cm" yUnit="cm" units={["px", "%", "cm"]} showLockAspectRatio onSizeChange={() => {}} onPositionChange={() => {}} />,
          settings: { width: 400, height: 300, position: "Custom", x: 0, y: 0, units: "['px', '%', 'cm']", showLockAspectRatio: true }
        }
      ];
    default:
      return [];
  }
};

const getComponentName = (key: string): string => {
  switch (key) {
    case 'numericInput':
      return 'Numeric Input';
    case 'newNumericInput':
      return 'New Numeric Input';
    case 'colorSelector':
      return 'Color Selector';
    case 'colorSliderInput':
      return 'Color Slider Input';
    case 'multipleSlidersInput':
      return 'Multiple Sliders Input';
    case 'rgbhslColorSlidersInput':
      return 'RGB/HSL Color Sliders Input';
    case 'hexInput':
      return 'Hex Input';

    case 'lockAspectRatio':
      return 'Lock Aspect Ratio';
    case 'colorHexInput':
      return 'Color Hex Input';
    case 'largeSwatchColorHexInput':
      return 'Large Swatch Color Hex Input';
    case 'colorModelSelector':
      return 'Color Model Selector';
    case 'aspectRatioSelector':
      return 'Aspect Ratio Selector';
    case 'paperSelector':
      return 'Paper Selector';
    case 'positionSelector':
      return 'Position Selector';
    case 'orientationSelector':
      return 'Orientation Selector';
    case 'unitSelector':
      return 'Unit Selector';
    case 'universalSelector':
      return 'Universal Selector';
    case 'colorInput':
      return 'Color Input';
    case 'labeledColorPicker':
      return 'Labeled Color Picker';
    case 'dimensionInput':
      return 'Dimension Input';
    case 'fluentColorPicker':
      return 'Fluent Color Picker';
    case 'horizontalColorPicker':
      return 'Horizontal Color Picker';
    case 'responsiveColorPicker':
      return 'Responsive Color Picker';
    case 'positionFields':
      return 'Position Fields';
    case 'sizeFields':
      return 'Size Fields';
    case 'colorPicker':
      return 'Color Picker';
    case 'marginsPanel':
      return 'Margins Panel';
    case 'paddingPanel':
      return 'Padding Panel';
    case 'paperSizePanel':
      return 'Paper Size Panel';
    case 'sizeAndPositionPanel':
      return 'Size and Position Panel';
    case 'paperSection':
      return 'Paper Section';
    case 'notesSection':
      return 'Notes Section';
    case 'slidesSection':
      return 'Slides Section';
    case 'titlePlaceholderSection':
      return 'Title Placeholder Section';
    case 'subtitlePlaceholderSection':
      return 'Subtitle Placeholder Section';
    case 'bodyPlaceholderSection':
      return 'Body Placeholder Section';
    case 'footnotePlaceholderSection':
      return 'Footnote Placeholder Section';
    case 'sourcePlaceholderSection':
      return 'Source Placeholder Section';
    case 'logoPlaceholderSection':
      return 'Logo Placeholder Section';
    case 'pageNumberPlaceholderSection':
      return 'Page Number Placeholder Section';
    case 'colorsSection':
      return 'Colors Section';
    default:
      return 'Component';
  }
};

const getComponentDescription = (key: string): string => {
  switch (key) {
    case 'numericInput':
      return "A specialized numeric input component with built-in validation, clamping, and step controls. Features right-aligned text, hover-activated stepper buttons, and support for decimal precision. Perfect for dimension inputs, measurements, and any numeric data entry requiring validation.";
    case 'newNumericInput':
      return "A brand new numeric input component built from scratch as a perfect clone of the existing NumericInput. Features identical functionality including built-in validation, clamping, and step controls. Features right-aligned text, hover-activated stepper buttons, and support for decimal precision. Perfect for dimension inputs, measurements, and any numeric data entry requiring validation.";
    case 'colorSelector':
      return "A professional color selection component using Fluent UI's SwatchPicker. Displays a grid of predefined colors with tooltips showing RGB and HSL values. Supports custom color palettes and provides a clean, accessible interface for color selection.";
    case 'sliderInput':
      return "A flexible slider component with integrated label and value display. Supports custom ranges, step increments, and suffix labels. Features responsive sizing and professional styling following Fluent UI design guidelines.";
    case 'colorSliderInput':
      return "A specialized slider component designed for color picker applications. Provides a consistent 272px width container with integrated styling for RGB, HSL, and other color channel inputs.";
    case 'multipleSlidersInput':
      return "A container component for displaying multiple sliders with aligned labels and values. Perfect for color pickers, audio controls, or any interface requiring multiple related slider inputs with consistent layout.";
    case 'rgbhslColorSlidersInput':
      return "A specialized color slider component that displays RGB or HSL color channels using stacked ColorSliderInput components. Features mode switching between RGB and HSL, individual channel control, and consistent styling. Perfect for color picker applications requiring precise color channel manipulation.";
    case 'hexInput':
      return "A hex color input component with real-time validation and formatting. Supports variable length hex codes, automatic uppercase conversion, and placeholder text. Features monospace font and right-aligned text for professional appearance.";

    case 'lockAspectRatio':
      return "A specialized checkbox component for toggling aspect ratio lock functionality. Features integrated label ownership and perfect alignment with form layout system. Automatically positions itself below dimension inputs within the control area for consistent spacing and visual hierarchy.";
    case 'colorHexInput':
      return "A color hex input component that combines a color preview swatch with hex input functionality. Supports clickable swatches for color picker integration and provides visual feedback for invalid colors.";
    case 'largeSwatchColorHexInput':
      return "A specialized ColorHexInput configuration with a large 120px color swatch and 60px hex input for prominent color preview. Features enhanced visual clarity with 180px total width for comprehensive layout integration.";
    case 'colorModelSelector':
      return "A radio button group for selecting between RGB and HSL color models. Features consistent sizing options and integrates seamlessly with color picker components for model switching.";
    case 'aspectRatioSelector':
      return "A dropdown selector for aspect ratio selection with support for custom ratios. Includes common presets like 16:9, 4:3, and 1:1, with the ability to add custom options. Perfect for image and document layout applications.";
    case 'paperSelector':
      return "A dropdown component for paper size selection with standard presets and custom options. Includes common paper sizes like A4, Letter, and Legal, with alphabetical sorting and custom option support.";
    case 'positionSelector':
      return "A dropdown selector for position presets with custom position support. Includes common positions like top-left, center, and bottom-right, perfect for layout and positioning applications.";
    case 'orientationSelector':
      return "A radio button group for selecting between portrait and landscape orientations. Features consistent sizing and integrates well with paper size and layout components.";
    case 'unitSelector':
      return "A dropdown component for selecting measurement units. Supports various unit types including pixels, points, centimeters, millimeters, and inches. Features responsive sizing and alphabetical sorting.";
    case 'universalSelector':
      return "A flexible dropdown selector component that serves as the foundation for all selector types. Supports custom options, placeholders, and optional custom option text. Provides consistent styling and behavior across the application.";
    case 'colorInput':
      return "A comprehensive color input component that combines color model selection, RGB/HSL sliders, and hex input. Features real-time color conversion between models and provides a complete color editing interface.";
    case 'labeledColorPicker':
      return "A composition component that combines a right-aligned label with ResponsiveColorPicker. Features configurable label width, required field indicators, and maintains all ResponsiveColorPicker functionality with professional inline labeling.";
    case 'dimensionInput':
      return "A combined dimension input component that integrates numeric input with unit selection. Supports various measurement units and provides a unified interface for width, height, margin, and padding inputs.";
    case 'fluentColorPicker':
      return "A professional color picker component built on Fluent UI's native ColorPicker. Features color area, hue/alpha sliders, and RGB/HSL input fields. Provides a complete color selection experience with preview and validation.";
    case 'horizontalColorPicker':
      return "A horizontal layout color picker with side-by-side sections. Features standard colors on the left and custom color controls on the right. Provides an efficient layout for color selection workflows.";
    case 'responsiveColorPicker':
      return "A responsive color picker that automatically adapts its layout based on screen size. Switches between vertical and horizontal layouts to optimize space usage and user experience across different devices.";
    case 'positionFields':
      return "A panel component for position selection and X/Y coordinate inputs. Combines position presets with custom coordinate inputs using DimensionInput components. Perfect for precise positioning applications.";
    case 'sizeFields':
      return "A panel component for width and height inputs with optional aspect ratio locking. Features individual unit controls for width and height, with integrated aspect ratio preservation functionality.";
    case 'colorPicker':
      return "A comprehensive color picker component that integrates color selection, custom color input, and recent colors. Features a popover interface with multiple color selection methods and validation.";
    case 'marginsPanel':
      return "A panel component for setting margin values on all sides. Features individual controls for top, right, bottom, and left margins with separate unit selection for each side.";
    case 'paddingPanel':
      return "A panel component for setting padding values on all sides. Features individual controls for top, right, bottom, and left padding with separate unit selection for each side.";
    case 'paperSizePanel':
      return "An integrated panel for paper size selection, dimensions, and orientation. Combines paper size presets with custom dimension inputs and orientation controls for complete paper configuration.";
    case 'sizeAndPositionPanel':
      return "A comprehensive panel that combines size and position controls. Features width/height inputs with aspect ratio locking and position selection with X/Y coordinates. Perfect for layout and positioning applications.";
    case 'paperSection':
      return "A complete section for paper configuration including paper size selection, dimensions, orientation, and margin settings. Combines PaperSizePanel and MarginsPanel for comprehensive paper layout management.";
    case 'notesSection':
      return "A complete section for notes configuration including size, position, and margin settings. Combines SizeAndPositionPanel and MarginsPanel for comprehensive notes layout management.";
    case 'slidesSection':
      return "A complete section for slides configuration including size, position, and margin settings. Combines SizeAndPositionPanel and MarginsPanel for comprehensive slides layout management.";
    case 'titlePlaceholderSection':
      return "A complete section for title placeholder configuration including size, position, and padding settings. Combines SizeAndPositionPanel and PaddingPanel for comprehensive title placeholder layout management.";
    case 'subtitlePlaceholderSection':
      return "A complete section for subtitle placeholder configuration including size, position, and padding settings. Combines SizeAndPositionPanel and PaddingPanel for comprehensive subtitle placeholder layout management.";
    case 'bodyPlaceholderSection':
      return "A complete section for body placeholder configuration including size, position, and padding settings. Combines SizeAndPositionPanel and PaddingPanel for comprehensive body placeholder layout management.";
    case 'footnotePlaceholderSection':
      return "A complete section for footnote placeholder configuration including size, position, and padding settings. Combines SizeAndPositionPanel and PaddingPanel for comprehensive footnote placeholder layout management.";
    case 'sourcePlaceholderSection':
      return "A complete section for source placeholder configuration including size, position, and padding settings. Combines SizeAndPositionPanel and PaddingPanel for comprehensive source placeholder layout management.";
    case 'logoPlaceholderSection':
      return "A complete section for logo placeholder configuration including size, position, and padding settings. Combines SizeAndPositionPanel and PaddingPanel for comprehensive logo placeholder layout management.";
    case 'pageNumberPlaceholderSection':
      return "A complete section for page number placeholder configuration including size, position, and padding settings. Combines SizeAndPositionPanel and PaddingPanel for comprehensive page number placeholder layout management.";
    case 'colorsSection':
      return "A section for displaying predefined colors and custom colors with HSL and RGB tooltips.";
    default:
      return "A specialized UI component built with Microsoft Fluent UI v9.";
  }
};

const getComponentFeatures = (key: string): { title: string; description: string }[] => {
  switch (key) {
    case 'numericInput':
      return [
        { title: "Validation & Clamping", description: "Built-in min/max validation with automatic value clamping to prevent invalid inputs." },
        { title: "Step Controls", description: "Configurable step increments with hover-activated stepper buttons for precise value adjustment." },
        { title: "Decimal Precision", description: "Support for decimal places with automatic formatting and validation." },
        { title: "Flexible Sizing", description: "Small, medium, and large size variants with custom width support." },
        { title: "Right-Aligned Text", description: "Professional right-aligned text layout with monospace font for numeric data." },
        { title: "Keyboard Navigation", description: "Full keyboard support with arrow keys, page up/down, and direct number entry." }
      ];
    case 'newNumericInput':
      return [
        { title: "Validation & Clamping", description: "Built-in min/max validation with automatic value clamping to prevent invalid inputs." },
        { title: "Step Controls", description: "Configurable step increments with hover-activated stepper buttons for precise value adjustment." },
        { title: "Decimal Precision", description: "Support for decimal places with automatic formatting and validation." },
        { title: "Flexible Sizing", description: "Small, medium, and large size variants with custom width support." },
        { title: "Right-Aligned Text", description: "Professional right-aligned text layout with monospace font for numeric data." },
        { title: "Keyboard Navigation", description: "Full keyboard support with arrow keys, page up/down, and direct number entry." },
        { title: "Perfect Clone", description: "Built from scratch as an exact clone of the existing NumericInput with identical functionality and behavior." }
      ];
    case 'colorSelector':
      return [
        { title: "Standard Color Grid", description: "8x8 grid of 64 professionally curated colors organized by color families." },
        { title: "Custom Color Palettes", description: "Support for custom color arrays with configurable grid columns." },
        { title: "Color Tooltips", description: "RGB and HSL value tooltips with configurable color model display." },
        { title: "Accessibility", description: "Full keyboard navigation and screen reader support with proper ARIA labels." },
        { title: "Fluent UI Integration", description: "Built on Fluent UI's SwatchPicker component for consistent design." },
        { title: "Responsive Design", description: "Adaptive grid layout that maintains visual consistency across screen sizes." }
      ];
    case 'sliderInput':
      return [
        { title: "Flexible Ranges", description: "Configurable min/max values with step increments for precise control." },
        { title: "Label Integration", description: "Built-in label and value display with customizable widths and alignment." },
        { title: "Suffix Support", description: "Optional suffix labels (%, px, etc.) for value context and clarity." },
        { title: "Responsive Sizing", description: "Small and medium size variants with custom width and min/max width support." },
        { title: "Fluent UI Styling", description: "Professional styling following Fluent UI design guidelines and tokens." },
        { title: "Accessibility", description: "Full keyboard support and screen reader compatibility." }
      ];
    case 'colorSliderInput':
      return [
        { title: "Fixed Width Container", description: "Consistent 272px width container optimized for color picker layouts." },
        { title: "Integrated Styling", description: "Pre-configured styling with proper borders and padding for color applications." },
        { title: "SliderInput Foundation", description: "Built on the robust SliderInput component with all its features." },
        { title: "Color-Optimized", description: "Specifically designed for RGB, HSL, and other color channel inputs." },
        { title: "Consistent Layout", description: "Ensures uniform appearance across color picker interfaces." }
      ];
    case 'multipleSlidersInput':
      return [
        { title: "Aligned Layout", description: "Consistent vertical alignment of labels and values across all sliders." },
        { title: "Configurable Widths", description: "Symmetric label and value width configuration for professional appearance." },
        { title: "Flexible Container", description: "Customizable container width with responsive design support." },
        { title: "Slider Integration", description: "Seamless integration with SliderInput components for consistent behavior." },
        { title: "Professional Spacing", description: "Consistent gap spacing using Fluent UI design tokens." }
      ];
    case 'rgbhslColorSlidersInput':
      return [
        { title: "RGB/HSL Mode Switching", description: "Dynamic switching between RGB and HSL color modes with appropriate channel controls." },
        { title: "ColorSliderInput Integration", description: "Built on ColorSliderInput components for consistent styling and behavior." },
        { title: "Individual Channel Control", description: "Independent control of each color channel (R/G/B or H/S/L) with real-time updates." },
        { title: "Flexible Container", description: "Customizable container width with responsive design support." },
        { title: "Professional Layout", description: "Stacked layout with consistent spacing using Fluent UI design tokens." },
        { title: "Color Picker Ready", description: "Perfect integration with color picker applications and color management systems." }
      ];
    case 'hexInput':
      return [
        { title: "Real-time Validation", description: "Instant validation of hex color format with visual feedback." },
        { title: "Variable Length", description: "Support for 3-digit and 6-digit hex codes with configurable length." },
        { title: "Auto-formatting", description: "Automatic uppercase conversion and hash prefix handling." },
        { title: "Monospace Font", description: "Professional monospace font with right-aligned text for hex values." },
        { title: "Flexible Sizing", description: "Small, medium, large, and auto size variants with custom width support." },
        { title: "Placeholder Support", description: "Configurable placeholder text with proper validation handling." }
      ];

    case 'lockAspectRatio':
      return [
        { title: "Integrated Label", description: "Built-in 'Lock aspect ratio:' label with consistent styling and spacing." },
        { title: "Layout System Integration", description: "Automatically aligns with FormLayoutContext for perfect positioning." },
        { title: "Control Area Positioning", description: "Positions itself within the control area, ignoring label columns." },
        { title: "Center Alignment", description: "Centers the checkbox within the available control width." },
        { title: "Disabled State Support", description: "Proper handling of disabled state with visual feedback." },
        { title: "Responsive Sizing", description: "Adapts to different form layout sizes (small, medium, large)." }
      ];
    case 'colorHexInput':
      return [
        { title: "Color Preview", description: "Integrated color swatch that displays the current hex color value." },
        { title: "Clickable Swatch", description: "Optional clickable swatch for color picker integration." },
        { title: "Invalid Color Feedback", description: "Visual feedback for invalid hex colors with striped pattern." },
        { title: "HexInput Integration", description: "Built on the robust HexInput component with all its features." },
        { title: "Flexible Layout", description: "Inline-flex layout that adapts to content and container width." },
        { title: "Professional Styling", description: "Consistent styling with Fluent UI design tokens and hover effects." }
      ];
    case 'largeSwatchColorHexInput':
      return [
        { title: "Large Color Swatch", description: "120px × 120px color swatch for maximum visual clarity and prominent color preview." },
        { title: "Compact Hex Input", description: "60px wide hex input field for efficient text entry and balanced layout." },
        { title: "Expanded Container Width", description: "180px total container width to accommodate the large swatch and input." },
        { title: "Enhanced Visibility", description: "Large 120px swatch makes color differences extremely apparent and easy to distinguish." },
        { title: "Professional Spacing", description: "Consistent gaps and spacing following Fluent UI design principles." },
        { title: "Prominent Preview", description: "Large swatch size provides excellent color visibility for design and color picker applications." }
      ];
    case 'colorModelSelector':
      return [
        { title: "RGB/HSL Toggle", description: "Radio button group for switching between RGB and HSL color models." },
        { title: "Consistent Sizing", description: "Small, medium, and large size variants with proper label alignment." },
        { title: "Flexible Layout", description: "Horizontal layout that adapts to container width and content." },
        { title: "Integration Ready", description: "Seamless integration with color picker components for model switching." },
        { title: "Accessibility", description: "Full keyboard navigation and screen reader support." }
      ];
    case 'aspectRatioSelector':
      return [
        { title: "Common Presets", description: "Built-in presets for common aspect ratios (16:9, 4:3, 1:1, etc.)." },
        { title: "Custom Options", description: "Support for custom aspect ratio values with optional custom option text." },
        { title: "Alphabetical Sorting", description: "Optional alphabetical sorting of aspect ratio options." },
        { title: "Flexible Sizing", description: "Small, medium, and large size variants with custom width support." },
        { title: "UniversalSelector Foundation", description: "Built on the UniversalSelector component for consistent behavior." }
      ];
    case 'paperSelector':
      return [
        { title: "Standard Sizes", description: "Built-in presets for common paper sizes (A4, Letter, Legal, etc.)." },
        { title: "Custom Options", description: "Support for custom paper sizes with optional custom option text." },
        { title: "Alphabetical Sorting", description: "Automatic alphabetical sorting of paper size options." },
        { title: "Flexible Sizing", description: "Small, medium, and large size variants with custom width support." },
        { title: "UniversalSelector Foundation", description: "Built on the UniversalSelector component for consistent behavior." }
      ];
    case 'positionSelector':
      return [
        { title: "Position Presets", description: "Built-in presets for common positions (top-left, center, bottom-right, etc.)." },
        { title: "Custom Position", description: "Support for custom position values with optional custom option text." },
        { title: "Flexible Sizing", description: "Small, medium, and large size variants with custom width support." },
        { title: "UniversalSelector Foundation", description: "Built on the UniversalSelector component for consistent behavior." },
        { title: "Layout Integration", description: "Perfect integration with layout and positioning applications." }
      ];
    case 'orientationSelector':
      return [
        { title: "Portrait/Landscape", description: "Radio button group for selecting between portrait and landscape orientations." },
        { title: "Consistent Sizing", description: "Small, medium, and large size variants with proper label alignment." },
        { title: "Flexible Layout", description: "Horizontal layout that adapts to container width and content." },
        { title: "Integration Ready", description: "Seamless integration with paper size and layout components." },
        { title: "Accessibility", description: "Full keyboard navigation and screen reader support." }
      ];
    case 'unitSelector':
      return [
        { title: "Multiple Units", description: "Support for various measurement units (px, pt, cm, mm, in, %, em, rem)." },
        { title: "Responsive Sizing", description: "Small, medium, and large size variants with custom width support." },
        { title: "Alphabetical Sorting", description: "Optional alphabetical sorting of unit options." },
        { title: "Flexible Layout", description: "Adaptive layout that works with full width or custom width containers." },
        { title: "Fluent UI Integration", description: "Built on Fluent UI's Select component for consistent styling." }
      ];
    case 'universalSelector':
      return [
        { title: "Flexible Options", description: "Support for any array of string options with custom configuration." },
        { title: "Custom Option", description: "Optional custom option text for user-defined values." },
        { title: "Placeholder Support", description: "Configurable placeholder text for better user experience." },
        { title: "Alphabetical Sorting", description: "Optional alphabetical sorting of options." },
        { title: "Flexible Sizing", description: "Custom width support with min/max width constraints." },
        { title: "Foundation Component", description: "Serves as the base for all specialized selector components." }
      ];
    case 'colorInput':
      return [
        { title: "Color Model Switching", description: "Real-time switching between RGB and HSL color models." },
        { title: "RGB Sliders", description: "Individual sliders for red, green, and blue channels (0-255)." },
        { title: "HSL Sliders", description: "Individual sliders for hue (0-360), saturation, and lightness (0-100%)." },
        { title: "Hex Input", description: "Integrated hex color input with validation and formatting." },
        { title: "Real-time Conversion", description: "Automatic color conversion between RGB, HSL, and hex formats." },
        { title: "Professional Layout", description: "Organized layout with proper spacing and visual hierarchy." }
      ];
    case 'labeledColorPicker':
      return [
        { title: "Right-aligned Label", description: "Professional right-aligned label with colon separator." },
        { title: "Configurable Label Width", description: "Customizable label container width with sensible defaults." },
        { title: "Required Field Support", description: "Optional required field indicator with asterisk." },
        { title: "ResponsiveColorPicker Integration", description: "Full ResponsiveColorPicker functionality maintained." },
        { title: "Consistent Layout", description: "Flexbox layout ensuring proper alignment and spacing." },
        { title: "Fluent UI Styling", description: "Native Fluent UI components and design tokens." }
      ];
    case 'dimensionInput':
      return [
        { title: "Numeric Input Integration", description: "Built-in numeric input with validation, clamping, and step controls." },
        { title: "Unit Selection", description: "Integrated unit selector with support for various measurement units." },
        { title: "Unit Conversion", description: "Automatic conversion between different measurement units." },
        { title: "Flexible Sizing", description: "Small, medium, and large size variants with consistent label widths." },
        { title: "Professional Layout", description: "Label, value, and unit in a single row with proper alignment." },
        { title: "Universal Interface", description: "Unified interface for width, height, margin, and padding inputs." }
      ];
    case 'fluentColorPicker':
      return [
        { title: "Native Fluent UI", description: "Built on Fluent UI's native ColorPicker component for optimal integration." },
        { title: "Color Area", description: "Interactive color area for hue and saturation selection." },
        { title: "Hue/Alpha Sliders", description: "Dedicated sliders for hue and alpha channel control." },
        { title: "RGB/HSL Inputs", description: "Individual input fields for RGB and HSL color values." },
        { title: "Hex Input", description: "Integrated hex color input with validation." },
        { title: "Professional Preview", description: "Large color preview with proper borders and styling." }
      ];
    case 'horizontalColorPicker':
      return [
        { title: "Side-by-Side Layout", description: "Horizontal layout with standard colors on left and custom controls on right." },
        { title: "Standard Colors", description: "Grid of standard colors for quick selection." },
        { title: "Custom Color Input", description: "Comprehensive color input with RGB/HSL sliders and hex input." },
        { title: "Recent Colors", description: "Grid of recently used colors for quick access." },
        { title: "Action Buttons", description: "Apply and Cancel buttons for color selection workflow." },
        { title: "Efficient Space Usage", description: "Optimized layout for efficient color selection workflows." }
      ];
    case 'responsiveColorPicker':
      return [
        { title: "Adaptive Layout", description: "Automatic switching between vertical and horizontal layouts based on screen size." },
        { title: "Breakpoint Control", description: "Configurable breakpoint for layout switching behavior." },
        { title: "Viewport Optimization", description: "Automatic positioning to stay within viewport bounds." },
        { title: "Standard Colors", description: "Grid of standard colors for quick selection." },
        { title: "Custom Color Input", description: "Comprehensive color input with RGB/HSL sliders and hex input." },
        { title: "Recent Colors", description: "Grid of recently used colors for quick access." }
      ];
    case 'positionFields':
      return [
        { title: "Position Presets", description: "Dropdown for common position presets (top-left, center, bottom-right, etc.)." },
        { title: "Custom Coordinates", description: "X and Y coordinate inputs with individual unit selection." },
        { title: "DimensionInput Integration", description: "Uses DimensionInput components for consistent styling and behavior." },
        { title: "Unit Flexibility", description: "Individual unit selection for X and Y coordinates." },
        { title: "Professional Layout", description: "Organized layout with proper spacing and visual hierarchy." }
      ];
    case 'sizeFields':
      return [
        { title: "Width/Height Inputs", description: "Individual width and height inputs with separate unit selection." },
        { title: "Aspect Ratio Lock", description: "Optional aspect ratio locking with visual toggle control." },
        { title: "DimensionInput Integration", description: "Uses DimensionInput components for consistent styling and behavior." },
        { title: "Unit Flexibility", description: "Individual unit selection for width and height." },
        { title: "Professional Layout", description: "Organized layout with proper spacing and visual hierarchy." }
      ];
    case 'colorPicker':
      return [
        { title: "Color Selection", description: "Grid of standard colors for quick selection." },
        { title: "Custom Color Input", description: "Comprehensive color input with RGB/HSL sliders and hex input." },
        { title: "Recent Colors", description: "Grid of recently used colors for quick access." },
        { title: "Popover Interface", description: "Professional popover interface with proper positioning." },
        { title: "Action Buttons", description: "Apply and Cancel buttons for color selection workflow." },
        { title: "Validation", description: "Real-time color validation with visual feedback." }
      ];
    case 'marginsPanel':
      return [
        { title: "Individual Controls", description: "Separate controls for top, right, bottom, and left margins." },
        { title: "Unit Flexibility", description: "Individual unit selection for each margin side." },
        { title: "DimensionInput Integration", description: "Uses DimensionInput components for consistent styling and behavior." },
        { title: "Professional Layout", description: "Organized layout with proper spacing and visual hierarchy." },
        { title: "Title Section", description: "Clear section title for panel identification." }
      ];
    case 'paddingPanel':
      return [
        { title: "Individual Controls", description: "Separate controls for top, right, bottom, and left padding." },
        { title: "Unit Flexibility", description: "Individual unit selection for each padding side." },
        { title: "DimensionInput Integration", description: "Uses DimensionInput components for consistent styling and behavior." },
        { title: "Professional Layout", description: "Organized layout with proper spacing and visual hierarchy." },
        { title: "Title Section", description: "Clear section title for panel identification." }
      ];
    case 'paperSizePanel':
      return [
        { title: "Paper Size Selection", description: "Dropdown for standard paper sizes (A4, Letter, Legal, etc.)." },
        { title: "Custom Dimensions", description: "Width and height inputs with individual unit selection." },
        { title: "Orientation Control", description: "Portrait/landscape orientation selection." },
        { title: "SizeFields Integration", description: "Uses SizeFields component for consistent dimension input." },
        { title: "Professional Layout", description: "Organized layout with proper spacing and visual hierarchy." },
        { title: "Title Sections", description: "Clear section titles for panel organization." }
      ];
    case 'sizeAndPositionPanel':
      return [
        { title: "Size Controls", description: "Width and height inputs with aspect ratio locking." },
        { title: "Position Controls", description: "Position presets and X/Y coordinate inputs." },
        { title: "SizeFields Integration", description: "Uses SizeFields component for consistent size input." },
        { title: "PositionFields Integration", description: "Uses PositionFields component for consistent position input." },
        { title: "Professional Layout", description: "Organized layout with proper spacing and visual hierarchy." },
        { title: "Section Titles", description: "Clear section titles for panel organization." }
      ];
    case 'paperSection':
      return [
        { title: "Paper Size Panel", description: "Integrated paper size selection with dimensions and orientation controls." },
        { title: "Margins Panel", description: "Comprehensive margin settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom paper sizes, margins, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for paper size and margin changes." }
      ];
    case 'notesSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Margins Panel", description: "Comprehensive margin settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, margins, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and margin changes." }
      ];
    case 'slidesSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Margins Panel", description: "Comprehensive margin settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, margins, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and margin changes." }
      ];
    case 'titlePlaceholderSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Padding Panel", description: "Comprehensive padding settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, padding, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and padding changes." }
      ];
    case 'subtitlePlaceholderSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Padding Panel", description: "Comprehensive padding settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, padding, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and padding changes." }
      ];
    case 'bodyPlaceholderSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Padding Panel", description: "Comprehensive padding settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, padding, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and padding changes." }
      ];
    case 'footnotePlaceholderSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Padding Panel", description: "Comprehensive padding settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, padding, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and padding changes." }
      ];
    case 'sourcePlaceholderSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Padding Panel", description: "Comprehensive padding settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, padding, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and padding changes." }
      ];
    case 'logoPlaceholderSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Padding Panel", description: "Comprehensive padding settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, padding, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and padding changes." }
      ];
    case 'pageNumberPlaceholderSection':
      return [
        { title: "Size and Position Panel", description: "Integrated size controls with aspect ratio locking and position selection." },
        { title: "Padding Panel", description: "Comprehensive padding settings for all sides with individual unit control." },
        { title: "FormLayoutProvider Integration", description: "Seamless integration with the layout system for perfect alignment." },
        { title: "Professional Styling", description: "Consistent section styling with clear titles and organized layout." },
        { title: "Flexible Configuration", description: "Support for custom sizes, positions, padding, and measurement units." },
        { title: "Event Handling", description: "Separate callbacks for size, position, and padding changes." }
      ];
    case 'colorsSection':
      return [
        { title: "Standard Colors", description: "Predefined colors for quick selection." },
        { title: "Custom Colors", description: "Add custom colors with HSL and RGB tooltips." },
        { title: "Color Palettes", description: "Support for custom color palettes with HSL and RGB tooltips." }
      ];
    default:
      return [
        { title: "Fluent UI Integration", description: "Built on Microsoft Fluent UI v9 for consistent design and behavior." },
        { title: "TypeScript Support", description: "Full TypeScript support with comprehensive type definitions." },
        { title: "Accessibility", description: "Built-in accessibility features following WCAG guidelines." },
        { title: "Responsive Design", description: "Responsive design that adapts to different screen sizes." }
      ];
  }
};

const getComponentProps = (key: string): ComponentProp[] => {
  switch (key) {
    case 'numericInput':
      return [
        { name: "value", type: "number | ''", default: "''", description: "The current numeric value. Empty string for empty state." },
        { name: "onChange", type: "(value: number | '') => void", default: "required", description: "Callback fired when the value changes." },
        { name: "min", type: "number", default: "0", description: "Minimum allowed value for clamping." },
        { name: "max", type: "number", default: "10000", description: "Maximum allowed value for clamping." },
        { name: "step", type: "number", default: "0.1", description: "Step increment for stepper buttons and arrow keys." },
        { name: "decimalPlaces", type: "number", default: "2", description: "Number of decimal places to display and validate." },
        { name: "nonNegative", type: "boolean", default: "false", description: "Whether to prevent negative values." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Predefined size variants." },
        { name: "width", type: "string | number", default: "undefined", description: "Custom width override." },
        { name: "minWidth", type: "string | number", default: "undefined", description: "Minimum width constraint." },
        { name: "maxWidth", type: "string | number", default: "undefined", description: "Maximum width constraint." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Whether to take full width of container." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled." },
        { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text for empty state." },
        { name: "className", type: "string", default: "undefined", description: "Additional CSS class name." }
      ];
    case 'colorSelector':
      return [
        { name: "value", type: "string", default: "required", description: "Currently selected hex color value." },
        { name: "onChange", type: "(color: string) => void", default: "required", description: "Callback fired when a color is selected." },
        { name: "colors", type: "string[]", default: "STANDARD_COLORS", description: "Array of hex colors to display in the grid." },
        { name: "columns", type: "number", default: "8", description: "Number of columns in the color grid." },
        { name: "showTooltips", type: "boolean", default: "true", description: "Whether to show color value tooltips." },
        { name: "colorModel", type: "'rgb' | 'hsl'", default: "'rgb'", description: "Color model for tooltip display." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the color selector is disabled." }
      ];
    case 'sliderInput':
      return [
        { name: "value", type: "number", default: "required", description: "Current slider value." },
        { name: "onChange", type: "(value: number) => void", default: "required", description: "Callback fired when the value changes." },
        { name: "min", type: "number", default: "0", description: "Minimum slider value." },
        { name: "max", type: "number", default: "100", description: "Maximum slider value." },
        { name: "step", type: "number", default: "1", description: "Step increment for slider movement." },
        { name: "label", type: "string", default: "required", description: "Label text displayed next to the slider." },
        { name: "suffix", type: "string", default: "''", description: "Suffix text displayed after the value (e.g., '%', 'px')." },
        { name: "size", type: "'small' | 'medium'", default: "'small'", description: "Size variant for the slider." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the slider is disabled." },
        { name: "labelWidth", type: "number", default: "undefined", description: "Custom width for the label area in pixels." },
        { name: "valueWidth", type: "number", default: "undefined", description: "Custom width for the value area in pixels." },
        { name: "width", type: "string | number", default: "undefined", description: "Total width of the component." },
        { name: "minWidth", type: "string | number", default: "undefined", description: "Minimum width constraint." },
        { name: "maxWidth", type: "string | number", default: "undefined", description: "Maximum width constraint." }
      ];
    case 'colorSliderInput':
      return [
        { name: "value", type: "number", default: "required", description: "Current slider value." },
        { name: "onChange", type: "(value: number) => void", default: "required", description: "Callback fired when the value changes." },
        { name: "label", type: "string", default: "required", description: "Label text displayed next to the slider." },
        { name: "suffix", type: "string", default: "''", description: "Suffix text displayed after the value." },
        { name: "size", type: "'small' | 'medium'", default: "'small'", description: "Size variant for the slider." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the slider is disabled." }
      ];
    case 'multipleSlidersInput':
      return [
        { name: "sliders", type: "SliderConfig[]", default: "required", description: "Array of slider configurations." },
        { name: "labelValueWidth", type: "number", default: "required", description: "Symmetric width for label and value areas in pixels." },
        { name: "width", type: "string | number", default: "undefined", description: "Total width of the container." }
      ];
    case 'rgbhslColorSlidersInput':
      return [
        { name: "mode", type: "'rgb' | 'hsl'", default: "required", description: "Color mode to display (RGB or HSL)." },
        { name: "rgbValues", type: "{ r: number; g: number; b: number }", default: "{ r: 128, g: 128, b: 128 }", description: "RGB color values when mode is 'rgb'." },
        { name: "hslValues", type: "{ h: number; s: number; l: number }", default: "{ h: 0, s: 0, l: 50 }", description: "HSL color values when mode is 'hsl'." },
        { name: "onRGBChange", type: "(values: { r: number; g: number; b: number }) => void", default: "undefined", description: "Callback fired when RGB values change." },
        { name: "onHSLChange", type: "(values: { h: number; s: number; l: number }) => void", default: "undefined", description: "Callback fired when HSL values change." },
        { name: "width", type: "string | number", default: "undefined", description: "Total width of the container." }
      ];
    case 'hexInput':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value." },
        { name: "onChange", type: "(value: string) => void", default: "required", description: "Callback fired when the value changes." },
        { name: "length", type: "number", default: "6", description: "Length of hex code (3 or 6 digits)." },
        { name: "size", type: "'small' | 'medium' | 'large' | 'auto'", default: "'medium'", description: "Size variant for the input." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled." },
        { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text for empty state." },
        { name: "width", type: "string | number", default: "undefined", description: "Custom width override." },
        { name: "minWidth", type: "string | number", default: "undefined", description: "Minimum width constraint." },
        { name: "maxWidth", type: "string | number", default: "undefined", description: "Maximum width constraint." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Whether to take full width of container." },
        { name: "className", type: "string", default: "undefined", description: "Additional CSS class name." }
      ];

    case 'lockAspectRatio':
      return [
        { name: "checked", type: "boolean", default: "required", description: "Whether the aspect ratio is locked." },
        { name: "onChange", type: "(checked: boolean) => void", default: "required", description: "Callback fired when the lock state changes." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the checkbox is disabled." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." }
      ];
    case 'colorHexInput':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value." },
        { name: "onChange", type: "(hexColor: string) => void", default: "required", description: "Callback fired when the value changes." },
        { name: "size", type: "'small' | 'medium' | 'large' | 'auto'", default: "'medium'", description: "Size variant for the input." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled." },
        { name: "placeholder", type: "string", default: "'#000000'", description: "Placeholder text for empty state." },
        { name: "length", type: "number", default: "6", description: "Length of hex code (3 or 6 digits)." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Whether to take full width of container." },
        { name: "swatchClickable", type: "boolean", default: "false", description: "Whether the color swatch is clickable." },
        { name: "onSwatchClick", type: "() => void", default: "undefined", description: "Callback fired when the swatch is clicked." },
        { name: "swatchSize", type: "number", default: "undefined", description: "Size of the color swatch in pixels (width and height)." },
        { name: "hexInputWidth", type: "string | number", default: "undefined", description: "Width of the hex input field." },
        { name: "containerWidth", type: "string | number", default: "undefined", description: "Overall container width." },
        { name: "containerHeight", type: "string | number", default: "undefined", description: "Overall container height." }
      ];
    case 'largeSwatchColorHexInput':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value." },
        { name: "onChange", type: "(hexColor: string) => void", default: "required", description: "Callback fired when the value changes." },
        { name: "swatchSize", type: "number", default: "120", description: "Size of the color swatch in pixels (120px × 120px)." },
        { name: "hexInputWidth", type: "string | number", default: "60", description: "Width of the hex input field (60px for efficient text entry)." },
        { name: "containerWidth", type: "string | number", default: "180", description: "Overall container width (180px)." },
        { name: "containerHeight", type: "string | number", default: "undefined", description: "Overall container height (auto)." }
      ];
    case 'colorModelSelector':
      return [
        { name: "colorModel", type: "'rgb' | 'hsl'", default: "required", description: "Currently selected color model." },
        { name: "onChange", type: "(colorModel: 'rgb' | 'hsl') => void", default: "required", description: "Callback fired when the model changes." },
        { name: "label", type: "string", default: "'Color Model'", description: "Label text displayed next to the radio group." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the selector." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the selector is disabled." }
      ];
    case 'aspectRatioSelector':
      return [
        { name: "aspectRatio", type: "string", default: "required", description: "Currently selected aspect ratio." },
        { name: "aspectRatios", type: "string[]", default: "required", description: "Array of available aspect ratio options." },
        { name: "onChange", type: "(aspectRatio: string) => void", default: "required", description: "Callback fired when the aspect ratio changes." },
        { name: "label", type: "string", default: "'Aspect Ratio'", description: "Label text displayed next to the selector." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the selector." },
        { name: "width", type: "string | number", default: "undefined", description: "Custom width override." },
        { name: "minWidth", type: "string | number", default: "undefined", description: "Minimum width constraint." },
        { name: "maxWidth", type: "string | number", default: "undefined", description: "Maximum width constraint." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Whether to take full width of container." },
        { name: "customOptionText", type: "string", default: "'Custom'", description: "Text for the custom option." },
        { name: "sortAlphabetically", type: "boolean", default: "false", description: "Whether to sort options alphabetically." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the selector is disabled." }
      ];
    case 'paperSelector':
      return [
        { name: "paperSize", type: "string", default: "required", description: "Currently selected paper size." },
        { name: "paperSizes", type: "string[]", default: "required", description: "Array of available paper size options." },
        { name: "onChange", type: "(paperSize: string) => void", default: "required", description: "Callback fired when the paper size changes." },
        { name: "label", type: "string", default: "'Paper Type'", description: "Label text displayed next to the selector." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the selector." },
        { name: "width", type: "string | number", default: "undefined", description: "Custom width override." },
        { name: "minWidth", type: "string | number", default: "undefined", description: "Minimum width constraint." },
        { name: "maxWidth", type: "string | number", default: "undefined", description: "Maximum width constraint." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Whether to take full width of container." },
        { name: "customOptionText", type: "string", default: "'Custom'", description: "Text for the custom option." },
        { name: "sortAlphabetically", type: "boolean", default: "true", description: "Whether to sort options alphabetically." }
      ];
    case 'positionSelector':
      return [
        { name: "position", type: "string", default: "required", description: "Currently selected position." },
        { name: "positions", type: "string[]", default: "required", description: "Array of available position options." },
        { name: "onChange", type: "(position: string) => void", default: "required", description: "Callback fired when the position changes." },
        { name: "label", type: "string", default: "'Position'", description: "Label text displayed next to the selector." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the selector." },
        { name: "width", type: "string | number", default: "undefined", description: "Custom width override." },
        { name: "minWidth", type: "string | number", default: "undefined", description: "Minimum width constraint." },
        { name: "maxWidth", type: "string | number", default: "undefined", description: "Maximum width constraint." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Whether to take full width of container." },
        { name: "customOptionText", type: "string", default: "'Custom'", description: "Text for the custom option." },
        { name: "sortAlphabetically", type: "boolean", default: "false", description: "Whether to sort options alphabetically." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the selector is disabled." }
      ];
    case 'orientationSelector':
      return [
        { name: "orientation", type: "string", default: "required", description: "Currently selected orientation." },
        { name: "onChange", type: "(orientation: string) => void", default: "required", description: "Callback fired when the orientation changes." },
        { name: "label", type: "string", default: "'Orientation'", description: "Label text displayed next to the radio group." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the selector." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the selector is disabled." }
      ];
    case 'unitSelector':
      return [
        { name: "unit", type: "string", default: "required", description: "Currently selected unit." },
        { name: "units", type: "string[]", default: "required", description: "Array of available unit options." },
        { name: "onChange", type: "(unit: string) => void", default: "required", description: "Callback fired when the unit changes." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the selector." },
        { name: "width", type: "string | number", default: "undefined", description: "Custom width override." },
        { name: "minWidth", type: "string | number", default: "undefined", description: "Minimum width constraint." },
        { name: "maxWidth", type: "string | number", default: "undefined", description: "Maximum width constraint." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Whether to take full width of container." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the selector is disabled." },
        { name: "sortAlphabetically", type: "boolean", default: "false", description: "Whether to sort options alphabetically." }
      ];
    case 'universalSelector':
      return [
        { name: "value", type: "string", default: "required", description: "Currently selected value." },
        { name: "options", type: "string[]", default: "required", description: "Array of available options." },
        { name: "onChange", type: "(value: string) => void", default: "required", description: "Callback fired when the value changes." },
        { name: "width", type: "string | number", default: "undefined", description: "Custom width override." },
        { name: "minWidth", type: "string | number", default: "undefined", description: "Minimum width constraint." },
        { name: "maxWidth", type: "string | number", default: "undefined", description: "Maximum width constraint." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Whether to take full width of container." },
        { name: "customOptionText", type: "string", default: "'Custom'", description: "Text for the custom option." },
        { name: "showCustomOption", type: "boolean", default: "false", description: "Whether to show a custom option." },
        { name: "sortAlphabetically", type: "boolean", default: "false", description: "Whether to sort options alphabetically." },
        { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text for empty state." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the selector is disabled." }
      ];
    case 'colorInput':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value as the single source of truth." },
        { name: "onChange", type: "(hexColor: string) => void", default: "required", description: "Callback fired when the color changes." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." }
      ];
    case 'labeledColorPicker':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value." },
        { name: "onChange", type: "(color: string) => void", default: "required", description: "Callback fired when the color changes." },
        { name: "label", type: "string", default: "required", description: "The label text to display." },
        { name: "required", type: "boolean", default: "false", description: "Whether the label should be required (adds asterisk)." },
        { name: "labelWidth", type: "string | number", default: "undefined", description: "Custom width for the label container." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." }
      ];
    case 'dimensionInput':
      return [
        { name: "label", type: "string", default: "required", description: "Label text displayed next to the input." },
        { name: "value", type: "number | ''", default: "required", description: "Current dimension value in cm (internal storage)." },
        { name: "unit", type: "string", default: "required", description: "Display unit for the dimension value." },
        { name: "units", type: "string[]", default: "required", description: "Array of available unit options." },
        { name: "onChange", type: "(value: number | '', unit: string) => void", default: "required", description: "Callback fired when value or unit changes." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." }
      ];
    case 'fluentColorPicker':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value." },
        { name: "onChange", type: "(color: string) => void", default: "required", description: "Callback fired when the color changes." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." },
        { name: "className", type: "string", default: "undefined", description: "Additional CSS class name." },
        { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text for the trigger button." },
        { name: "allowEmpty", type: "boolean", default: "false", description: "Whether to allow empty color values." },
        { name: "showPreview", type: "boolean", default: "true", description: "Whether to show color preview in the trigger." },
        { name: "showHexInput", type: "boolean", default: "true", description: "Whether to show hex input field." }
      ];
    case 'horizontalColorPicker':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value." },
        { name: "onChange", type: "(color: string) => void", default: "required", description: "Callback fired when the color changes." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." },
        { name: "className", type: "string", default: "undefined", description: "Additional CSS class name." },
        { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text for the trigger button." },
        { name: "allowEmpty", type: "boolean", default: "false", description: "Whether to allow empty color values." },
        { name: "validateOnChange", type: "boolean", default: "false", description: "Whether to validate color on change." }
      ];
    case 'responsiveColorPicker':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value." },
        { name: "onChange", type: "(color: string) => void", default: "required", description: "Callback fired when the color changes." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." },
        { name: "className", type: "string", default: "undefined", description: "Additional CSS class name." },
        { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text for the trigger button." },
        { name: "allowEmpty", type: "boolean", default: "false", description: "Whether to allow empty color values." },
        { name: "validateOnChange", type: "boolean", default: "false", description: "Whether to validate color on change." },
        { name: "breakpoint", type: "number", default: "600", description: "Screen width breakpoint for layout switching." }
      ];
    case 'positionFields':
      return [
        { name: "position", type: "string", default: "required", description: "Currently selected position preset." },
        { name: "positions", type: "string[]", default: "required", description: "Array of available position presets." },
        { name: "x", type: "number", default: "required", description: "X coordinate value in cm." },
        { name: "y", type: "number", default: "required", description: "Y coordinate value in cm." },
        { name: "xUnit", type: "string", default: "required", description: "Display unit for X coordinate." },
        { name: "yUnit", type: "string", default: "required", description: "Display unit for Y coordinate." },
        { name: "units", type: "string[]", default: "required", description: "Array of available unit options." },
        { name: "onChange", type: "(fields: PositionFieldsData) => void", default: "required", description: "Callback fired when any field changes." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." }
      ];
    case 'sizeFields':
      return [
        { name: "width", type: "number", default: "required", description: "Width value in cm." },
        { name: "height", type: "number", default: "required", description: "Height value in cm." },
        { name: "widthUnit", type: "string", default: "required", description: "Display unit for width." },
        { name: "heightUnit", type: "string", default: "required", description: "Display unit for height." },
        { name: "units", type: "string[]", default: "required", description: "Array of available unit options." },
        { name: "showLockAspectRatio", type: "boolean", default: "true", description: "Whether to show aspect ratio lock toggle." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." },
        { name: "onChange", type: "(fields: SizeFieldsData) => void", default: "required", description: "Callback fired when any field changes." }
      ];
    case 'colorPicker':
      return [
        { name: "value", type: "string", default: "required", description: "Current hex color value." },
        { name: "onChange", type: "(color: string) => void", default: "required", description: "Callback fired when the color changes." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." },
        { name: "className", type: "string", default: "undefined", description: "Additional CSS class name." },
        { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text for the trigger button." },
        { name: "allowEmpty", type: "boolean", default: "false", description: "Whether to allow empty color values." },
        { name: "validateOnChange", type: "boolean", default: "false", description: "Whether to validate color on change." }
      ];
    case 'marginsPanel':
      return [
        { name: "margins", type: "Margins", default: "required", description: "Object containing margin values and units for all sides." },
        { name: "units", type: "string[]", default: "required", description: "Array of available unit options." },
        { name: "onChange", type: "(margins: Margins) => void", default: "required", description: "Callback fired when any margin changes." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the panel is disabled." }
      ];
    case 'paddingPanel':
      return [
        { name: "padding", type: "Padding", default: "required", description: "Object containing padding values and units for all sides." },
        { name: "units", type: "string[]", default: "required", description: "Array of available unit options." },
        { name: "onChange", type: "(padding: Padding) => void", default: "required", description: "Callback fired when any padding changes." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the panel is disabled." }
      ];
    case 'paperSizePanel':
      return [
        { name: "paperSize", type: "PaperSize", default: "undefined", description: "Object containing paper size configuration." },
        { name: "units", type: "string[]", default: "['%', 'cm', 'in', 'mm', 'pt', 'px']", description: "Array of available unit options." },
        { name: "onChange", type: "(paperSize: PaperSize) => void", default: "undefined", description: "Callback fired when paper size changes." }
      ];
    case 'sizeAndPositionPanel':
      return [
        { name: "width", type: "number", default: "required", description: "Width value in cm." },
        { name: "height", type: "number", default: "required", description: "Height value in cm." },
        { name: "widthUnit", type: "string", default: "required", description: "Display unit for width." },
        { name: "heightUnit", type: "string", default: "required", description: "Display unit for height." },
        { name: "position", type: "string", default: "required", description: "Currently selected position preset." },
        { name: "positions", type: "string[]", default: "required", description: "Array of available position presets." },
        { name: "x", type: "number", default: "required", description: "X coordinate value in cm." },
        { name: "y", type: "number", default: "required", description: "Y coordinate value in cm." },
        { name: "xUnit", type: "string", default: "required", description: "Display unit for X coordinate." },
        { name: "yUnit", type: "string", default: "required", description: "Display unit for Y coordinate." },
        { name: "units", type: "string[]", default: "required", description: "Array of available unit options." },
        { name: "showLockAspectRatio", type: "boolean", default: "true", description: "Whether to show aspect ratio lock toggle." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the panel is disabled." },
        { name: "onSizeChange", type: "(fields: SizeFieldsData) => void", default: "required", description: "Callback fired when size fields change." },
        { name: "onPositionChange", type: "(fields: PositionFieldsData) => void", default: "required", description: "Callback fired when position fields change." }
      ];
    case 'paperSection':
      return [
        { name: "paperSize", type: "PaperSize", default: "undefined", description: "Object containing paper size configuration (width, height, units, orientation, paperSize)." },
        { name: "margins", type: "Margins", default: "undefined", description: "Object containing margin settings for all sides with individual units." },
        { name: "units", type: "string[]", default: "['px', 'pt', 'cm', 'mm', 'in']", description: "Array of available measurement units." },
        { name: "onPaperSizeChange", type: "(paperSize: any) => void", default: "undefined", description: "Callback fired when paper size configuration changes." },
        { name: "onMarginsChange", type: "(margins: any) => void", default: "undefined", description: "Callback fired when margin settings change." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the section is disabled." }
      ];
    case 'notesSection':
      return [
        { name: "size", type: "Size", default: "undefined", description: "Object containing width, height, and unit settings." },
        { name: "position", type: "Position", default: "undefined", description: "Object containing position preset, X/Y coordinates, and units." },
        { name: "margins", type: "Margins", default: "undefined", description: "Object containing margin settings for all sides with individual units." },
        { name: "positions", type: "string[]", default: "['top-left', 'top-center', 'top-right', 'center', 'bottom-left', 'bottom-center', 'bottom-right', 'Custom']", description: "Array of available position presets." },
        { name: "units", type: "string[]", default: "['px', 'pt', 'cm', 'mm', 'in']", description: "Array of available measurement units." },
        { name: "showLockAspectRatio", type: "boolean", default: "true", description: "Whether to show aspect ratio lock toggle." },
        { name: "onSizeChange", type: "(size: any) => void", default: "undefined", description: "Callback fired when size settings change." },
        { name: "onPositionChange", type: "(position: any) => void", default: "undefined", description: "Callback fired when position settings change." },
        { name: "onMarginsChange", type: "(margins: any) => void", default: "undefined", description: "Callback fired when margin settings change." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the section is disabled." }
      ];
    case 'slidesSection':
      return [
        { name: "size", type: "Size", default: "undefined", description: "Object containing width, height, and unit settings." },
        { name: "position", type: "Position", default: "undefined", description: "Object containing position preset, X/Y coordinates, and units." },
        { name: "margins", type: "Margins", default: "undefined", description: "Object containing margin settings for all sides with individual units." },
        { name: "positions", type: "string[]", default: "['top-left', 'top-center', 'top-right', 'center', 'bottom-left', 'bottom-center', 'bottom-right', 'Custom']", description: "Array of available position presets." },
        { name: "units", type: "string[]", default: "['px', 'pt', 'cm', 'mm', 'in']", description: "Array of available measurement units." },
        { name: "showLockAspectRatio", type: "boolean", default: "true", description: "Whether to show aspect ratio lock toggle." },
        { name: "onSizeChange", type: "(size: any) => void", default: "undefined", description: "Callback fired when size settings change." },
        { name: "onPositionChange", type: "(position: any) => void", default: "undefined", description: "Callback fired when position settings change." },
        { name: "onMarginsChange", type: "(margins: any) => void", default: "undefined", description: "Callback fired when margin settings change." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the section is disabled." }
      ];
    case 'colorsSection':
      return [
        { name: "colors", type: "string[]", default: "STANDARD_COLORS", description: "Array of hex colors to display in the grid." },
        { name: "colorModel", type: "'rgb' | 'hsl'", default: "'rgb'", description: "Color model for tooltip display." },
        { name: "showTooltips", type: "boolean", default: "true", description: "Whether to show color value tooltips." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the colors section is disabled." }
      ];
    default:
      return [
        { name: "value", type: "any", default: "required", description: "The current value of the component." },
        { name: "onChange", type: "(value: any) => void", default: "required", description: "Callback fired when the value changes." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether the component is disabled." },
        { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", description: "Size variant for the component." }
      ];
  }
};

// Interactive demo component for SliderInput
const InteractiveSliderInputDemo: React.FC = () => {
  const [value, setValue] = React.useState(50);
  
  return (
    <SliderInput 
      value={value} 
      min={0} 
      max={100} 
      label="Opacity" 
      onChange={setValue} 
    />
  );
};



// Interactive demo component for ColorSliderInput
const InteractiveColorSliderInputDemo: React.FC = () => {
  const [value, setValue] = React.useState(180);
  
  return (
    <ColorSliderInput 
      value={value} 
      label="Hue" 
      onChange={setValue} 
    />
  );
};

// Interactive demo component for MultipleSlidersInput
const InteractiveMultipleSlidersInputDemo: React.FC = () => {
  const [redValue, setRedValue] = React.useState(128);
  const [greenValue, setGreenValue] = React.useState(64);
  const [blueValue, setBlueValue] = React.useState(240);
  
  return (
    <MultipleSlidersInput 
      sliders={[
        { value: redValue, min: 0, max: 255, label: "Red", onChange: setRedValue },
        { value: greenValue, min: 0, max: 255, label: "Green", onChange: setGreenValue },
        { value: blueValue, min: 0, max: 255, label: "Blue", onChange: setBlueValue }
      ]} 
      labelValueWidth={60} 
    />
  );
};

const InteractiveRGBHSLColorSlidersInputDemo: React.FC = () => {
  const [rgbValues, setRgbValues] = React.useState({ r: 128, g: 64, b: 240 });
  const [hslValues, setHslValues] = React.useState({ h: 180, s: 75, l: 60 });
  
  return (
    <RGBHSLColorSlidersInput 
      mode="rgb"
      rgbValues={rgbValues}
      hslValues={hslValues}
      onRGBChange={setRgbValues}
      onHSLChange={setHslValues}
    />
  );
};

// Interactive demo components for all remaining components
const InteractiveNumericInputDemo: React.FC = () => {
  const [value, setValue] = React.useState<number | ''>(42.5);
  return <NumericInput value={value} onChange={setValue} />;
};

const InteractiveNewNumericInputDemo: React.FC = () => {
  const [value, setValue] = React.useState<string>("#FF6B35");
  return <HexInput value={value} onChange={setValue} />;
};

const InteractiveColorSelectorDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF0000");
  return <ColorSelector value={value} onChange={setValue} />;
};

const InteractiveHexInputDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF6B35");
  return <HexInput value={value} onChange={setValue} />;
};



const InteractiveLockAspectRatioDemo: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  return <LockAspectRatio checked={checked} onChange={setChecked} />;
};

// Interactive demo components for Sections
const InteractivePaperSectionDemo: React.FC = () => {
  const [paperSize, setPaperSize] = React.useState({
    width: 21,
    height: 29.7,
    widthUnit: 'cm',
    heightUnit: 'cm',
    orientation: 'portrait',
    paperSize: 'A4'
  });
  const [margins, setMargins] = React.useState({
    top: 2.5,
    right: 2.5,
    bottom: 2.5,
    left: 2.5,
    topUnit: 'cm',
    rightUnit: 'cm',
    bottomUnit: 'cm',
    leftUnit: 'cm'
  });

  return (
    <PaperSection
      paperSize={paperSize}
      margins={margins}
      onPaperSizeChange={setPaperSize}
      onMarginsChange={setMargins}
    />
  );
};

const InteractiveNotesSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 400,
    height: 300
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'center',
    x: 0,
    y: 0
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [margins, setMargins] = React.useState({
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <NotesSection
      size={size}
      position={position}
      margins={margins}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onMarginsChange={setMargins}
    />
  );
};

const InteractiveSlidesSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 1920,
    height: 1080
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'center',
    x: 0,
    y: 0
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [margins, setMargins] = React.useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <SlidesSection
      size={size}
      position={position}
      margins={margins}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onMarginsChange={setMargins}
    />
  );
};

const InteractiveUniversalSelectorDemo: React.FC = () => {
  const [value, setValue] = React.useState("option1");
  return <UniversalSelector value={value} options={["option1", "option2", "option3"]} onChange={setValue} />;
};

const InteractiveColorHexInputDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF6B35");
  return <ColorHexInput value={value} onChange={setValue} />;
};

const InteractiveLargeSwatchColorHexInputDemo: React.FC = () => {
  const [value, setValue] = React.useState("#8B4513");
  return (
    <ColorHexInput 
      value={value} 
      onChange={setValue}
      swatchSize={120}
      hexInputWidth={60}
      containerWidth={180}
    />
  );
};

const InteractiveColorModelSelectorDemo: React.FC = () => {
  const [value, setValue] = React.useState<'rgb' | 'hsl'>("rgb");
  return <ColorModelSelector colorModel={value} onChange={setValue} />;
};

const InteractiveAspectRatioSelectorDemo: React.FC = () => {
  const [value, setValue] = React.useState("16:9");
  return <AspectRatioSelector value={value} options={["1:1", "4:3", "16:9", "21:9", "Custom"]} onChange={setValue} />;
};

const InteractivePaperSelectorDemo: React.FC = () => {
  const [value, setValue] = React.useState("A4");
  return <PaperSelector value={value} onChange={setValue} />;
};

const InteractivePositionSelectorDemo: React.FC = () => {
  const [value, setValue] = React.useState("middle-center");
  return <PositionSelector value={value} options={DEFAULT_POSITIONS} onChange={setValue} />;
};

const InteractiveOrientationSelectorDemo: React.FC = () => {
  const [value, setValue] = React.useState("portrait");
  return <OrientationSelector orientation={value} onChange={setValue} />;
};

const InteractiveUnitSelectorDemo: React.FC = () => {
  const [value, setValue] = React.useState("cm");
          return <UnitSelector unit={value} onChange={setValue} />;
};

const InteractiveColorInputDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF6B35");
  return <ColorInput value={value} onChange={setValue} />;
};

const InteractiveLabeledColorPickerDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF6B35");
  return <LabeledColorPicker value={value} label="Primary Color" onChange={setValue} />;
};

const InteractiveDimensionInputDemo: React.FC = () => {
  const [value, setValue] = React.useState(100);
  const [unit, setUnit] = React.useState("cm");
  return <DimensionInput label="Width" value={value} unit={unit} onChange={(newValue, newUnit) => { setValue(newValue as number); setUnit(newUnit); }} />;
};

const InteractiveFluentColorPickerDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF6B35");
  return <FluentColorPicker value={value} onChange={setValue} />;
};

const InteractiveHorizontalColorPickerDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF6B35");
  return <HorizontalColorPicker value={value} onChange={setValue} />;
};

const InteractiveResponsiveColorPickerDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF6B35");
  return <ResponsiveColorPicker value={value} onChange={setValue} />;
};

const InteractivePositionFieldsDemo: React.FC = () => {
  const [position, setPosition] = React.useState("Custom");
  const [x, setX] = React.useState(100);
  const [y, setY] = React.useState(200);
  const [xUnit, setXUnit] = React.useState("px");
  const [yUnit, setYUnit] = React.useState("px");
  
  return (
    <PositionFields 
      position={position} 
      positions={DEFAULT_POSITIONS} 
      x={x} 
      y={y} 
      xUnit={xUnit} 
      yUnit={yUnit} 
      units={["px", "%", "cm"]} 
      onChange={(fields) => {
        setPosition(fields.position);
        setX(fields.x);
        setY(fields.y);
        setXUnit(fields.xUnit);
        setYUnit(fields.yUnit);
      }} 
    />
  );
};

const InteractiveSizeFieldsDemo: React.FC = () => {
  const [width, setWidth] = React.useState(300);
  const [height, setHeight] = React.useState(200);
  // widthUnit and heightUnit will use DEFAULT_UNIT ('cm') from SizeFields
  
  return (
    <SizeFields 
      width={width} 
      height={height} 
      // No widthUnit, heightUnit, or units props - will use component defaults
      onChange={(fields) => {
        setWidth(fields.width);
        setHeight(fields.height);
        // Note: fields.widthUnit and fields.heightUnit will now be 'cm' by default
      }} 
    />
  );
};

const InteractiveColorPickerDemo: React.FC = () => {
  const [value, setValue] = React.useState("#FF6B35");
  return <ResponsiveColorPicker value={value} onChange={setValue} />;
};

const InteractiveMarginsPanelDemo: React.FC = () => {
  const [margins, setMargins] = React.useState({
    top: 10, right: 20, bottom: 10, left: 20
    // All unit properties will use DEFAULT_UNIT ('cm')
  });
  
  return <MarginsPanel margins={margins} onChange={setMargins} />;
};

const InteractivePaddingPanelDemo: React.FC = () => {
  const [padding, setPadding] = React.useState({
    top: 5, right: 10, bottom: 5, left: 10
    // All unit properties will use DEFAULT_UNIT ('cm')
  });
  
  return <PaddingPanel padding={padding} onChange={setPadding} />;
};

const InteractivePaperSizePanelDemo: React.FC = () => {
  const [paperSize, setPaperSize] = React.useState({
    width: 210, height: 297, 
    orientation: "portrait", paperSize: "a4"
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  
  return <PaperSizePanel paperSize={paperSize} onChange={setPaperSize} />;
};

const InteractiveSizeAndPositionPanelDemo: React.FC = () => {
  const [width, setWidth] = React.useState(300);
  const [height, setHeight] = React.useState(200);
  // widthUnit and heightUnit will use DEFAULT_UNIT ('cm') from SizeFields
  const [position, setPosition] = React.useState("Custom");
  const [x, setX] = React.useState(50);
  const [y, setY] = React.useState(100);
  // xUnit and yUnit will use DEFAULT_UNIT ('cm') from PositionFields
  
  return (
    <SizeAndPositionPanel 
      width={width} 
      height={height} 
      // No widthUnit, heightUnit - will use SizeFields defaults
      position={position} 
      positions={DEFAULT_POSITIONS} 
      x={x} 
      y={y} 
      // No xUnit, yUnit - will use PositionFields defaults
      // No units - will use component defaults
      onSizeChange={(fields) => {
        setWidth(fields.width);
        setHeight(fields.height);
        // Note: fields.widthUnit and fields.heightUnit will now be 'cm' by default
      }} 
      onPositionChange={(fields) => {
        setPosition(fields.position);
        setX(fields.x);
        setY(fields.y);
        // Note: fields.xUnit and fields.yUnit will now be 'cm' by default
      }} 
    />
  );
};

// Interactive demo components for Placeholder Sections
const InteractiveTitlePlaceholderSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 800,
    height: 200
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'top-center',
    x: 0,
    y: 50
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [padding, setPadding] = React.useState({
    top: 10,
    right: 15,
    bottom: 10,
    left: 15
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <TitlePlaceholderSection
      size={size}
      position={position}
      padding={padding}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onPaddingChange={setPadding}
    />
  );
};

const InteractiveSubtitlePlaceholderSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 600,
    height: 150
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'top-center',
    x: 0,
    y: 120
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [padding, setPadding] = React.useState({
    top: 8,
    right: 12,
    bottom: 8,
    left: 12
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <SubtitlePlaceholderSection
      size={size}
      position={position}
      padding={padding}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onPaddingChange={setPadding}
    />
  );
};

const InteractiveBodyPlaceholderSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 700,
    height: 400
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'center',
    x: 0,
    y: 0
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [padding, setPadding] = React.useState({
    top: 15,
    right: 20,
    bottom: 15,
    left: 20
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <BodyPlaceholderSection
      size={size}
      position={position}
      padding={padding}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onPaddingChange={setPadding}
    />
  );
};

const InteractiveFootnotePlaceholderSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 500,
    height: 100
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'bottom-center',
    x: 0,
    y: -50
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [padding, setPadding] = React.useState({
    top: 5,
    right: 10,
    bottom: 5,
    left: 10
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <FootnotePlaceholderSection
      size={size}
      position={position}
      padding={padding}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onPaddingChange={setPadding}
    />
  );
};

const InteractiveSourcePlaceholderSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 400,
    height: 80
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'bottom-left',
    x: 50,
    y: -30
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [padding, setPadding] = React.useState({
    top: 3,
    right: 8,
    bottom: 3,
    left: 8
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <SourcePlaceholderSection
      size={size}
      position={position}
      padding={padding}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onPaddingChange={setPadding}
    />
  );
};

const InteractiveLogoPlaceholderSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 200,
    height: 100
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'top-left',
    x: 50,
    y: 50
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [padding, setPadding] = React.useState({
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <LogoPlaceholderSection
      size={size}
      position={position}
      padding={padding}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onPaddingChange={setPadding}
    />
  );
};

const InteractivePageNumberPlaceholderSectionDemo: React.FC = () => {
  const [size, setSize] = React.useState({
    width: 150,
    height: 50
    // widthUnit and heightUnit will use DEFAULT_UNIT ('cm')
  });
  const [position, setPosition] = React.useState({
    position: 'bottom-right',
    x: -50,
    y: -30
    // xUnit and yUnit will use DEFAULT_UNIT ('cm')
  });
  const [padding, setPadding] = React.useState({
    top: 2,
    right: 5,
    bottom: 2,
    left: 5
    // All unit properties will use DEFAULT_UNIT ('cm')
  });

  return (
    <PageNumberPlaceholderSection
      size={size}
      position={position}
      padding={padding}
      onSizeChange={setSize}
      onPositionChange={setPosition}
      onPaddingChange={setPadding}
    />
  );
};

const renderDemo = (key: string): React.ReactNode => {
  switch (key) {
    case 'numericInput':
      return <InteractiveNumericInputDemo />;
    case 'newNumericInput':
      return <InteractiveNewNumericInputDemo />;
    case 'colorSelector':
      return <InteractiveColorSelectorDemo />;
    case 'sliderInput':
      return <InteractiveSliderInputDemo />;
    case 'colorSliderInput':
      return <InteractiveColorSliderInputDemo />;
    case 'multipleSlidersInput':
      return <InteractiveMultipleSlidersInputDemo />;
    case 'rgbhslColorSlidersInput':
      return <InteractiveRGBHSLColorSlidersInputDemo />;
    case 'hexInput':
      return <InteractiveHexInputDemo />;
    
    case 'lockAspectRatio':
      return <InteractiveLockAspectRatioDemo />;
    case 'universalSelector':
      return <InteractiveUniversalSelectorDemo />;
    case 'colorHexInput':
      return <InteractiveColorHexInputDemo />;
    case 'largeSwatchColorHexInput':
      return <InteractiveLargeSwatchColorHexInputDemo />;
    case 'colorModelSelector':
      return <InteractiveColorModelSelectorDemo />;
    case 'aspectRatioSelector':
      return <InteractiveAspectRatioSelectorDemo />;
    case 'paperSelector':
      return <InteractivePaperSelectorDemo />;
    case 'positionSelector':
      return <InteractivePositionSelectorDemo />;
    case 'orientationSelector':
      return <InteractiveOrientationSelectorDemo />;
    case 'unitSelector':
      return <InteractiveUnitSelectorDemo />;
    case 'colorInput':
      return <InteractiveColorInputDemo />;
    case 'labeledColorPicker':
      return <InteractiveLabeledColorPickerDemo />;
    case 'dimensionInput':
      return <InteractiveDimensionInputDemo />;
    case 'fluentColorPicker':
      return <InteractiveFluentColorPickerDemo />;
    case 'horizontalColorPicker':
      return <InteractiveHorizontalColorPickerDemo />;
    case 'responsiveColorPicker':
      return <InteractiveResponsiveColorPickerDemo />;
    case 'positionFields':
      return <InteractivePositionFieldsDemo />;
    case 'sizeFields':
      return <InteractiveSizeFieldsDemo />;
    case 'colorPicker':
      return <InteractiveColorPickerDemo />;
    case 'marginsPanel':
      return <InteractiveMarginsPanelDemo />;
    case 'paddingPanel':
      return <InteractivePaddingPanelDemo />;
    case 'paperSizePanel':
      return <InteractivePaperSizePanelDemo />;
    case 'sizeAndPositionPanel':
      return <InteractiveSizeAndPositionPanelDemo />;
    case 'paperSection':
      return <InteractivePaperSectionDemo />;
    case 'notesSection':
      return <InteractiveNotesSectionDemo />;
    case 'slidesSection':
      return <InteractiveSlidesSectionDemo />;
    case 'titlePlaceholderSection':
      return <InteractiveTitlePlaceholderSectionDemo />;
    case 'subtitlePlaceholderSection':
      return <InteractiveSubtitlePlaceholderSectionDemo />;
    case 'bodyPlaceholderSection':
      return <InteractiveBodyPlaceholderSectionDemo />;
    case 'footnotePlaceholderSection':
      return <InteractiveFootnotePlaceholderSectionDemo />;
    case 'sourcePlaceholderSection':
      return <InteractiveSourcePlaceholderSectionDemo />;
    case 'logoPlaceholderSection':
      return <InteractiveLogoPlaceholderSectionDemo />;
    case 'pageNumberPlaceholderSection':
      return <InteractivePageNumberPlaceholderSectionDemo />;
    case 'colorsSection':
      return <ColorsSection />;
    default:
      return (
        <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <div>Component demo not available</div>
        </div>
      );
  }
};

// Update the main App component to include the OnThisPage component
const App: React.FC = () => {
  const styles = useStyles();
  const [selectedKey, setSelectedKey] = React.useState<string>('all');

  const renderComponentContent = (key: string): React.ReactNode => {
    const componentName = getComponentName(key);
    const description = getComponentDescription(key);
    const props = getComponentProps(key);
    const examples = getComponentExamples(key);
    const mainExample = examples[0];
    const otherExamples = examples.slice(1);

    return (
      <div>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="#" onClick={() => setSelectedKey('all')}>All Components</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span>{componentName}</span>
        </div>

        {/* Title */}
        <Title1 style={{ marginBottom: tokens.spacingVerticalM }}>{componentName}</Title1>

        {/* Brief Description */}
        <div id="description">
          <Text block className={styles.description} style={{ marginBottom: tokens.spacingVerticalL }}>
            {description}
          </Text>
        </div>

        {/* Main Example */}
        <div id="example" className={styles.demoSection}>
          <Title2 className={styles.demoTitle}>Example</Title2>
          <div style={{ 
            padding: tokens.spacingVerticalL,
            backgroundColor: tokens.colorNeutralBackground1,
            borderRadius: tokens.borderRadiusMedium,
            border: `1px solid ${tokens.colorNeutralStroke1}`
          }}>
            <div style={{ 
              padding: tokens.spacingVerticalM,
              backgroundColor: tokens.colorNeutralBackground2,
              borderRadius: tokens.borderRadiusSmall,
              marginBottom: tokens.spacingVerticalM
            }}>
              {renderDemo(key)}
            </div>
            <div>
              <Text size={200} style={{ 
                fontWeight: tokens.fontWeightMedium,
                marginBottom: tokens.spacingVerticalS
              }}>
                Settings:
              </Text>
              <div style={{ 
                padding: tokens.spacingVerticalS,
                backgroundColor: tokens.colorNeutralBackground2,
                borderRadius: tokens.borderRadiusSmall,
                fontFamily: tokens.fontFamilyMonospace,
                fontSize: tokens.fontSizeBase100,
                color: tokens.colorNeutralForeground2
              }}>
                {Object.entries(mainExample?.settings || {}).map(([key, value]) => (
                  <div key={key}>{key}: {JSON.stringify(value)}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features and Functionality */}
        <div id="features" className={styles.demoSection}>
          <Title2 className={styles.demoTitle}>Features and Functionality</Title2>
          <div style={{ 
            padding: tokens.spacingVerticalL,
            backgroundColor: tokens.colorNeutralBackground1,
            borderRadius: tokens.borderRadiusMedium,
            border: `1px solid ${tokens.colorNeutralStroke1}`
          }}>
            <div style={{ lineHeight: '1.6' }}>
              {getComponentFeatures(key).map((feature, index) => (
                <div key={index} style={{ marginBottom: tokens.spacingVerticalL }}>
                  <Text size={300} style={{ 
                    fontWeight: tokens.fontWeightSemibold,
                    color: tokens.colorNeutralForeground1,
                    marginBottom: tokens.spacingVerticalS,
                    display: 'block'
                  }}>
                    {feature.title}
                  </Text>
                  <Text size={300} style={{ 
                    color: tokens.colorNeutralForeground2,
                    display: 'block'
                  }}>
                    {feature.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Props */}
        <div id="props" className={styles.demoSection}>
          <Title2 className={styles.demoTitle}>Props</Title2>
          <div style={{ 
            padding: tokens.spacingVerticalL,
            backgroundColor: tokens.colorNeutralBackground1,
            borderRadius: tokens.borderRadiusMedium,
            border: `1px solid ${tokens.colorNeutralStroke1}`,
            overflowX: 'auto'
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: tokens.fontSizeBase200
            }}>
              <thead>
                <tr style={{ 
                  backgroundColor: tokens.colorNeutralBackground2,
                  borderBottom: `1px solid ${tokens.colorNeutralStroke2}`
                }}>
                  <th style={{ 
                    padding: tokens.spacingVerticalS, 
                    textAlign: 'left',
                    fontWeight: tokens.fontWeightSemibold
                  }}>Name</th>
                  <th style={{ 
                    padding: tokens.spacingVerticalS, 
                    textAlign: 'left',
                    fontWeight: tokens.fontWeightSemibold
                  }}>Type</th>
                  <th style={{ 
                    padding: tokens.spacingVerticalS, 
                    textAlign: 'left',
                    fontWeight: tokens.fontWeightSemibold
                  }}>Default</th>
                  <th style={{ 
                    padding: tokens.spacingVerticalS, 
                    textAlign: 'left',
                    fontWeight: tokens.fontWeightSemibold
                  }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map((prop, index) => (
                  <tr key={prop.name} style={{ 
                    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
                    backgroundColor: index % 2 === 0 ? 'transparent' : tokens.colorNeutralBackground2
                  }}>
                    <td style={{ 
                      padding: tokens.spacingVerticalS,
                      fontFamily: tokens.fontFamilyMonospace,
                      fontWeight: tokens.fontWeightMedium
                    }}>{prop.name}</td>
                    <td style={{ 
                      padding: tokens.spacingVerticalS,
                      fontFamily: tokens.fontFamilyMonospace
                    }}>{prop.type}</td>
                    <td style={{ 
                      padding: tokens.spacingVerticalS,
                      fontFamily: tokens.fontFamilyMonospace
                    }}>{prop.default}</td>
                    <td style={{ padding: tokens.spacingVerticalS }}>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Other Examples */}
        {otherExamples.length > 0 && (
          <div id="other-examples" className={styles.demoSection}>
            <Title2 className={styles.demoTitle}>Other Examples</Title2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
              {otherExamples.map((example, index) => (
                <div key={index} style={{ 
                  padding: tokens.spacingVerticalL,
                  backgroundColor: tokens.colorNeutralBackground1,
                  borderRadius: tokens.borderRadiusMedium,
                  border: `1px solid ${tokens.colorNeutralStroke1}`
                }}>
                  <Text size={300} style={{ 
                    fontWeight: tokens.fontWeightMedium,
                    marginBottom: tokens.spacingVerticalM
                  }}>
                    {example.description}
                  </Text>
                  <div style={{ 
                    padding: tokens.spacingVerticalM,
                    backgroundColor: tokens.colorNeutralBackground2,
                    borderRadius: tokens.borderRadiusSmall,
                    marginBottom: tokens.spacingVerticalM
                  }}>
                    {example.demo}
                  </div>
                  <div>
                    <Text size={200} style={{ 
                      fontWeight: tokens.fontWeightMedium,
                      marginBottom: tokens.spacingVerticalS
                    }}>
                      Settings:
                    </Text>
                    <div style={{ 
                      padding: tokens.spacingVerticalS,
                      backgroundColor: tokens.colorNeutralBackground2,
                      borderRadius: tokens.borderRadiusSmall,
                      fontFamily: tokens.fontFamilyMonospace,
                      fontSize: tokens.fontSizeBase100,
                      color: tokens.colorNeutralForeground2
                    }}>
                      {Object.entries(example.settings).map(([key, value]) => (
                        <div key={key}>{key}: {JSON.stringify(value)}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };



  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root}>
        <nav className={styles.nav}>
          {/* Navigation Header */}
          <div className={styles.navHeader}>
            <div className={styles.navHeaderTitle}>Component Library</div>
            <div className={styles.navHeaderSubtitle}>Fluent UI Custom Components</div>
          </div>
          
          <TabList vertical>
            {categories.map((category) => (
              <React.Fragment key={category.name}>
                <div className={styles.navGroup}>
                  <div className={styles.navGroupTitle}>{category.name}</div>
                  {category.items.map((item) => (
                    <Tab
                      key={item.key}
                      value={item.key}
                      onClick={() => setSelectedKey(item.key)}
                    >
                      {item.name}
                    </Tab>
                  ))}
                </div>
                <Divider />
              </React.Fragment>
            ))}
            
            {/* All Components moved to the end */}
            <div className={styles.navGroup}>
              <div className={styles.navGroupTitle}>Navigation</div>
              <Tab value="all" onClick={() => setSelectedKey('all')}>
                All Components
              </Tab>
            </div>
          </TabList>
        </nav>
        <main className={styles.content}>
          {selectedKey === 'all' ? (
            <div>
              {/* Hero Section */}
              <div className={styles.heroSection}>
                <Title1>Fluent UI Custom Components</Title1>
                <Subtitle1 style={{ marginBottom: tokens.spacingVerticalL, color: tokens.colorNeutralForeground2 }}>
                  Professional UI components for dimension and color management
                </Subtitle1>
                <Body1 className={styles.introText}>
                  A comprehensive collection of specialized UI components built with Microsoft Fluent UI v9, designed specifically for dimension and color management applications. These components extend the Fluent UI design system with domain-specific functionality while maintaining consistency with Microsoft's design language.
                </Body1>
              </div>

              {/* Purpose & Scope Section */}
              <div style={{ marginBottom: tokens.spacingVerticalXXL }}>
                <Title2 className={styles.sectionTitle}>Purpose & Scope</Title2>
                <Body1 className={styles.sectionContent}>
                  This component library addresses the specific needs of applications requiring precise dimension controls, color management, and layout tools. Whether you're building design software, CAD applications, or document editors, these components provide the building blocks for professional-grade user interfaces.
                </Body1>
              </div>

              {/* Key Features Section */}
              <div style={{ marginBottom: tokens.spacingVerticalXXL }}>
                <Title2 className={styles.sectionTitle}>Key Features</Title2>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureBullet}>•</span>
                    <Body2 className={styles.featureText}>
                      <strong>Atomic Design:</strong> Components organized in a 5-level hierarchy from primitives to complex compositions
                    </Body2>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureBullet}>•</span>
                    <Body2 className={styles.featureText}>
                      <strong>Fluent UI Integration:</strong> Built on Microsoft Fluent UI v9 with consistent design tokens and accessibility
                    </Body2>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureBullet}>•</span>
                    <Body2 className={styles.featureText}>
                      <strong>TypeScript Support:</strong> Full type safety with comprehensive prop interfaces and documentation
                    </Body2>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureBullet}>•</span>
                    <Body2 className={styles.featureText}>
                      <strong>Professional Quality:</strong> Production-ready components with validation, error handling, and responsive design
                    </Body2>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureBullet}>•</span>
                    <Body2 className={styles.featureText}>
                      <strong>Backward Compatibility:</strong> Maintained through re-exports and gradual migration paths
                    </Body2>
                  </div>
                </div>
              </div>

              {/* Component Categories Section */}
              <div style={{ marginBottom: tokens.spacingVerticalXXL }}>
                <Title2 className={styles.sectionTitle}>Component Categories</Title2>
                <div className={styles.componentGrid}>
                  <div className={styles.componentCard}>
                    <Title3 style={{ marginBottom: tokens.spacingVerticalS }}>Primitives</Title3>
                    <Body2 style={{ marginBottom: tokens.spacingVerticalM }}>
                      Atomic Fluent UI component wrappers - the fundamental building blocks.
                    </Body2>
                    <div className={styles.techStack}>
                      <Badge appearance="filled" color="brand">5 Components</Badge>
                    </div>
                  </div>
                  <div className={styles.componentCard}>
                    <Title3 style={{ marginBottom: tokens.spacingVerticalS }}>Components</Title3>
                    <Body2 style={{ marginBottom: tokens.spacingVerticalM }}>
                      Molecule-level combinations of primitives for specific use cases.
                    </Body2>
                    <div className={styles.techStack}>
                      <Badge appearance="filled" color="brand">6 Components</Badge>
                    </div>
                  </div>
                  <div className={styles.componentCard}>
                    <Title3 style={{ marginBottom: tokens.spacingVerticalS }}>Compositions</Title3>
                    <Body2 style={{ marginBottom: tokens.spacingVerticalM }}>
                      Complex functional units combining multiple components.
                    </Body2>
                    <div className={styles.techStack}>
                      <Badge appearance="filled" color="brand">8 Components</Badge>
                    </div>
                  </div>
                  <div className={styles.componentCard}>
                    <Title3 style={{ marginBottom: tokens.spacingVerticalS }}>Panels</Title3>
                    <Body2 style={{ marginBottom: tokens.spacingVerticalM }}>
                      Layout containers with specific functionality areas.
                    </Body2>
                    <div className={styles.techStack}>
                      <Badge appearance="filled" color="brand">7 Components</Badge>
                    </div>
                  </div>
                  <div className={styles.componentCard}>
                    <Title3 style={{ marginBottom: tokens.spacingVerticalS }}>Sections</Title3>
                    <Body2 style={{ marginBottom: tokens.spacingVerticalM }}>
                      High-level layout sections for complete application areas.
                    </Body2>
                    <div className={styles.techStack}>
                      <Badge appearance="outline" color="subtle">Coming Soon</Badge>
                    </div>
                  </div>
                  <div className={styles.componentCard}>
                    <Title3 style={{ marginBottom: tokens.spacingVerticalS }}>Legacy</Title3>
                    <Body2 style={{ marginBottom: tokens.spacingVerticalM }}>
                      Older components maintained for backward compatibility.
                    </Body2>
                    <div className={styles.techStack}>
                      <Badge appearance="filled" color="subtle">2 Components</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology Stack Section */}
              <div style={{ marginBottom: tokens.spacingVerticalXXL }}>
                <Title2 className={styles.sectionTitle}>Technology Stack</Title2>
                <div className={styles.techStack} style={{ marginBottom: tokens.spacingVerticalM }}>
                  <span className={styles.techTag}>React 18+</span>
                  <span className={styles.techTag}>TypeScript</span>
                  <span className={styles.techTag}>Fluent UI v9</span>
                  <span className={styles.techTag}>CSS-in-JS</span>
                  <span className={styles.techTag}>Design Tokens</span>
                </div>
                <Body1 className={styles.sectionContent}>
                  Built with modern React patterns, TypeScript for type safety, and Fluent UI's design system for consistency and accessibility. All components follow Microsoft's design language and accessibility standards.
                </Body1>
              </div>

              {/* Getting Started Section */}
              <div style={{ marginBottom: tokens.spacingVerticalXXL }}>
                <Title2 className={styles.sectionTitle}>Getting Started</Title2>
                <Body1 className={styles.sectionContent}>
                  Use the navigation menu on the left to explore individual components. Each component page includes live examples, detailed props documentation, and usage patterns. All components are designed to work together seamlessly while remaining independently usable.
                </Body1>
              </div>
            </div>
          ) : (
            renderComponentContent(selectedKey)
          )}
        </main>
        {selectedKey !== 'all' && (
          <OnThisPage sections={getPageSections(selectedKey)} />
        )}
      </div>
    </FluentProvider>
  );
};

// Helper function to get sections for a component
const getPageSections = (key: string): { id: string; title: string }[] => {
  const examples = getComponentExamples(key);
  const otherExamples = examples.slice(1);
  
  return [
    { id: 'description', title: 'Description' },
    { id: 'example', title: 'Example' },
    { id: 'features', title: 'Features and Functionality' },
    { id: 'props', title: 'Props' },
    ...(otherExamples.length > 0 ? [{ id: 'other-examples', title: 'Other Examples' }] : [])
  ];
};

export default App;
