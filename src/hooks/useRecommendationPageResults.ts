import { useCallback, useEffect, useState } from 'react';
import ConstructorIOClient, { Nullable } from '@constructor-io/constructorio-client-javascript';
import {
  ApiRecommendationPageResponse,
  ItemFieldGetters,
  RecommendationPageData,
  RecommendationPageParameters,
  RequestStatus,
} from '../types';
import { transformRecommendationPageResponse } from '../utils/transformers';

export const MISSING_PAGE_METHOD_MESSAGE =
  'CioRecommendationsPage requires a version of @constructor-io/constructorio-client-javascript that provides recommendations.getRecommendationPage.';

export interface UseRecommendationPageResultsProps {
  cioClient: Nullable<ConstructorIOClient>;
  pageId: string;
  parameters?: RecommendationPageParameters;
  itemFieldGetters?: Partial<ItemFieldGetters>;
}

export interface UseRecommendationPageResultsReturn {
  /**
   * The transformed page data. Each pod carries its own `resultId`.
   */
  data: Nullable<RecommendationPageData>;
  /**
   * The current status of the page request (eg. `IDLE`, `FETCHING`, `SUCCESS`, `ERROR`)
   */
  status: RequestStatus;
  /**
   * Any error message encountered during the request
   */
  message: Nullable<string>;
  /**
   * A function to manually refetch the page
   */
  refetch: () => void;
}

type PageCapableClient = ConstructorIOClient & {
  recommendations: {
    getRecommendationPage?: (
      pageId: string,
      parameters?: RecommendationPageParameters,
    ) => Promise<ApiRecommendationPageResponse>;
  };
};

/**
 * A custom hook to retrieve every pod on a recommendation page in one request
 *
 * Uses `recommendations.getRecommendationPage` from the Constructor JS client, which stamps each
 * pod's own `result_id` onto that pod's results and dispatches a per-pod
 * `getRecommendations.completed` event for tracking.
 *
 * @param {UseRecommendationPageResultsProps} props - The hook props
 * @returns {UseRecommendationPageResultsReturn} The page request state
 */
export default function useRecommendationPageResults(
  props: UseRecommendationPageResultsProps,
): UseRecommendationPageResultsReturn {
  const { cioClient, pageId, parameters, itemFieldGetters } = props;
  const [data, setData] = useState<Nullable<RecommendationPageData>>(null);
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const [message, setMessage] = useState<Nullable<string>>(null);

  const fetchResult = useCallback(() => {
    if (!cioClient) return;

    const { getRecommendationPage } = (cioClient as PageCapableClient).recommendations;

    if (typeof getRecommendationPage !== 'function') {
      setData(null);
      setStatus(RequestStatus.ERROR);
      setMessage(MISSING_PAGE_METHOD_MESSAGE);

      return;
    }

    setStatus(RequestStatus.FETCHING);

    getRecommendationPage
      .call(cioClient.recommendations, pageId, parameters)
      .then((response) => {
        setData(
          transformRecommendationPageResponse(response, {
            itemFieldGetters: itemFieldGetters || {},
          }),
        );
        setStatus(RequestStatus.SUCCESS);
        setMessage(null);
      })
      .catch((error) => {
        setData(null);
        setStatus(RequestStatus.ERROR);
        setMessage(error.message);
      });
  }, [cioClient, pageId, parameters, itemFieldGetters]);

  useEffect(fetchResult, [fetchResult]);

  return { data, status, message, refetch: fetchResult };
}
