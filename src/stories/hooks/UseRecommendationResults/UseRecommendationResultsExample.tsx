import React from 'react';
import useRecommendationResults, {
  UseRecommendationResultsProps,
} from '../../../hooks/useRecommendationResults';
import { useCioRecommendationContext } from '../../../hooks/useCioRecommendationContext';
import CioRecommendationsProvider from '../../../components/CioRecommendations/CioRecommendationsProvider';
import { CioRecommendationsProviderProps } from '../../../types';
import './UseRecommendationResultsExample.css';

interface UseRecommendationResultsExampleProps
  extends CioRecommendationsProviderProps,
    UseRecommendationResultsProps {}

function CustomRecommendations() {
  const { podId } = useCioRecommendationContext();
  const { status, data, message, refetch } = useRecommendationResults();

  if (status === 'fetching' || status === 'idle') {
    return (
      <div className='hook-example-container'>
        <div className='hook-example-loading'>Loading recommendations...</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='hook-example-container'>
        <div className='hook-example-error'>Error: {message}</div>
      </div>
    );
  }

  return (
    <div className='hook-example-container'>
      <div className='hook-example-header'>
        <div>
          <h2 className='hook-example-title'>{data?.response.pod.displayName}</h2>
          <span className='hook-example-pod-id'>Pod: {podId}</span>
        </div>
        <button className='hook-example-refresh' type='button' onClick={refetch}>
          Refresh
        </button>
      </div>
      <div className='hook-example-grid'>
        {data?.response.results.slice(0, 6).map((item) => (
          <div key={item.id} className='hook-example-card'>
            <img src={item.imageUrl} alt={item.name} />
            <h3>{item.name}</h3>
            {item.price && <span className='hook-example-price'>${item.price}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UseRecommendationResultsExample(
  props: UseRecommendationResultsExampleProps,
) {
  return (
    <CioRecommendationsProvider {...props}>
      <CustomRecommendations />
    </CioRecommendationsProvider>
  );
}
