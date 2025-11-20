import React, { useState, useMemo } from 'react';
import {
  RecommendationContextValue,
  CioRecommendationProviderProps,
  IncludeRenderProps,
} from '../../types';
import useCioClient from '../../hooks/useCioClient';
import { RecommendationContext } from '../../hooks/useCioRecommendationContext';

export default function CioRecommendationProvider(
  props: IncludeRenderProps<CioRecommendationProviderProps, RecommendationContextValue>,
) {
  const {
    children,
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

  return (
    <RecommendationContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </RecommendationContext.Provider>
  );
}
