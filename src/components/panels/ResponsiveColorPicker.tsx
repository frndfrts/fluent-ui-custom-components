/**
 * ResponsiveColorPicker.tsx
 * Responsive color picker component that adapts layout based on screen size and available space.
 * Automatically switches between vertical and horizontal layouts with proper viewport positioning.
 */
import * as React from 'react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverSurface, 
  makeStyles,
  mergeClasses,
  Text,
  Divider,
  Button,
} from '@fluentui/react-components';

import { useCommonStyles } from '../../styles/commonStyles';
import { useComponentSize } from '../../hooks/useComponentSize';
import { ColorSelector } from '../compositions/ColorSelector';
import { ColorInput } from '../compositions/ColorInput';
import { ColorHexInput } from '../compositions/ColorHexInput';
import { RecentColors } from '../inputs/RecentColors';
import { ErrorBoundary } from '../error/ErrorBoundary';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
    width: '100%',
  },
  label: {
    fontSize: 'var(--fontSizeBase300)',
    fontWeight: 'var(--fontWeightSemibold)',
    color: 'var(--colorNeutralForeground1)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    textAlign: 'right',
    minWidth: '120px', // Ensure consistent label width for alignment
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  colorPickerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
    flexGrow: 1,
    minWidth: '0', // Allow container to shrink
  },
  popoverSurface: {
    padding: '20px',
    maxWidth: '100vw',
    maxHeight: '100vh',
    overflow: 'hidden',
  },
  popoverSurfaceVertical: {
    minWidth: '240px',
    maxWidth: '280px',
  },
  popoverSurfaceHorizontal: {
    minWidth: '520px',
    maxWidth: '560px',
  },
  colorPickerContentVertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalL)',
  },
  colorPickerContentHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    gap: 'var(--spacingHorizontalL)',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    height: '336px', // Increased by 16px to account for padding when RecentColors is shown
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
    width: '240px',
    height: '100%', // Fill the container height
    flexShrink: 0,
    overflow: 'hidden',
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
    width: '240px',
    height: '100%', // Fill the container height
    flexShrink: 0,
    overflow: 'hidden',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
  },
  sectionTitle: {
    fontSize: 'var(--fontSizeBase300)',
    fontWeight: 'var(--fontWeightSemibold)',
    color: 'var(--colorNeutralForeground1)',
  },
  buttonRow: {
    display: 'flex',
    gap: 'var(--spacingHorizontalM)',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
  buttonRowVertical: {
    display: 'flex',
    gap: 'var(--spacingHorizontalM)',
    justifyContent: 'center',
    marginTop: 'var(--spacingVerticalL)',
    paddingTop: 'var(--spacingVerticalM)',
  },
  customDivider: {
    width: '100%',
  },
  recentColors: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: 'var(--spacingHorizontalS)',
    aspectRatio: '1', // Make container square
    width: '100%',
    maxWidth: '240px', // Match ColorSelector width
  },
  recentColorSwatch: {
    width: '20px',
    height: '20px',
    borderRadius: 'var(--borderRadiusSmall)',
    border: `1px solid var(--colorNeutralStroke2)`,
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in-out',
  },

});

export interface ResponsiveColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string; // Add label prop for color name
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  allowEmpty?: boolean;
  validateOnChange?: boolean;
  breakpoint?: number; // Screen width breakpoint for layout switching
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
}

// Custom error fallback for ResponsiveColorPicker
const ResponsiveColorPickerErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.container}>
      <div style={{
        padding: 'var(--spacingVerticalM)',
        color: 'var(--colorPaletteRedForeground1)',
        textAlign: 'center',
        border: '1px solid var(--colorPaletteRedBorder1)',
        borderRadius: 'var(--borderRadiusMedium)',
        backgroundColor: 'var(--colorPaletteRedBackground1)',
        width: '100%'
      }}>
        <div style={{ marginBottom: 'var(--spacingVerticalS)' }}>
          Failed to load color picker
        </div>
        <div style={{ 
          fontSize: 'var(--fontSizeBase200)', 
          color: 'var(--colorPaletteRedForeground2)',
          marginBottom: 'var(--spacingVerticalM)' 
        }}>
          {error.message}
        </div>
        <button 
          onClick={resetError}
          style={{
            padding: 'var(--spacingVerticalS) var(--spacingHorizontalM)',
            backgroundColor: 'var(--colorPaletteRedBackground2)',
            border: '1px solid var(--colorPaletteRedBorder2)',
            borderRadius: 'var(--borderRadiusMedium)',
            color: 'var(--colorPaletteRedForeground1)',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export const ResponsiveColorPicker = React.memo<ResponsiveColorPickerProps>(({
  value,
  onChange,
  label, // Add label to destructuring
  size = 'medium',
  disabled = false,
  className,
  placeholder = '#000000',
  allowEmpty = false,
  validateOnChange = true,
  breakpoint = 768, // Default breakpoint for mobile/desktop
  onError,
}) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const sizeConfig = useComponentSize();

  // State for color picker
  const [isOpen, setIsOpen] = React.useState(false);
  const [recentColors, setRecentColors] = React.useState<string[]>([]);
  const [previewColor, setPreviewColor] = React.useState<string>('');
  const [isHorizontal, setIsHorizontal] = React.useState(false);

  // Determine layout based on screen size
  React.useEffect(() => {
    const updateLayout = () => {
      const shouldUseHorizontal = window.innerWidth >= breakpoint;
      setIsHorizontal(shouldUseHorizontal);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, [breakpoint]);

  // Format color value (ensure # prefix)
  const formatColorValue = React.useCallback((color: string): string => {
    if (color === '') return '';
    if (color.startsWith('#')) return color.toUpperCase();
    return `#${color.toUpperCase()}`;
  }, []);

  // Add color to recent colors
  const addToRecentColors = React.useCallback((color: string) => {
    if (color && color !== '') {
      setRecentColors(prev => {
        const filtered = prev.filter(c => c !== color);
        return [color, ...filtered.slice(0, 7)]; // Keep max 8 recent colors
      });
    }
  }, []);

  // Handle color selection from ColorSelector (preview only)
  const handleColorSelect = React.useCallback((color: string) => {
    const formattedColor = formatColorValue(color);
    setPreviewColor(formattedColor);
  }, [formatColorValue]);

  // Handle popover open/close
  const handlePopoverChange = React.useCallback((e: any, data: { open: boolean }) => {
    if (data.open) {
      setPreviewColor(value);
    } else {
      setPreviewColor('');
    }
    setIsOpen(data.open);
  }, [value]);

  // Handle color change from ColorInput (preview only)
  const handleColorChange = React.useCallback((color: string) => {
    const formattedColor = formatColorValue(color);
    setPreviewColor(formattedColor);
  }, [formatColorValue]);

  // Commit the current preview color
  const handleCommitColor = React.useCallback(() => {
    if (previewColor && previewColor !== '') {
      onChange(previewColor);
      addToRecentColors(previewColor);
    }
    setIsOpen(false);
  }, [previewColor, onChange, addToRecentColors]);

  // Handle keyboard events
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommitColor();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  }, [handleCommitColor]);

  // Container styles
  const containerStyles = React.useMemo(() => ({
    width: sizeConfig.getSizeValue(size),
    gap: sizeConfig.getSizeValue(size),
  }), [sizeConfig, size]);

  // Dynamic styles based on layout
  const popoverSurfaceClass = mergeClasses(
    styles.popoverSurface,
    isHorizontal ? styles.popoverSurfaceHorizontal : styles.popoverSurfaceVertical
  );
  const colorPickerContentClass = isHorizontal ? styles.colorPickerContentHorizontal : styles.colorPickerContentVertical;

  const handleError = React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    onError?.(error, errorInfo);
  }, [onError]);

  return (
    <ErrorBoundary 
      fallback={ResponsiveColorPickerErrorFallback}
      onError={handleError}
      resetOnPropsChange={true}
    >
      <div 
        className={`${styles.container} ${commonStyles.container} ${className || ''}`}
        style={containerStyles}
      >
        <div className={styles.labelContainer}>
          {label && (
            <span className={styles.label}>{label}:</span>
          )}
          <div className={styles.colorPickerContainer}>
            <Popover 
              open={isOpen} 
              onOpenChange={handlePopoverChange}
              positioning={{
                position: 'below',
                align: 'start',
                offset: { mainAxis: 8, crossAxis: 0 },
                coverTarget: false,
                fallbackPositions: ['below', 'above', 'before', 'after'],
              }}
            >
              <PopoverTrigger>
                <div style={{ display: 'inline-block', width: 'fit-content' }}>
                  <ColorHexInput
                    value={value}
                    onChange={onChange}
                    length={6}
                    size={size}
                    disabled={disabled}
                    placeholder={placeholder}
                    swatchClickable={true}
                    onSwatchClick={() => !disabled && setIsOpen(true)}
                  />
                </div>
              </PopoverTrigger>
              <PopoverSurface className={popoverSurfaceClass}>
                <div 
                  className={colorPickerContentClass}
                  onKeyDown={handleKeyDown}
                  tabIndex={-1}
                >
                  {isHorizontal ? (
                    // Horizontal layout
                    <div className={styles.colorPickerContentHorizontal}>
                      {/* Left Section: Standard Colors + Recent Colors */}
                      <div className={styles.leftSection} style={{ position: 'relative', height: '100%' }}>
                        {/* Standard Colors */}
                        <div className={styles.section}>
                          <Text className={styles.sectionTitle}>Standard Colors</Text>
                          <ColorSelector
                            value={previewColor || value}
                            onChange={handleColorSelect}
                            disabled={disabled}
                            columns={8}
                            showTooltips={true}
                          />
                        </div>

                        {/* Recent Colors area always present for spacing */}
                        <div className={styles.section} style={{ minHeight: 56 }}>
                          {recentColors.length > 0 ? (
                            <RecentColors
                              colors={recentColors}
                              onColorSelect={handleColorSelect}
                              size="medium"
                              disabled={disabled}
                              label="Recent Colors"
                              maxColors={8}
                              showTooltips={true}
                            />
                          ) : (
                            // Reserve space for swatch row, no label
                            <div style={{ height: 32 }} />
                          )}
                        </div>
                      </div>

                      {/* Right Section: Custom Color */}
                      <div className={styles.rightSection}>
                        {/* Custom Color */}
                        <div className={styles.section}>
                          <Text className={styles.sectionTitle}>Custom Color</Text>
                          <ColorInput
                            value={previewColor || value}
                            onChange={handleColorChange}
                            size="medium"
                            disabled={disabled}
                            onError={onError}
                          />
                        </div>
                      </div>

                      {/* Action Buttons - Aligned to right of entire popover */}
                      <div className={styles.buttonRow} style={{ right: 0, bottom: 0 }}>
                        <Button 
                          appearance="subtle" 
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          appearance="primary" 
                          onClick={handleCommitColor}
                          disabled={!previewColor || previewColor === ''}
                        >
                          OK
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Vertical layout
                    <>
                      {/* Standard Colors */}
                      <div className={styles.section}>
                        <Text className={styles.sectionTitle}>Standard Colors</Text>
                        <ColorSelector
                          value={previewColor || value}
                          onChange={handleColorSelect}
                          disabled={disabled}
                          columns={8}
                          showTooltips={true}
                        />
                      </div>

                      <Divider className={styles.customDivider} />

                      {/* Recent Colors - Only shown when colors exist */}
                      {recentColors.length > 0 && (
                        <div className={styles.section}>
                          <RecentColors
                            colors={recentColors}
                            onColorSelect={handleColorSelect}
                            size="medium"
                            disabled={disabled}
                            label="Recent Colors"
                            maxColors={8}
                            showTooltips={true}
                          />
                        </div>
                      )}

                      <Divider className={styles.customDivider} />

                      {/* Custom Color */}
                      <div className={styles.section}>
                        <Text className={styles.sectionTitle}>Custom Color</Text>
                        <ColorInput
                          value={previewColor || value}
                          onChange={handleColorChange}
                          size="medium"
                          disabled={disabled}
                          onError={onError}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className={styles.buttonRowVertical}>
                        <Button 
                          appearance="subtle" 
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          appearance="primary" 
                          onClick={handleCommitColor}
                          disabled={!previewColor || previewColor === ''}
                        >
                          OK
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </PopoverSurface>
            </Popover>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
});

ResponsiveColorPicker.displayName = 'ResponsiveColorPicker';