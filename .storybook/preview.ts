import { withRouter } from 'storybook-addon-react-router-v6'
import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

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
  decorators: [withRouter()],
};

export default preview;
