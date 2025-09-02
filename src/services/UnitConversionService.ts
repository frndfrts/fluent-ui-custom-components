/**
 * UnitConversionService.ts
 * Centralized service for unit conversions using the unit system registry.
 * Provides a clean API for converting between units within a system.
 */

import { UnitSystem, UnitDefinition, getUnitSystem, getUnitDefinition, LENGTH_SYSTEM, TEMPERATURE_SYSTEM, VOLUME_SYSTEM, WEIGHT_SYSTEM, ENERGY_SYSTEM } from '../systems/UnitSystems';

export interface UnitConversionContext {
  referenceWidth?: number;   // For percentage calculations (in internal unit)
  referenceHeight?: number;  // For percentage calculations (in internal unit)
  containerWidth?: number;   // For viewport-relative units (in internal unit)
  containerHeight?: number;  // For viewport-relative units (in internal unit)
  fontSize?: number;         // For em calculations (in internal unit)
  rootFontSize?: number;     // For rem calculations (in internal unit)
  temperature?: number;      // For temperature conversions
  volume?: number;           // For volume conversions
  axis?: 'width' | 'height' | 'x' | 'y'; // 🆕 Axis for percentage calculations
}

export class UnitConversionService {
  private systems: Map<string, UnitSystem> = new Map();

  constructor() {
    // Initialize with the actual unit systems from UnitSystems.ts
    this.registerSystem('length', LENGTH_SYSTEM);
    this.registerSystem('temperature', TEMPERATURE_SYSTEM);
    this.registerSystem('volume', VOLUME_SYSTEM);
    this.registerSystem('weight', WEIGHT_SYSTEM);
    this.registerSystem('energy', ENERGY_SYSTEM);
  }

  /**
   * Register a unit system
   */
  registerSystem(systemId: string, system: UnitSystem): void {
    this.systems.set(systemId, system);
  }

  /**
   * Get a unit system by ID
   */
  getSystem(systemId: string): UnitSystem | undefined {
    return this.systems.get(systemId) || getUnitSystem(systemId);
  }

  /**
   * Convert value from one unit to another within the same system
   */
  convert(value: number, fromUnit: string, toUnit: string, systemId: string, context?: UnitConversionContext): number {
    const system = this.getSystem(systemId);
    if (!system) {
      throw new Error(`Unit system '${systemId}' not found`);
    }

    // Convert to internal unit first
    const internalValue = this.toInternalUnit(value, fromUnit, systemId, context);
    
    // Convert from internal unit to target unit
    return this.fromInternalUnit(internalValue, toUnit, systemId, context);
  }

  /**
   * Convert value to internal unit of the system
   */
  toInternalUnit(value: number, unit: string, systemId: string, context?: UnitConversionContext): number {
    const system = this.getSystem(systemId);
    if (!system) {
      throw new Error(`Unit system '${systemId}' not found`);
    }

    const unitDef = getUnitDefinition(systemId, unit);
    if (!unitDef) {
      throw new Error(`Unit '${unit}' not found in system '${systemId}'`);
    }

    // Handle relative units that need context
    if (unitDef.requiresContext && context) {
      return this.convertRelativeUnit(value, unit, systemId, context, 'toInternal');
    }

    // Handle absolute units
    const conversion = system.conversions[unit];
    if (typeof conversion === 'function') {
      return conversion(value);
    } else if (typeof conversion === 'number') {
      return value * conversion;
    }

    // Default: assume it's already in internal unit
    return value;
  }

  /**
   * Convert value from internal unit to display unit
   */
  fromInternalUnit(value: number, unit: string, systemId: string, context?: UnitConversionContext): number {
    const system = this.getSystem(systemId);
    if (!system) {
      throw new Error(`Unit system '${systemId}' not found`);
    }

    const unitDef = getUnitDefinition(systemId, unit);
    if (!unitDef) {
      throw new Error(`Unit '${unit}' not found in system '${systemId}'`);
    }

    // Handle relative units that need context
    if (unitDef.requiresContext && context) {
      return this.convertRelativeUnit(value, unit, systemId, context, 'fromInternal');
    }

    // Handle absolute units
    const conversion = system.conversions[unit];
    if (typeof conversion === 'function') {
      // For temperature conversions, we need to handle the reverse
      if (systemId === 'temperature') {
        if (unit === '°F') {
          return (value * 9/5) + 32;
        } else if (unit === 'K') {
          return value + 273.15;
        }
      }
      return value; // Default for function conversions
    } else if (typeof conversion === 'number') {
      return value / conversion;
    }

    // Default: assume it's already in target unit
    return value;
  }

  /**
   * Convert relative units (percentage, em, rem, vw, vh)
   */
  private convertRelativeUnit(value: number, unit: string, systemId: string, context: UnitConversionContext, direction: 'toInternal' | 'fromInternal'): number {
    switch (unit) {
      case '%':
        // 🚨 FIX: Use axis-aware reference selection for percentage calculations
        // Extract axis from context if provided, default to 'width' for backward compatibility
        const axis = context.axis || 'width';
        
        let reference: number | undefined;
        if (axis === 'width' || axis === 'x') {
          reference = context.referenceWidth;
        } else if (axis === 'height' || axis === 'y') {
          reference = context.referenceHeight;
        } else {
          // Fallback for backward compatibility - use width reference
          reference = context.referenceWidth || context.referenceHeight;
        }
        
        if (reference === undefined) {
          throw new Error(`Reference ${axis} required for percentage conversion`);
        }
        
        if (direction === 'toInternal') {
          return (value / 100) * reference;
        } else {
          return (value / reference) * 100;
        }

      case 'vw':
        if (!context.containerWidth) {
          throw new Error('Container width required for vw conversion');
        }
        if (direction === 'toInternal') {
          return (value / 100) * context.containerWidth;
        } else {
          return (value / context.containerWidth) * 100;
        }

      case 'vh':
        if (!context.containerHeight) {
          throw new Error('Container height required for vh conversion');
        }
        if (direction === 'toInternal') {
          return (value / 100) * context.containerHeight;
        } else {
          return (value / context.containerHeight) * 100;
        }

      case 'em':
        if (!context.fontSize) {
          throw new Error('Font size required for em conversion');
        }
        if (direction === 'toInternal') {
          return value * context.fontSize;
        } else {
          return value / context.fontSize;
        }

      case 'rem':
        if (!context.rootFontSize) {
          throw new Error('Root font size required for rem conversion');
        }
        if (direction === 'toInternal') {
          return value * context.rootFontSize;
        } else {
          return value / context.rootFontSize;
        }

      default:
        throw new Error(`Unknown relative unit: ${unit}`);
    }
  }

  /**
   * Get step value for a unit
   */
  getStepValue(unit: string, systemId: string): number {
    const unitDef = getUnitDefinition(systemId, unit);
    return unitDef?.step || 0.1;
  }

  /**
   * Get decimal places for a unit
   */
  getDecimalPlaces(unit: string, systemId: string): number {
    const unitDef = getUnitDefinition(systemId, unit);
    return unitDef?.precision || 2;
  }

  /**
   * Validate if a unit exists in a system
   */
  validateUnit(unit: string, systemId: string): boolean {
    return getUnitDefinition(systemId, unit) !== undefined;
  }

  /**
   * Get unit metadata
   */
  getUnitMetadata(unit: string, systemId: string): UnitDefinition | null {
    return getUnitDefinition(systemId, unit) || null;
  }

  /**
   * Get available units for a system
   */
  getAvailableUnits(systemId: string): string[] {
    const system = this.getSystem(systemId);
    return system?.units.map(unit => unit.symbol) || [];
  }

  /**
   * Format a value with appropriate decimal places
   */
  formatValue(value: number, unit: string, systemId: string): string {
    const decimalPlaces = this.getDecimalPlaces(unit, systemId);
    return value.toFixed(decimalPlaces);
  }

  /**
   * Check if a unit requires context
   */
  requiresContext(unit: string, systemId: string): boolean {
    const unitDef = getUnitDefinition(systemId, unit);
    return unitDef?.requiresContext || false;
  }

  /**
   * Validate context for a unit
   */
  validateContext(unit: string, systemId: string, context?: UnitConversionContext): boolean {
    if (!this.requiresContext(unit, systemId)) {
      return true;
    }

    if (!context) {
      return false;
    }

    const unitDef = getUnitDefinition(systemId, unit);
    switch (unitDef?.contextType) {
      case 'dimension':
        return !!(context.referenceWidth || context.referenceHeight);
      case 'font':
        return !!(context.fontSize || context.rootFontSize);
      case 'temperature':
        return !!context.temperature;
      case 'volume':
        return !!context.volume;
      default:
        return true;
    }
  }
}

// Create a singleton instance
export const unitConversionService = new UnitConversionService();
