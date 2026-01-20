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
      storySort: (a, b) => {
        // Define top-level category order
        const categoryOrder = ['General', 'Components', 'Hooks'];
        const aCategory = a.title.split('/')[0];
        const bCategory = b.title.split('/')[0];

        const aCategoryIndex = categoryOrder.indexOf(aCategory);
        const bCategoryIndex = categoryOrder.indexOf(bCategory);

        if (aCategoryIndex !== bCategoryIndex) {
          return aCategoryIndex - bCategoryIndex;
        }

        // Define docs page order within each group
        const docsOrder = [
          'Props',
          'Code Examples - Basic',
          'Code Examples - Render Props',
          'Code Examples - Component Overrides',
        ];

        const aName = a.name;
        const bName = b.name;

        const aDocsIndex = docsOrder.indexOf(aName);
        const bDocsIndex = docsOrder.indexOf(bName);

        if (aDocsIndex !== -1 && bDocsIndex !== -1) {
          return aDocsIndex - bDocsIndex;
        }

        if (aDocsIndex !== -1) return -1;
        if (bDocsIndex !== -1) return 1;

        // Default alphabetical for everything else
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      }
    },
  },
};

export default preview;
