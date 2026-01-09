import React from 'react';
import { render } from '@testing-library/react';
import CioRecommendationProvider from '../../../src/components/CioRecommendations/CioRecommendationProvider';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../src/constants';

const mockCioClient = { fetch: jest.fn() };
const testParameters = { userId: '123' };

describe('Testing Component: CioRecommendationProvider', () => {
  it('should provide context to its children', () => {
    let receivedContext;

    render(
      <CioRecommendationProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        cioClient={mockCioClient}
        parameters={testParameters}>
        {(context) => {
          receivedContext = context;

          return <div>Child</div>;
        }}
      </CioRecommendationProvider>,
    );

    expect(receivedContext).toBeDefined();
    expect(receivedContext.podId).toBe(DEMO_POD_ID);
    expect(receivedContext.cioClient).toBe(mockCioClient);
    expect(receivedContext.parameters).toBe(testParameters);
    expect(typeof receivedContext.setCioClientOptions).toBe('function');
  });

  it('should renders children as child nodes', () => {
    const { getByText } = render(
      <CioRecommendationProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        cioClient={mockCioClient}>
        <span>Static Child</span>
      </CioRecommendationProvider>,
    );

    const spanElem = getByText('Static Child');
    expect(spanElem).toBeInstanceOf(HTMLElement);
    expect(spanElem.parentElement).not.toBeNull();
  });
});
