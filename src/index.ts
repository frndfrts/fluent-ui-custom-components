/**
 * Fluent UI Custom Components - Library Entry Point
 * 
 * This is the main entry point for the component library.
 * All exports are available for external consumption.
 * 
 * @example
 * ```tsx
 * // Import specific components
 * import { NumericInput, HexInput, ResponsiveColorPicker } from 'fluent-ui-custom-components';
 * 
 * // Import by category
 * import { NumericInput } from 'fluent-ui-custom-components/primitives';
 * import { DimensionInput } from 'fluent-ui-custom-components/compositions';
 * import { PaperSection } from 'fluent-ui-custom-components/sections';
 * ```
 * 
 * @since 1.0.0
 * @author Fluent UI Custom Components Team
 */

// ============================================================================
// COMPONENTS - UI Components
// ============================================================================

// Export all components
export * from './components';

// ============================================================================
// HOOKS - Custom React Hooks
// ============================================================================

// Export all hooks
export * from './hooks';

// ============================================================================
// CONTEXTS - React Contexts
// ============================================================================

// Export all contexts
export * from './contexts';

// ============================================================================
// SERVICES - Custom services
// ============================================================================

// Export services (excluding conflicting types)
export { unitConversionService, UnitConversionService } from './services/UnitConversionService';
export type { UnitConversionContext as ServiceUnitConversionContext } from './services/UnitConversionService';

// ============================================================================
// SYSTEMS - Custom systems
// ============================================================================

// Export systems (excluding conflicting functions)
export { 
  LENGTH_SYSTEM, 
  TEMPERATURE_SYSTEM, 
  VOLUME_SYSTEM, 
  WEIGHT_SYSTEM, 
  ENERGY_SYSTEM,
  UNIT_SYSTEMS,
  getUnitSystem,
  getUnitDefinition,
  getAvailableUnits,
  getUnitMetadata
} from './systems/UnitSystems';
export type { UnitSystem, UnitDefinition } from './systems/UnitSystems';

// ============================================================================
// STYLES - Styling utilities
// ============================================================================

// Export all styles
export * from './styles';

// ============================================================================
// UTILITIES - Helper functions
// ============================================================================

// Export utilities (excluding conflicting functions)
export * from './utils';
