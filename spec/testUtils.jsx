/* eslint-disable import/prefer-default-export */
import React from 'react';
import { renderHook } from '@testing-library/react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import CioRecommendationsProvider from '../src/components/CioRecommendation/CioRecommendationProvider';
import { DEMO_API_KEY, DEMO_POD_ID } from '../src/constants';
import apiRecommendationResponse from './localExamples';

/**
 * Mock ConstructorIOClient to avoid making API calls during tests
 * as Jest is running in a Node environment and `fetch` is not available.
 */
class MockConstructorIOClient extends ConstructorIOClient {
  recommendations = {
    getRecommendations: jest.fn().mockResolvedValue(apiRecommendationResponse),
  };
}

function mockConstructorIOClient() {
  return new MockConstructorIOClient({ apiKey: DEMO_API_KEY, fetch: () => {} });
}

jest.mock('../src/hooks/useCioClient', () => ({
  __esModule: true,
  default: () => mockConstructorIOClient(),
}));

const customRenderHook = (callback, options) =>
  renderHook(callback, {
    wrapper: ({ children }) => (
      <CioRecommendationsProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        {...options?.initialProps}>
        {children}
      </CioRecommendationsProvider>
    ),
  });

export { customRenderHook as renderHookWithCioProvider };
