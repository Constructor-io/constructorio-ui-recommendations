import useRecommendationResults from '../../../src/hooks/useRecommendationResults';
import { renderHookServerSide, renderHookServerSideWithCioProvider } from '../../testUtils.server';
import { RequestStatus } from '../../../src/types';
import { testApiResponse } from '../../localExamples';

describe('Testing Hook on Server: useRecommendationResults with initial recommendation response', () => {
  it('should return recommendation results when initialRecommendationResponse is provided ', async () => {
    const { result } = renderHookServerSideWithCioProvider(() =>
      useRecommendationResults({ initialRecommendationResponse: testApiResponse }),
    );

    const {
      status,
      message,
      data: { resultId, request, response, rawApiResponse },
    } = result;

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

  it('should throw error if hook is not rendered within CioRecommendationsProvider context', () => {
    expect(() =>
      renderHookServerSide(() =>
        useRecommendationResults({ initialRecommendationResponse: testApiResponse }),
      ),
    ).toThrow();
  });
});
