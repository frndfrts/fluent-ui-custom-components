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
import { ColorSelector } from './ColorSelector';
import { ColorInput } from './ColorInput';
import { ColorHexInput } from './ColorHexInput';
import { RecentColors } from '../inputs/RecentColors';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  popoverSurface: {
    padding: '20px',
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
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
    width: '240px',
    height: '100%', // Fill the container height
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)',
    width: '240px',
    height: '100%', // Fill the container height
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
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  allowEmpty?: boolean;
  validateOnChange?: boolean;
  breakpoint?: number; // Screen width breakpoint for layout switching
  onError?: (error: Error) => void;
}

export const ResponsiveColorPicker = React.memo<ResponsiveColorPickerProps>(({
  value,
  onChange,
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
  const sizeConfig = useComponentSize(size, onError);

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
    width: sizeConfig.width,
    gap: sizeConfig.gap,
  }), [sizeConfig]);

  // Dynamic styles based on layout
  const popoverSurfaceClass = mergeClasses(
    styles.popoverSurface,
    isHorizontal ? styles.popoverSurfaceHorizontal : styles.popoverSurfaceVertical
  );
  const colorPickerContentClass = isHorizontal ? styles.colorPickerContentHorizontal : styles.colorPickerContentVertical;

  return (
    <div 
      className={`${styles.container} ${commonStyles.container} ${className || ''}`}
      style={containerStyles}
    >
      <Popover 
        open={isOpen} 
        onOpenChange={handlePopoverChange}
        positioning={{
          position: 'below',
          align: 'start',
          offset: { mainAxis: 4, crossAxis: 0 },
        }}
      >
        <PopoverTrigger>
          <div data-color-picker-trigger>
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
  );
});

ResponsiveColorPicker.displayName = 'ResponsiveColorPicker';