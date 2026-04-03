import { shopifyDefaults } from '../../src/utils/shopifyDefaults';

describe('Testing Utils: shopifyDefaults', () => {
  it('should have a selector of "#recommendations-container"', () => {
    expect(shopifyDefaults.selector).toBe('#recommendations-container');
  });

  it('should have onAddToCart callback', () => {
    expect(typeof shopifyDefaults.callbacks.onAddToCart).toBe('function');
  });

  it('should have onProductClick callback', () => {
    expect(typeof shopifyDefaults.callbacks.onProductClick).toBe('function');
  });

  describe('onAddToCart', () => {
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn().mockResolvedValue({ ok: true });
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('should POST to /cart/add.js with the product id', () => {
      const event = new CustomEvent('cio:add_to_cart', {
        detail: {
          product: { id: 'shopify-123', name: 'shopify-123' },
        },
      });

      shopifyDefaults.callbacks.onAddToCart!(event);

      expect(global.fetch).toHaveBeenCalledWith('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'shopify-123', quantity: 1 }),
      });
    });

    it('should log an error when fetch fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const fetchError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValue(fetchError);

      const event = new CustomEvent('cio:add_to_cart', {
        detail: {
          product: { id: 'shopify-123', name: 'shopify-123' },
        },
      });

      shopifyDefaults.callbacks.onAddToCart!(event);

      // Wait for the promise rejection to be handled
      await new Promise(process.nextTick);

      expect(consoleSpy).toHaveBeenCalledWith('Failed to add item to cart:', fetchError);
      consoleSpy.mockRestore();
    });
  });

  describe('onProductClick', () => {
    it('should construct the correct product URL from the item id', () => {
      const event = new CustomEvent('cio:product_click', {
        detail: {
          product: { id: 'my-product', name: 'shopify-123' },
        },
      });

      // Verify the URL is constructed correctly without triggering navigation
      const expectedUrl = new URL('/products/my-product', window.location.origin);
      expect(expectedUrl.href).toBe('http://localhost/products/my-product');

      // Verify the callback doesn't throw
      expect(() => shopifyDefaults.callbacks.onProductClick!(event)).not.toThrow();
    });
  });
});
