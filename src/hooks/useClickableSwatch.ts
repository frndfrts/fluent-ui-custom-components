/**
 * useClickableSwatch.ts
 * Custom hook for managing clickable swatch functionality in color components.
 * Follows Fluent UI v9 patterns and existing codebase conventions.
 */
import { useCallback, useMemo } from 'react';

export interface UseClickableSwatchOptions {
  enabled?: boolean;
  disabled?: boolean;
  onSwatchClick?: () => void;
}

export interface UseClickableSwatchReturn {
  isClickable: boolean;
  swatchProps: {
    role: 'button' | 'img';
    tabIndex: number | undefined;
    onClick: ((e: React.MouseEvent) => void) | undefined;
    onKeyDown: ((e: React.KeyboardEvent) => void) | undefined;
    ariaLabel: string;
    className: string;
  };
  containerProps: {
    style: React.CSSProperties;
  };
}

export const useClickableSwatch = (
  options: UseClickableSwatchOptions = {}
): UseClickableSwatchReturn => {
  const { enabled = false, disabled = false, onSwatchClick } = options;

  const isClickable = useMemo(() => {
    return enabled && !disabled && !!onSwatchClick;
  }, [enabled, disabled, onSwatchClick]);

  const handleSwatchClick = useCallback((e: React.MouseEvent) => {
    if (isClickable && onSwatchClick) {
      e.preventDefault();
      e.stopPropagation();
      onSwatchClick();
    }
  }, [isClickable, onSwatchClick]);

  const handleSwatchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isClickable && onSwatchClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      e.stopPropagation();
      onSwatchClick();
    }
  }, [isClickable, onSwatchClick]);

  const swatchProps = useMemo(() => ({
    role: isClickable ? 'button' as const : 'img' as const,
    tabIndex: isClickable ? 0 : undefined,
    onClick: isClickable ? handleSwatchClick : undefined,
    onKeyDown: isClickable ? handleSwatchKeyDown : undefined,
    ariaLabel: isClickable ? 'Click to open color picker' : 'Color preview',
    className: isClickable ? 'clickable-swatch' : '',
  }), [isClickable, handleSwatchClick, handleSwatchKeyDown]);

  const containerProps = useMemo(() => ({
    style: {} as React.CSSProperties,
  }), []);

  return {
    isClickable,
    swatchProps,
    containerProps,
  };
};