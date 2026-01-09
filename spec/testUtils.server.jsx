import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CioRecommendationProvider from '../src/components/CioRecommendations/CioRecommendationProvider';
import { DEMO_API_KEY, DEMO_POD_ID } from '../src/constants';

export function RenderHookServerSideWrapper({
  renderCallback,
  renderCallbackProps = {},
  onRenderHookValue,
}) {
  const hookValue = renderCallback(renderCallbackProps.initialProps);
  // expose the hook value to the test by testing what is passed to onRenderHookValue
  onRenderHookValue(hookValue);

  return null;
}

export function renderHookServerSide(
  renderCallback,
  renderCallbackProps,
  onRenderHookValue = jest.fn(),
) {
  return {
    html: ReactDOMServer.renderToString(
      <RenderHookServerSideWrapper
        renderCallback={renderCallback}
        renderCallbackProps={renderCallbackProps}
        onRenderHookValue={onRenderHookValue}
      />,
    ),
    onRenderHookValue,
    result: onRenderHookValue.mock.calls[0][0],
  };
}

export function renderHookServerSideWithCioProvider(
  renderCallback,
  renderCallbackProps,
  providerProps,
  onRenderHookValue = jest.fn(),
) {
  return {
    html: ReactDOMServer.renderToString(
      <CioRecommendationProvider apiKey={DEMO_API_KEY} podId={DEMO_POD_ID} {...providerProps}>
        <RenderHookServerSideWrapper
          renderCallback={renderCallback}
          renderCallbackProps={renderCallbackProps}
          onRenderHookValue={onRenderHookValue}
        />
      </CioRecommendationProvider>,
    ),
    onRenderHookValue,
    result: onRenderHookValue.mock.calls[0][0],
  };
}
