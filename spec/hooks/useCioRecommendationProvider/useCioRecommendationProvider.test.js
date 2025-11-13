import { renderHook } from '@testing-library/react';
import useCioRecommendationProvider from '../../../src/hooks/useCioRecommendationProvider';

describe('Testing Hook: useCioRecommendationProvider', () => {
  const apiKey = 'test-api-key';
  const podId = 'test-pod-id';
  const parameters = { num_results: 20 };

  const initProps = {
    apiKey,
    podId,
    parameters,
  };

  it('should throw error if required props are not provided', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    expect(() => renderHook(() => useCioRecommendationProvider())).toThrow();
    spy.mockRestore();
  });

  it('should return context value if required props and additional params are provided', () => {
    const { result } = renderHook((props) => useCioRecommendationProvider(props), {
      initialProps: {
        ...initProps,
        cioClientOptions: { fetch: () => {} }, // Mock fetch implementation to avoid fetch not defined error
      },
    });
    const contextValue = result.current;

    expect(contextValue).not.toBeUndefined();
    expect(contextValue.cioClient.options.apiKey).toBe(initProps.apiKey);
    expect(contextValue.podId).toBe(initProps.podId);
    expect(contextValue.cioClient).toBeDefined();
    expect(contextValue.cioClientOptions).toBeDefined();
    expect(contextValue.setCioClientOptions).toBeDefined();
    expect(result.current.parameters).toEqual(initProps.parameters);
  });

  it('memoizes context value between renders', () => {
    const { result, rerender } = renderHook((props) => useCioRecommendationProvider(props), {
      initialProps: {
        ...initProps,
        cioClientOptions: { fetch: () => {} }, // Mock fetch implementation to avoid fetch not defined error
      },
    });
    const firstValue = result.current;

    rerender(initProps);
    expect(result.current).toBe(firstValue);

    rerender({ ...initProps, podId: 'new-pod-id' });
    expect(result.current.podId).toBe('new-pod-id');
  });
});
