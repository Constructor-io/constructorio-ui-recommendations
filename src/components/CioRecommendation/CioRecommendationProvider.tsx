import React, { createContext } from 'react';
import {
  RecommendationContextValue,
  CioRecommendationProviderProps,
  IncludeRenderProps,
  Nullable,
} from '../../types';
import useCioRecommendationProvider from '../../hooks/useCioRecommendationProvider';

export const RecommendationContext = createContext<Nullable<RecommendationContextValue>>(null);
RecommendationContext.displayName = 'RecommendationContext';

export default function CioRecommendationProvider(
  props: IncludeRenderProps<CioRecommendationProviderProps, RecommendationContextValue>,
) {
  const { children, ...rest } = props;
  const contextValue = useCioRecommendationProvider(rest);

  return (
    <RecommendationContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </RecommendationContext.Provider>
  );
}
