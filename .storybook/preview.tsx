import React from 'react';
import type { Preview } from '@storybook/react';
import { Toaster } from 'sonner';
import '@/styles/index.css';
import '@/styles/storybook.css';

const withToaster = (Story, context) => {
  return (
    <>
      <Toaster />
      <Story {...context} />
    </>
  );
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    deepControls: { enabled: true },
    reactRouter: {},
    options: {
      storySort: {
        order: ["Introduction", "Installation", "Customization", "Modifying State", "External Shapes"]
      },
    }
  },
  decorators: [
    withToaster
  ],
};

export default preview;
