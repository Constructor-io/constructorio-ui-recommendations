import { createContext, useContext } from 'react';
import { Nullable, RecommendationContextValue } from '../types';

export const RecommendationContext = createContext<Nullable<RecommendationContextValue>>(null);
RecommendationContext.displayName = 'RecommendationContext';

/**
 * React Hook to access state provided by CioRecommendation provider.
 * Note: Should only be used by components nested under a CioRecommendation provider
 */
export function useCioRecommendationContext() {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useCioRecommendationContext must be used within CioRecommendationProvider');
  }

  return context;
}
