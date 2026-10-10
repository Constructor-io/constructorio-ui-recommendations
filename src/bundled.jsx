/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom/client';
import CioRecommendationsComponent from './components/CioRecommendations';
import CioRecommendationsPageComponent from './components/CioRecommendationsPage';
import versionNumber from './version';
import './styles.css';

const mountComponent = (Component, name, { selector, includeCSS = true, ...rest }) => {
  if (document) {
    const stylesheet = document.getElementById('cio-recommendations-styles');
    const containerSelector = selector;
    const containerElement = containerSelector ? document.querySelector(containerSelector) : null;

    if (!containerElement) {
      // eslint-disable-next-line no-console
      console.error(`${name}: There were no elements found for the provided selector`);

      return;
    }

    if (stylesheet) {
      if (!includeCSS) {
        stylesheet.disabled = true;
      } else {
        stylesheet.disabled = false;
      }
    }

    ReactDOM.createRoot(containerElement).render(
      <React.StrictMode>
        <Component
          {...rest}
          cioClientOptions={{
            ...rest.cioClientOptions,
            version: `cio-ui-recommendations-bundled-${versionNumber}`,
          }}
        />
      </React.StrictMode>,
    );
  }
};

const CioRecommendations = (props) =>
  mountComponent(CioRecommendationsComponent, 'CioRecommendations', props);

export const CioRecommendationsPage = (props) =>
  mountComponent(CioRecommendationsPageComponent, 'CioRecommendationsPage', props);

if (window) {
  window.CioRecommendations = CioRecommendations;
  window.CioRecommendationsPage = CioRecommendationsPage;
}

export default CioRecommendations;
