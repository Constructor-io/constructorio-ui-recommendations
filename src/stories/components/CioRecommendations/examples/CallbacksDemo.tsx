import React, { useCallback, useMemo, useState } from 'react';
import {
  CarouselNavEventDetail,
  ProductCardEventDetail,
} from '@constructor-io/constructorio-ui-components';
import CioRecommendations from '../../../../components/CioRecommendations';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../../constants';
import '../css/EventListening.css';

export function CallbacksDemo() {
  const [eventLog, setEventLog] = useState<{ message: string; key: string }[]>([]);

  const logEvent = useCallback((eventType: string, e: CustomEvent) => {
    const timestamp = new Date().toLocaleTimeString();
    const detail = e.detail?.product?.name || e.detail?.direction || 'N/A';
    const message = `[${timestamp}] ${eventType} - ${detail}`;
    const key = `[${Date.now()}] ${eventType} - ${detail}`;
    const entry = { message, key };

    setEventLog((prev) => [entry, ...prev.slice(0, 100)]);
  }, []);

  const callbacks = useMemo(
    () => ({
      onProductClick: (e: CustomEvent<ProductCardEventDetail>) => logEvent('onProductClick', e),
      onAddToCart: (e: CustomEvent<ProductCardEventDetail>) => logEvent('onAddToCart', e),
      onAddToWishlist: (e: CustomEvent<ProductCardEventDetail>) => logEvent('onAddToWishlist', e),
      onProductImageEnter: (e: CustomEvent<ProductCardEventDetail>) =>
        logEvent('onProductImageEnter', e),
      onProductImageLeave: (e: CustomEvent<ProductCardEventDetail>) =>
        logEvent('onProductImageLeave', e),
      onCarouselNext: (e: CustomEvent<CarouselNavEventDetail>) => logEvent('onCarouselNext', e),
      onCarouselPrevious: (e: CustomEvent<CarouselNavEventDetail>) =>
        logEvent('onCarouselPrevious', e),
    }),
    [logEvent],
  );

  return (
    <div className='event-listening-demo'>
      <CioRecommendations apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} callbacks={callbacks} />
      <div className='event-log'>
        <div className='event-log-header'>Event Log</div>
        {eventLog.length === 0 ? (
          <div className='event-log-empty'>Click on products to see events...</div>
        ) : (
          eventLog.map((entry) => (
            <div key={entry.key} className='event-log-entry'>
              {entry.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CallbacksDemo;
