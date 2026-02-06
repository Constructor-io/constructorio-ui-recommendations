/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom/client';
import CioRecommendationsComponent from './components/CioRecommendations/CioRecommendations';
import './styles.css';

const CioRecommendations = ({ selector, includeCSS = true, useShopifyDefaults, ...rest }) => {
  if (document) {
    const stylesheet = document.getElementById('cio-recommendations-styles');
    const containerSelector = selector;
    const containerElement = containerSelector ? document.querySelector(containerSelector) : null;

    if (!containerElement) {
      // eslint-disable-next-line no-console
      console.error(`CioRecommendations: There were no elements found for the provided selector`);

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
        <CioRecommendationsComponent {...rest} useShopifyDefaults={useShopifyDefaults} />
      </React.StrictMode>,
    );
  }
};

if (window) {
  window.CioRecommendations = CioRecommendations;
}

export default CioRecommendations;
