import { getRecommendationsPodContainerDataAttributes } from '../../src/utils/dataAttributeHelpers';
import { transformRecommendationResponse } from '../../src/utils/transformers';
import { testApiResponse } from '../localExamples';

describe('dataAttributeHelpers', () => {
  describe('getRecommendationsPodContainerDataAttributes', () => {
    it('returns correct data attributes for recommendations', () => {
      const transformedData = transformRecommendationResponse(testApiResponse);

      expect(transformedData).not.toBeNull();

      const attributes = getRecommendationsPodContainerDataAttributes(transformedData!);

      expect(attributes).toEqual({
        'data-cnstrc-recommendations': true,
        'data-cnstrc-recommendations-pod-id': 'bestsellers',
        'data-cnstrc-num-results': 10,
        'data-cnstrc-result-id': 'sample-result-id',
        'data-cnstrc-recommendations-seed-items': undefined,
      });
    });

    it('includes seed items when item_id is present in request', () => {
      const apiResponseWithItemId = {
        ...testApiResponse,
        request: {
          ...testApiResponse.request,
          item_id: ['item-1', 'item-2'],
        },
      };

      const transformedData = transformRecommendationResponse(apiResponseWithItemId);

      expect(transformedData).not.toBeNull();

      const attributes = getRecommendationsPodContainerDataAttributes(transformedData!);

      expect(attributes['data-cnstrc-recommendations-seed-items']).toEqual(['item-1', 'item-2']);
    });

    it('handles zero results', () => {
      const emptyApiResponse = {
        ...testApiResponse,
        result_id: 'empty-result-id',
        request: {
          pod_id: 'empty-pod',
        },
        response: {
          total_num_results: 0,
          results: [],
          pod: {
            id: 'empty-pod',
            display_name: 'Empty Pod',
            channels: [],
          },
        },
      };

      const transformedData = transformRecommendationResponse(emptyApiResponse);

      expect(transformedData).not.toBeNull();

      const attributes = getRecommendationsPodContainerDataAttributes(transformedData!);

      expect(attributes['data-cnstrc-num-results']).toBe(0);
      expect(attributes['data-cnstrc-result-id']).toBe('empty-result-id');
      expect(attributes['data-cnstrc-recommendations-pod-id']).toBe('empty-pod');
    });
  });
});
