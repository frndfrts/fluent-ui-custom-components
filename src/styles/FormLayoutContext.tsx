import * as React from 'react';
import {
  ComponentSize,
  labelColumnWidth,
  numericTrackWidth,
  unitTrackWidth,
  controlGap,
  getGridTemplateColumns,
  getCombinedControlWidth,
  commonRowInlineStyles,
} from './layoutTokens';

export interface FormLayoutSpec {
  size: ComponentSize;
  labelWidth: number;
  numericWidth: number;
  unitWidth: number;
  gap: number;
  gridTemplateColumns: string;
  combinedControlWidth: number;
  rowInlineStyles: React.CSSProperties;
}

const makeSpec = (size: ComponentSize): FormLayoutSpec => ({
  size,
  labelWidth: labelColumnWidth[size],
  numericWidth: numericTrackWidth[size],
  unitWidth: unitTrackWidth[size],
  gap: controlGap,
  gridTemplateColumns: getGridTemplateColumns(size),
  combinedControlWidth: getCombinedControlWidth(size),
  rowInlineStyles: commonRowInlineStyles(size),
});

const FormLayoutContext = React.createContext<FormLayoutSpec | undefined>(undefined);

export const FormLayoutProvider: React.FC<{ size?: ComponentSize; children: React.ReactNode }> = ({
  size = 'medium',
  children,
}) => {
  const spec = React.useMemo(() => makeSpec(size), [size]);
  return <FormLayoutContext.Provider value={spec}>{children}</FormLayoutContext.Provider>;
};

export const useFormLayout = (): FormLayoutSpec => {
  const ctx = React.useContext(FormLayoutContext);
  if (!ctx) {
    // Default to medium if provider is missing
    return makeSpec('medium');
  }
  return ctx;
};


