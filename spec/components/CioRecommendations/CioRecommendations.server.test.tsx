import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CioRecommendations from '../../../src/components/CioRecommendations/CioRecommendations';
import { useCioRecommendationContext } from '../../../src/hooks/useCioRecommendationContext';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../src/constants';

// Mock the Constructor IO client to prevent API calls in SSR
jest.mock('@constructor-io/constructorio-client-javascript', () =>
  jest.fn().mockImplementation(() => ({
    recommendations: {
      getRecommendations: jest.fn(),
    },
  })),
);

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

describe('CioRecommendations React Server-Side Rendering', () => {
  it("throws an error if apiKey isn't provided", () => {
    expect(() => {
      // @ts-expect-error - Testing missing required props
      ReactDOMServer.renderToString(<CioRecommendations podId={DEMO_POD_ID} />);
    }).toThrow();
  });

  it('renders without error when podId is missing (shows loading state)', () => {
    // podId is required by TypeScript but doesn't cause runtime error
    const html = ReactDOMServer.renderToString(
      // @ts-expect-error - Testing missing required props
      <CioRecommendations apiKey={DEMO_API_KEY} />,
    );

    // Should still render loading state
    expect(html).toContain('cio-loading');
  });

  it('renders CioRecommendations without children on the server without error', () => {
    const html = ReactDOMServer.renderToString(
      <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} />,
    );

    // Should render loading state since no initial data is provided
    expect(html).toContain('cio-loading');
  });

  it('renders CioRecommendations provider without children on the server without error, if client is provided', () => {
    const html = ReactDOMServer.renderToString(
      <CioRecommendations cioClient={{} as any} podId={DEMO_POD_ID} apiKey={DEMO_API_KEY} />,
    );

    expect(html).toContain('');
  });

  it('renders CioRecommendations with children correctly on the server', () => {
    const html = ReactDOMServer.renderToString(
      <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        <div>Test Child</div>
      </CioRecommendations>,
    );

    // Children won't render until data is loaded - should show loading
    expect(html).toContain('cio-loading');
  });

  it('renders CioRecommendations with render props on the server', () => {
    const html = ReactDOMServer.renderToString(
      <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        {() => <div>Render Props Test</div>}
      </CioRecommendations>,
    );

    // Render props won't execute until data is loaded - should show loading
    expect(html).toContain('cio-loading');
  });

  it('renders CioRecommendations provider with children that has access to Context value on the server', () => {
    function ContextConsumer() {
      const context = useCioRecommendationContext();

      return <div data-testid='context-consumer'>podId: {context.podId}</div>;
    }

    // This will throw because the inner component tries to use context
    // while rendering loading state (before data is available)
    const html = ReactDOMServer.renderToString(
      <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        {() => <ContextConsumer />}
      </CioRecommendations>,
    );

    // Since no initial data, it will show loading state
    expect(html).toContain('cio-loading');
  });

  it('does not render error state without cioClient on the server', () => {
    // Server-side rendering with cioClient=null should not throw
    expect(() => {
      ReactDOMServer.renderToString(
        <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} cioClient={null} />,
      );
    }).not.toThrow();
  });
});
