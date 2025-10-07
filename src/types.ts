import {
  Item as ApiItem,
  RecommendationsResponse as ApiRecommendationsResponse,
  RecommendationsRequestType,
} from '@constructor-io/constructorio-client-javascript/lib/types';

export interface Item {
  itemName: string;
  matchedTerms: Array<string>;
  isSlotted: boolean;
  variations?: Variation[];

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
  channels?: string[];
  [key: string]: any;
}

export interface ApiPod extends Omit<Pod, 'displayName'> {
  display_name: string;
}

export interface RecommendationsResponseModel extends Record<string, any> {
  results: Partial<Item>[];
  totalNumResults: number;
  pod: Pod;
}

export interface RecommendationsData {
  resultId: string;
  request: RecommendationsRequestType;
  response: RecommendationsResponseModel;
  rawApiResponse: ApiRecommendationsResponse;
}
