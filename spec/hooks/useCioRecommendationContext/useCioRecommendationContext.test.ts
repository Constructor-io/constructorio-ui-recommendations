import { renderHook } from '@testing-library/react';
import { useCioRecommendationContext } from '../../../src/hooks/useCioRecommendationContext';
import { renderHookWithCioProvider } from '../../testUtils';
import { DEMO_POD_ID } from '../../../src/constants';

describe('Testing Hook: useCioRecommendationContext', () => {
  it('should throw an error when used outside of CioRecommendationProvider', () => {
    expect(() => {
      renderHook(() => useCioRecommendationContext());
    }).toThrow('useCioRecommendationContext must be used within CioRecommendation');
  });

  it('should return context value when used within CioRecommendationProvider', () => {
    const { result } = renderHookWithCioProvider(() => useCioRecommendationContext());

    expect(result.current).toBeDefined();
    expect(result.current.podId).toBeDefined();
    expect(result.current.cioClient).toBeDefined();
    expect(result.current.cioClientOptions).toBeDefined();
    expect(result.current.setCioClientOptions).toBeInstanceOf(Function);
    expect(result.current.itemFieldGetters).toBeDefined();
  });

  it('should return the podId passed to the provider', () => {
    const { result } = renderHookWithCioProvider(() => useCioRecommendationContext());

    // DEMO_POD_ID from constants is 'bestsellers'
    expect(result.current.podId).toBe(DEMO_POD_ID);
  });

  it('should return parameters when provided to the provider', () => {
    const { result } = renderHookWithCioProvider(() => useCioRecommendationContext(), {
      initialProps: { parameters: { num_results: 5 } },
    });

    expect(result.current.parameters).toEqual({ num_results: 5 });
  });

  it('should return itemFieldGetters with default functions', () => {
    const { result } = renderHookWithCioProvider(() => useCioRecommendationContext());

    const { itemFieldGetters } = result.current;
    expect(itemFieldGetters.getPrice).toBeInstanceOf(Function);
    expect(itemFieldGetters.getSalePrice).toBeInstanceOf(Function);
    expect(itemFieldGetters.getRolloverImage).toBeInstanceOf(Function);
    expect(itemFieldGetters.getSwatchPreview).toBeInstanceOf(Function);
    expect(itemFieldGetters.getSwatches).toBeInstanceOf(Function);
  });
});
