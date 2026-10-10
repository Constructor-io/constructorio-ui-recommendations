import React, { useMemo } from 'react';
import { IncludeComponentOverrides } from '@constructor-io/constructorio-ui-components';
import ConstructorIOClient, { Nullable } from '@constructor-io/constructorio-client-javascript';
import CioRecommendationsProvider from '../CioRecommendations/CioRecommendationsProvider';
import {
  CioRecommendationsComponentOverrides,
  CioRecommendationsResults,
} from '../CioRecommendations/CioRecommendations';
import { CioRecommendationsLoading } from '../CioRecommendations/CioRecommendationsLoading';
import { CioRecommendationsError } from '../CioRecommendations/CioRecommendationsError';
import useCioClient from '../../hooks/useCioClient';
import useRecommendationPageResults from '../../hooks/useRecommendationPageResults';
import { UseRecommendationsResultsReturnFailure } from '../../hooks/useRecommendationResults';
import {
  Callbacks,
  CioClientOptions,
  ItemFieldGetters,
  RecommendationPageParameters,
  RequestStatus,
} from '../../types';
import * as defaultGetters from '../../utils/itemFieldGetters';

export interface CioRecommendationsPageProps
  extends IncludeComponentOverrides<CioRecommendationsComponentOverrides> {
  /** Required unless `cioClient` is provided */
  apiKey: string;
  /** The recommendation page to render */
  pageId: string;
  cioClient?: Nullable<ConstructorIOClient>;
  cioClientOptions?: CioClientOptions;
  /** Page-wide parameters and per-pod `podOverrides` */
  parameters?: RecommendationPageParameters;
  /** Subheaders keyed by pod id */
  podSubheaders?: Record<string, string>;
  itemFieldGetters?: Partial<ItemFieldGetters>;
  /** Applied to every pod on the page */
  callbacks?: Callbacks;
}

/**
 * Renders every pod on a recommendation page from one page request.
 *
 * Each pod is rendered by the same component as `CioRecommendations`, in its own
 * `[data-cnstrc-recommendations]` container carrying that pod's id and its own `result_id`.
 * The page's top-level `result_id` is not used for tracking.
 */
export default function CioRecommendationsPage(props: CioRecommendationsPageProps) {
  const {
    apiKey,
    pageId,
    cioClient: customCioClient,
    cioClientOptions,
    parameters,
    podSubheaders,
    itemFieldGetters: customItemFieldGetters,
    callbacks,
    componentOverrides,
  } = props;

  const cioClient = useCioClient({ apiKey, cioClient: customCioClient, options: cioClientOptions });
  const itemFieldGetters = useMemo(
    () => ({ ...defaultGetters, ...customItemFieldGetters }),
    [customItemFieldGetters],
  );
  const pageResponse = useRecommendationPageResults({
    cioClient,
    pageId,
    parameters,
    itemFieldGetters,
  });

  const { status, data } = pageResponse;

  if (status === RequestStatus.IDLE || status === RequestStatus.FETCHING) {
    return <CioRecommendationsLoading componentOverrides={componentOverrides?.loading} />;
  }

  if (status === RequestStatus.ERROR) {
    return (
      <CioRecommendationsError
        componentOverrides={componentOverrides?.error}
        response={pageResponse as unknown as UseRecommendationsResultsReturnFailure}
      />
    );
  }

  if (status === RequestStatus.SUCCESS && data) {
    return (
      <div className='cio-recommendations-page'>
        {data.pods.map((pod) => (
          <CioRecommendationsProvider
            key={pod.response.pod.id}
            apiKey={apiKey}
            cioClient={cioClient}
            podId={pod.response.pod.id}
            podSubheader={podSubheaders?.[pod.response.pod.id]}
            itemFieldGetters={customItemFieldGetters}
            callbacks={callbacks}>
            <CioRecommendationsResults data={pod} componentOverrides={componentOverrides} />
          </CioRecommendationsProvider>
        ))}
      </div>
    );
  }

  return null;
}
