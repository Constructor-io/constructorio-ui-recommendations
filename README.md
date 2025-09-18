# Constructor Recommendations UI Library

[![npm](https://img.shields.io/npm/v/constructorio-ui-recommendations)](https://www.npmjs.com/package/constructorio-ui-recommendations)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Constructor-io/constructorio-ui-recommendations/blob/main/LICENSE)

## Introduction

A UI library that provides React components to manage the fetching and rendering logic for [Recommendations](https://constructor.com/solutions/recommendations) powered by Constructor. Typescript support is available.

Our [Storybook Docs](https://constructor-io.github.io/constructorio-ui-recommendations/) are the best place to explore the behavior and the available configuration options for this UI library.

## Installation

```bash
npm i npm i @constructor-io/constructorio-ui-recommendations
```

## Usage

### Using the React Component

The `CioRecommendations` component handles state management, data fetching, and rendering logic for recommendations.

```jsx
import CioRecommendations from 'constructorio-ui-recommendations';

function YourComponent() {
  return (
    <div>
      <CioRecommendations apiKey='key_M57QS8SMPdLdLx4x' />
    </div>
  );
}
```

### Using the JavaScript Bundle

This is a framework agnostic method that can be used in any JavaScript project. The `CioRecommendations` function provides a simple interface to inject an entire recommendations UI into the provided `selector`.

In addition to [recommendation component props](https://constructor-io.github.io/constructorio-ui-recommendations/), this function also accepts `selector` and `includeCSS`.

```js
import CioRecommendations from 'constructorio-ui-recommendations/constructorio-ui-recommendations-bundled';

CioRecommendations({
  selector: '#recommendations-container',
  includeCSS: true, // Include the default CSS styles - defaults to true
  apiKey: 'key_M57QS8SMPdLdLx4x',
  // ... additional arguments
});
```

## Custom Styling

### Library Defaults

By default, importing React components from this library does not pull any CSS into your project.

If you wish to use starter styles from this library, add an import statement similar to the example import statement below:

```js
import '@constructor-io/constructorio-ui-recommendations/styles.css';
```

- The starter styles can be used as a foundation to build on top of, or as a reference to be replaced completely.
- To opt out of all default styling, simply do not import the `styles.css` stylesheet.
- All starter styles in this library are scoped within the `.cio-recommendations` CSS selector.
- The starter styles are intended to be extended by layering in your own CSS rules.
- If the starter styles are imported, `CioRecommendations` component will take up the full width and height of the parent container.

## Local Development

### Development Scripts

```bash
npm ci                  # Install dependencies for local dev
npm run dev             # Start a local dev server for Storybook
npm run lint            # Run lint
```

### Library Maintenance

```bash
npm run compile           # Generate lib folder for publishing to npm
npm run build-storybook   # Generate Storybook static bundle for deploy with GitHub Pages
```

## Publishing new versions

Dispatch the [Publish](https://github.com/Constructor-io/constructorio-ui-recommendations/actions/workflows/publish.yml) workflow in GitHub Actions. You're required to provide two arguments:

- **Version Strategy**: `major`, `minor`, or `patch`.
- **Title**: A title for the release.

This workflow will automatically:

1. Bump the library version using the provided strategy.
2. Create a new git tag.
3. Create a new GitHub release.
4. Compile the library.
5. Publish the new version to NPM.
6. Deploy the Storybook docs to GitHub Pages.
7. Report the progress on the [relevant Slack channel](https://constructor.slack.com/archives/C061D3CFVR9).

#### ℹ️ Note: Please don't manually increase the package.json version or create new git tags.

The library version is tracked by releases and git tags. We intentionally keep the package.json version at `0.0.0` to avoid pushing changes to the `main` branch. This solves many security concerns by avoiding the need for branch-protection rule exceptions.

## New Storybook Version

Dispatch the [Deploy Storybook](https://github.com/Constructor-io/constructorio-ui-recommendations/actions/workflows/deploy-storybook.yml) workflow in GitHub Actions.

#### ℹ️ Note: This is already done automatically when publishing a new version.

## Supporting Docs

- [Storybook 8 Docs](https://storybook.js.org/docs/8)
- [Typescript Docs](https://www.typescriptlang.org/docs/)
