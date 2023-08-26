import { withRouter } from 'storybook-addon-react-router-v6'

import '../src/styles/storybooks.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
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
