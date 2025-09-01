/**
 * PreviewPanel.stories.tsx
 * 
 * Storybook stories for the PreviewPanel component.
 */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PreviewPanel } from './PreviewPanel';

const meta: Meta<typeof PreviewPanel> = {
  title: '02-Panels/PreviewPanel',
  component: PreviewPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A panel component that provides a preview container with header and content area.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed in the header',
    },
    children: {
      control: 'text',
      description: 'Content to display in the preview area',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the preview panel',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the preview panel is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Document Preview',
    children: (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#666'
      }}>
        <h3>Preview Content</h3>
        <p>This is a sample preview of your document content.</p>
        <div style={{
          width: '200px',
          height: '150px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          margin: '20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Document Preview Area
        </div>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    title: 'Image Preview',
    children: (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center'
      }}>
        <div style={{
          width: '300px',
          height: '200px',
          backgroundColor: '#e0e0e0',
          border: '2px dashed #999',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          color: '#666'
        }}>
          📷 Image Preview
        </div>
      </div>
    ),
  },
};

export const WithForm: Story = {
  args: {
    title: 'Form Preview',
    children: (
      <div style={{ 
        padding: '20px'
      }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>
            Name:
            <input type="text" placeholder="Enter name" style={{ marginLeft: '10px', padding: '5px' }} />
          </label>
          <label>
            Email:
            <input type="email" placeholder="Enter email" style={{ marginLeft: '10px', padding: '5px' }} />
          </label>
          <button type="submit" style={{ marginTop: '10px', padding: '8px' }}>
            Submit
          </button>
        </form>
      </div>
    ),
  },
};

export const WithTable: Story = {
  args: {
    title: 'Table Preview',
    children: (
      <div style={{ 
        padding: '20px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Age</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>John Doe</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>30</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>New York</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Jane Smith</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>25</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Los Angeles</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
};

export const Empty: Story = {
  args: {
    title: 'Empty Preview',
    children: (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        color: '#999'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
        <p>No content to preview</p>
        <p style={{ fontSize: '12px' }}>Add some content to see it here</p>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Preview',
    disabled: true,
    children: (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#999'
      }}>
        <p>Preview is currently disabled</p>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    title: 'Small Preview',
    size: 'small',
    children: (
      <div style={{ 
        padding: '10px', 
        textAlign: 'center',
        fontSize: '12px'
      }}>
        <p>Small preview content</p>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    title: 'Large Preview',
    size: 'large',
    children: (
      <div style={{ 
        padding: '30px', 
        textAlign: 'center',
        fontSize: '16px'
      }}>
        <h2>Large Preview Content</h2>
        <p>This is a larger preview area with more content.</p>
        <div style={{
          width: '400px',
          height: '300px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          margin: '20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Large Preview Area
        </div>
      </div>
    ),
  },
};
