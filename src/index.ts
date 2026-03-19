import CioRecommendations from './components/CioRecommendations';

// Components
export default CioRecommendations;
export {
  default as CioRecommendations,
  CioRecommendationsProvider,
} from './components/CioRecommendations';
export { default as PodHeader } from './components/PodHeader';

// Hooks
export { useCioRecommendationContext } from './hooks/useCioRecommendationContext';
export { default as useCioClient } from './hooks/useCioClient';
export {
  default as useRecommendationResults,
  isResponseLoaded,
  isResponseLoading,
  isResponseError,
} from './hooks/useRecommendationResults';

// Utils
export * as utils from './utils';

// Types
export * from './types';
export { CIO_EVENTS } from '@constructor-io/constructorio-ui-components';
export type {
  ProductCardEventDetail,
  CarouselNavEventDetail,
  CioEventDetailMap,
} from '@constructor-io/constructorio-ui-components';
export type {
  CioRecommendationsProps,
  CioRecommendationsRenderProps,
  CioRecommendationsComponentOverrides,
} from './components/CioRecommendations';
export type {
  CioRecommendationsErrorOverrides,
  CioRecommendationsErrorProps,
} from './components/CioRecommendations';
export type {
  CioRecommendationsLoadingOverrides,
  CioRecommendationsLoadingProps,
} from './components/CioRecommendations';
export type { PodHeaderOverrides, PodHeaderProps } from './components/PodHeader';
export type {
  UseRecommendationResultsProps,
  UseRecommendationResultsReturn,
  UseRecommendationsResultsReturnSuccess,
  UseRecommendationsResultsReturnFailure,
  UseRecommendationsResultsReturnLoading,
} from './hooks/useRecommendationResults';
