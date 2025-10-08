import { useCallback, useEffect, useState } from 'react';
import ConstructorIOClient, {
  Nullable,
  RecommendationsParameters,
} from '@constructor-io/constructorio-client-javascript';
import { RecommendationsData, RequestStatus } from '../types';
import { useCioRecommendationContext } from './useCioRecommendationContext';
import { transformRecommendationResponse } from '../utils/transformers';

export interface UseRecommendationResultsReturn {
  data: Nullable<RecommendationsData>;
  status: RequestStatus;
  message: Nullable<string>;
  refetch: (podId: string) => void;
}

async function fetchRecommendationResults(
  cioClient: ConstructorIOClient,
  podId: string,
  parameters?: RecommendationsParameters,
) {
  const response = await cioClient.recommendations.getRecommendations(podId, parameters);

  return response;
}

export default function useRecommendationResults(): UseRecommendationResultsReturn {
  const context = useCioRecommendationContext();
  const { cioClient, podId, parameters } = context;

  if (!cioClient) {
    throw new Error('ConstructorIO client instance is required.');
  }

  const [recommendationResults, setRecommendationResults] =
    useState<Nullable<RecommendationsData>>(null);
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.IDLE);
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
