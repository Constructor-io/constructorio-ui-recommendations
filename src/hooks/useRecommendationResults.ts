import { useCallback, useEffect, useState } from 'react';
import ConstructorIOClient, {
  Nullable,
  RecommendationsParameters,
} from '@constructor-io/constructorio-client-javascript';
import { ApiRecommendationsResponse, RecommendationsData, RequestStatus } from '../types';
import { useCioRecommendationContext } from './useCioRecommendationContext';
import { transformRecommendationResponse } from '../utils/transformers';

export interface UseRecommendationResultsProps {
  initialRecommendationResponse?: ApiRecommendationsResponse;
}

export interface UseRecommendationResultsReturn {
  data: Nullable<RecommendationsData>;
  status: RequestStatus;
  message: Nullable<string>;
  refetch: () => void;
}

async function fetchRecommendationResults(
  cioClient: ConstructorIOClient,
  podId: string,
  parameters?: RecommendationsParameters,
) {
  const response = await cioClient.recommendations.getRecommendations(podId, parameters);

  return response;
}

/**
 * A React Hook to call to utilize Constructor Recommendation
 * @param {Object} [props] - The component props.
 * @param {object} [props.initialSearchResponse] Initial value for recommendation results
 * Useful when passing initial state for the first render from the server to the client for Server Side Rendering (SSR)
 * @returns {status, message, data, refetch}
 */
export default function useRecommendationResults(
  props: UseRecommendationResultsProps = {},
): UseRecommendationResultsReturn {
  const { initialRecommendationResponse } = props;
  const context = useCioRecommendationContext();
  const { cioClient, podId, parameters } = context;

  // Throw error when cioClient is not provided in client environment
  if (!cioClient && typeof window !== 'undefined') {
    throw new Error('ConstructorIO client instance is required.');
  }

  const [recommendationResults, setRecommendationResults] = useState<Nullable<RecommendationsData>>(
    initialRecommendationResponse
      ? transformRecommendationResponse(initialRecommendationResponse)
      : null,
  );
  const [status, setStatus] = useState<RequestStatus>(
    initialRecommendationResponse ? RequestStatus.SUCCESS : RequestStatus.IDLE,
  );
  const [message, setMessage] = useState<Nullable<string>>(null);

  const fetchResult = useCallback(() => {
    if (!cioClient) return;
    setStatus(RequestStatus.FETCHING);

    fetchRecommendationResults(cioClient, podId, parameters)
      .then((response) => {
        setRecommendationResults(transformRecommendationResponse(response));
        setStatus(RequestStatus.SUCCESS);
        setMessage(null);
      })
      .catch((error) => {
        setRecommendationResults(null);
        setStatus(RequestStatus.ERROR);
        setMessage(error.message);
      });
  }, [cioClient, podId, parameters]);

  useEffect(fetchResult, [fetchResult]);

  return {
    status,
    message,
    data: recommendationResults,
    refetch: fetchResult,
  };
}
