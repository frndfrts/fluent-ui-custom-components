/**
 * TabbedNavbar.tsx
 * 
 * A composition component that provides a complete tabbed navigation bar with menu support.
 * 
 * @description
 * This component provides a comprehensive navigation bar with the following features:
 * - TabList with multiple tabs
 * - Dropdown menus for specific tabs
 * - Customizable styling and layout
 * - Error handling and accessibility
 * - Responsive design support
 * - Proper focus management
 * 
 * @example
 * ```tsx
 * <TabbedNavbar
 *   selectedTab="file"
 *   onTabSelect={handleTabSelect}
 *   tabs={[
 *     {
 *       value: "file",
 *       label: "File",
 *       type: "menu",
 *       menuItems: [
 *         { key: "new", label: "New", onClick: handleNew },
 *         { key: "open", label: "Open", onClick: handleOpen }
 *       ]
 *     },
 *     {
 *       value: "edit",
 *       label: "Edit",
 *       type: "menu",
 *       menuItems: [
 *         { key: "undo", label: "Undo", onClick: handleUndo },
 *         { key: "redo", label: "Redo", onClick: handleRedo }
 *       ]
 *     },
 *     { value: "paper", label: "Paper", type: "simple" },
 *     { value: "notes", label: "Notes", type: "simple" }
 *   ]}
 * />
 * ```
 * 
 * @since 1.0.0
 * @author Fluent UI Custom Components Team
 */
import * as React from 'react';
import {
  TabList,
  Tab,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from '@fluentui/react-components';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { ErrorBoundary } from '../error/ErrorBoundary';

const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding('8px', '16px'),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: '48px',
    ...shorthands.gap('8px'),
  },
  tabList: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('4px'),
  },
});

export interface MenuItemData {
  key: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabData {
  value: string;
  label: string;
  type: 'simple' | 'menu';
  menuItems?: MenuItemData[];
  disabled?: boolean;
}

export interface TabbedNavbarProps {
  selectedTab: string;
  onTabSelect: (value: string) => void;
  tabs: TabData[];
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  className?: string;
}

// Custom error fallback for TabbedNavbar
const TabbedNavbarErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const styles = useStyles();
  
  return (
    <div className={styles.navbar}>
      <div style={{
        padding: tokens.spacingVerticalM,
        color: tokens.colorPaletteRedForeground1,
        textAlign: 'center',
        width: '100%'
      }}>
        <div style={{ marginBottom: tokens.spacingVerticalS }}>
          Failed to load navigation
        </div>
        <div style={{ 
          fontSize: tokens.fontSizeBase200, 
          color: tokens.colorPaletteRedForeground2,
          marginBottom: tokens.spacingVerticalM 
        }}>
          {error.message}
        </div>
        <button 
          onClick={resetError}
          style={{
            padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
            backgroundColor: tokens.colorPaletteRedBackground1,
            border: `1px solid ${tokens.colorPaletteRedBorder1}`,
            borderRadius: tokens.borderRadiusMedium,
            color: tokens.colorPaletteRedForeground1,
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export const TabbedNavbar: React.FC<TabbedNavbarProps> = React.memo(({
  selectedTab,
  onTabSelect,
  tabs,
  size = 'medium',
  disabled = false,
  onError,
  className,
}) => {
  const styles = useStyles();

  const handleTabSelect = React.useCallback((event: any, data: any) => {
    try {
      const selectedValue = String(data.value);
      onTabSelect(selectedValue);
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, [onTabSelect, onError]);

  const renderTab = React.useCallback((tab: TabData) => {
    if (tab.type === 'menu' && tab.menuItems) {
      return (
        <Menu key={tab.value}>
          <MenuTrigger>
            <Tab 
              value={tab.value} 
              disabled={disabled || tab.disabled}
            >
              {tab.label}
            </Tab>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {tab.menuItems.map((item) => (
                <MenuItem
                  key={item.key}
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      );
    } else {
      return (
        <Tab
          key={tab.value}
          value={tab.value}
          disabled={disabled || tab.disabled}
        >
          {tab.label}
        </Tab>
      );
    }
  }, [disabled]);

  return (
    <ErrorBoundary
      fallback={TabbedNavbarErrorFallback}
      onError={onError}
    >
      <div className={`${styles.navbar} ${className || ''}`}>
        <TabList
          selectedValue={selectedTab}
          onTabSelect={handleTabSelect}
          className={styles.tabList}
        >
          {tabs.map(renderTab)}
        </TabList>
      </div>
    </ErrorBoundary>
  );
});

TabbedNavbar.displayName = 'TabbedNavbar';
