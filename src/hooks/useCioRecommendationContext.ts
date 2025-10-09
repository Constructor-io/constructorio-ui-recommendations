import { createContext, useContext } from 'react';
import { Nullable, RecommendationContextValue } from '../types';

export const RecommendationContext = createContext<Nullable<RecommendationContextValue>>(null);
RecommendationContext.displayName = 'RecommendationContext';

/**
 * A custom hook to access state provided by CioRecommendation provider
 *
 * @remarks
 * Should only be used by components nested within the CioRecommendationProvider
 *
 * @returns The current recommendation context value
 * @throws Error when used outside of a CioRecommendation provider
 */
export function useCioRecommendationContext() {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useCioRecommendationContext must be used within CioRecommendation');
  }

  return context;
}
