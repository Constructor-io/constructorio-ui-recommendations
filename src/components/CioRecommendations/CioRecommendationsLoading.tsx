import React from 'react';
import {
  ComponentOverrideProps,
  IncludeComponentOverrides,
  IncludeRenderProps,
  RenderPropsWrapper,
} from '@constructor-io/constructorio-ui-components';

export type CioRecommendationsLoadingOverrides = ComponentOverrideProps<null>;

export interface CioRecommendationsLoadingProps
  extends IncludeComponentOverrides<CioRecommendationsLoadingOverrides>,
    IncludeRenderProps<null> {}

export function CioRecommendationsLoading({
  componentOverrides,
  children,
}: CioRecommendationsLoadingProps) {
  return (
    <RenderPropsWrapper override={children || componentOverrides?.reactNode} props={null}>
      <div className='cio-loading'>Loading...</div>
    </RenderPropsWrapper>
  );
}
