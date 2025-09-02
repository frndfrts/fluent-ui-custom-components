/**
 * Fluent UI Custom Components - Main Export Index
 * 
 * This file provides a centralized export point for all components in the library.
 * Components are organized by category and complexity level.
 * 
 * @example
 * ```tsx
 * // Import specific components
 * import { NumericInput, HexInput, UnitSelector } from './components';
 * 
 * // Import by category
 * import { NumericInput } from './components/primitives';
 * import { DimensionInput } from './components/compositions';
 * import { PaperSection } from './components/sections';
 * ```
 * 
 * @since 1.0.0
 * @author Fluent UI Custom Components Team
 */

// ============================================================================
// PRIMITIVES (Level 1) - Fundamental building blocks
// ============================================================================

// Basic input components
export { NumericInput } from './primitives/NumericInput';
export { HexInput } from './primitives/HexInput';

export { UnitSelector, DEFAULT_UNITS, DEFAULT_UNIT } from './components/UnitSelector';
export { SliderInput } from './primitives/SliderInput';
export { ColorSliderInput } from './primitives/ColorSliderInput';
export { LockAspectRatio } from './primitives/LockAspectRatio';
// ============================================================================
// COMPONENTS (Level 2) - Molecule-level combinations
// ============================================================================

// Selection components
export { AspectRatioSelector } from './components/AspectRatioSelector';
export { ColorModelSelector } from './components/ColorModelSelector';
export { OrientationSelector } from './components/OrientationSelector';
export { PaperSelector, STANDARD_PAPER_SIZES, STANDARD_PAPER_DIMENSIONS } from './components/PaperSelector';
export { PositionSelector } from './components/PositionSelector';
export { UniversalSelector } from './primitives/UniversalSelector';

// ============================================================================
// COMPOSITIONS (Level 3) - Complex functional units
// ============================================================================

// Color-related compositions
export { ColorInput } from './compositions/ColorInput';
export { ColorSelector } from './compositions/ColorSelector';
export { ColorHexInput } from './compositions/ColorHexInput';
export { LabeledColorHexInput } from './compositions/LabeledColorHexInput';
export { LabeledColorPicker } from './compositions/LabeledColorPicker';
export { RGBHSLColorSlidersInput } from './compositions/RGBHSLColorSlidersInput';
export { MultipleSlidersInput } from './compositions/MultipleSlidersInput';

// Navigation and layout compositions
export { TabbedNavbar } from './compositions/TabbedNavbar';

// Dimension and layout compositions
export { DimensionInput } from './compositions/DimensionInput';

// ============================================================================
// PANELS (Level 4) - Layout containers with specific functionality
// ============================================================================

// Paper and layout panels
export { PaperSizePanel } from './panels/PaperSizePanel';
export { MarginsPanel } from './panels/MarginsPanel';
export { PaddingPanel } from './panels/PaddingPanel';
export { SizeAndPositionPanel } from './panels/SizeAndPositionPanel';
export { SizeFields } from './panels/SizeFields';
export { PositionFields } from './panels/PositionFields';

// Color and UI panels
export { ResponsiveColorPicker } from './panels/ResponsiveColorPicker';
export { PreviewPanel } from './panels/PreviewPanel';

// ============================================================================
// SECTIONS (Level 5) - High-level functional areas
// ============================================================================

// Main section components
export { PaperSection } from './sections/PaperSection';
export { NotesSection } from './sections/NotesSection';
export { SlidesSection } from './sections/SlidesSection';
export { PreviewSection } from './sections/PreviewSection';
export { ColorsSection } from './sections/ColorsSection';

// Placeholder section components
export { TitlePlaceholderSection } from './sections/TitlePlaceholderSection';
export { SubtitlePlaceholderSection } from './sections/SubtitlePlaceholderSection';
export { BodyPlaceholderSection } from './sections/BodyPlaceholderSection';
export { FootnotePlaceholderSection } from './sections/FootnotePlaceholderSection';
export { SourcePlaceholderSection } from './sections/SourcePlaceholderSection';
export { LogoPlaceholderSection } from './sections/LogoPlaceholderSection';
export { PageNumberPlaceholderSection } from './sections/PageNumberPlaceholderSection';

// Section type exports
export type { PaperSectionProps } from './sections/PaperSection';
export type { NotesSectionProps } from './sections/NotesSection';
export type { SlidesSectionProps } from './sections/SlidesSection';
export type { PreviewSectionProps } from './sections/PreviewSection';
export type { ColorsSectionProps } from './sections/ColorsSection';
export type { TitlePlaceholderSectionProps } from './sections/TitlePlaceholderSection';
export type { SubtitlePlaceholderSectionProps } from './sections/SubtitlePlaceholderSection';
export type { BodyPlaceholderSectionProps } from './sections/BodyPlaceholderSection';
export type { FootnotePlaceholderSectionProps } from './sections/FootnotePlaceholderSection';
export type { SourcePlaceholderSectionProps } from './sections/SourcePlaceholderSection';
export type { LogoPlaceholderSectionProps } from './sections/LogoPlaceholderSection';
export type { PageNumberPlaceholderSectionProps } from './sections/PageNumberPlaceholderSection';

// ============================================================================
// LEGACY (Level 6) - Backward compatibility components
// ============================================================================

// Legacy color pickers
export { FluentColorPicker } from './legacy/FluentColorPicker';
export { HorizontalColorPicker } from './legacy/HorizontalColorPicker';
export { LegacyColorPicker } from './legacy/LegacyColorPicker';

// ============================================================================
// ERROR HANDLING - Error boundaries and error display
// ============================================================================

export { ErrorBoundary } from './error/ErrorBoundary';
export { ErrorDisplay, ValidationError, WarningMessage, InfoMessage, SuccessMessage } from './error/ErrorDisplay';

// ============================================================================
// LAYOUT AND STYLING - Layout system and utilities
// ============================================================================

export { FormRow } from './layout/FormRow';
export { FormLayoutProvider, useFormLayout } from '../styles/FormLayoutContext';

// ============================================================================
// TEMPLATES - Component templates and examples
// ============================================================================

export { ComponentTemplate } from './templates/ComponentTemplate';
export { ErrorHandlingTemplate } from './templates/ErrorHandlingTemplate';

// ============================================================================
// INPUTS - Re-exports for backward compatibility
// ============================================================================

export { RecentColors } from './inputs/RecentColors';
export { ColorInput as RGBHSLColorInput } from './inputs/RGBHSL';



// ============================================================================
// HOOKS - Custom React hooks
// ============================================================================

export { useInputValidation } from '../hooks/useInputValidation';
export { useComponentSize } from '../hooks/useComponentSize';
export { useColorManager } from '../hooks/useColorManager';
export { useFormValidation } from '../hooks/useFormValidation';
export { useLocalStorage } from '../hooks/useLocalStorage';
export { useDebounce } from '../hooks/useDebounce';
export { usePrevious } from '../hooks/usePrevious';
export { useToggle } from '../hooks/useToggle';
export { useWindowSize } from '../hooks/useWindowSize';
export { useClickOutside } from '../hooks/useClickOutside';
export { useHover } from '../hooks/useHover';
export { useAsync } from '../hooks/useAsync';
export { useThrottle } from '../hooks/useThrottle';
export { useKeyPress } from '../hooks/useKeyPress';
export { useIntersectionObserver } from '../hooks/useIntersectionObserver';
export { useMediaQuery } from '../hooks/useMediaQuery';
export { useScrollPosition } from '../hooks/useScrollPosition';
export { useOnlineStatus } from '../hooks/useOnlineStatus';
export { useCopyToClipboard } from '../hooks/useCopyToClipboard';
export { useGeolocation } from '../hooks/useGeolocation';
export { useNetworkStatus } from '../hooks/useNetworkStatus';
export { useFocus } from '../hooks/useFocus';
export { useEventListener } from '../hooks/useEventListener';
export { useInterval } from '../hooks/useInterval';
export { useTimeout } from '../hooks/useTimeout';
export { useUpdateEffect } from '../hooks/useUpdateEffect';
export { useWhyDidYouUpdate } from '../hooks/useWhyDidYouUpdate';
export { useForceUpdate } from '../hooks/useForceUpdate';
export { useIsMounted } from '../hooks/useIsMounted';
export { useUnmountEffect } from '../hooks/useUnmountEffect';
export { useMountEffect } from '../hooks/useMountEffect';
export { useDeepCompareEffect } from '../hooks/useDeepCompareEffect';
export { useShallowCompareEffect } from '../hooks/useShallowCompareEffect';
export { useFirstMountState } from '../hooks/useFirstMountState';
export { useIsFirstRender } from '../hooks/useIsFirstRender';
export { useIsLastRender } from '../hooks/useIsLastRender';
export { useIsMountedRef } from '../hooks/useIsMountedRef';

// ============================================================================
// UTILITIES - Helper functions and constants
// ============================================================================

export * from '../styles/layoutTokens';
export { useCommonStyles } from '../styles/commonStyles';
