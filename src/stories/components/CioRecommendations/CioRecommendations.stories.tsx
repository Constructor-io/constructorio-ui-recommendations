import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CioRecommendations from '../../../components/CioRecommendations';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../constants';
import './CioRecommendationsExamples.css';

const meta = {
  title: 'Components/CioRecommendations',
  component: CioRecommendations,
} satisfies Meta<typeof CioRecommendations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    podId: DEMO_POD_ID,
  },
};

export const WithSubheader: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    podId: DEMO_POD_ID,
    podSubheader: 'Curated selection of top-rated products',
  },
};

export const WithCustomParameters: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    podId: DEMO_POD_ID,
    parameters: {
      numResults: 5,
    },
  },
};

export const RenderPropsShowcase: Story = {
  args: {
    apiKey: DEMO_API_KEY,
    podId: DEMO_POD_ID,
    children: ({ items, podId }) => (
      <div className='render-props-showcase'>
        <div className='showcase-header'>
          <h2 className='showcase-title'>Featured Recommendations</h2>
          <p className='showcase-subtitle'>Personalized picks for you from {podId}</p>
        </div>
        <div className='showcase-grid'>
          {items.slice(0, 6).map((item) => (
            <div key={item.id} className='showcase-card'>
              <img src={item.imageUrl} alt={item.name} />
              <h3>{item.name}</h3>
              {item.price && <div className='price'>${item.price}</div>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
};
