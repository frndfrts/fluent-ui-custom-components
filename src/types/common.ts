/**
 * common.ts
 * Common type definitions for consistent typing across the application.
 */
import { Unit } from '../hooks/useUnitConversion';

export type ComponentSize = 'small' | 'medium' | 'large';

export interface BaseComponentProps {
  size?: ComponentSize;
  disabled?: boolean;
  className?: string;
}

export interface InputComponentProps extends BaseComponentProps {
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

export interface SelectorComponentProps extends BaseComponentProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  customOptionText?: string;
  showCustomOption?: boolean;
  sortAlphabetically?: boolean;
}

export interface DimensionComponentProps extends BaseComponentProps {
  value: number | '';
  unit: string;
  units: string[];
  onChange: (value: number | '', unit: string) => void;
}

export interface SizeFieldsData {
  width: number;
  height: number;
  widthUnit?: string;
  heightUnit?: string;
}

export interface PositionFieldsData {
  position: string;
  x: number;
  y: number;
  xUnit?: string;
  yUnit?: string;
}

export interface MarginsData {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topUnit?: string;
  rightUnit?: string;
  bottomUnit?: string;
  leftUnit?: string;
}

export interface PaddingData {
  top: number;
  right: number;
  bottom: number;
  left: number;
  topUnit?: string;
  rightUnit?: string;
  bottomUnit?: string;
  leftUnit?: string;
}

export interface PaperSizeData {
  width: number;
  height: number;
  widthUnit: string;
  heightUnit: string;
  orientation: string;
  paperSize: string;
}

// Validation types
export interface ValidationOptions {
  min?: number;
  max?: number;
  nonNegative?: boolean;
  allowEmpty?: boolean;
  allowNegative?: boolean;
  allowDecimal?: boolean;
  minValue?: number;
  maxValue?: number;
  maxDecimalPlaces?: number;
}

export interface ValidationResult {
  isValid: boolean;
  value: number | string | null;
  error: string | null;
}

export interface HexValidationOptions {
  requireHash?: boolean;
  maxLength?: number;
}

// Event handler types
export type ChangeHandler<T> = (value: T) => void;
export type UnitChangeHandler = (value: number | '', unit: string) => void;
export type SizeChangeHandler = (fields: SizeFieldsData) => void;
export type PositionChangeHandler = (fields: PositionFieldsData) => void;
export type MarginsChangeHandler = (margins: MarginsData) => void;
export type PaddingChangeHandler = (padding: PaddingData) => void;
export type PaperSizeChangeHandler = (paperSize: PaperSizeData) => void; 