import { useEffect } from 'react';
import {
  CIO_EVENTS,
  ProductCardEventDetail,
  CarouselNavEventDetail,
} from '@constructor-io/constructorio-ui-components';
import { useCioRecommendationContext } from './useCioRecommendationContext';

/**
 * Hook for wiring up recommendation callbacks to DOM events.
 *
 * Reads callbacks from context and attaches DOM event listeners to the container.
 * Only attaches listeners for callbacks that are provided.
 *
 * @param container - The container element that wraps the recommendations
 */
export default function useRecommendationEvents(container: HTMLElement | null): void {
  const { callbacks } = useCioRecommendationContext();

  useEffect(() => {
    if (!container || !callbacks) return undefined;

    const shouldStopPropagation = !callbacks.allowPropagation;

    const createHandler = <T>(callback?: (e: CustomEvent<T>) => void) => {
      if (!callback) return undefined;

      return (e: Event) => {
        if (shouldStopPropagation) e.stopPropagation();
        callback(e as CustomEvent<T>);
      };
    };

    const handleProductClick = createHandler<ProductCardEventDetail>(callbacks.onProductClick);
    const handleConversion = createHandler<ProductCardEventDetail>(callbacks.onAddToCart);
    const handleWishlist = createHandler<ProductCardEventDetail>(callbacks.onAddToWishlist);
    const handleImageEnter = createHandler<ProductCardEventDetail>(callbacks.onProductImageEnter);
    const handleImageLeave = createHandler<ProductCardEventDetail>(callbacks.onProductImageLeave);
    const handleCarouselNext = createHandler<CarouselNavEventDetail>(callbacks.onCarouselNext);
    const handleCarouselPrevious = createHandler<CarouselNavEventDetail>(
      callbacks.onCarouselPrevious,
    );

    if (handleProductClick)
      container.addEventListener(CIO_EVENTS.productCard.click, handleProductClick);
    if (handleConversion)
      container.addEventListener(CIO_EVENTS.productCard.conversion, handleConversion);
    if (handleWishlist) container.addEventListener(CIO_EVENTS.productCard.wishlist, handleWishlist);
    if (handleImageEnter)
      container.addEventListener(CIO_EVENTS.productCard.imageEnter, handleImageEnter);
    if (handleImageLeave)
      container.addEventListener(CIO_EVENTS.productCard.imageLeave, handleImageLeave);
    if (handleCarouselNext)
      container.addEventListener(CIO_EVENTS.carousel.next, handleCarouselNext);
    if (handleCarouselPrevious)
      container.addEventListener(CIO_EVENTS.carousel.previous, handleCarouselPrevious);

    return () => {
      if (handleProductClick)
        container.removeEventListener(CIO_EVENTS.productCard.click, handleProductClick);
      if (handleConversion)
        container.removeEventListener(CIO_EVENTS.productCard.conversion, handleConversion);
      if (handleWishlist)
        container.removeEventListener(CIO_EVENTS.productCard.wishlist, handleWishlist);
      if (handleImageEnter)
        container.removeEventListener(CIO_EVENTS.productCard.imageEnter, handleImageEnter);
      if (handleImageLeave)
        container.removeEventListener(CIO_EVENTS.productCard.imageLeave, handleImageLeave);
      if (handleCarouselNext)
        container.removeEventListener(CIO_EVENTS.carousel.next, handleCarouselNext);
      if (handleCarouselPrevious)
        container.removeEventListener(CIO_EVENTS.carousel.previous, handleCarouselPrevious);
    };
  }, [container, callbacks]);
}
