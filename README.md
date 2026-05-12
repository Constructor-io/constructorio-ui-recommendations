# Constructor Recommendations UI

_A UI library that provides React components to manage the fetching and rendering logic for [Recommendations](https://constructor.com/solutions/recommendations) powered by Constructor._

[![npm Version](https://img.shields.io/npm/v/@constructor-io/constructorio-ui-recommendations?style=flat-square)](https://www.npmjs.com/package/@constructor-io/constructorio-ui-recommendations)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Constructor-io/constructorio-ui-recommendations/blob/main/LICENSE)

![Recommendations UI Demonstration](assets/recommendations-ui.gif)

## Documentation

View the full component documentation and live examples in **Storybook**:

**[Explore Storybook Documentation →](https://constructor-io.github.io/constructorio-ui-recommendations/)**

---

## Table of Contents

- [Overview](#overview)
- [Installation & Quick Start](#installation--quick-start)
- [Integration Modes](#integration-modes)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Constructor Recommendations UI provides React components for rendering personalized product recommendations. It handles state management, data fetching, and rendering logic out of the box.

**Key capabilities:**

- 🔌 **Plug & Play** – Ready-to-use React components for recommendations
- ⚡ **Automatic Data Fetching** – Built-in state management and data fetching
- 🎨 **Customizable Styling** – Minimal default styles, easy to extend or replace
- 🌐 **Framework Agnostic** – Use with React or as a vanilla JavaScript bundle
- 🛡 **TypeScript Support** – Full type safety included out of the box

**[Explore full documentation →](https://constructor-io.github.io/constructorio-ui-recommendations/)**

---

## Installation & Quick Start

### Install via npm

```bash
npm i @constructor-io/constructorio-ui-recommendations
```

### Basic Usage (React)

```javascript
import CioRecommendations from '@constructor-io/constructorio-ui-recommendations';
import '@constructor-io/constructorio-ui-recommendations/styles.css';

function App() {
  return <CioRecommendations apiKey='key_M57QS8SMPdLdLx4x' />;
}
```

**[View detailed setup guide →](https://constructor-io.github.io/constructorio-ui-recommendations/)**

---

## Integration Modes

### React Component

```javascript
import CioRecommendations from '@constructor-io/constructorio-ui-recommendations';

function YourComponent() {
  return <CioRecommendations apiKey='key_M57QS8SMPdLdLx4x' />;
}
```

### Vanilla JavaScript (Bundle)

This is a framework agnostic method that can be used in any JavaScript project. The `CioRecommendations` function provides a simple interface to inject an entire recommendations UI into the provided `selector`.

In addition to [recommendation component props](https://constructor-io.github.io/constructorio-ui-recommendations/), this function also accepts `selector` and `includeCSS`.

```javascript
import CioRecommendations from '@constructor-io/constructorio-ui-recommendations/constructorio-ui-recommendations-bundled';

CioRecommendations({
  selector: '#recommendations-container',
  includeCSS: true,
  apiKey: 'key_M57QS8SMPdLdLx4x',
});
```

### CDN / Script Tag

For no-build environments (Shopify, plain HTML storefronts, quick prototypes), you can load the library directly via a `<script>` tag:

```html
<!-- replace x.x.x with the desired version -->
<script defer src="https://cdn.cnstrc.com/ui/recommendations/x.x.x.js"></script>
```

> **Note:** Always pin to a specific version (e.g. `@1.0.0`) rather than `@latest` to avoid unexpected breaking changes in production. Check the [GitHub releases page](https://github.com/Constructor-io/constructorio-ui-recommendations/releases) for the latest stable version.

**Full example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Recommendations Example</title>

  <!-- Load the bundled library -->
  <script defer src="https://cdn.cnstrc.com/ui/recommendations/x.x.x.js"></script>
</head>
<body>

  <!-- Container for the recommendations pod -->
  <div id="recommendations-container"></div>

  <!-- Initialize -->
  <script>
    CioRecommendations({
      selector: '#recommendations-container',
      includeCSS: true,
      apiKey: 'key_M57QS8SMPdLdLx4x',
      podId: 'YOUR_POD_ID',
    });
  </script>

</body>
</html>
```

When `includeCSS: true` is set, default styles are automatically injected (scoped to `.cio-recommendations`). For the full list of configuration options, refer to the [Storybook API reference](https://constructor-io.github.io/constructorio-ui-recommendations/).

---

## Customization

By default, importing React components from this library does not pull any CSS into your project.

If you wish to use starter styles from this library, add an import statement similar to the example import statement below:

```javascript
import '@constructor-io/constructorio-ui-recommendations/styles.css';
```

- The starter styles can be used as a foundation to build on top of, or as a reference to be replaced completely.
- To opt out of all default styling, simply do not import the `styles.css` stylesheet.
- All starter styles in this library are scoped within the `.cio-recommendations` CSS selector.
- The starter styles are intended to be extended by layering in your own CSS rules.
- If the starter styles are imported, `CioRecommendations` component will take up the full width and height of the parent container.

---

## Troubleshooting

| Issue               | Solution                                                                           |
| ------------------- | ---------------------------------------------------------------------------------- |
| Module not found    | Run `npm install @constructor-io/constructorio-ui-recommendations`                 |
| Need CommonJS build | Import CommonJS: `require('@constructor-io/constructorio-ui-recommendations/cjs')` |

**Need more help?** [Open a GitHub issue](https://github.com/Constructor-io/constructorio-ui-recommendations/issues)

---

## Resources

- **[Storybook Documentation](https://constructor-io.github.io/constructorio-ui-recommendations/)** - Interactive API reference and examples
- **[Constructor.io JS Client](https://github.com/Constructor-io/constructorio-client-javascript)** - Core API client
- **[Constructor.io Docs](https://docs.constructor.com/)** - Platform documentation

---

## Contributing

1. Fork the repo & create a new branch.
2. Run `npm install` to install dependencies.
3. After making the desired changes, run `npm run test && npm run lint` locally.
4. Submit a PR for review.

---

## License

[MIT License](./LICENSE)

Copyright (c) 2022-present Constructor.io Corporation
