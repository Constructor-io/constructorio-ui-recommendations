import React from 'react';
import {
  RecommendationContextValue,
  CioRecommendationProviderProps,
  IncludeRenderProps,
} from '../../types';
import { RecommendationContext } from '../../hooks/useCioRecommendationContext';
import useCioRecommendationProvider from '../../hooks/useCioRecommendationProvider';

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
