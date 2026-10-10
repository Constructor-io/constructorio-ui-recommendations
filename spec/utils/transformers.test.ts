import { testItem, testApiResponse } from '../localExamples';
import {
  transformPodData,
  transformResultVariation,
  transformResultItem,
  transformRecommendationResponse,
  toPodRecommendationsResponse,
  transformRecommendationPageResponse,
} from '../../src/utils/transformers';
import { getPrice, getSalePrice } from '../../src/utils/itemFieldGetters';

const testPodData = {
  id: 'testPodId',
  display_name: 'Test Pod',
  channels: ['web', 'mobile'],
};

describe('Testing Transformers: transformPodData', () => {
  it('should transform pod data with basic properties', () => {
    const result = transformPodData(testPodData);

    expect(result.id).toBe(testPodData.id);
    expect(result.displayName).toBe(testPodData.display_name);
    expect(result.channels).toEqual(testPodData.channels);
  });

  it('should include additional properties from the input object', () => {
    const testPodDataWithExtraField = {
      ...testPodData,
      extraField: 'extraValue',
    };

    const result = transformPodData(testPodDataWithExtraField);

    expect(result.extraField).toBe(testPodDataWithExtraField.extraField);
  });
});

describe('Testing Transformers: transformResultVariation', () => {
  it('should transform item variation with basic properties', () => {
    const testVariant = testItem.variations[0];
    const result = transformResultVariation(testVariant);

    // Transformed base properties
    expect(typeof result.name).toBe('string');
    expect(result.name).toBe(testVariant.value);

    expect(typeof result.variationId).toBe('string');
    expect(result.variationId).toBe(testVariant.data.variation_id);

    // Flattened properties
    expect(typeof result.url).toBe('string');
    expect(result.url).toBe(testVariant.data.url);

    expect(typeof result.imageUrl).toBe('string');
    expect(result.imageUrl).toBe(testVariant.data.image_url);

    // Ensure remaining metadata fields are captured in `data`
    expect(result.data.price).toBe(testVariant.data.price);
    expect(result.data.sale_price).toBe(testVariant.data.sale_price);
    expect(result.data.swatch_preview).toBe(testVariant.data.swatch_preview);
    expect(result.data.rollover_image).toBe(testVariant.data.rollover_image);
  });

  it('should apply itemFieldGetters when provided', () => {
    const testVariant = testItem.variations[0];
    const itemFieldGetters = {
      getPrice,
      getSalePrice,
    };

    const result = transformResultVariation(testVariant, {
      itemFieldGetters,
    });

    expect(result.price).toBe(testVariant.data.price);
    expect(result.salePrice).toBe(testVariant.data.sale_price);
  });
});

describe('Testing Transformers: transformResultItem', () => {
  it('should return all base properties as camelCased properties', () => {
    const result = transformResultItem(testItem);

    // Transformed base properties
    expect(typeof result.name).toBe('string');
    expect(result.name).toBe(testItem.value);

    expect(typeof result.matchedTerms).toBe('object');
    expect(result.matchedTerms).toBe(testItem.matched_terms);

    expect(typeof result.isSlotted).toBe('boolean');
    expect(result.isSlotted).toBe(testItem.is_slotted);

    expect(typeof result.variations).toBe('object');
    expect(result.variations?.length).toBe(testItem.variations.length);

    // Flattened properties
    expect(typeof result.id).toBe('string');
    expect(result.id).toBe(testItem.data.id);

    expect(typeof result.variationId).toBe('string');
    expect(result.variationId).toBe(testItem.data.variation_id);

    expect(typeof result.url).toBe('string');
    expect(result.url).toBe(testItem.data.url);

    expect(typeof result.imageUrl).toBe('string');
    expect(result.imageUrl).toBe(testItem.data.image_url);

    expect(typeof result.description).toBe('string');
    expect(result.description).toBe(testItem.data.description);

    expect(typeof result.groupIds).toBe('object');
    expect(result.groupIds).toBe(testItem.data.group_ids);

    // Ensure remaining metadata fields are captured in `data`
    expect(result.data.price).toBe(testItem.data.price);
    expect(result.data.sale_price).toBe(testItem.data.sale_price);
    expect(result.data.rollover_image).toBe(testItem.data.rollover_image);
  });

  it('should flatten labels and strategy fields', () => {
    const result = transformResultItem(testItem);

    expect(result.labels).toBeDefined();
    expect(result.strategy).toBeDefined();
    expect(result.strategyId).toBe(testItem.strategy?.id);
  });

  it('should apply itemFieldGetters when provided', () => {
    const itemFieldGetters = {
      getPrice,
      getSalePrice,
    };

    const result = transformResultItem(testItem, { itemFieldGetters });

    expect(result.price).toBe(testItem.data.price);
    expect(result.salePrice).toBe(testItem.data.sale_price);
  });
});

describe('Testing Transformers: transformRecommendationResponse', () => {
  it('should transform a full recommendation response correctly', () => {
    const result = transformRecommendationResponse(testApiResponse);

    expect(result).not.toBeNull();

    // Should transform response.results correctly
    expect(result?.response.results.length).toBe(testApiResponse.response.results.length);
    result?.response.results.forEach((transformedResult, index) => {
      expect(transformedResult.id).toEqual(testApiResponse.response.results[index].data.id);
      expect(transformedResult.variationId).toEqual(
        testApiResponse.response.results[index].data.variation_id,
      );
    });

    // Should transform response.total_num_results correctly
    expect(result?.response.totalNumResults).toBe(testApiResponse.response.total_num_results);

    // Should transform response.pod correctly
    expect(result?.response.pod).not.toBeNull();
    expect(result?.response.pod?.id).toBe(testApiResponse.response.pod.id);

    // Should maintain request and raw API object
    expect(result?.request).toBe(testApiResponse.request);
    expect(result?.rawApiResponse).toBe(testApiResponse);
  });

  it('should apply itemFieldGetters to all items when provided', () => {
    const itemFieldGetters = {
      getPrice,
      getSalePrice,
    };

    const result = transformRecommendationResponse(testApiResponse, {
      itemFieldGetters,
    });

    expect(result).not.toBeNull();
    result?.response.results.forEach((transformedResult) => {
      expect(transformedResult.price).toBeDefined();
    });
  });
});

describe('Testing Transformers: toPodRecommendationsResponse', () => {
  const pod = {
    pod_id: 'similar_items',
    request: { item_id: 'product-123', num_results: 12 },
    response: {
      results: [],
      total_num_results: 0,
      pod: { id: 'similar_items', display_name: 'Similar Items' },
    },
    result_id: 'similar-result-id',
  };

  it('should use the pod result_id and add pod_id to the request', () => {
    const result = toPodRecommendationsResponse(pod);

    expect(result.result_id).toBe('similar-result-id');
    expect(result.request.pod_id).toBe('similar_items');
    expect(result.request.item_id).toBe('product-123');
    expect(result.response.pod).toEqual(pod.response.pod);
  });

  it('should fall back to pod_id when the response has no pod object', () => {
    const result = toPodRecommendationsResponse({
      ...pod,
      response: { results: [], total_num_results: 0 } as any,
    });

    expect(result.response.pod).toEqual({ id: 'similar_items', display_name: 'similar_items' });
  });
});

describe('Testing Transformers: transformRecommendationPageResponse', () => {
  const pageResponse = {
    request: { page_id: 'pdp_b2c' },
    response: {
      page_id: 'pdp_b2c',
      display_name: 'PDP - B2C',
      page_type: 'pdp',
      pods: [
        {
          pod_id: 'similar_items',
          request: {},
          response: {
            results: testApiResponse.response.results,
            total_num_results: testApiResponse.response.results.length,
            pod: { id: 'similar_items', display_name: 'Similar Items' },
          },
          result_id: 'similar-result-id',
        },
        {
          pod_id: 'complete_the_look',
          request: {},
          response: {
            results: [],
            total_num_results: 0,
            pod: { id: 'complete_the_look', display_name: 'Complete the Look' },
          },
          result_id: 'complete-result-id',
        },
      ],
    },
    result_id: 'page-result-id',
  };

  it('should keep pods in page order, each with its own resultId', () => {
    const result = transformRecommendationPageResponse(pageResponse as any);

    expect(result?.resultId).toBe('page-result-id');
    expect(result?.pageId).toBe('pdp_b2c');
    expect(result?.pageType).toBe('pdp');
    expect(result?.pods.map((pod) => pod.response.pod.id)).toEqual([
      'similar_items',
      'complete_the_look',
    ]);
    expect(result?.pods.map((pod) => pod.resultId)).toEqual([
      'similar-result-id',
      'complete-result-id',
    ]);
    expect(result?.pods[0].response.results).toHaveLength(testApiResponse.response.results.length);
  });

  it('should return null when the response has no pods', () => {
    expect(transformRecommendationPageResponse({ response: {} } as any)).toBeNull();
  });
});
