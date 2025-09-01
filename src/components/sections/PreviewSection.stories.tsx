/**
 * PreviewSection.stories.tsx
 * 
 * Storybook stories for the PreviewSection component.
 */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PreviewSection } from './PreviewSection';

const meta: Meta<typeof PreviewSection> = {
  title: '01-Sections/PreviewSection',
  component: PreviewSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A section component that provides a preview area for content display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    previewTitle: {
      control: 'text',
      description: 'Title for the preview panel',
    },
    children: {
      control: 'text',
      description: 'Content to display in the preview area',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the section',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the section is disabled',
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
    previewTitle: 'Document Preview',
    children: (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#666'
      }}>
        <h3>Document Preview</h3>
        <p>This is a sample preview of your document content.</p>
        <div style={{
          width: '300px',
          height: '200px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          margin: '20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Document Content Area
        </div>
      </div>
    ),
  },
};

export const WithEditorContent: Story = {
  args: {
    previewTitle: 'Editor Preview',
    children: (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center'
      }}>
        <h3>Editor Interface</h3>
        <p>This preview shows the editor interface with various tools.</p>
        <div style={{
          width: '400px',
          height: '300px',
          backgroundColor: '#f8f8f8',
          border: '2px solid #ddd',
          margin: '20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div>📝 Editor Canvas</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Content preview area
          </div>
        </div>
      </div>
    ),
  },
};

export const WithImageGallery: Story = {
  args: {
    previewTitle: 'Image Gallery',
    children: (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center'
      }}>
        <h3>Image Gallery View</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: `hsl(${i * 60}, 70%, 80%)`,
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}
            >
              Image {i}
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export const WithDataTable: Story = {
  args: {
    previewTitle: 'Data Table',
    children: (
      <div style={{ 
        padding: '20px'
      }}>
        <h3>Data Table View</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>001</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Project Alpha</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Active</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>2024-01-15</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>002</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Project Beta</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Pending</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>2024-01-20</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>003</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Project Gamma</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Completed</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>2024-01-25</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    previewTitle: 'Disabled Preview',
    disabled: true,
    children: (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#999'
      }}>
        <p>Preview section is currently disabled</p>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    previewTitle: 'Small Preview',
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
    previewTitle: 'Large Dashboard',
    size: 'large',
    children: (
      <div style={{ 
        padding: '30px', 
        textAlign: 'center',
        fontSize: '16px'
      }}>
        <h2>Dashboard Overview</h2>
        <p>This is a larger preview area with comprehensive dashboard content.</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          maxWidth: '600px',
          margin: '20px auto'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}>
            <h4>Widget 1</h4>
            <p>Chart or metric content</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}>
            <h4>Widget 2</h4>
            <p>Chart or metric content</p>
          </div>
        </div>
      </div>
    ),
  },
};
