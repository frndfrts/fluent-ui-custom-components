/**
 * UnitConversionContext.tsx
 * Context provider for unit conversion reference dimensions.
 * Provides reference dimensions for relative unit calculations throughout the component tree.
 */
import * as React from 'react';
import { UnitConversionContext as UnitContext } from '../services/UnitConversionService';

interface UnitConversionProviderProps {
  children: React.ReactNode;
  referenceWidth?: number;   // For percentage calculations (in cm)
  referenceHeight?: number;  // For percentage calculations (in cm)
  containerWidth?: number;   // For viewport-relative units (in cm)
  containerHeight?: number;  // For viewport-relative units (in cm)
  fontSize?: number;         // For em calculations (in cm)
  rootFontSize?: number;     // For rem calculations (in cm)
}

const UnitConversionContext = React.createContext<UnitContext | undefined>(undefined);

export const useUnitConversionContext = (): UnitContext => {
  const context = React.useContext(UnitConversionContext);
  if (context === undefined) {
    throw new Error('useUnitConversionContext must be used within a UnitConversionProvider');
  }
  return context;
};

export const UnitConversionProvider: React.FC<UnitConversionProviderProps> = ({
  children,
  referenceWidth,
  referenceHeight,
  containerWidth,
  containerHeight,
  fontSize,
  rootFontSize,
}) => {
  const contextValue: UnitContext = React.useMemo(() => ({
    referenceWidth,
    referenceHeight,
    containerWidth,
    containerHeight,
    fontSize,
    rootFontSize,
  }), [referenceWidth, referenceHeight, containerWidth, containerHeight, fontSize, rootFontSize]);

  return (
    <UnitConversionContext.Provider value={contextValue}>
      {children}
    </UnitConversionContext.Provider>
  );
};

UnitConversionProvider.displayName = 'UnitConversionProvider';
