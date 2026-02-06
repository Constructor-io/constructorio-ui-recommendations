import React, { useState, useMemo } from 'react';
import { IncludeRenderProps } from '@constructor-io/constructorio-ui-components';
import { RecommendationsContextValue, CioRecommendationsProviderProps } from '../../types';
import useCioClient from '../../hooks/useCioClient';
import { RecommendationContext } from '../../hooks/useCioRecommendationContext';
import * as defaultGetters from '../../utils/itemFieldGetters';

export default function CioRecommendationsProvider(
  props: CioRecommendationsProviderProps & IncludeRenderProps<RecommendationsContextValue>,
) {
  const {
    children,
    apiKey,
    podId,
    podSubheader,
    cioClient: customCioClient,
    cioClientOptions: customCioClientOptions = {},
    parameters,
    itemFieldGetters,
  } = props;

  const [cioClientOptions, setCioClientOptions] = useState(customCioClientOptions);
  const cioClient = useCioClient({ apiKey, cioClient: customCioClient, options: cioClientOptions });

  const contextValue = useMemo(
    (): RecommendationsContextValue => ({
      podId,
      podSubheader,
      cioClient,
      cioClientOptions,
      setCioClientOptions,
      parameters,
      itemFieldGetters: { ...defaultGetters, ...itemFieldGetters },
    }),
    [cioClient, cioClientOptions, podId, podSubheader, parameters, itemFieldGetters],
  );

  return (
    <RecommendationContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </RecommendationContext.Provider>
  );
}
