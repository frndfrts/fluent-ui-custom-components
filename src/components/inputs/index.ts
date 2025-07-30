/**
 * components/inputs/index.ts
 * Centralized exports for all input components.
 * Note: Primitives have been moved to components/primitives/
 * Note: Components have been moved to components/components/
 */

// Core input components (Level 3+ components)
export { ColorHexInput } from './ColorHexInput';
export { ColorInput } from './ColorInput';
export { ResponsiveColorPicker as ColorPicker } from './ColorPicker';
export { ColorSelector } from './ColorSelector';
export { DimensionInput } from './DimensionInput';
export { RecentColors } from './RecentColors';
export { ResponsiveColorPicker } from './ResponsiveColorPicker';
export { ColorInput as RGBHSL } from './RGBHSL';
export { RGBHSLColorSlidersInput } from './RGBHSLColorSlidersInput';
export { MultipleSlidersInput } from './MultipleSlidersInput';

// Re-export primitives for backward compatibility
export { HexInput, NumericInput, SliderInput, UnitSelector, ColorSliderInput } from '../primitives';

// Re-export components for backward compatibility
export { AspectRatioSelector, ColorModelSelector, OrientationSelector, PaperSelector, PositionSelector, UniversalSelector } from '../components';