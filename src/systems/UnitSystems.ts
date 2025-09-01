/**
 * UnitSystems.ts
 * Registry of unit systems for different measurement types.
 * Provides a centralized way to define and manage unit conversions.
 */

export interface UnitDefinition {
  symbol: string;                 // 'cm', 'in', '°C', '°F', 'ml', 'oz'
  name: string;                   // 'centimeters', 'inches', 'celsius', 'fahrenheit'
  category: 'absolute' | 'relative' | 'temperature' | 'custom';
  requiresContext?: boolean;
  contextType?: 'dimension' | 'font' | 'temperature' | 'volume';
  precision?: number;             // decimal places
  step?: number;                  // step value for input
}

export interface UnitSystem {
  id: string;                      // 'length', 'volume', 'temperature', 'energy'
  name: string;                    // 'Length', 'Volume', 'Temperature', 'Energy'
  internalUnit: string;            // 'cm', 'ml', '°C', 'joules'
  units: UnitDefinition[];
  conversions: Record<string, number | ((value: number) => number)>; // conversion factors to internal unit
}

// Length Unit System
export const LENGTH_SYSTEM: UnitSystem = {
  id: 'length',
  name: 'Length',
  internalUnit: 'cm',
  units: [
    { symbol: 'cm', name: 'centimeters', category: 'absolute', precision: 2, step: 0.01 },
    { symbol: 'mm', name: 'millimeters', category: 'absolute', precision: 1, step: 0.1 },
    { symbol: 'in', name: 'inches', category: 'absolute', precision: 3, step: 0.001 },
    { symbol: 'px', name: 'pixels', category: 'absolute', precision: 0, step: 1 },
    { symbol: 'pt', name: 'points', category: 'absolute', precision: 0, step: 1 },
    { symbol: '%', name: 'percentage', category: 'relative', requiresContext: true, contextType: 'dimension', precision: 1, step: 0.1 },
    { symbol: 'vw', name: 'viewport width', category: 'relative', requiresContext: true, contextType: 'dimension', precision: 1, step: 0.1 },
    { symbol: 'vh', name: 'viewport height', category: 'relative', requiresContext: true, contextType: 'dimension', precision: 1, step: 0.1 },
    { symbol: 'em', name: 'em', category: 'relative', requiresContext: true, contextType: 'font', precision: 2, step: 0.01 },
    { symbol: 'rem', name: 'rem', category: 'relative', requiresContext: true, contextType: 'font', precision: 2, step: 0.01 },
  ],
  conversions: {
    'cm': 1,
    'mm': 0.1,
    'in': 2.54,
    'px': 1/37.795275591,
    'pt': 1/28.346456693,
  }
};

// Temperature Unit System
export const TEMPERATURE_SYSTEM: UnitSystem = {
  id: 'temperature',
  name: 'Temperature',
  internalUnit: '°C',
  units: [
    { symbol: '°C', name: 'celsius', category: 'temperature', precision: 1, step: 0.1 },
    { symbol: '°F', name: 'fahrenheit', category: 'temperature', precision: 1, step: 0.1 },
    { symbol: 'K', name: 'kelvin', category: 'temperature', precision: 1, step: 0.1 },
  ],
  conversions: {
    '°C': 1,
    '°F': (f: number) => (f - 32) * 5/9,
    'K': (k: number) => k - 273.15,
  }
};

// Volume Unit System
export const VOLUME_SYSTEM: UnitSystem = {
  id: 'volume',
  name: 'Volume',
  internalUnit: 'ml',
  units: [
    { symbol: 'ml', name: 'milliliters', category: 'absolute', precision: 1, step: 0.1 },
    { symbol: 'l', name: 'liters', category: 'absolute', precision: 2, step: 0.01 },
    { symbol: 'oz', name: 'fluid ounces', category: 'absolute', precision: 2, step: 0.01 },
    { symbol: 'gal', name: 'gallons', category: 'absolute', precision: 3, step: 0.001 },
    { symbol: 'pt', name: 'pints', category: 'absolute', precision: 2, step: 0.01 },
  ],
  conversions: {
    'ml': 1,
    'l': 1000,
    'oz': 29.5735,
    'gal': 3785.41,
    'pt': 473.176,
  }
};

// Weight Unit System
export const WEIGHT_SYSTEM: UnitSystem = {
  id: 'weight',
  name: 'Weight',
  internalUnit: 'g',
  units: [
    { symbol: 'g', name: 'grams', category: 'absolute', precision: 1, step: 0.1 },
    { symbol: 'kg', name: 'kilograms', category: 'absolute', precision: 2, step: 0.01 },
    { symbol: 'oz', name: 'ounces', category: 'absolute', precision: 2, step: 0.01 },
    { symbol: 'lb', name: 'pounds', category: 'absolute', precision: 2, step: 0.01 },
  ],
  conversions: {
    'g': 1,
    'kg': 1000,
    'oz': 28.3495,
    'lb': 453.592,
  }
};

// Energy Unit System
export const ENERGY_SYSTEM: UnitSystem = {
  id: 'energy',
  name: 'Energy',
  internalUnit: 'J',
  units: [
    { symbol: 'J', name: 'joules', category: 'absolute', precision: 1, step: 0.1 },
    { symbol: 'cal', name: 'calories', category: 'absolute', precision: 1, step: 0.1 },
    { symbol: 'kcal', name: 'kilocalories', category: 'absolute', precision: 2, step: 0.01 },
    { symbol: 'Wh', name: 'watt-hours', category: 'absolute', precision: 2, step: 0.01 },
  ],
  conversions: {
    'J': 1,
    'cal': 4.184,
    'kcal': 4184,
    'Wh': 3600,
  }
};

// Unit System Registry
export const UNIT_SYSTEMS: Record<string, UnitSystem> = {
  'length': LENGTH_SYSTEM,
  'temperature': TEMPERATURE_SYSTEM,
  'volume': VOLUME_SYSTEM,
  'weight': WEIGHT_SYSTEM,
  'energy': ENERGY_SYSTEM,
};

// Helper functions
export const getUnitSystem = (id: string): UnitSystem | undefined => {
  return UNIT_SYSTEMS[id];
};

export const getUnitDefinition = (systemId: string, unitSymbol: string): UnitDefinition | undefined => {
  const system = getUnitSystem(systemId);
  return system?.units.find(unit => unit.symbol === unitSymbol);
};

export const getAvailableUnits = (systemId: string): string[] => {
  const system = getUnitSystem(systemId);
  return system?.units.map(unit => unit.symbol) || [];
};

export const validateUnit = (systemId: string, unitSymbol: string): boolean => {
  return getUnitDefinition(systemId, unitSymbol) !== undefined;
};

export const getUnitMetadata = (systemId: string, unitSymbol: string): UnitDefinition | null => {
  return getUnitDefinition(systemId, unitSymbol) || null;
};
