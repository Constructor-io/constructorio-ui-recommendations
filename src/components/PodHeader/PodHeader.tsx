import React from 'react';
import {
  ComponentOverrideProps,
  IncludeComponentOverrides,
  IncludeRenderProps,
  RenderPropsWrapper,
} from '@constructor-io/constructorio-ui-components';

interface Props {
  /**
   * Main header text for the pod
   */
  podHeader: string;
  /**
   * Optional subheader text displayed below the main header
   */
  podSubheader?: string;
}

export type PodHeaderOverrides = ComponentOverrideProps<Props>;

export interface PodHeaderProps
  extends Props,
    IncludeComponentOverrides<PodHeaderOverrides>,
    IncludeRenderProps<Props> {}

export function PodHeader(props: PodHeaderProps) {
  const { podHeader, podSubheader, componentOverrides, children } = props;

  return (
    <RenderPropsWrapper props={props} override={children || componentOverrides?.reactNode}>
      <div className='cio-pod-header'>
        <div className='cio-pod-title'>{podHeader}</div>
        {podSubheader && <div className='cio-pod-subtitle'>{podSubheader}</div>}
      </div>
    </RenderPropsWrapper>
  );
}
