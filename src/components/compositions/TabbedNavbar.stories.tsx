/**
 * TabbedNavbar.stories.tsx
 * 
 * Storybook stories for the TabbedNavbar composition component.
 */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TabbedNavbar } from './TabbedNavbar';

const meta: Meta<typeof TabbedNavbar> = {
  title: '03-Compositions/TabbedNavbar',
  component: TabbedNavbar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composition component that provides a complete tabbed navigation bar with menu support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectedTab: {
      control: 'text',
      description: 'Currently selected tab value',
    },
    onTabSelect: {
      action: 'tab selected',
      description: 'Callback when a tab is selected',
    },
    tabs: {
      control: 'object',
      description: 'Array of tab configurations',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the navbar',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the navbar is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const TabbedNavbarWithState: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('file');
  
  const tabs = [
    {
      value: 'file',
      label: 'File',
      type: 'menu' as const,
      menuItems: [
        { key: 'new', label: 'New', onClick: () => console.log('New clicked') },
        { key: 'open', label: 'Open', onClick: () => console.log('Open clicked') },
        { key: 'save', label: 'Save', onClick: () => console.log('Save clicked') },
      ],
    },
    {
      value: 'edit',
      label: 'Edit',
      type: 'menu' as const,
      menuItems: [
        { key: 'undo', label: 'Undo', onClick: () => console.log('Undo clicked') },
        { key: 'redo', label: 'Redo', onClick: () => console.log('Redo clicked') },
      ],
    },
    { value: 'paper', label: 'Paper', type: 'simple' as const },
    { value: 'notes', label: 'Notes', type: 'simple' as const },
    { value: 'slides', label: 'Slides', type: 'simple' as const },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <TabbedNavbar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        tabs={tabs}
      />
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Selected Tab: {selectedTab}</h3>
        <p>Click on different tabs to see the selection indicator move and the selected tab value update.</p>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <TabbedNavbarWithState />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing proper tab selection behavior. Click on different tabs to see the selection indicator move.',
      },
    },
  },
};

export const Default: Story = {
  args: {
    selectedTab: 'file',
    tabs: [
      {
        value: 'file',
        label: 'File',
        type: 'menu',
        menuItems: [
          { key: 'new', label: 'New', onClick: () => console.log('New clicked') },
          { key: 'open', label: 'Open', onClick: () => console.log('Open clicked') },
          { key: 'save', label: 'Save', onClick: () => console.log('Save clicked') },
        ],
      },
      {
        value: 'edit',
        label: 'Edit',
        type: 'menu',
        menuItems: [
          { key: 'undo', label: 'Undo', onClick: () => console.log('Undo clicked') },
          { key: 'redo', label: 'Redo', onClick: () => console.log('Redo clicked') },
        ],
      },
      { value: 'paper', label: 'Paper', type: 'simple' },
      { value: 'notes', label: 'Notes', type: 'simple' },
      { value: 'slides', label: 'Slides', type: 'simple' },
    ],
  },
};

export const WithViewMenu: Story = {
  args: {
    selectedTab: 'view',
    tabs: [
      {
        value: 'file',
        label: 'File',
        type: 'menu',
        menuItems: [
          { key: 'new', label: 'New', onClick: () => console.log('New clicked') },
          { key: 'open', label: 'Open', onClick: () => console.log('Open clicked') },
          { key: 'save', label: 'Save', onClick: () => console.log('Save clicked') },
        ],
      },
      {
        value: 'edit',
        label: 'Edit',
        type: 'menu',
        menuItems: [
          { key: 'undo', label: 'Undo', onClick: () => console.log('Undo clicked') },
          { key: 'redo', label: 'Redo', onClick: () => console.log('Redo clicked') },
        ],
      },
      {
        value: 'view',
        label: 'View',
        type: 'menu',
        menuItems: [
          { key: 'toggle-rulers', label: 'Toggle Rulers', onClick: () => console.log('Toggle Rulers clicked') },
          { key: 'zoom-out', label: 'Zoom Out', onClick: () => console.log('Zoom Out clicked') },
          { key: 'zoom-in', label: 'Zoom In', onClick: () => console.log('Zoom In clicked') },
          { key: 'reset-zoom', label: 'Reset Zoom', onClick: () => console.log('Reset Zoom clicked') },
        ],
      },
      { value: 'paper', label: 'Paper', type: 'simple' },
      { value: 'notes', label: 'Notes', type: 'simple' },
    ],
  },
};

export const SimpleTabs: Story = {
  args: {
    selectedTab: 'home',
    tabs: [
      { value: 'home', label: 'Home', type: 'simple' },
      { value: 'about', label: 'About', type: 'simple' },
      { value: 'contact', label: 'Contact', type: 'simple' },
      { value: 'settings', label: 'Settings', type: 'simple' },
    ],
  },
};

export const MixedTabs: Story = {
  args: {
    selectedTab: 'tools',
    tabs: [
      { value: 'home', label: 'Home', type: 'simple' },
      {
        value: 'tools',
        label: 'Tools',
        type: 'menu',
        menuItems: [
          { key: 'calculator', label: 'Calculator', onClick: () => console.log('Calculator clicked') },
          { key: 'converter', label: 'Converter', onClick: () => console.log('Converter clicked') },
          { key: 'analyzer', label: 'Analyzer', onClick: () => console.log('Analyzer clicked') },
        ],
      },
      { value: 'help', label: 'Help', type: 'simple' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    selectedTab: 'file',
    disabled: true,
    tabs: [
      {
        value: 'file',
        label: 'File',
        type: 'menu',
        menuItems: [
          { key: 'new', label: 'New', onClick: () => console.log('New clicked') },
          { key: 'open', label: 'Open', onClick: () => console.log('Open clicked') },
        ],
      },
      { value: 'edit', label: 'Edit', type: 'simple' },
    ],
  },
};

export const Small: Story = {
  args: {
    selectedTab: 'file',
    size: 'small',
    tabs: [
      {
        value: 'file',
        label: 'File',
        type: 'menu',
        menuItems: [
          { key: 'new', label: 'New', onClick: () => console.log('New clicked') },
          { key: 'save', label: 'Save', onClick: () => console.log('Save clicked') },
        ],
      },
      { value: 'edit', label: 'Edit', type: 'simple' },
    ],
  },
};

export const Large: Story = {
  args: {
    selectedTab: 'file',
    size: 'large',
    tabs: [
      {
        value: 'file',
        label: 'File',
        type: 'menu',
        menuItems: [
          { key: 'new', label: 'New Document', onClick: () => console.log('New Document clicked') },
          { key: 'open', label: 'Open Document', onClick: () => console.log('Open Document clicked') },
          { key: 'save', label: 'Save Document', onClick: () => console.log('Save Document clicked') },
          { key: 'export', label: 'Export Document', onClick: () => console.log('Export Document clicked') },
        ],
      },
      { value: 'edit', label: 'Edit', type: 'simple' },
      { value: 'view', label: 'View', type: 'simple' },
    ],
  },
};
