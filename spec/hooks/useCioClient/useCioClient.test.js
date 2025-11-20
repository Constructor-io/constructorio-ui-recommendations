import { renderHook } from '@testing-library/react';
import useCioClient from '../../../src/hooks/useCioClient';
import version from '../../../src/version';

describe('Testing Hook: useCioClient', () => {
  it('should throw error if API Key not provided', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    expect(() => renderHook(() => useCioClient())).toThrow();
    spy.mockRestore();
  });

  it('should return client when custom client is provided', () => {
    const mockClient = { tracker: () => {} };
    const { result } = renderHook(({ cioClient }) => useCioClient({ cioClient }), {
      initialProps: { cioClient: mockClient },
    });

    expect(result.current).toBe(mockClient);
  });

  it('should return a ConstructorIO Client Object', () => {
    const { result } = renderHook(({ apiKey, options }) => useCioClient({ apiKey, options }), {
      initialProps: {
        apiKey: 'xx',
        options: {
          fetch: () => {},
        },
      },
    });

    const client = result.current;
    expect(client).not.toBeUndefined();
    expect(client.options).not.toBeUndefined();
    expect(client.options.apiKey).toBe('xx');
    expect(client.options.version).toBe(`cio-ui-recommendations-${version}`);
    expect(client.search).not.toBeUndefined();
    expect(client.agent).not.toBeUndefined();
  });

  it('should return a client with options set', () => {
    const key = 'xx';
    const clientOptions = {
      version: 'cio-ui-recommendations-0.0.0',
      serviceUrl: 'https://test.service.cnstrc.com',
      quizzesServiceUrl: 'https://test.quizzes.cnstrc.com',
      agentServiceUrl: 'https://test.agent.cnstrc.com',
      assistantServiceUrl: 'https://test.assistant.cnstrc.com',
      sessionId: 1,
      clientId: 'id-1',
      fetch: 'mock-fetch-fn',
      sendTrackingEvents: true,
      beaconMode: true,
      networkParameters: { timeout: 1000 },
    };

    const { result } = renderHook(({ apiKey, options }) => useCioClient({ apiKey, options }), {
      initialProps: { apiKey: key, options: clientOptions },
    });

    const client = result.current;
    expect(client.options).toEqual({
      apiKey: key,
      ...clientOptions,
    });
  });
});
