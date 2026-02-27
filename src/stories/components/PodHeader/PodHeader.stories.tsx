import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PodHeader } from '../../../components/PodHeader/PodHeader';
import CioRecommendations from '../../../components/CioRecommendations/CioRecommendations';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../constants';
import './PodHeaderRenderPropsExample.css';
import './PodHeaderFromCioRecommendationsExample.css';

const meta = {
  title: 'Components/PodHeader',
  component: PodHeader,
} satisfies Meta<typeof PodHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    podHeader: 'Recommended for You',
  },
};

export const WithSubheader: Story = {
  args: {
    podHeader: 'Trending Products',
    podSubheader: 'Popular items this week',
  },
};

export const RenderProps: Story = {
  args: {
    podHeader: 'Featured Collection',
    podSubheader: 'Hand-picked by our team',
    children: ({ podHeader, podSubheader }) => (
      <header className='render-props-showcase'>
        <div className='showcase-content'>
          <h2 className='showcase-title'>{podHeader}</h2>
          {podSubheader && <span className='showcase-subtitle'>{podSubheader}</span>}
        </div>
        <button className='view-all-btn' type='button'>
          View
        </button>
      </header>
    ),
  },
};

export const ComponentOverride: StoryObj<typeof CioRecommendations> = {
  render: () => (
    <CioRecommendations
      apiKey={DEMO_API_KEY}
      podId={DEMO_POD_ID}
      podSubheader='Curated picks for you'
      componentOverrides={{
        podHeader: {
          reactNode: ({ podHeader, podSubheader }) => (
            <div className='cio-override-header'>
              <span className='badge'>Featured</span>
              <div>
                <h2>{podHeader}</h2>
                {podSubheader && <p>{podSubheader}</p>}
              </div>
            </div>
          ),
        },
      }}
    />
  ),
};
