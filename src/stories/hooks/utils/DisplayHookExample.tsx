import React from 'react';
import { CioRecommendationsProvider } from '../../../components/CioRecommendations';
import { CioRecommendationsProviderProps } from '../../../types';
import './DisplayHookExample.css';

export interface DisplayHookExampleProps {
  title: string;
  providerProps: CioRecommendationsProviderProps;
  renderHook: (props?: Record<string, unknown>) => any;
  renderHookProps?: Record<string, unknown>;
}

interface HookRenderProps extends Omit<DisplayHookExampleProps, 'title' | 'providerProps'> {}

function HookRender({ renderHook, renderHookProps }: HookRenderProps) {
  const result = renderHook(renderHookProps);
  const displayResult =
    typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);

  return (
    <div className='display-hook-example-container'>
      <pre className='display-hook-example-pre'>{displayResult}</pre>
    </div>
  );
}

export default function DisplayHookExample(props: DisplayHookExampleProps) {
  const { title, providerProps, renderHook, renderHookProps } = props;

  return (
    <CioRecommendationsProvider {...providerProps}>
      <div>
        <h2>{title}</h2>
        <HookRender renderHook={renderHook} renderHookProps={renderHookProps} />
      </div>
    </CioRecommendationsProvider>
  );
}
