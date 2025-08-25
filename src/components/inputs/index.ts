/**
 * components/inputs/index.ts
 * Centralized exports for all input components.
 * Note: Primitives have been moved to components/primitives/
 * Note: Components have been moved to components/components/
 * Note: Compositions have been moved to components/compositions/
 */

// Core input components (Level 4+ components)
export { RecentColors } from './RecentColors';
export { ColorInput as RGBHSL } from './RGBHSL';

// Re-export primitives for backward compatibility
export { HexInput, NumericInput, SliderInput, UnitSelector, ColorSliderInput } from '../primitives';

// Re-export components for backward compatibility
export { AspectRatioSelector, ColorModelSelector, OrientationSelector, PaperSelector, PositionSelector, UniversalSelector } from '../components';

// Re-export compositions for backward compatibility
export { ColorHexInput, ColorInput, ColorSelector, DimensionInput, MultipleSlidersInput, RGBHSLColorSlidersInput } from '../compositions';

// Re-export ResponsiveColorPicker from panels
export { ResponsiveColorPicker } from '../panels/ResponsiveColorPicker';