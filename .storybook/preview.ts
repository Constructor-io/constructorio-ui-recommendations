import type { Preview } from '@storybook/react'
import './storybook-styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Introduction', 'Quickstart'],
          'Components',
          [
            'CioRecommendations',
            ['Docs', 'Usage Patterns', ['Render Props', 'Component Overrides'], '*'],
            'PodHeader',
            ['Docs', 'Usage Patterns', ['Render Props', 'Component Overrides'], '*'],
          ],
          'Hooks',
          ['UseRecommendationResults', ['Docs', '*']],
          'Basic Concepts',
          ['Usage Patterns'],
          'Utils',
          ['Reference'],
        ],
      },
    },
  },
};

export default preview;
