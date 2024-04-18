import type { Preview } from '@storybook/react';
import '@/styles/index.css';
import '@/styles/storybook.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    reactRouter: {},
    options: {}
  },
  decorators: [],
};

export default preview;
