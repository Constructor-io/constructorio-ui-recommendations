/* eslint-disable import/prefer-default-export */
import React from 'react';
import { renderHook } from '@testing-library/react';
import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import CioRecommendationsProvider from '../src/components/CioRecommendations/CioRecommendationProvider';
import { DEMO_API_KEY, DEMO_POD_ID } from '../src/constants';
import { testApiResponse } from './localExamples';

/**
 * Mock the recommendations.getRecommendations method from ConstructorIOClient
 * to prevent API calls during tests, as Jest runs in a Node environment where `fetch` is unavailable.
 */
class MockConstructorIOClient extends ConstructorIOClient {
  recommendations = {
    getRecommendations: jest.fn().mockResolvedValue(testApiResponse),
  };
}

// Only return Client JS when test is run for client-side environment
const mockConstructorIOClient =
  typeof window !== 'undefined'
    ? new MockConstructorIOClient({ apiKey: DEMO_API_KEY, fetch: jest.fn() })
    : null;

jest.mock('../src/hooks/useCioClient', () => ({
  __esModule: true,
  default: () => mockConstructorIOClient,
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
