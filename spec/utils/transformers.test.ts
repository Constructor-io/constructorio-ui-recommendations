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
    expect(typeof result.itemName).toBe('string');
    expect(result.itemName).toBe(testVariant.value);

    expect(typeof result.variationId).toBe('string');
    expect(result.variationId).toBe(testVariant.data.variation_id);

    // Flattened properties
    expect(typeof result.url).toBe('string');
    expect(result.url).toBe(testVariant.data.url);

    expect(typeof result.imageUrl).toBe('string');
    expect(result.imageUrl).toBe(testVariant.data.image_url);

    // Ensure remaining metadata fields are captured in `data`
    expect(result.data.price).toBe(testVariant.data.price);
    expect(result.data.swatchPreview).toBe(testVariant.data.swatchPreview);
    expect(result.data.rolloverImage).toBe(testVariant.data.rolloverImage);
  });
});

describe('Testing Transformers: transformResultItem', () => {
  it('should return all base properties as camelCased properties', () => {
    const result = transformResultItem(testItem);

    // Transformed base properties
    expect(typeof result.itemName).toBe('string');
    expect(result.itemName).toBe(testItem.value);

    expect(typeof result.matchedTerms).toBe('object');
    expect(result.matchedTerms).toBe(testItem.matched_terms);

    expect(typeof result.isSlotted).toBe('boolean');
    expect(result.isSlotted).toBe(testItem.is_slotted);

    expect(typeof result.variations).toBe('object');
    expect(result.variations?.length).toBe(testItem.variations.length);

    // Flattened properties
    expect(typeof result.itemId).toBe('string');
    expect(result.itemId).toBe(testItem.data.id);

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
    expect(result.data.altPrice).toBe(testItem.data.altPrice);
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
