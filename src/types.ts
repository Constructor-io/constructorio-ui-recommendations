import { ReactNode } from 'react';
import ConstructorIOClient, {
  Nullable,
  Item as ApiItem,
  RecommendationsResponse as ApiRecommendationsResponse,
  RecommendationsRequestType as RecommendationsRequestModel,
  ConstructorClientOptions,
} from '@constructor-io/constructorio-client-javascript';

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

enum RequestStatus {
  IDLE = 'idle',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface CioClientOptions extends Omit<ConstructorClientOptions, 'apiKey' | 'version'> {}

interface RecommendationContextValue {
  podId: string;
  cioClient: Nullable<ConstructorIOClient>;
  cioClientOptions: CioClientOptions;
  setCioClientOptions: (options: CioClientOptions) => void;
}

interface CioRecommendationProviderProps {
  apiKey: string;
  podId: string;
  cioClient?: Nullable<ConstructorIOClient>;
  cioClientOptions?: CioClientOptions;
}

type IncludeRenderProps<ComponentProps, ChildrenFunctionProps> = ComponentProps & {
  children?: ((props: ChildrenFunctionProps) => ReactNode) | React.ReactNode;
};

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
  RequestStatus,
  RecommendationContextValue,
  CioClientOptions,
  CioRecommendationProviderProps,
  IncludeRenderProps,
};
