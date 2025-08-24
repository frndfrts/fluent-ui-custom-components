/**
 * HorizontalColorPicker.tsx
 * Horizontal layout color picker component with side-by-side sections.
 * Standard colors on the left, custom color and buttons on the right.
 */
import * as React from 'react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverSurface, 
  makeStyles,
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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacingHorizontalS)',
  },
  popoverSurface: {
    padding: 'var(--spacingVerticalL)', // Increased padding for more comfort
    minWidth: '680px', // Increased width to accommodate wider components for equal proportions
    maxWidth: '680px', // Increased width to accommodate wider components for equal proportions
  },
  colorPickerContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two equal columns
    gap: 'var(--spacingHorizontalXL)', // Increased gap between sections
    alignItems: 'start',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalL)', // Increased gap between elements
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalL)', // Increased gap between elements
    justifyContent: 'space-between', // Push buttons to bottom
    minHeight: 'fit-content',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalM)', // Increased gap within sections
  },
  sectionTitle: {
    fontSize: 'var(--fontSizeBase300)',
    fontWeight: '600',
    color: 'var(--colorNeutralForeground1)',
    marginBottom: 'var(--spacingVerticalS)', // Increased margin
  },
  buttonRow: {
    display: 'flex',
    gap: 'var(--spacingHorizontalM)', // Increased gap between buttons
    justifyContent: 'center', // Center the buttons
    marginTop: 'auto', // Push to bottom
    paddingTop: 'var(--spacingVerticalL)', // Add top padding
  },
  customDivider: {
    width: '100%',
    maxWidth: '320px', // Updated to match ColorSelector and RecentColors maxWidth
    alignSelf: 'center', // Center the divider
  },
  recentColors: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)', // Keep original 8 columns
    gap: 'var(--spacingHorizontalS)', // Increased gap
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

export interface HorizontalColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  allowEmpty?: boolean;
  validateOnChange?: boolean;
  onError?: (error: Error) => void;
}

export const HorizontalColorPicker = React.memo<HorizontalColorPickerProps>(({
  value,
  onChange,
  size = 'medium',
  disabled = false,
  className,
  placeholder = '#000000',
  allowEmpty = false,
  validateOnChange = true,
  onError,
}) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const sizeConfig = useComponentSize(size, onError);

  // State for color picker
  const [isOpen, setIsOpen] = React.useState(false);
  const [recentColors, setRecentColors] = React.useState<string[]>([]);
  const [previewColor, setPreviewColor] = React.useState<string>(''); // Color being previewed/adjusted

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
    // Don't commit yet - just preview in ColorInput
  }, [formatColorValue]);

  // Handle popover open/close
  const handlePopoverChange = React.useCallback((e: any, data: { open: boolean }) => {
    if (data.open) {
      // When opening, set preview color to current value
      setPreviewColor(value);
    } else {
      // When closing without commit, revert to original value
      setPreviewColor('');
    }
    setIsOpen(data.open);
  }, [value]);

  // Handle color change from ColorInput (preview only)
  const handleColorChange = React.useCallback((color: string) => {
    const formattedColor = formatColorValue(color);
    setPreviewColor(formattedColor);
    // Don't commit yet - just update preview
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
        <PopoverSurface className={styles.popoverSurface}>
          <div 
            className={styles.colorPickerContent}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Left Section: Standard Colors + Recent Colors */}
            <div className={styles.leftSection}>
              {/* Standard Colors - Using ColorSelector */}
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

              {/* Recent Colors */}
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
            </div>

            {/* Right Section: Custom Color + Action Buttons */}
            <div className={styles.rightSection}>
              {/* Custom Color - Using ColorInput */}
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
              <div className={styles.buttonRow}>
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
          </div>
        </PopoverSurface>
      </Popover>
    </div>
  );
});

HorizontalColorPicker.displayName = 'HorizontalColorPicker';