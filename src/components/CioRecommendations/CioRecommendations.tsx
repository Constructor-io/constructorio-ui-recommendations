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
import {
  CioRecommendationsProviderProps,
  Item,
  RecommendationsContextValue,
  RecommendationsData,
} from '../../types';
import { getRecommendationsPodContainerDataAttributes } from '../../utils/dataAttributeHelpers';
import PodHeader, { PodHeaderOverrides } from '../PodHeader';
import { useCioRecommendationContext } from '../../hooks/useCioRecommendationContext';
import {
  CioRecommendationsLoading,
  CioRecommendationsLoadingOverrides,
} from './CioRecommendationsLoading';
import {
  CioRecommendationsError,
  CioRecommendationsErrorOverrides,
} from './CioRecommendationsError';
import useRecommendationEvents from '../../hooks/useRecommendationEvents';

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

export interface CioRecommendationsResultsProps extends CioRecommendationsInnerProps {
  data: RecommendationsData;
}

/**
 * Renders one loaded pod: its tracking container, header and carousel.
 * Shared by `CioRecommendations` and `CioRecommendationsPage`.
 */
export function CioRecommendationsResults(props: CioRecommendationsResultsProps) {
  const { children, componentOverrides, data } = props;
  const context = useCioRecommendationContext();
  const { podSubheader } = context;
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerElement(node);
  }, []);

  useRecommendationEvents(containerElement);

  const podData = data.response.pod;
  const items = data.response.results;
  const { displayName } = podData;

  const dataAttributes = getRecommendationsPodContainerDataAttributes(data);

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

export function CioRecommendationsInner(props: CioRecommendationsInnerProps) {
  const { children, componentOverrides } = props;
  const recommendationsResponse = useRecommendationResults();

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
    return (
      <CioRecommendationsResults
        data={recommendationsResponse.data}
        componentOverrides={componentOverrides}>
        {children}
      </CioRecommendationsResults>
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
