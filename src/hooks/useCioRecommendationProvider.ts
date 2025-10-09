import { useMemo, useState } from 'react';
import {
  IncludeRenderProps,
  CioRecommendationProviderProps,
  RecommendationContextValue,
} from '../types';
import useCioClient from './useCioClient';

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
