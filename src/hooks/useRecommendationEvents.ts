import { useEffect, useRef } from 'react';
import {
  CIO_EVENTS,
  ProductCardEventDetail,
  CarouselNavEventDetail,
} from '@constructor-io/constructorio-ui-components';
import { useCioRecommendationContext } from './useCioRecommendationContext';
import { Callbacks } from '../types';

/**
 * Hook for wiring up recommendation callbacks to DOM events.
 *
 * Reads callbacks from context and attaches DOM event listeners to the container.
 *
 * @param container - The container element that wraps the recommendations
 */
export function useRecommendationEvents(container: HTMLElement | null): void {
  const { callbacks } = useCioRecommendationContext();

  // Store callbacks in a ref to avoid re-attaching listeners when callbacks change
  const callbacksRef = useRef<Callbacks | undefined>(callbacks);
  callbacksRef.current = callbacks;

  useEffect(() => {
    if (!container) return undefined;

    const shouldStopPropagation = !callbacksRef.current?.allowPropagation;

    const handleProductClick = (e: Event) => {
      if (shouldStopPropagation) e.stopPropagation();
      callbacksRef.current?.onProductClick?.(e as CustomEvent<ProductCardEventDetail>);
    };

    const handleConversion = (e: Event) => {
      if (shouldStopPropagation) e.stopPropagation();
      callbacksRef.current?.onAddToCart?.(e as CustomEvent<ProductCardEventDetail>);
    };

    const handleWishlist = (e: Event) => {
      if (shouldStopPropagation) e.stopPropagation();
      callbacksRef.current?.onAddToWishlist?.(e as CustomEvent<ProductCardEventDetail>);
    };

    const handleImageEnter = (e: Event) => {
      if (shouldStopPropagation) e.stopPropagation();
      callbacksRef.current?.onProductImageEnter?.(e as CustomEvent<ProductCardEventDetail>);
    };

    const handleImageLeave = (e: Event) => {
      if (shouldStopPropagation) e.stopPropagation();
      callbacksRef.current?.onProductImageLeave?.(e as CustomEvent<ProductCardEventDetail>);
    };

    const handleCarouselNext = (e: Event) => {
      if (shouldStopPropagation) e.stopPropagation();
      callbacksRef.current?.onCarouselNext?.(e as CustomEvent<CarouselNavEventDetail>);
    };

    const handleCarouselPrevious = (e: Event) => {
      if (shouldStopPropagation) e.stopPropagation();
      callbacksRef.current?.onCarouselPrevious?.(e as CustomEvent<CarouselNavEventDetail>);
    };

    container.addEventListener(CIO_EVENTS.productCard.click, handleProductClick);
    container.addEventListener(CIO_EVENTS.productCard.conversion, handleConversion);
    container.addEventListener(CIO_EVENTS.productCard.wishlist, handleWishlist);
    container.addEventListener(CIO_EVENTS.productCard.imageEnter, handleImageEnter);
    container.addEventListener(CIO_EVENTS.productCard.imageLeave, handleImageLeave);
    container.addEventListener(CIO_EVENTS.carousel.next, handleCarouselNext);
    container.addEventListener(CIO_EVENTS.carousel.previous, handleCarouselPrevious);

    return () => {
      container.removeEventListener(CIO_EVENTS.productCard.click, handleProductClick);
      container.removeEventListener(CIO_EVENTS.productCard.conversion, handleConversion);
      container.removeEventListener(CIO_EVENTS.productCard.wishlist, handleWishlist);
      container.removeEventListener(CIO_EVENTS.productCard.imageEnter, handleImageEnter);
      container.removeEventListener(CIO_EVENTS.productCard.imageLeave, handleImageLeave);
      container.removeEventListener(CIO_EVENTS.carousel.next, handleCarouselNext);
      container.removeEventListener(CIO_EVENTS.carousel.previous, handleCarouselPrevious);
    };
  }, [container]);
}

export default useRecommendationEvents;
