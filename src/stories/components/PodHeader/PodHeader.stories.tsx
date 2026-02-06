import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PodHeader from '../../../components/PodHeader';
import CioRecommendations from '../../../components/CioRecommendations/CioRecommendations';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../constants';
import './PodHeaderComponentOverrideExample.css';
import './PodHeaderRenderPropsExample.css';

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

export const RenderPropsPattern: Story = {
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

export const ComponentOverride: Story = {
  args: {
    podHeader: 'Unused argument since we define a custom render function',
  },
  render: () => (
    <CioRecommendations
      apiKey={DEMO_API_KEY}
      podId={DEMO_POD_ID}
      podSubheader='A custom PodHeader component via Component Overrides'
      componentOverrides={{
        podHeader: {
          reactNode: ({ podHeader, podSubheader }) => (
            <div className='component-override-header'>
              <div className='header-wrapper'>
                <span className='badge'>⭐</span>
                <div>
                  <h2 className='header'>{podHeader}</h2>
                  <p className='subheader'>{podSubheader}</p>
                </div>
              </div>
            </div>
          ),
        },
      }}
    />
  ),
};
