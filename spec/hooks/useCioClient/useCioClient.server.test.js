import useCioClient from '../../../src/hooks/useCioClient';
import { renderHookServerSide } from '../../testUtils.server';

describe('Testing Hook on Server: useCioClient', () => {
  beforeEach(() => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should throw error if Api Key not provided', () => {
    expect(() =>
      renderHookServerSide(() => useCioClient(), {
        initialProps: {},
      }),
    ).toThrow('Api Key or Constructor Client required');
  });

  it('should return client when custom client is provided', () => {
    const mockClient = { tracker: () => {} };
    const { result } = renderHookServerSide(({ cioClient }) => useCioClient({ cioClient }), {
      initialProps: { cioClient: mockClient },
    });

    expect(result).toBe(mockClient);
  });

  it('should return when used on the server without a custom client', () => {
    const key = 'xx';
    const { result } = renderHookServerSide(({ apiKey }) => useCioClient({ apiKey }), {
      initialProps: { apiKey: key },
    });

    expect(result).toBe(null);
  });
});
