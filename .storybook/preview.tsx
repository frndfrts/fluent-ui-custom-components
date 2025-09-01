import React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { FormLayoutProvider } from '../src/styles/FormLayoutContext';

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  parameters: {
    // Enhanced documentation
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
      toc: true,
      canvas: {
        sourceState: 'shown',
      },
    },
    
    // Performance and layout
    layout: 'centered',
    chromatic: { disableSnapshot: false },
  },
  
  decorators: [
    (Story) => (
      <FluentProvider theme={webLightTheme}>
        <FormLayoutProvider>
          <div style={{ padding: '20px', minHeight: '100vh' }}>
            <Story />
          </div>
        </FormLayoutProvider>
      </FluentProvider>
    ),
  ],
};

export default preview;
