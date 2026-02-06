import React from 'react';
import {
  ComponentOverrideProps,
  IncludeComponentOverrides,
  IncludeRenderProps,
  RenderPropsWrapper,
} from '@constructor-io/constructorio-ui-components';
import { UseRecommendationsResultsReturnFailure } from '../../hooks/useRecommendationResults';

export type CioRecommendationsErrorOverrides = ComponentOverrideProps<CioRecommendationsErrorProps>;

export interface CioRecommendationsErrorProps
  extends IncludeComponentOverrides<CioRecommendationsErrorOverrides>,
    IncludeRenderProps<CioRecommendationsErrorProps> {
  response: UseRecommendationsResultsReturnFailure;
}

export function CioRecommendationsError({
  componentOverrides,
  children,
  response,
}: CioRecommendationsErrorProps) {
  // eslint-disable-next-line no-console
  console.error(response.message);

  return (
    <RenderPropsWrapper override={children || componentOverrides?.reactNode} props={{ response }}>
      <div className='cio-error' />;
    </RenderPropsWrapper>
  );
}
