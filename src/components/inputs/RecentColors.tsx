/**
 * RecentColors.tsx
 * Atomic component for displaying recent colors in a single row.
 * Compact layout with proper spacing and no excess white space.
 */
import * as React from 'react';
import { makeStyles, Tooltip } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacingVerticalS)',
    width: '240px',
  },
  label: {
    fontSize: 'var(--fontSizeBase300)',
    fontWeight: 'var(--fontWeightSemibold)',
    color: 'var(--colorNeutralForeground1)',
  },

  swatchContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: 'var(--spacingHorizontalS)',
    height: '32px', // Fixed height for single row
    width: '100%',
    maxWidth: '240px', // Match fixed width
  },
  colorSwatch: {
    width: '20px',
    height: '20px',
    borderRadius: 'var(--borderRadiusSmall)',
    border: `1px solid var(--colorNeutralStroke2)`,
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in-out',
    flexShrink: 0, // Prevent shrinking
    '&:hover': {
      transform: 'scale(1.1)',
      border: '1px solid var(--colorNeutralStroke1)',
    },
    '&:focus': {
      outline: '2px solid var(--colorNeutralStroke1)',
      outlineOffset: '2px',
    },
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--colorNeutralForeground3)',
    fontSize: 'var(--fontSizeBase200)',
    fontStyle: 'italic',
    gridColumn: '1 / -1', // Span all columns
  },
});

export interface RecentColorsProps {
  colors: string[];
  onColorSelect: (color: string) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  label?: string;
  maxColors?: number; // Maximum number of colors to display
  showTooltips?: boolean;
}

export const RecentColors = React.memo<RecentColorsProps>(({
  colors,
  onColorSelect,
  size = 'medium',
  disabled = false,
  label = 'Recent Colors',
  maxColors = 8,
  showTooltips = true,
}) => {
  const styles = useStyles();

  const handleColorClick = React.useCallback((color: string) => {
    if (!disabled) {
      onColorSelect(color);
    }
  }, [onColorSelect, disabled]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent, color: string) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onColorSelect(color);
    }
  }, [onColorSelect, disabled]);

  // Limit colors to maxColors
  const displayColors = React.useMemo(() => 
    colors.slice(0, maxColors), [colors, maxColors]
  );

  return (
    <div className={styles.container}>
      {label && displayColors.length > 0 && (
        <div className={styles.label}>
          {label}
        </div>
      )}
      <div className={styles.swatchContainer}>
        {displayColors.map((color, index) => {
          const swatch = (
            <div
              className={styles.colorSwatch}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
              onKeyDown={(e) => handleKeyDown(e, color)}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`Select recent color ${color}`}
              title={color}
            />
          );

          return showTooltips ? (
            <Tooltip 
              key={`${color}-${index}`}
              content={color.toUpperCase()}
              relationship="label"
            >
              {swatch}
            </Tooltip>
          ) : (
            <React.Fragment key={`${color}-${index}`}>
              {swatch}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});

RecentColors.displayName = 'RecentColors';