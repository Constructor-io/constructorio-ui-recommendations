# 📘 Constructor Recommendations UI

*A UI library that provides React components to manage the fetching and rendering logic for [Recommendations](https://constructor.com/solutions/recommendations) powered by Constructor.*


[![npm version](https://img.shields.io/npm/v/constructorio-ui-recommendations?style=flat-square)](https://www.npmjs.com/package/constructorio-ui-recommendations)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Constructor-io/constructorio-ui-recommendations/blob/main/LICENSE)

## 📚 Documentation

View the full component documentation and live examples in **Storybook**:

👉 **[Explore Storybook Documentation →](https://constructor-io.github.io/constructorio-ui-recommendations/)**

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Installation & Quick Start](#-installation--quick-start)
- [Integration Modes](#-integration-modes)
- [Customization](#-customization)
- [Troubleshooting](#-troubleshooting)
- [Resources](#-resources)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

Constructor Recommendations UI provides React components for rendering personalized product recommendations. It handles state management, data fetching, and rendering logic out of the box.

**Key capabilities:**
- ✅ Ready-to-use React components for recommendations
- ✅ Automatic state management and data fetching
- ✅ Fully customizable styling
- ✅ Framework-agnostic bundle option
- ✅ TypeScript support included

📖 **[Explore full documentation →](https://constructor-io.github.io/constructorio-ui-recommendations/)**

---

## ⚡ Installation & Quick Start

### Install via NPM

```bash
npm install constructorio-ui-recommendations
```

### Basic Usage (React)

```javascript
import CioRecommendations from 'constructorio-ui-recommendations';

function App() {
  return (
    <CioRecommendations apiKey="key_M57QS8SMPdLdLx4x" />
  );
}
```

📖 **[View detailed setup guide →](https://constructor-io.github.io/constructorio-ui-recommendations/)**

---

## 🏗 Integration Modes

### React Component

```javascript
import CioRecommendations from 'constructorio-ui-recommendations';

function YourComponent() {
  return <CioRecommendations apiKey="key_M57QS8SMPdLdLx4x" />;
}
```

### Vanilla JavaScript (Bundle)
This is a framework agnostic method that can be used in any JavaScript project. The `CioRecommendations` function provides a simple interface to inject an entire recommendations UI into the provided `selector`.

In addition to [recommendation component props](https://constructor-io.github.io/constructorio-ui-recommendations/), this function also accepts `selector` and `includeCSS`.
```javascript
import CioRecommendations from 'constructorio-ui-recommendations/constructorio-ui-recommendations-bundled';

CioRecommendations({
  selector: '#recommendations-container',
  includeCSS: true,
  apiKey: 'key_M57QS8SMPdLdLx4x',
});
```

---

## 🎨 Customization

By default, importing React components from this library does not pull any CSS into your project.

If you wish to use starter styles from this library, add an import statement similar to the example import statement below:
```javascript
import '@constructor-io/constructorio-ui-recommendations/styles.css';
```

```css
.cio-recommendations {
  --primary-color: #007bff;
  --font-family: 'Arial', sans-serif;
}
```
- The starter styles can be used as a foundation to build on top of, or as a reference to be replaced completely.
- To opt out of all default styling, simply do not import the `styles.css` stylesheet.
- All starter styles in this library are scoped within the `.cio-recommendations` CSS selector.
- The starter styles are intended to be extended by layering in your own CSS rules.
- If the starter styles are imported, `CioRecommendations` component will take up the full width and height of the parent container.

---

## 🛠 Troubleshooting

| Issue | Solution |
|-------|----------|
| Module not found | Run `npm install constructorio-ui-recommendations` |
| Need CommonJS build | Import CommonJS: `require('constructorio-ui-recommendations/cjs')` |

💬 **Need more help?** [Open a GitHub issue](https://github.com/Constructor-io/constructorio-ui-recommendations/issues)

---

## 🔗 Resources

- 📖 **[Storybook Documentation](https://constructor-io.github.io/constructorio-ui-recommendations/)** - Interactive API reference and examples
- 📦 **[Constructor.io JS Client](https://github.com/Constructor-io/constructorio-client-javascript)** - Core API client
- 🌐 **[Constructor.io Docs](https://docs.constructor.com/)** - Platform documentation

---

## 🤝 Contributing

1. Fork the repo & create a new branch.
2. Run `npm install` to install dependencies.
3. After making the desired changes, run `npm run test && npm run lint` locally.
4. Submit a PR for review.

---

## 📜 License

[MIT License](./LICENSE)

Copyright (c) 2022-present Constructor.io Corporation
