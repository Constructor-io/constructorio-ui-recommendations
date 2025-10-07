import testItem from '../local_examples/item.json';
import testApiResponse from '../local_examples/apiRecommendationResponse.json';
import {
  transformPodData,
  transformResultVariation,
  transformResultItem,
  transformRecommendationResponse,
} from '../../src/utils/transformers';

const testPodData = {
  id: 'testPodId',
  display_name: 'Test Pod',
  channels: ['web', 'mobile'],
};

describe('Testing Transformers: transformPodData', () => {
  it('should transform pod data with basic properties', () => {
    const transformedPod = transformPodData(testPodData);

    expect(transformedPod.id).toBe(testPodData.id);
    expect(transformedPod.displayName).toBe(testPodData.display_name);
    expect(transformedPod.channels).toEqual(testPodData.channels);
  });

  it('should include additional properties from the input object', () => {
    const testPodDataWithExtraField = {
      ...testPodData,
      extraField: 'extraValue',
    };

    const transformedPod = transformPodData(testPodDataWithExtraField);

    expect(transformedPod.extraField).toBe(testPodDataWithExtraField.extraField);
  });
});

describe('Testing Transformers: transformResultVariation', () => {
  it('should transform item variation with basic properties', () => {
    const testVariant = testItem.variations[0];
    const transformedVariation = transformResultVariation(testVariant);

    // Transformed base properties
    expect(typeof transformedVariation.itemName).toBe('string');
    expect(transformedVariation.itemName).toBe(testVariant.value);

    expect(typeof transformedVariation.variationId).toBe('string');
    expect(transformedVariation.variationId).toBe(testVariant.data.variation_id);

    // Flattened properties
    expect(typeof transformedVariation.url).toBe('string');
    expect(transformedVariation.url).toBe(testVariant.data.url);

    expect(typeof transformedVariation.imageUrl).toBe('string');
    expect(transformedVariation.imageUrl).toBe(testVariant.data.image_url);

    // Ensure remaining metadata fields are captured in `data`
    expect(transformedVariation.data.price).toBe(testVariant.data.price);
    expect(transformedVariation.data.swatchPreview).toBe(testVariant.data.swatchPreview);
    expect(transformedVariation.data.rolloverImage).toBe(testVariant.data.rolloverImage);
  });
});

describe('Testing Transformers: transformResultItem', () => {
  it('should return all base properties as camelCased properties', () => {
    const transformedItem = transformResultItem(testItem);

    // Transformed base properties
    expect(typeof transformedItem.itemName).toBe('string');
    expect(transformedItem.itemName).toBe(testItem.value);

    expect(typeof transformedItem.matchedTerms).toBe('object');
    expect(transformedItem.matchedTerms).toBe(testItem.matched_terms);

    expect(typeof transformedItem.isSlotted).toBe('boolean');
    expect(transformedItem.isSlotted).toBe(testItem.is_slotted);

    expect(typeof transformedItem.variations).toBe('object');
    expect(transformedItem.variations?.length).toBe(testItem.variations.length);

    // Flattened properties
    expect(typeof transformedItem.itemId).toBe('string');
    expect(transformedItem.itemId).toBe(testItem.data.id);

    expect(typeof transformedItem.variationId).toBe('string');
    expect(transformedItem.variationId).toBe(testItem.data.variation_id);

    expect(typeof transformedItem.url).toBe('string');
    expect(transformedItem.url).toBe(testItem.data.url);

    expect(typeof transformedItem.imageUrl).toBe('string');
    expect(transformedItem.imageUrl).toBe(testItem.data.image_url);

    expect(typeof transformedItem.description).toBe('string');
    expect(transformedItem.description).toBe(testItem.data.description);

    expect(typeof transformedItem.groupIds).toBe('object');
    expect(transformedItem.groupIds).toBe(testItem.data.group_ids);

    // Ensure remaining metadata fields are captured in `data`
    expect(transformedItem.data.price).toBe(testItem.data.price);
    expect(transformedItem.data.altPrice).toBe(testItem.data.altPrice);
  });
});

describe('Testing Transformers: transformRecommendationResponse', () => {
  it('should transform a full recommendation response correctly', () => {
    const result = transformRecommendationResponse(testApiResponse);

    expect(result).not.toBeNull();

    // Should transform response.results correctly
    expect(result?.response.results.length).toBe(testApiResponse.response.results.length);
    result?.response.results.forEach((transformedResult, index) => {
      expect(transformedResult.itemId).toEqual(testApiResponse.response.results[index].data.id);
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
});
