import { ReactNode } from 'react';
import ConstructorIOClient, {
  Nullable,
  Item as ApiItem,
  ConstructorClientOptions,
  RecommendationsResponse as ApiRecommendationsResponse,
  RecommendationsRequestType as RecommendationsRequestModel,
  RecommendationsParameters,
} from '@constructor-io/constructorio-client-javascript';

export interface Item {
  itemName: string;
  matchedTerms: Array<string>;
  isSlotted: boolean;
  variations?: Array<Variation>;

  // Flattened Data Object
  itemId: string;
  variationId?: string;
  url?: string;
  imageUrl?: string;
  description?: string;
  groupIds?: Array<string>;

  // Remaining unmapped metadata fields
  data: Record<string, any>;
}

export interface Variation
  extends Omit<Item, 'variations' | 'matchedTerms' | 'isSlotted' | 'itemId' | 'groupIds'> {}

export interface ApiVariation
  extends Omit<ApiItem, 'variations' | 'matched_terms' | 'is_slotted'> {}

export interface Pod {
  id: string;
  displayName: string;
  channels?: Array<string>;
  [key: string]: any;
}

export interface ApiPod extends Omit<Pod, 'displayName'> {
  display_name: string;
}

export interface RecommendationsResponseModel extends Record<string, any> {
  results: Array<Item>;
  totalNumResults: number;
  pod: Pod;
}

export interface RecommendationsData {
  resultId: string;
  request: RecommendationsRequestModel;
  response: RecommendationsResponseModel;
  rawApiResponse: ApiRecommendationsResponse;
}

export enum RequestStatus {
  IDLE = 'idle',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface CioClientOptions extends Omit<ConstructorClientOptions, 'apiKey' | 'version'> {}

export interface RecommendationContextValue {
  podId: string;
  cioClient: Nullable<ConstructorIOClient>;
  cioClientOptions: CioClientOptions;
  setCioClientOptions: (options: CioClientOptions) => void;
  parameters?: RecommendationsParameters;
}

export interface CioRecommendationProviderProps {
  apiKey: string;
  podId: string;
  cioClient?: Nullable<ConstructorIOClient>;
  cioClientOptions?: CioClientOptions;
  parameters?: RecommendationsParameters;
}

export type IncludeRenderProps<ComponentProps, ChildrenFunctionProps> = ComponentProps & {
  children?: ((props: ChildrenFunctionProps) => ReactNode) | React.ReactNode;
};

export interface SwatchItem {
  variationId?: string;
  url?: string;
  itemName?: string;
  imageUrl?: string;
  rolloverImage?: string;
  price?: number;
  salePrice?: number;
  swatchPreview?: string;
}

export interface ItemFieldGetters {
  getPrice: (item: Item | Variation) => number;
  getSalePrice: (item: Item | Variation) => number | undefined;
  getRolloverImage: (item: Item | Variation) => string | undefined;
  getSwatchPreview: (variation: Variation) => string | undefined;
  getSwatches: (
    item: Item,
    retrievePrice: ItemFieldGetters['getPrice'],
    retrieveSalePrice: ItemFieldGetters['getSalePrice'],
    retrieveRolloverImage: ItemFieldGetters['getRolloverImage'],
    retrieveSwatchPreview: ItemFieldGetters['getSwatchPreview'],
  ) => Array<SwatchItem> | undefined;
}

export {
  Nullable,
  RecommendationsParameters,
  ApiRecommendationsResponse,
  RecommendationsRequestModel,
  ApiItem,
};
