import React from 'react';
import {
  Carousel,
  CarouselOverrides,
  ComponentOverrideProps,
  IncludeComponentOverrides,
  IncludeRenderProps,
  RenderPropsWrapper,
} from '@constructor-io/constructorio-ui-components';
import useRecommendationResults, {
  isResponseError,
  isResponseLoaded,
  isResponseLoading,
} from '../../hooks/useRecommendationResults';
import CioRecommendationProvider from './CioRecommendationProvider';
import {
  CioRecommendationsProviderProps,
  Item,
  RecommendationsContextValue,
} from '../../types';
import { getRecommendationsPodContainerDataAttributes } from '../../utils/dataAttributeHelpers';
import { PodHeader, PodHeaderOverrides } from '../PodHeader/PodHeader';
import { useCioRecommendationContext } from '../../hooks/useCioRecommendationContext';

export interface CioRecommendationsRenderProps extends RecommendationsContextValue {
  items: Item[];
}

export interface CioRecommendationsComponentOverrides
  extends ComponentOverrideProps<CioRecommendationsRenderProps> {
  carousel?: CarouselOverrides;
  podHeader?: PodHeaderOverrides;
}

export interface CioRecommendationsInnerProps
  extends IncludeRenderProps<CioRecommendationsRenderProps>,
    IncludeComponentOverrides<CioRecommendationsComponentOverrides> {}

export interface CioRecommendationsProps
  extends CioRecommendationsProviderProps,
    CioRecommendationsInnerProps {}

export function CioRecommendationsInner(props: CioRecommendationsInnerProps) {
  const { children, componentOverrides } = props;
  const recommendationsResponse = useRecommendationResults();
  const context = useCioRecommendationContext();
  const { podSubheader } = context;

  if (isResponseLoading(recommendationsResponse)) {
    return <div className='cio-loading'>Loading...</div>;
  }

  if (isResponseError(recommendationsResponse)) {
    return <div className='cio-error'>Error loading recommendations</div>;
  }

  if (isResponseLoaded(recommendationsResponse)) {
    const podData = recommendationsResponse.data.response.pod;
    const items = recommendationsResponse.data.response.results;
    const { displayName } = podData;

    const dataAttributes = getRecommendationsPodContainerDataAttributes(
      recommendationsResponse.data,
    );

    return (
      <div className='cio-recommendations' {...dataAttributes}>
        <RenderPropsWrapper
          props={{ items, ...context }}
          override={children || componentOverrides?.reactNode}>
          <PodHeader
            podHeader={displayName}
            podSubheader={podSubheader}
            componentOverrides={componentOverrides?.podHeader}
          />
          <Carousel items={items} componentOverrides={componentOverrides?.carousel} />
        </RenderPropsWrapper>
      </div>
    );
  }

  return null;
}

export default function CioRecommendations(props: CioRecommendationsProps) {
  const { componentOverrides, children, ...restProps } = props;

  return (
    <CioRecommendationProvider {...restProps}>
      <CioRecommendationsInner componentOverrides={componentOverrides}>
        {children}
      </CioRecommendationsInner>
    </CioRecommendationProvider>
  );
}

CioRecommendations.PodHeader = PodHeader;
CioRecommendations.Carousel = Carousel;
