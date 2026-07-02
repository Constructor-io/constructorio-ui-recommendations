import React from 'react';
import { render } from '@testing-library/react';
import { CioRecommendationsProvider } from '../../../src/components/CioRecommendations';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../src/constants';
import { shopifyDefaults } from '../../../src/utils/shopifyDefaults';

const mockCioClient = { fetch: jest.fn() };
const testParameters = { userId: '123' };

describe('Testing Component: CioRecommendationsProvider', () => {
  it('should provide context to its children', () => {
    let receivedContext;

    render(
      <CioRecommendationsProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        cioClient={mockCioClient}
        parameters={testParameters}>
        {(context) => {
          receivedContext = context;

          return <div>Child</div>;
        }}
      </CioRecommendationsProvider>,
    );

    expect(receivedContext).toBeDefined();
    expect(receivedContext.podId).toBe(DEMO_POD_ID);
    expect(receivedContext.cioClient).toBe(mockCioClient);
    expect(receivedContext.parameters).toBe(testParameters);
    expect(typeof receivedContext.setCioClientOptions).toBe('function');
  });

  it('should renders children as child nodes', () => {
    const { getByText } = render(
      <CioRecommendationsProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        cioClient={mockCioClient}>
        <span>Static Child</span>
      </CioRecommendationsProvider>,
    );

    const spanElem = getByText('Static Child');
    expect(spanElem).toBeInstanceOf(HTMLElement);
    expect(spanElem.parentElement).not.toBeNull();
  });

  describe('useShopifyDefaults', () => {
    it('should merge shopifyDefaults callbacks when useShopifyDefaults is true', () => {
      let receivedContext;

      render(
        <CioRecommendationsProvider
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          cioClient={mockCioClient}
          useShopifyDefaults>
          {(context) => {
            receivedContext = context;

            return <div>Child</div>;
          }}
        </CioRecommendationsProvider>,
      );

      expect(receivedContext.useShopifyDefaults).toBe(true);
      expect(receivedContext.callbacks.onAddToCart).toBe(shopifyDefaults.callbacks.onAddToCart);
      expect(receivedContext.callbacks.onProductClick).toBe(
        shopifyDefaults.callbacks.onProductClick,
      );
    });

    it('should not include shopifyDefaults callbacks when useShopifyDefaults is false', () => {
      let receivedContext;

      render(
        <CioRecommendationsProvider
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          cioClient={mockCioClient}
          useShopifyDefaults={false}>
          {(context) => {
            receivedContext = context;

            return <div>Child</div>;
          }}
        </CioRecommendationsProvider>,
      );

      expect(receivedContext.useShopifyDefaults).toBe(false);
      expect(receivedContext.callbacks?.onAddToCart).toBeUndefined();
      expect(receivedContext.callbacks?.onProductClick).toBeUndefined();
    });

    it('should allow custom callbacks to override shopifyDefaults callbacks', () => {
      let receivedContext;
      const customOnAddToCart = jest.fn();

      render(
        <CioRecommendationsProvider
          apiKey={DEMO_API_KEY}
          podId={DEMO_POD_ID}
          cioClient={mockCioClient}
          useShopifyDefaults
          callbacks={{ onAddToCart: customOnAddToCart }}>
          {(context) => {
            receivedContext = context;

            return <div>Child</div>;
          }}
        </CioRecommendationsProvider>,
      );

      expect(receivedContext.callbacks.onAddToCart).toBe(customOnAddToCart);
      expect(receivedContext.callbacks.onProductClick).toBe(
        shopifyDefaults.callbacks.onProductClick,
      );
    });
  });
});
