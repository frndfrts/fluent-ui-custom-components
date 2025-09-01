import * as React from 'react'
import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Card,
  CardHeader,
  tokens,
} from '@fluentui/react-components'

// Styles used by components here mirror the current app without altering it
const useCommonStyles = makeStyles({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding('8px', '16px'),
    ...shorthands.borderBottom('1px', 'solid', '#e0e0e0'),
    backgroundColor: 'white',
    minHeight: '48px',
    ...shorthands.gap('8px'),
  },
  previewCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  previewContent: {
    position: 'relative',
    flexGrow: 1,
    ...shorthands.overflow('hidden'),
    backgroundColor: '#f0f0f0',
  },
})

export type NavbarProps = {
  selectedTab: string
  onSelect: (value: string) => void
  onUndo?: () => void
  onRedo?: () => void
  onToggleRulers?: () => void
  onZoomOut?: () => void
  onZoomIn?: () => void
  onZoomReset?: () => void
}

export const EditorNavbar: React.FC<NavbarProps> = ({
  selectedTab,
  onSelect,
  onUndo,
  onRedo,
  onToggleRulers,
  onZoomOut,
  onZoomIn,
  onZoomReset,
}) => {
  const styles = useCommonStyles()
  return (
    <div className={styles.navbar}>
      <TabList selectedValue={selectedTab} onTabSelect={(_, d) => onSelect(String(d.value))}>
        <Menu>
          <MenuTrigger>
            <Tab value="file">File</Tab>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
              <MenuItem>Save</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger>
            <Tab value="edit">Edit</Tab>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={onUndo}>Undo</MenuItem>
              <MenuItem onClick={onRedo}>Redo</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger>
            <Tab value="view">View</Tab>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={onToggleRulers}>Toggle Rulers</MenuItem>
              <MenuItem onClick={onZoomOut}>Zoom Out</MenuItem>
              <MenuItem onClick={onZoomIn}>Zoom In</MenuItem>
              <MenuItem onClick={onZoomReset}>Reset Zoom</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Tab value="paper">Paper</Tab>
        <Tab value="notes">Notes</Tab>
        <Tab value="slides">Slides</Tab>
      </TabList>
    </div>
  )
}

export type PreviewPaneProps = {
  title?: string
  children?: React.ReactNode
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ title = 'Preview', children }) => {
  const styles = useCommonStyles()
  return (
    <Card className={styles.previewCard}>
      <CardHeader
        header={title}
        style={{
          fontSize: tokens.fontSizeBase400,
          fontWeight: tokens.fontWeightSemibold,
          color: tokens.colorNeutralForeground1,
          paddingBottom: tokens.spacingVerticalS,
          borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
          marginBottom: tokens.spacingVerticalM,
        }}
      />
      <div className={styles.previewContent}>{children}</div>
    </Card>
  )
}

export { tokens }


