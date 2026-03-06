import React, { useState, useCallback } from 'react';
import {
  Carousel,
  CarouselOverrides,
  ComponentOverrideProps,
  IncludeComponentOverrides,
  IncludeRenderProps,
  ProductCard,
  RenderPropsWrapper,
} from '@constructor-io/constructorio-ui-components';
import useRecommendationResults, {
  isResponseError,
  isResponseLoaded,
  isResponseLoading,
} from '../../hooks/useRecommendationResults';
import CioRecommendationsProvider from './CioRecommendationsProvider';
import { CioRecommendationsProviderProps, Item, RecommendationsContextValue } from '../../types';
import { getRecommendationsPodContainerDataAttributes } from '../../utils/dataAttributeHelpers';
import { PodHeader, PodHeaderOverrides } from '../PodHeader/PodHeader';
import { useCioRecommendationContext } from '../../hooks/useCioRecommendationContext';
import {
  CioRecommendationsLoading,
  CioRecommendationsLoadingOverrides,
} from './CioRecommendationsLoading';
import {
  CioRecommendationsError,
  CioRecommendationsErrorOverrides,
} from './CioRecommendationsError';
import { useRecommendationEvents } from '../../hooks/useRecommendationEvents';

export interface CioRecommendationsRenderProps extends RecommendationsContextValue {
  items: Item[];
}

export interface CioRecommendationsComponentOverrides
  extends ComponentOverrideProps<CioRecommendationsRenderProps> {
  carousel?: CarouselOverrides;
  podHeader?: PodHeaderOverrides;
  loading?: CioRecommendationsLoadingOverrides;
  error?: CioRecommendationsErrorOverrides;
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
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);

  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== containerElement) {
        setContainerElement(node);
      }
    },
    [containerElement],
  );

  useRecommendationEvents(containerElement);

  if (isResponseLoading(recommendationsResponse)) {
    return <CioRecommendationsLoading componentOverrides={componentOverrides?.loading} />;
  }

  if (isResponseError(recommendationsResponse)) {
    return (
      <CioRecommendationsError
        componentOverrides={componentOverrides?.error}
        response={recommendationsResponse}
      />
    );
  }

  if (isResponseLoaded(recommendationsResponse)) {
    const podData = recommendationsResponse.data.response.pod;
    const items = recommendationsResponse.data.response.results;
    const { displayName } = podData;

    const dataAttributes = getRecommendationsPodContainerDataAttributes(
      recommendationsResponse.data,
    );

    return (
      <div ref={containerRef} className='cio-recommendations' {...dataAttributes}>
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
    <CioRecommendationsProvider {...restProps}>
      <CioRecommendationsInner componentOverrides={componentOverrides}>
        {children}
      </CioRecommendationsInner>
    </CioRecommendationsProvider>
  );
}

CioRecommendations.PodHeader = PodHeader;
CioRecommendations.Carousel = Carousel;
CioRecommendations.ProductCard = ProductCard;
CioRecommendations.Loading = CioRecommendationsLoading;
CioRecommendations.Error = CioRecommendationsError;
