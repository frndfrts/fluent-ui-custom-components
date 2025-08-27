/**
 * layoutTokens.ts
 * Layout tokens and utility functions for consistent spacing and sizing.
 */
import type { ComponentSize } from '../types/common';

// Re-export ComponentSize for backward compatibility
export type { ComponentSize } from '../types/common';

export const labelColumnWidth: Record<ComponentSize, number> = {
  small: 80,
  medium: 100,
  large: 120,
};

export const numericTrackWidth: Record<ComponentSize, number> = {
  small: 60,
  medium: 80,
  large: 100,
};

export const unitTrackWidth: Record<ComponentSize, number> = {
  small: 80,
  medium: 100,
  large: 120,
};

// Restore missing exports that components depend on
export const controlGap = 4; // Align with existing DimensionInput gap
export const rowMinWidth = 240;
export const rowMaxWidth = 320;

// Grid layout utilities
export const getGridTemplateColumns = (size: ComponentSize): string => {
  const label = `${labelColumnWidth[size]}px`;
  const numeric = `${numericTrackWidth[size]}px`;
  const gap = `${controlGap}px`;
  const unit = `${unitTrackWidth[size]}px`;
  // [label] [numeric] [gap] [unit]
  return `${label} ${numeric} ${gap} ${unit}`;
};

export const getCombinedControlWidth = (size: ComponentSize): number => {
  return numericTrackWidth[size] + controlGap + unitTrackWidth[size];
};

export const commonRowInlineStyles = (size: ComponentSize): React.CSSProperties => {
  return {
    width: '100%',
    maxWidth: `${rowMaxWidth}px`,
    minWidth: `${rowMinWidth}px`,
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(size),
    gap: `${controlGap}px`,
    alignItems: 'center',
  };
};


