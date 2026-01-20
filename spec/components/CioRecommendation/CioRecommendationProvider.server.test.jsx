import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CioRecommendationProvider from '../../../src/components/CioRecommendations/CioRecommendationProvider';
import { useCioRecommendationContext } from '../../../src/hooks/useCioRecommendationContext';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../src/constants';

describe('CioRecommendationProvider React Server-Side Rendering', () => {
  it('renders provider without children on the server without error', () => {
    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} />,
    );

    expect(html).toBe('');
  });

  it('renders provider without children on the server without error, if cioClient is provided', () => {
    const mockCioClient = { fetch: jest.fn() };
    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        cioClient={mockCioClient}
      />,
    );

    expect(html).toBe('');
  });

  it('renders provider with children correctly on the server', () => {
    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        <div>Test Child</div>
      </CioRecommendationProvider>,
    );

    expect(html).toContain('<div>Test Child</div>');
  });

  it('renders provider with render props on the server', () => {
    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        {() => <div>Render Props Child</div>}
      </CioRecommendationProvider>,
    );

    expect(html).toContain('<div>Render Props Child</div>');
  });

  it('renders provider with children that has access to Context value on the server', () => {
    function ContextConsumer() {
      const context = useCioRecommendationContext();

      return <div>{JSON.stringify({ podId: context.podId })}</div>;
    }

    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        <ContextConsumer />
      </CioRecommendationProvider>,
    );

    // HTML entities are encoded in server-side rendering
    expect(html).toContain('podId');
    expect(html).toContain(DEMO_POD_ID);
  });

  it('provides cioClient as null on the server', () => {
    function ContextConsumer() {
      const context = useCioRecommendationContext();

      return <div data-cio-client={context.cioClient === null ? 'null' : 'defined'} />;
    }

    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        <ContextConsumer />
      </CioRecommendationProvider>,
    );

    expect(html).toContain('data-cio-client="null"');
  });

  it('passes parameters through context on the server', () => {
    function ContextConsumer() {
      const context = useCioRecommendationContext();

      return <div>{JSON.stringify(context.parameters)}</div>;
    }

    const testParameters = { num_results: 10, section: 'Products' };

    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        parameters={testParameters}>
        <ContextConsumer />
      </CioRecommendationProvider>,
    );

    // HTML entities are encoded in server-side rendering
    expect(html).toContain('num_results');
    expect(html).toContain('10');
    expect(html).toContain('section');
    expect(html).toContain('Products');
  });

  it('passes podSubheader through context on the server', () => {
    function ContextConsumer() {
      const context = useCioRecommendationContext();

      return <div>{context.podSubheader}</div>;
    }

    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        podSubheader='Featured Products'>
        <ContextConsumer />
      </CioRecommendationProvider>,
    );

    expect(html).toContain('Featured Products');
  });

  it('provides itemFieldGetters on the server', () => {
    function ContextConsumer() {
      const context = useCioRecommendationContext();
      const getterNames = Object.keys(context.itemFieldGetters);

      return <div>{getterNames.join(',')}</div>;
    }

    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        <ContextConsumer />
      </CioRecommendationProvider>,
    );

    expect(html).toContain('getPrice');
    expect(html).toContain('getSalePrice');
    expect(html).toContain('getRolloverImage');
    expect(html).toContain('getSwatchPreview');
    expect(html).toContain('getSwatches');
  });

  it('allows custom itemFieldGetters to override defaults on the server', () => {
    function ContextConsumer() {
      const context = useCioRecommendationContext();
      // Call getPrice with a mock item to verify the custom getter is used
      const result = context.itemFieldGetters.getPrice({ data: { price: 100 } });

      return <div>price:{result}</div>;
    }

    const customGetters = {
      getPrice: () => 999,
    };

    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        itemFieldGetters={customGetters}>
        <ContextConsumer />
      </CioRecommendationProvider>,
    );

    // React may insert comments for hydration, so check for parts
    expect(html).toContain('price:');
    expect(html).toContain('999');
  });

  it('provides setCioClientOptions function on the server', () => {
    function ContextConsumer() {
      const context = useCioRecommendationContext();

      return (
        <div data-has-setter={typeof context.setCioClientOptions === 'function' ? 'yes' : 'no'} />
      );
    }

    const html = ReactDOMServer.renderToString(
      <CioRecommendationProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID}>
        <ContextConsumer />
      </CioRecommendationProvider>,
    );

    expect(html).toContain('data-has-setter="yes"');
  });
});
