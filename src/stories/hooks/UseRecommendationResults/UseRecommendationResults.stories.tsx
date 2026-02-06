import type { Meta, StoryObj } from '@storybook/react';
import UseRecommendationResultsExample from './UseRecommendationResultsExample';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../constants';

const meta = {
  title: 'Hooks/UseRecommendationResults',
  component: UseRecommendationResultsExample,
  parameters: {
    layout: 'centered',
    docs: {
      controls: {
        sort: 'requiredFirst',
      },
    },
  },
} satisfies Meta<typeof UseRecommendationResultsExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    podId: DEMO_POD_ID,
  },
};
