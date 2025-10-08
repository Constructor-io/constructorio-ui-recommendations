import React from 'react';
import CioRecommendationProvider from '../../components/CioRecommendation/CioRecommendationProvider';
import { DEMO_API_KEY, DEMO_POD_ID } from '../../constants';
import { CioRecommendationProviderProps } from '../../types';

export interface DisplayHookExampleProps {
  title: string;
  renderHook: (props?: Record<string, unknown>) => any;
  renderHookProps?: Record<string, unknown>;
  providerProps?: CioRecommendationProviderProps;
}

interface HookRenderProps extends Omit<DisplayHookExampleProps, 'title' | 'providerProps'> {}

function HookRender({ renderHook, renderHookProps }: HookRenderProps) {
  const result = renderHook(renderHookProps);
  const displayResult =
    typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          borderRadius: '4px',
        }}>
        {displayResult}
      </pre>
    </div>
  );
}

export default function DisplayHookExample(props: DisplayHookExampleProps) {
  const { title, providerProps, renderHook, renderHookProps } = props;
  let currentProviderProps = {
    apiKey: DEMO_API_KEY,
    podId: DEMO_POD_ID,
  };

  if (providerProps) {
    currentProviderProps = {
      ...providerProps,
      apiKey: providerProps.apiKey,
      podId: providerProps.podId,
    };
  }

  return (
    <CioRecommendationProvider {...currentProviderProps}>
      <div>
        <h2>{title}</h2>
        <HookRender renderHook={renderHook} renderHookProps={renderHookProps} />
      </div>
    </CioRecommendationProvider>
  );
}
