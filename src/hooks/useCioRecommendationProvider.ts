import { useMemo, useState } from 'react';
import {
  IncludeRenderProps,
  CioRecommendationProviderProps,
  RecommendationContextValue,
} from '../types';
import useCioClient from './useCioClient';

/**
 * A custom hook to initialize and manage the shared states within the CioRecommendation context.
 *
 * @param {Object} props - The properties for the recommendation provider
 * @param {string} props.apiKey - Constructor.io API key
 * @param {string} props.podId - ID of the recommendation pod to use
 * @param {Nullable<ConstructorIOClient>} [props.cioClient] - Optional custom Constructor.io client instance
 * @param {CioClientOptions} [props.cioClientOptions]
 * - Optional configuration options for the Constructor.io client
 * @param {RecommendationsParameters} [props.parameters] - Optional additional parameters for recommendation requests
 *
 * @returns An object containing the recommendation context value with:
 *   - podId: The ID of the recommendation pod
 *   - cioClient: The Constructor.io client instance
 *   - cioClientOptions: Current client options
 *   - setCioClientOptions: Function to update client options
 *   - parameters: Additional parameters for recommendation requests
 */
export default function useCioRecommendationProvider(
  props: IncludeRenderProps<CioRecommendationProviderProps, RecommendationContextValue>,
) {
  const {
    apiKey,
    podId,
    cioClient: customCioClient,
    cioClientOptions: customCioClientOptions = {},
    parameters,
  } = props;

  const [cioClientOptions, setCioClientOptions] = useState(customCioClientOptions);
  const cioClient = useCioClient({ apiKey, cioClient: customCioClient, options: cioClientOptions });

  const contextValue = useMemo(
    (): RecommendationContextValue => ({
      podId,
      cioClient,
      cioClientOptions,
      setCioClientOptions,
      parameters,
    }),
    [cioClient, cioClientOptions, podId, parameters],
  );

  return contextValue;
}
