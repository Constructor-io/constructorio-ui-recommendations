import React from 'react';
import DisplayHookExample from '../DisplayHookExample';
import useRecommendationResults from '../../../hooks/useRecommendationResults';
import { CioRecommendationProviderProps } from '../../../types';

interface UseRecommendationResultsExampleProps extends CioRecommendationProviderProps {}

export default function UseRecommendationResultsExample(
  props: UseRecommendationResultsExampleProps,
) {
  return (
    <DisplayHookExample
      title='useRecommendationResults Example Results'
      renderHook={useRecommendationResults}
      providerProps={props}
    />
  );
}
