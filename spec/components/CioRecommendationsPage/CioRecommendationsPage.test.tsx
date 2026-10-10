import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CioRecommendationsPage from '../../../src/components/CioRecommendationsPage';
import { MISSING_PAGE_METHOD_MESSAGE } from '../../../src/hooks/useRecommendationPageResults';
import { DEMO_API_KEY } from '../../../src/constants';

jest.mock('@constructor-io/constructorio-ui-components', () => ({
  ...jest.requireActual('@constructor-io/constructorio-ui-components'),
  Carousel: ({ items }: any) => (
    <div data-testid='mock-carousel'>Carousel with {items?.length} items</div>
  ),
  RenderPropsWrapper: ({ children, props, override }: any) => {
    if (typeof override === 'function') {
      return override(props);
    }

    if (override) {
      return override;
    }

    return children;
  },
}));

const mockGetRecommendationPage = jest.fn();
const mockGetRecommendations = jest.fn();

jest.mock('@constructor-io/constructorio-client-javascript', () =>
  jest.fn().mockImplementation(() => ({
    recommendations: {
      getRecommendations: mockGetRecommendations,
      getRecommendationPage: mockGetRecommendationPage,
    },
  })),
);

const pageResultId = 'page-result-id';
const result = (id: string, podResultId: string) => ({
  value: `Product ${id}`,
  data: { id, url: `https://example.com/${id}`, image_url: `https://example.com/${id}.jpg` },
  matched_terms: [],
  is_slotted: false,
  result_id: podResultId,
});
const mockPageResponse = {
  request: { page_id: 'pdp_b2c', item_id: 'product-123' },
  response: {
    page_id: 'pdp_b2c',
    display_name: 'PDP - B2C',
    page_type: 'pdp',
    pods: [
      {
        pod_id: 'similar_items',
        request: { item_id: 'product-123', num_results: 12 },
        response: {
          results: [result('p1', 'similar-result-id'), result('p2', 'similar-result-id')],
          total_num_results: 2,
          pod: { id: 'similar_items', display_name: 'Similar Items' },
        },
        result_id: 'similar-result-id',
      },
      {
        pod_id: 'complete_the_look',
        request: { item_id: 'product-123', num_results: 8 },
        response: {
          results: [],
          total_num_results: 0,
          pod: { id: 'complete_the_look', display_name: 'Complete the Look' },
        },
        result_id: 'complete-result-id',
      },
    ],
  },
  result_id: pageResultId,
};

describe('CioRecommendationsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRecommendationPage.mockResolvedValue(mockPageResponse);
  });

  it('requests the page once with the supplied parameters and never calls the pod endpoint', async () => {
    const parameters = {
      itemIds: 'product-123',
      podOverrides: { similar_items: { numResults: 12 } },
    };

    render(
      <CioRecommendationsPage apiKey={DEMO_API_KEY} pageId='pdp_b2c' parameters={parameters} />,
    );

    await waitFor(() => {
      expect(screen.getByText('Similar Items')).toBeInTheDocument();
    });
    expect(mockGetRecommendationPage).toHaveBeenCalledTimes(1);
    expect(mockGetRecommendationPage).toHaveBeenCalledWith('pdp_b2c', parameters);
    expect(mockGetRecommendations).not.toHaveBeenCalled();
  });

  it("renders one tracking container per pod, in page order, with that pod's id and result_id", async () => {
    const { container } = render(<CioRecommendationsPage apiKey={DEMO_API_KEY} pageId='pdp_b2c' />);

    await waitFor(() => {
      expect(container.querySelectorAll('[data-cnstrc-recommendations]')).toHaveLength(2);
    });

    const [similarItems, completeTheLook] = Array.from(
      container.querySelectorAll('[data-cnstrc-recommendations]'),
    );

    expect(similarItems).toHaveAttribute('data-cnstrc-recommendations-pod-id', 'similar_items');
    expect(similarItems).toHaveAttribute('data-cnstrc-result-id', 'similar-result-id');
    expect(similarItems).toHaveAttribute('data-cnstrc-num-results', '2');
    expect(similarItems).toHaveAttribute('data-cnstrc-recommendations-seed-items', 'product-123');
    expect(completeTheLook).toHaveAttribute(
      'data-cnstrc-recommendations-pod-id',
      'complete_the_look',
    );
    expect(completeTheLook).toHaveAttribute('data-cnstrc-result-id', 'complete-result-id');
    expect(completeTheLook).toHaveAttribute('data-cnstrc-num-results', '0');
    expect(container.innerHTML).not.toContain(pageResultId);
  });

  it('falls back to pod_id when a pod response has no pod object', async () => {
    const podWithoutPodObject = {
      pod_id: 'fallback_pod',
      request: {},
      response: { results: [], total_num_results: 0 },
      result_id: 'fallback-result-id',
    };
    mockGetRecommendationPage.mockResolvedValue({
      ...mockPageResponse,
      response: { ...mockPageResponse.response, pods: [podWithoutPodObject] },
    });

    const { container } = render(<CioRecommendationsPage apiKey={DEMO_API_KEY} pageId='pdp_b2c' />);

    await waitFor(() => {
      expect(container.querySelector('[data-cnstrc-recommendations]')).toHaveAttribute(
        'data-cnstrc-recommendations-pod-id',
        'fallback_pod',
      );
    });
    expect(container.querySelector('[data-cnstrc-recommendations]')).toHaveAttribute(
      'data-cnstrc-result-id',
      'fallback-result-id',
    );
  });

  it('renders per-pod subheaders', async () => {
    render(
      <CioRecommendationsPage
        apiKey={DEMO_API_KEY}
        pageId='pdp_b2c'
        podSubheaders={{ complete_the_look: 'Pairs well with this' }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Pairs well with this')).toBeInTheDocument();
    });
  });

  it('renders the error state when the page request fails', async () => {
    mockGetRecommendationPage.mockRejectedValue(
      new Error('Recommendation page "pdp_b2c" was not found.'),
    );
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<CioRecommendationsPage apiKey={DEMO_API_KEY} pageId='pdp_b2c' />);

    await waitFor(() => {
      expect(container.querySelector('.cio-error')).toBeInTheDocument();
    });
    expect(consoleError).toHaveBeenCalledWith('Recommendation page "pdp_b2c" was not found.');
    consoleError.mockRestore();
  });

  it('renders the error state when the JS client has no getRecommendationPage', async () => {
    const olderClient = { recommendations: { getRecommendations: mockGetRecommendations } };
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <CioRecommendationsPage
        apiKey={DEMO_API_KEY}
        pageId='pdp_b2c'
        cioClient={olderClient as any}
      />,
    );

    await waitFor(() => {
      expect(container.querySelector('.cio-error')).toBeInTheDocument();
    });
    expect(consoleError).toHaveBeenCalledWith(MISSING_PAGE_METHOD_MESSAGE);
    expect(mockGetRecommendations).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
