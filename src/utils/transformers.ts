import {
  Nullable,
  RecommendationsResponse,
  RecommendationsResultType,
} from '@constructor-io/constructorio-client-javascript/lib/types';
import { Item, Variation, ApiVariation, Pod, ApiPod, RecommendationsData } from '../types';

export function transformPodData(podData: ApiPod): Pod {
  // Explicitly extract known properties to ensure correct mapping
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id, display_name, channels } = podData;

  return {
    id,
    displayName: display_name,
    channels,
    ...podData,
  };
}

export function transformResultVariation(variation: ApiVariation): Variation {
  const {
    url,
    image_url: imageUrl,
    group_ids: groupIds,
    description,
    facets,
    variation_id: variationId,
    ...otherMetadataFields
  }: any = variation.data;

  return {
    itemName: variation.value,

    // Flatten the data object
    variationId,
    url,
    imageUrl,
    description,

    // Remaining unmapped metadata fields
    data: otherMetadataFields,
  };
}

export function transformResultItem(resultItem: RecommendationsResultType): Item {
  const {
    id: itemId,
    image_url: imageUrl,
    group_ids: groupIds,
    variation_id: variationId,
    url,
    description,
    facets,
    groups,
    ...otherMetadataFields
  }: any = resultItem.data;

  return {
    itemName: resultItem.value,
    matchedTerms: resultItem.matched_terms,
    isSlotted: resultItem.is_slotted,
    variations: resultItem.variations?.map((variation: ApiVariation) =>
      transformResultVariation(variation),
    ),

    // Flatten the data object
    itemId,
    variationId,
    url,
    imageUrl,
    description,
    groupIds,

    // Remaining unmapped metadata fields
    data: otherMetadataFields,
  };
}

export function transformRecommendationResponse(
  res: RecommendationsResponse,
): Nullable<RecommendationsData> {
  const { response, request, result_id: resultId } = res;

  if (!response || !request) return null;

  return {
    resultId,
    request,
    response: {
      results: (response.results as RecommendationsResultType[]).map((result) =>
        transformResultItem(result),
      ),
      totalNumResults: response.total_num_results,
      pod: response.pod && transformPodData(response.pod),
    },
    rawApiResponse: res,
  } as RecommendationsData; // Type override due to partials in client-js
}
