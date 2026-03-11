import React from 'react';
import { render } from '@testing-library/react';
import { CioRecommendationsProvider } from '../../../src/components/CioRecommendations';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../../src/constants';

const mockCioClient = { fetch: jest.fn() };
const testParameters = { userId: '123' };

describe('Testing Component: CioRecommendationsProvider', () => {
  it('should provide context to its children', () => {
    let receivedContext;

    render(
      <CioRecommendationsProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        cioClient={mockCioClient}
        parameters={testParameters}>
        {(context) => {
          receivedContext = context;

          return <div>Child</div>;
        }}
      </CioRecommendationsProvider>,
    );

    expect(receivedContext).toBeDefined();
    expect(receivedContext.podId).toBe(DEMO_POD_ID);
    expect(receivedContext.cioClient).toBe(mockCioClient);
    expect(receivedContext.parameters).toBe(testParameters);
    expect(typeof receivedContext.setCioClientOptions).toBe('function');
  });

  it('should renders children as child nodes', () => {
    const { getByText } = render(
      <CioRecommendationsProvider
        apiKey={DEMO_API_KEY}
        podId={DEMO_POD_ID}
        cioClient={mockCioClient}>
        <span>Static Child</span>
      </CioRecommendationsProvider>,
    );

    const spanElem = getByText('Static Child');
    expect(spanElem).toBeInstanceOf(HTMLElement);
    expect(spanElem.parentElement).not.toBeNull();
  });
});
