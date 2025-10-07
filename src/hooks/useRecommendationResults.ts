import { useCallback, useState } from 'react';
import ConstructorIOClient, {
  Nullable,
  RecommendationsParameters,
} from '@constructor-io/constructorio-client-javascript';
import { RecommendationsData, RequestStatus } from '../types';
import { useCioRecommendationContext } from './useCioRecommendationContext';
import { transformRecommendationResponse } from '../utils/transformers';

export interface UseRecommendationResultsProps {
  podId: string;
  parameters?: RecommendationsParameters;
}

export interface UseRecommendationResultsReturn {
  data: Nullable<RecommendationsData>;
  status: RequestStatus;
  message: Nullable<string>;
  getRecommendations: (podId: string) => void;
}

async function fetchRecommendationResults(
  cioClient: ConstructorIOClient,
  podId: string,
  parameters?: RecommendationsParameters,
) {
  const response = await cioClient.recommendations.getRecommendations(podId, parameters);

  return response;
}

export default function useRecommendationResults({
  podId,
  parameters,
}: UseRecommendationResultsProps): UseRecommendationResultsReturn {
  const context = useCioRecommendationContext();
  const { cioClient } = context;

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
      })
      .catch((error) => {
        setStatus(RequestStatus.ERROR);
        setMessage(error.message);
      });
  }, [podId, cioClient, parameters]);

  return {
    data: recommendationResults,
    status,
    message,
    getRecommendations: fetchResult,
  };
}
