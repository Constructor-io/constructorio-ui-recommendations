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

export interface UseRecommendationsResultsReturnSuccess extends UseRecommendationResultsReturn {
  data: RecommendationsData;
  status: RequestStatus.SUCCESS | RequestStatus.IDLE;
  message: never;
}

export interface UseRecommendationsResultsReturnFailure extends UseRecommendationResultsReturn {
  data: never;
  status: RequestStatus.ERROR;
  message: string;
}

export interface UseRecommendationsResultsReturnLoading extends UseRecommendationResultsReturn {
  data: never;
  status: RequestStatus.FETCHING;
  message: never;
}

export function isResponseLoaded(
  response: UseRecommendationResultsReturn,
): response is UseRecommendationsResultsReturnSuccess {
  return response.status === RequestStatus.SUCCESS;
}

export function isResponseLoading(
  response: UseRecommendationResultsReturn,
): response is UseRecommendationsResultsReturnLoading {
  return response.status === RequestStatus.FETCHING || response.status === RequestStatus.IDLE;
}

export function isResponseError(
  response: UseRecommendationResultsReturn,
): response is UseRecommendationsResultsReturnFailure {
  return response.status === RequestStatus.ERROR;
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
 * A custom hook to utilize Constructor Recommendation API
 *
 * @param {UseRecommendationResultsProps} [props] - The component props
 * @param {ApiRecommendationsResponse} [props.initialRecommendationResponse] - Initial value for recommendation results
 * Useful when passing initial state for the first render from the server to the client for Server Side Rendering (SSR)
 *
 * @returns {UseRecommendationResultsReturn} An object containing:
 * - `status` {RequestStatus}: The current status of the recommendation request (eg. IDLE, FETCHING, SUCCESS, ERROR)
 * - `message` {string | null}: Any error message encountered during the request
 * - `data` {RecommendationsData | null}: The transformed recommendation data
 * - `refetch` {() => void}: A function to manually refetch the recommendation results
 *
 * @throws {Error} Throws an error if the ConstructorIO client instance is not provided in a client environment
 */
export default function useRecommendationResults(
  props: UseRecommendationResultsProps = {},
): UseRecommendationResultsReturn {
  const { initialRecommendationResponse } = props;
  const context = useCioRecommendationContext();
  const { cioClient, podId, parameters, itemFieldGetters } = context;

  // Throw error when cioClient is not provided in client environment
  if (!cioClient && typeof window !== 'undefined') {
    throw new Error('ConstructorIO client instance is required.');
  }

  const [recommendationResults, setRecommendationResults] = useState<Nullable<RecommendationsData>>(
    initialRecommendationResponse
      ? transformRecommendationResponse(initialRecommendationResponse, { itemFieldGetters })
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
        setRecommendationResults(transformRecommendationResponse(response, { itemFieldGetters }));
        setStatus(RequestStatus.SUCCESS);
        setMessage(null);
      })
      .catch((error) => {
        setRecommendationResults(null);
        setStatus(RequestStatus.ERROR);
        setMessage(error.message);
      });
  }, [cioClient, podId, parameters, itemFieldGetters]);

  useEffect(fetchResult, [fetchResult]);

  return {
    status,
    message,
    data: recommendationResults,
    refetch: fetchResult,
  };
}
