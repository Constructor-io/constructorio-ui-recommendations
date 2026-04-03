import { ProductCardEventDetail } from '@constructor-io/constructorio-ui-components';
import type { Callbacks } from '../types';

export interface ShopifyDefaults {
    selector: string;
  callbacks: Pick<Callbacks, 'onProductClick' | 'onAddToCart'>;
}

// eslint-disable-next-line import/prefer-default-export
export const shopifyDefaults: ShopifyDefaults = {
  selector: '#recommendations-container',
  callbacks: {
    onAddToCart(event: CustomEvent<ProductCardEventDetail>) {
      const shopifyId = event.detail.product.id;

      if (typeof window !== 'undefined') {
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: shopifyId,
            quantity: 1,
          }),
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Failed to add item to cart:', error);
        });
      }
    },
    onProductClick(event: CustomEvent<ProductCardEventDetail>) {
      if (typeof window !== 'undefined') {
        const itemId = event.detail.product.id
        const url = new URL(`/products/${itemId}`, window.location.origin);

        window.location.href = url.href;
      }
    },
  },
};