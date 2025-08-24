import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { FormLayoutProvider } from '../src/styles/FormLayoutContext';

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <FluentProvider theme={webLightTheme}>
        <FormLayoutProvider>
          <Story />
        </FormLayoutProvider>
      </FluentProvider>
    ),
  ],
};

export default preview;
