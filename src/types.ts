import {
  Nullable,
  Item as ApiItem,
  RecommendationsResponse as ApiRecommendationsResponse,
  RecommendationsRequestType as RecommendationsRequestModel,
} from '@constructor-io/constructorio-client-javascript/lib/types';

interface Item {
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

interface Variation
  extends Omit<Item, 'variations' | 'matchedTerms' | 'isSlotted' | 'itemId' | 'groupIds'> {}

interface ApiVariation extends Omit<ApiItem, 'variations' | 'matched_terms' | 'is_slotted'> {}

interface Pod {
  id: string;
  displayName: string;
  channels?: Array<string>;
  [key: string]: any;
}

interface ApiPod extends Omit<Pod, 'displayName'> {
  display_name: string;
}

interface RecommendationsResponseModel extends Record<string, any> {
  results: Array<Item>;
  totalNumResults: number;
  pod: Pod;
}

interface RecommendationsData {
  resultId: string;
  request: RecommendationsRequestModel;
  response: RecommendationsResponseModel;
  rawApiResponse: ApiRecommendationsResponse;
}

interface SwatchItem {
  variationId?: string;
  url?: string;
  itemName?: string;
  imageUrl?: string;
  rolloverImage?: string;
  price?: number;
  salePrice?: number;
  swatchPreview?: string;
}

interface ItemFieldGetters {
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
  Item,
  Variation,
  Pod,
  RecommendationsRequestModel,
  RecommendationsResponseModel,
  RecommendationsData,
  ApiItem,
  ApiVariation,
  ApiPod,
  ApiRecommendationsResponse,
  SwatchItem,
  ItemFieldGetters,
};
