import { useMemo, useState } from 'react';
import { RecommendationContextValue, CioRecommendationProviderProps } from '../types';
import useCioClient from './useCioClient';

export default function useCioRecommendationProvider(props: CioRecommendationProviderProps) {
  const {
    apiKey,
    podId,
    cioClient: customCioClient,
    cioClientOptions: customCioClientOptions = {},
  } = props;

  const [cioClientOptions, setCioClientOptions] = useState(customCioClientOptions);
  const cioClient = useCioClient({ apiKey, cioClient: customCioClient, options: cioClientOptions });

  const contextValue = useMemo(
    (): RecommendationContextValue => ({
      podId,
      cioClient,
      cioClientOptions,
      setCioClientOptions,
    }),
    [cioClient, cioClientOptions, podId],
  );

  return contextValue;
}
