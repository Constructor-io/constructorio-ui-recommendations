import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CIO_EVENTS } from '@constructor-io/constructorio-ui-components';
import { useRecommendationEvents } from '../../../src/hooks/useRecommendationEvents';
import CioRecommendationsProvider from '../../../src/components/CioRecommendations/CioRecommendationsProvider';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../src/constants';
import { Callbacks } from '../../../src/types';

// Mock useCioClient to avoid fetch errors in tests
jest.mock('../../../src/hooks/useCioClient', () => ({
  __esModule: true,
  default: () => null,
}));

// Create a wrapper component that provides context
function createWrapper(callbacks?: Callbacks) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <CioRecommendationsProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} callbacks={callbacks}>
        {children}
      </CioRecommendationsProvider>
    );
  };
}

describe('useRecommendationEvents', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('allowPropagation', () => {
    it('should stop propagation by default when allowPropagation is not set', () => {
      const onProductClick = jest.fn();
      const parentHandler = jest.fn();

      // Add a parent listener to check if event bubbles
      document.body.addEventListener(CIO_EVENTS.productCard.click, parentHandler);

      const { unmount } = renderHook(() => useRecommendationEvents(container), {
        wrapper: createWrapper({ onProductClick }),
      });

      // Dispatch event on container
      act(() => {
        const event = new CustomEvent(CIO_EVENTS.productCard.click, {
          bubbles: true,
          detail: { product: { id: '123', name: 'Test Product' } },
        });
        container.dispatchEvent(event);
      });

      expect(onProductClick).toHaveBeenCalledTimes(1);
      expect(parentHandler).not.toHaveBeenCalled();

      document.body.removeEventListener(CIO_EVENTS.productCard.click, parentHandler);
      unmount();
    });

    it('should stop propagation when allowPropagation is false', () => {
      const onProductClick = jest.fn();
      const parentHandler = jest.fn();

      document.body.addEventListener(CIO_EVENTS.productCard.click, parentHandler);

      const { unmount } = renderHook(() => useRecommendationEvents(container), {
        wrapper: createWrapper({ onProductClick, allowPropagation: false }),
      });

      act(() => {
        const event = new CustomEvent(CIO_EVENTS.productCard.click, {
          bubbles: true,
          detail: { product: { id: '123', name: 'Test Product' } },
        });
        container.dispatchEvent(event);
      });

      expect(onProductClick).toHaveBeenCalledTimes(1);
      expect(parentHandler).not.toHaveBeenCalled();

      document.body.removeEventListener(CIO_EVENTS.productCard.click, parentHandler);
      unmount();
    });

    it('should allow propagation when allowPropagation is true', () => {
      const onProductClick = jest.fn();
      const parentHandler = jest.fn();

      document.body.addEventListener(CIO_EVENTS.productCard.click, parentHandler);

      const { unmount } = renderHook(() => useRecommendationEvents(container), {
        wrapper: createWrapper({ onProductClick, allowPropagation: true }),
      });

      act(() => {
        const event = new CustomEvent(CIO_EVENTS.productCard.click, {
          bubbles: true,
          detail: { product: { id: '123', name: 'Test Product' } },
        });
        container.dispatchEvent(event);
      });

      expect(onProductClick).toHaveBeenCalledTimes(1);
      expect(parentHandler).toHaveBeenCalledTimes(1);

      document.body.removeEventListener(CIO_EVENTS.productCard.click, parentHandler);
      unmount();
    });

    it('should stop propagation when callbacks object exists but allowPropagation is undefined', () => {
      const onAddToCart = jest.fn();
      const parentHandler = jest.fn();

      document.body.addEventListener(CIO_EVENTS.productCard.conversion, parentHandler);

      const { unmount } = renderHook(() => useRecommendationEvents(container), {
        wrapper: createWrapper({ onAddToCart }), // allowPropagation not set
      });

      act(() => {
        const event = new CustomEvent(CIO_EVENTS.productCard.conversion, {
          bubbles: true,
          detail: { product: { id: '456', name: 'Another Product' } },
        });
        container.dispatchEvent(event);
      });

      expect(onAddToCart).toHaveBeenCalledTimes(1);
      expect(parentHandler).not.toHaveBeenCalled();

      document.body.removeEventListener(CIO_EVENTS.productCard.conversion, parentHandler);
      unmount();
    });
  });
});
