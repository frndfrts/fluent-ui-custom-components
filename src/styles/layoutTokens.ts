// Layout tokens for grid-based form rows; keep this file free of unused imports

export type ComponentSize = 'small' | 'medium' | 'large';

export const labelColumnWidth: Record<ComponentSize, number> = {
  small: 120,
  medium: 160,
  large: 200,
};

export const numericTrackWidth: Record<ComponentSize, number> = {
  small: 80,
  medium: 120,
  large: 160,
};

export const unitTrackWidth: Record<ComponentSize, number> = {
  small: 60,
  medium: 70,
  large: 80,
};

export const controlGap = 4; // Align with existing DimensionInput gap

export const rowMinWidth = 240;
export const rowMaxWidth = 320;

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
  };
};


