import React from 'react';
import { DisplayHookExample } from '../utils';
import useRecommendationResults from '../../../hooks/useRecommendationResults';
import { CioRecommendationsProviderProps } from '../../../types';

interface UseRecommendationResultsExampleProps extends CioRecommendationsProviderProps {}

export default function UseRecommendationResultsExample(
  props: UseRecommendationResultsExampleProps,
) {
  return (
    <DisplayHookExample
      title='useRecommendationResults Example Results'
      providerProps={props}
      renderHook={useRecommendationResults}
    />
  );
}
