import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CioRecommendations from '../../../src/components/CioRecommendations';
import { useCioRecommendationContext } from '../../../src/hooks/useCioRecommendationContext';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../src/constants';

// Mock the Carousel component to avoid embla-carousel issues in tests
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

// Mock the Constructor IO client
const mockGetRecommendations = jest.fn();

jest.mock('@constructor-io/constructorio-client-javascript', () =>
  jest.fn().mockImplementation(() => ({
    recommendations: {
      getRecommendations: mockGetRecommendations,
    },
  })),
);

const mockRecommendationsResponse = {
  request: {
    pod_id: DEMO_POD_ID,
  },
  response: {
    results: [
      {
        value: 'Test Product 1',
        data: {
          id: 'product-1',
          url: 'https://example.com/product-1',
          image_url: 'https://example.com/image-1.jpg',
          price: 49.99,
        },
        matched_terms: [],
        is_slotted: false,
      },
      {
        value: 'Test Product 2',
        data: {
          id: 'product-2',
          url: 'https://example.com/product-2',
          image_url: 'https://example.com/image-2.jpg',
          price: 59.99,
        },
        matched_terms: [],
        is_slotted: false,
      },
    ],
    total_num_results: 2,
    pod: {
      id: DEMO_POD_ID,
      display_name: 'Bestsellers',
    },
  },
  result_id: 'test-result-id',
};

describe('CioRecommendations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRecommendations.mockResolvedValue(mockRecommendationsResponse);
  });

  // Note: Testing loading state is flaky with mocked async calls
  // The component correctly shows loading state, but it's difficult to test reliably

  it('renders recommendations after successful fetch', async () => {
    render(<CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} />);

    await waitFor(() => {
      expect(screen.getByText('Bestsellers')).toBeInTheDocument();
    });
  });

  describe('Rendering Tests', () => {
    it('renders with pod subheader', async () => {
      render(
        <CioRecommendations
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          podSubheader='Top selling products'
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('Top selling products')).toBeInTheDocument();
      });
    });

    it('renders error state when fetch fails', async () => {
      mockGetRecommendations.mockRejectedValue(new Error('API Error'));

      const { container } = render(
        <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} />,
      );

      await waitFor(() => {
        expect(container.querySelector('.cio-error')).toBeInTheDocument();
      });
    });

    it('renders carousel with items after successful fetch', async () => {
      render(<CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} />);

      await waitFor(() => {
        expect(screen.getByTestId('mock-carousel')).toHaveTextContent('Carousel with 2 items');
      });
    });

    it('applies tracking data attributes', async () => {
      const { container } = render(
        <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} />,
      );

      await waitFor(() => {
        const recommendationsContainer = container.querySelector('.cio-recommendations');
        expect(recommendationsContainer).not.toBeNull();
        if (recommendationsContainer) {
          expect(recommendationsContainer).toHaveAttribute('data-cnstrc-recommendations', 'true');
          expect(recommendationsContainer).toHaveAttribute(
            'data-cnstrc-recommendations-pod-id',
            DEMO_POD_ID,
          );
          expect(recommendationsContainer).toHaveAttribute(
            'data-cnstrc-result-id',
            'test-result-id',
          );
          expect(recommendationsContainer).toHaveAttribute('data-cnstrc-num-results', '2');
        }
      });
    });

    it('renders loading state initially', () => {
      // Don't resolve the promise immediately to test loading state
      mockGetRecommendations.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(mockRecommendationsResponse), 1000);
          }),
      );

      render(<CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders without error when custom cioClient is provided', async () => {
      const mockClient = {
        recommendations: {
          getRecommendations: jest.fn().mockResolvedValue(mockRecommendationsResponse),
        },
      };

      render(
        <CioRecommendations
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          cioClient={mockClient as any}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('Bestsellers')).toBeInTheDocument();
      });
    });
  });

  describe('Render Overrides Test', () => {
    it('supports render props pattern', async () => {
      render(
        <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
          {({ items }) => (
            <div>
              <h2>Custom Layout</h2>
              <p>Items: {items.length}</p>
            </div>
          )}
        </CioRecommendations>,
      );

      await waitFor(() => {
        expect(screen.getByText('Custom Layout')).toBeInTheDocument();
        expect(screen.getByText('Items: 2')).toBeInTheDocument();
      });
    });

    it('supports component overrides for pod header', async () => {
      render(
        <CioRecommendations
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          componentOverrides={{
            podHeader: {
              reactNode: <div>Custom Pod Header</div>,
            },
          }}
        />,
      );

      await waitFor(
        () => {
          expect(screen.getByText('Custom Pod Header')).toBeInTheDocument();
          expect(screen.queryByText('Bestsellers')).not.toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it('provides context values to render props children', async () => {
      render(
        <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
          {({ podId, items, itemFieldGetters }) => (
            <div>
              <span data-testid='context-pod-id'>{podId}</span>
              <span data-testid='context-items-count'>{items.length}</span>
              <span data-testid='context-has-getters'>
                {typeof itemFieldGetters.getPrice === 'function' ? 'yes' : 'no'}
              </span>
            </div>
          )}
        </CioRecommendations>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('context-pod-id')).toHaveTextContent(DEMO_POD_ID);
        expect(screen.getByTestId('context-items-count')).toHaveTextContent('2');
        expect(screen.getByTestId('context-has-getters')).toHaveTextContent('yes');
      });
    });

    it('supports component override with render props for pod header', async () => {
      render(
        <CioRecommendations
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          componentOverrides={{
            podHeader: {
              reactNode: (
                <div data-testid='custom-header' className='cio-pod-header'>
                  Modified Header
                </div>
              ),
            },
          }}
        />,
      );

      await waitFor(
        () => {
          expect(screen.getByTestId('custom-header')).toHaveTextContent('Modified Header');
        },
        { timeout: 3000 },
      );
    });

    it('supports component override with reactNode for entire component', async () => {
      render(
        <CioRecommendations
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          componentOverrides={{
            reactNode: <div data-testid='full-override'>Completely Custom Content</div>,
          }}
        />,
      );

      await waitFor(
        () => {
          expect(screen.getByTestId('full-override')).toBeInTheDocument();
          expect(screen.queryByText('Bestsellers')).not.toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });
  });

  describe('Shopify Defaults Test', () => {
    it('passes useShopifyDefaults through context', async () => {
      render(
        <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} useShopifyDefaults>
          {({ useShopifyDefaults: shopifyFlag }) => (
            <div data-testid='shopify-flag'>{shopifyFlag ? 'enabled' : 'disabled'}</div>
          )}
        </CioRecommendations>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('shopify-flag')).toHaveTextContent('enabled');
      });
    });

    it('includes shopify default callbacks when useShopifyDefaults is true', async () => {
      render(
        <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} useShopifyDefaults>
          {({ callbacks }) => (
            <div>
              <span data-testid='has-add-to-cart'>
                {typeof callbacks?.onAddToCart === 'function' ? 'yes' : 'no'}
              </span>
              <span data-testid='has-product-click'>
                {typeof callbacks?.onProductClick === 'function' ? 'yes' : 'no'}
              </span>
            </div>
          )}
        </CioRecommendations>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-add-to-cart')).toHaveTextContent('yes');
        expect(screen.getByTestId('has-product-click')).toHaveTextContent('yes');
      });
    });

    it('does not include shopify default callbacks when useShopifyDefaults is not set', async () => {
      render(
        <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
          {({ callbacks }) => (
            <div>
              <span data-testid='has-add-to-cart-default'>
                {typeof callbacks?.onAddToCart === 'function' ? 'yes' : 'no'}
              </span>
              <span data-testid='has-product-click-default'>
                {typeof callbacks?.onProductClick === 'function' ? 'yes' : 'no'}
              </span>
            </div>
          )}
        </CioRecommendations>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-add-to-cart-default')).toHaveTextContent('no');
        expect(screen.getByTestId('has-product-click-default')).toHaveTextContent('no');
      });
    });
  });

  describe('Passing Props Test', () => {
    it('calls API with correct parameters', async () => {
      const customParameters = {
        num_results: 5,
        section: 'Products',
      };

      render(
        <CioRecommendations
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          parameters={customParameters}
        />,
      );

      await waitFor(() => {
        expect(mockGetRecommendations).toHaveBeenCalledWith(DEMO_POD_ID, customParameters);
      });
    });

    it('passes custom cioClientOptions through provider', async () => {
      function ContextConsumer() {
        const context = useCioRecommendationContext();

        return (
          <div data-testid='service-url'>{context.cioClientOptions.serviceUrl || 'default'}</div>
        );
      }

      render(
        <CioRecommendations
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          cioClientOptions={{ serviceUrl: 'https://custom.cnstrc.com' }}>
          {() => <ContextConsumer />}
        </CioRecommendations>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('service-url')).toHaveTextContent('https://custom.cnstrc.com');
      });
    });

    it('passes custom itemFieldGetters through provider', async () => {
      const customGetPrice = jest.fn().mockReturnValue(999);
      const customGetters = {
        getPrice: customGetPrice,
      };

      render(
        <CioRecommendations
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          itemFieldGetters={customGetters}>
          {({ items, itemFieldGetters }) => (
            <div data-testid='custom-price'>
              {itemFieldGetters.getPrice({ data: { price: 100 } } as any)}
            </div>
          )}
        </CioRecommendations>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('custom-price')).toHaveTextContent('999');
      });
    });
  });
});
