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
  name: string;
  matchedTerms: Array<string>;
  isSlotted: boolean;
  variations?: Array<Variation>;
  labels: Record<string, any>;
  strategy?: { id: string };

  // Flattened Data Object
  id: string;
  variationId?: string;
  url?: string;
  imageUrl?: string;
  description?: string;
  groupIds?: Array<string>;

  // Flattened labels
  slCampaignId?: string;
  slCampaignOwner?: string;

  // Flattened strategy
  strategy_id?: string;

  // ItemFieldGetter Fields
  price?: number;
  salePrice?: number;

  // Remaining unmapped metadata fields
  data: Record<string, any>;
}

export interface Variation
  extends Omit<
    Item,
    'variations' | 'matchedTerms' | 'isSlotted' | 'id' | 'groupIds' | 'strategy' | 'labels'
  > {}

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

export interface RecommendationsContextValue {
  podId: string;
  podSubheader?: string;
  cioClient: Nullable<ConstructorIOClient>;
  cioClientOptions: CioClientOptions;
  setCioClientOptions: (options: CioClientOptions) => void;
  parameters?: RecommendationsParameters;
  itemFieldGetters: ItemFieldGetters;
}

export interface CioRecommendationsProviderProps {
  apiKey: string;
  podId: string;
  podSubheader?: string;
  cioClient?: Nullable<ConstructorIOClient>;
  cioClientOptions?: CioClientOptions;
  parameters?: RecommendationsParameters;
  itemFieldGetters?: Partial<ItemFieldGetters>;
}

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
  getPrice: (item: ApiItem | ApiVariation) => number | undefined;
  getSalePrice: (item: ApiItem | ApiVariation) => number | undefined;
  getRolloverImage: (item: ApiItem | ApiVariation) => string | undefined;
  getSwatchPreview: (variation: ApiVariation) => string | undefined;
  getSwatches: (
    item: ApiItem,
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

export type RenderPropsChildren<RenderProps> = ((props: RenderProps) => ReactNode) | ReactNode;

// --- Type Helpers

// Abstract Type
export interface ComponentOverrideProps<T> {
  htmlRender?: (props?: T) => HTMLElement; // Unimplemented
  reactNode?: RenderPropsChildren<T>;
}

/**
 * Includes a `children` property of type:
 * - ReactNode or,
 * - (renderProps) => ReactNode
 *
 * Abstract type to be extended
 */
export type IncludeRenderProps<ChildrenFunctionProps> = {
  children?: RenderPropsChildren<ChildrenFunctionProps>;
};

/**
 * Includes the `componentOverrides` property of type:
 * - ComponentOverrideProps<T>
 * - Other sub-components J overrides of types `IncludeComponentOverrides<J>`
 *
 * Abstract type to be extended
 */
export type IncludeComponentOverrides<T> = {
  /**
   * ReactNode/RenderProps function overrides for current and sub-components down the tree
   */
  componentOverrides?: T;
};
