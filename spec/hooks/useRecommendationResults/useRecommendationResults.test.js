import { renderHook, waitFor } from '@testing-library/react';
import { renderHookWithCioProvider } from '../../testUtils';
import useRecommendationResults from '../../../src/hooks/useRecommendationResults';
import { RequestStatus } from '../../../src/types';
import { testApiResponse } from '../../localExamples';

describe('Testing Hook: useRecommendationResults', () => {
  it('should fetch recommendation results successfully', async () => {
    const { result } = renderHookWithCioProvider(() => useRecommendationResults());

    await waitFor(() => {
      const { current } = result;
      const {
        status,
        message,
        data: { resultId, request, response, rawApiResponse },
      } = current;

      expect(status).toBe(RequestStatus.SUCCESS);
      expect(message).toBeNull();

      expect(resultId).toBeDefined();
      expect(request).toBeDefined();
      expect(rawApiResponse).toBeDefined();
      expect(response).toBeDefined();
      expect(response.totalNumResults).toBe(testApiResponse.response.total_num_results);
      expect(response.pod).toBeDefined();
      expect(response.pod.id).toBe(testApiResponse.response.pod.id);
      expect(response.results).toBeDefined();
      expect(response.results.length).toBe(testApiResponse.response.results.length);
    });
  });

  it('should throw error if hook is not rendered within CioRecommendationsProvider context', () => {
    expect(() => renderHook(() => useRecommendationResults())).toThrow();
  });
});
