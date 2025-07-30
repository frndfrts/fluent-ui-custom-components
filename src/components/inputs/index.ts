/**
 * components/inputs/index.ts
 * Centralized exports for all input components.
 * Note: Primitives have been moved to components/primitives/
 */

// Core input components (Level 2+ components)
export { AspectRatioSelector } from './AspectRatioSelector';
export { ColorHexInput } from './ColorHexInput';
export { ColorInput } from './ColorInput';
export { ColorModelSelector } from './ColorModelSelector';
export { ResponsiveColorPicker as ColorPicker } from './ColorPicker';
export { ColorSelector } from './ColorSelector';
export { DimensionInput } from './DimensionInput';
export { OrientationSelector } from './OrientationSelector';
export { PaperSelector } from './PaperSelector';
export { PositionSelector } from './PositionSelector';
export { RecentColors } from './RecentColors';
export { ResponsiveColorPicker } from './ResponsiveColorPicker';
export { ColorInput as RGBHSL } from './RGBHSL';
export { RGBHSLColorSlidersInput } from './RGBHSLColorSlidersInput';
export { UniversalSelector } from './UniversalSelector';

// Re-export primitives for backward compatibility
export { HexInput, NumericInput, SliderInput, UnitSelector, ColorSliderInput } from '../primitives';