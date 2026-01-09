import { RecommendationsData } from '../types';

// eslint-disable-next-line import/prefer-default-export
export function getRecommendationsPodContainerDataAttributes(data: RecommendationsData) {
  return {
    'data-cnstrc-recommendations': true,
    'data-cnstrc-recommendations-pod-id': data.response.pod.id,
    'data-cnstrc-num-results': data.response.totalNumResults,
    'data-cnstrc-result-id': data.resultId,
    'data-cnstrc-recommendations-seed-items': data.request.item_id ?? undefined,
  };
}
