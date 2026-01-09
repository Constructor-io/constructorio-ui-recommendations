import {
  Nullable,
  Item,
  Variation,
  Pod,
  RecommendationsData,
  ApiItem,
  ApiVariation,
  ApiPod,
  ApiRecommendationsResponse,
  ItemFieldGetters,
} from '../types';

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

export function transformResultVariation(
  variation: ApiVariation,
  options: { itemFieldGetters?: Partial<ItemFieldGetters> } = {},
): Variation {
  const {
    url,
    image_url: imageUrl,
    group_ids: groupIds,
    description,
    facets,
    variation_id: variationId,
    ...otherMetadataFields
  }: any = variation.data;
  const { itemFieldGetters } = options;

  return {
    name: variation.value,

    // Flatten the data object
    variationId,
    url,
    imageUrl,
    description,

    // itemFieldGetters
    price: itemFieldGetters?.getPrice?.(variation),
    salePrice: itemFieldGetters?.getSalePrice?.(variation),

    // Remaining unmapped metadata fields
    data: otherMetadataFields,
  };
}

export function transformResultItem(
  resultItem: ApiItem,
  options: { itemFieldGetters?: Partial<ItemFieldGetters> } = {},
): Item {
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
  const { itemFieldGetters } = options;

  return {
    name: resultItem.value,
    matchedTerms: resultItem.matched_terms,
    isSlotted: resultItem.is_slotted,
    labels: resultItem.labels,
    variations: resultItem.variations?.map((variation: ApiVariation) =>
      transformResultVariation(variation, options),
    ),
    strategy: resultItem.strategy,

    // Flatten the data object
    id: itemId,
    variationId,
    url,
    imageUrl,
    description,
    groupIds,

    // Flatten the labels object
    slCampaignId: resultItem.labels?.sl_campaign_id as string | undefined,
    slCampaignOwner: resultItem.labels?.sl_campaign_owner as string | undefined,

    // Flatten the strategy object
    strategy_id: resultItem.strategy?.id,

    // itemFieldGetters
    price: itemFieldGetters?.getPrice?.(resultItem),
    salePrice: itemFieldGetters?.getSalePrice?.(resultItem),

    // Remaining unmapped metadata fields
    data: otherMetadataFields,
  };
}

export function transformRecommendationResponse(
  res: ApiRecommendationsResponse,
  options?: { itemFieldGetters: Partial<ItemFieldGetters> },
): Nullable<RecommendationsData> {
  const { response, request, result_id: resultId } = res;

  if (!response || !request) return null;

  return {
    resultId,
    request,
    response: {
      results: (response.results as ApiItem[]).map((result) =>
        transformResultItem(result, options),
      ),
      totalNumResults: response.total_num_results,
      pod: response.pod && transformPodData(response.pod),
    },
    rawApiResponse: res,
  } as RecommendationsData; // Type override due to partials in client-js
}
