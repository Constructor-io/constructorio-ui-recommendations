import ConstructorIOClient, {
  Nullable,
  Item as ApiItem,
  ConstructorClientOptions,
  RecommendationsResponse as ApiRecommendationsResponse,
  RecommendationsRequestType as RecommendationsRequestModel,
  RecommendationsParameters,
} from '@constructor-io/constructorio-client-javascript';
import type {
  ProductCardEventDetail,
  CarouselNavEventDetail,
} from '@constructor-io/constructorio-ui-components';

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
  strategyId?: string;

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
  callbacks?: Callbacks;
  useShopifyDefaults?: boolean;
}

/**
 * Callback functions for recommendation component interactions.
 */
export interface Callbacks {
  /** Called when a product card is clicked (excluding add-to-cart/wishlist buttons) */
  onProductClick?: (e: CustomEvent<ProductCardEventDetail>) => void;
  /** Called when the add-to-cart button is clicked */
  onAddToCart?: (e: CustomEvent<ProductCardEventDetail>) => void;
  /** Called when the wishlist button is clicked */
  onAddToWishlist?: (e: CustomEvent<ProductCardEventDetail>) => void;
  /** Called when mouse enters a product card image */
  onProductImageEnter?: (e: CustomEvent<ProductCardEventDetail>) => void;
  /** Called when mouse leaves a product card image */
  onProductImageLeave?: (e: CustomEvent<ProductCardEventDetail>) => void;
  /** Called when the carousel next button is clicked */
  onCarouselNext?: (e: CustomEvent<CarouselNavEventDetail>) => void;
  /** Called when the carousel previous button is clicked */
  onCarouselPrevious?: (e: CustomEvent<CarouselNavEventDetail>) => void;
  /** Whether to allow event propagation past the container. Defaults to false. */
  allowPropagation?: boolean;
}

export interface CioRecommendationsProviderProps {
  apiKey: string;
  podId: string;
  podSubheader?: string;
  cioClient?: Nullable<ConstructorIOClient>;
  cioClientOptions?: CioClientOptions;
  parameters?: RecommendationsParameters;
  itemFieldGetters?: Partial<ItemFieldGetters>;
  callbacks?: Callbacks;
  useShopifyDefaults?: boolean;
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
