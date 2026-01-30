# Purpose

This guideline provides a comprehensive standard for documenting Constructor.io OS UI libraries. Following these standards ensures consistency, clarity, and an excellent developer experience across all our libraries.

---

# Table of Contents

1. [Writing Standards](#writing-standards)
1. [GitHub README Structure](https://constructor.slab.com/posts/draft-os-ui-libraries-documentation-guideline-4ytca7wa#hwnh0-git-hub-readme-structure)
1. [Storybook Structure](#storybook-structure)
1. [Checklist](#checklist)

---

# Writing Standards

Keep all documentation in Markdown.

## Core Principles

- **Clarity over cleverness** - Use simple, direct language. Avoid jargon or define it when necessary.
- **Actionable instructions** - Tell users exactly what to do: "Pass `apiKey` or `cioJsClient`", not "You can optionally provide...". Replace vague language like "might want to" with specific instructions: "use X to achieve Y".
- **Show, don't just tell** - Include working code examples for every feature in the Storybook, and quick start in Readme
- **Progressive disclosure** - Start simple (quick start), then advance (customization, advanced features). Save exhaustive details for Storybook; keep README concise.
- **Keep it current** - Documentation must be updated with every code change. Outdated examples are worse than no examples.
- **Multi-framework support** - Document all integration modes (React, bundle, Shopify, etc.).
- **Copy-paste ready** - All code examples should work as-is.
- **Cross-reference wisely** - Link to related resources instead of duplicating content. Link to Storybook or other docs for detailed API references.
- **Explain prerequisites clearly** - Don't assume knowledge. Document dependencies and requirements.
- **Include troubleshooting** - Common issues must be documented with solutions.

---

## Code Examples

- **Complete and runnable:** Every example should work if copy-pasted whenever possible
- **Minimal:** Show only what's necessary for the concept
- **Realistic:** Use realistic prop values (not `foo`, `bar`, `baz`)
- **Formatted:** Use consistent indentation and style (Prettier recommended)
- **Commented sparingly:** Code should be self-explanatory; add comments only for non-obvious logic

---

## Formatting

- **Use headings consistently:**
    - `#` for page title
    - `##` for main sections
    - `###` for subsections
- **Use code fences with language:**

```javascript
// Good
```

- Not:

```
// Bad
```

- **Use tables for comparison data:**
    - Troubleshooting solutions
    - Prop descriptions
    - Return value interfaces

---

## Cross-Referencing

- Link to Storybook from README for detailed docs
- Link between related Storybook sections
- Link to external resources (Constructor.io docs, JS Client, etc.)
- Use descriptive link text: "View customization guide" (not "click here")

---

# GitHub README Structure

The README is the **first touchpoint** for developers. It should provide a high-level overview and the shortest path to getting started.

## 1. Header

**Template:**

```
# [Library Name]

*A concise, engaging one-line description of what the library does.*

[![npm version](https://img.shields.io/npm/v/library-name.svg)](https://www.npmjs.com/package/library-name)
[![license](https://img.shields.io/npm/l/library-name.svg)](https://github.com/constructor-io/library-name/blob/main/LICENSE)

[gif/image]
```

**What to include:**

- Library name
- One-sentence tagline
- NPM and license badges
- Image / gif (if applicable)

---

## 2. Documentation

```
## Documentation

View the full component documentation and live examples in **Storybook**:

```

---

## 3. Table of Contents

**Template:**

```
## Table of Contents

- [Overview](#overview)
- [Installation & Quick Start](#installation--quick-start)
- [Integration Modes](#integration-modes)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)
```

---

## 4. Overview

**Template:**

```
## Overview

[Library Name] provides [core functionality]. It enables developers to [key benefit].

**Key capabilities:**
- Feature 1
- Feature 2
- Built-in accessibility support (ARIA, keyboard navigation)
- Fully customizable styling
- Framework-agnostic options

**[Explore full documentation →](https://link-to-storybook)**
```

**What to include:**

- High-level purpose (1-2 sentences)
- 4-6 bullet points of key features
- Link to Storybook for comprehensive docs

**What NOT to include (save for Storybook):**

- Exhaustive feature lists
- Implementation details
- Advanced configurations

---

## 5. Installation & Quick Start

**Template:**

```
## Installation & Quick Start

### Install via NPM

```bash
npm install library-name
```

### Basic Usage (React)

```javascript
import { Component } from 'library-name';

function App() {
  return (
    <Component
      apiKey="your-api-key"
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

**[Try it live on CodeSandbox →](https://codesandbox.io/example)**
```

**Guidelines:**

- Show the absolute minimum code to get started
- Include only required props/parameters
- Provide a working CodeSandbox link

---

## 6. Integration Modes (if applicable)

**Template:**

```
## Integration Modes

### React Component

```javascript
import { Component } from 'library-name';
// Example code
```

### Vanilla JavaScript (Bundle)

```html
<script src="https://cdn.cnstrc.com/ui/library-name/version.js"></script>
<script>
  LibraryName.init({ apiKey: 'your-key' });
</script>
```

### Shopify (Liquid)

```liquid
{% render 'library-component', settings: library_settings %}
```

**[View integration guides for each mode →](https://link-to-storybook)**
```

**Guidelines:**

- Document all supported integration modes
- Keep examples minimal (1-3 lines if possible)
- Link to detailed guides in Storybook

---

## 7. Customization

**Template:**

```
## Customization

Override default styles using CSS:

```css
.library-component {
  --primary-color: #007bff;
  --font-family: 'Arial', sans-serif;
}
```

**[View customization guide →](https://link-to-storybook)**
```

**Guidelines:**

- Show one simple customization example
- Link to comprehensive customization docs in Storybook

---

## 8. Troubleshooting (if applicable)

**Template:**

```
## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Error: Module not found` | Run `npm install library-name` |
| Not working in Next.js | Use dynamic imports: `const Component = dynamic(() => import('library-name'))` |
| Older JavaScript environments | Import CommonJS build: `require('library-name/dist/cjs')` |

**Need more help?** [Open a GitHub issue](https://github.com/constructor-io/library-name/issues)
```

**Guidelines:**

- Use a table format for scannability
- Include common integration issues
- Provide specific, actionable solutions

---

## 9. Resources (if applicable)

**Template:**

```
## Resources

- **[Storybook Documentation](https://link)** - Interactive API reference and examples
- **[Constructor.io JS Client](https://github.com/Constructor-io/constructorio-client-javascript)** - Core API client
- **[Shopify App](https://link)** - Pre-built Shopify integration
- **[REST API Docs](https://docs.constructor.io/rest-api)** - Backend API reference
```

---

## 10. Contributing

**Template:**

```
## Contributing

1. Fork the repo & create a new branch.
2. Run `npm install` to install dependencies.
3. After making the desired changes, run `npm run tests && npm run lint` locally.
4. Submit a PR for review.
```

**Guidelines:**

- Keep this section minimal in README
- Add any additional steps required

---

## 11. License

**Template:**

```
## License

MIT License © 2026 Constructor.io
```

---

# Storybook Structure

Storybook is the **comprehensive documentation hub** for developers. It should enumerate all configuration options, provide interactive examples, and serve as the technical reference.

## Project Hierarchy

```
src/
└── stories/
    ├── getting-started/
    │   ├── Introduction.mdx
    │   └── Quickstart.mdx
    │
    │
    ├── components/
    │   └── ComponentName/
    │       ├── ComponentName.mdx
    │       ├── ComponentName.stories.tsx
    │       └── Usage Patterns/ (if applicable)
    │           └── RenderProps.mdx
    │           └── CompoundComponents.mdx
    │           └── ComponentOverrides.mdx
    │       ├── Examples/ (if applicable)
    │           └── AdditionalExamples.mdx
    │
    │
    ├── hooks/
    │   └── HookName/
    │       ├── Usage.mdx
    │       ├── HookName.stories.tsx (if it's responsible for building UI)
    │
    │
    ├── basic-concepts/
    │  └── UsagePatterns.mdx
    │  └── Shopify.mdx
    │  └── Salesforce.mdx
    │
    │
    ├── utils/
    │   └── Reference.mdx
    │
    │
    └── examples/ (optional)
        └── AdvancedUseCases.mdx
```

---

## Getting Started

- Introduction.mdx

**Template:**

```
# Introduction

[Library Name](/github_link) is a [description]. It provides [key benefit].

## Prerequisites

- Node.js 16+
- React 18+ (for React integration)
- Constructor.io API key ([Get one here](https://constructor.io))

[Tile with link to the Quickstart.mdx]

Components
[Tiles with links to the different components]

Hooks
[Tiles with links to the different hooks]
```

**Guidelines:**

- Short description with a link to the GitHub
- Include prerequisites 
- Provide navigation to the Quick Start steps
- Provide navigation to other sections

**Quickstart.mdx**

**Template:**

```
# Quickstart

Get up and running in 5 minutes.

## Step 1: Install

```bash
npm install library-name
```

## Step 2: Basic Setup

```javascript
import { Component } from 'library-name';

function App() {
  return (
    <Component
      apiKey="your-api-key"
      onSubmit={(data) => console.log(data)}
    />
  );
}
```

## Next Steps
- (if it's one-component library) [Explore all props](/?path=/docs/components-componentname-props--docs)
- (if it's multi-component library) [Explore all components](/?path=/docs/components)

[Tip] Having trouble with a unique use case? Contact your friendly Integration Engineers for support!
```

**Guidelines:**

- Show step-by-step installation instructions
- Keep code minimal and copy-paste ready
- Link to next logical steps

---

## Components

Each component gets its own folder with these files:

**ComponentName.stories.tsx**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    apiKey: 'demo-key',
    placeholder: 'Search...',
  },
};

export const WithCustomStyling: Story = {
  args: {
    apiKey: 'demo-key',
    className: 'custom-theme',
  },
};
```

**Guidelines:**

- Create multiple story variants (basic, customized, edge cases)
- Use realistic prop values
- Keep stories focused on one concept each
- Use the same pattern in all stories for consistency and keep different usage pattern examples in their own folder

**ComponentName.mdx**

**Template:**

```
import { Meta, Canvas } from '@storybook/blocks';
import * as ComponentNameStories from './ComponentName.stories';

<Meta of={ComponentNameStories} />

# ComponentName

A [brief description of what the component does].

## Interactive Example

<Canvas of={ComponentNameStories.Primary} />

[View fullscreen](/?path=/story/components-componentname--primary)

---

## Props Reference (generated)

<ArgTypes of={ComponentNameStories} />

// props table should be in the below format
| Prop | Type | Default | Description |
|------|------|---------|-------------|

// if a prop has nested props/further explanation
// it can be included below in a different section


---

Additional tables/references that need to be documented

---

Examples/Variations listed here

---

## See Also (if applicable)
- [Advanced Examples](/?path=/docs/examples)
```

**Guidelines:**

- Include interactive Canvas example at the top
- Use Storybook's `<ArgTypes />` for automatic prop documentation
- Add any additional tables/references 
- List all the examples/variations
- Save complex use cases for the additional examples/ folder

### Usage Patterns

RenderProps.mdx

```
# Render Props

This document describes the **render props API** exposed by this component. For a full explanation of how render props work, see the [Render Props Reference](./render-props-reference).

Render props allow you to fully control how the component is rendered by passing a function that receives the component’s internal state and helpers, while the component continues to manage behavior, accessibility, and state.

Use this reference to understand **which render props are available**, their types, and when to use them.

---

## Usage

The component accepts a render function as its child (or as a dedicated prop, depending on the component API).

```tsx
<Component>
  {(props) => (
    <div>
      {/* Custom rendering using render props */}
    </div>
  )}
</Component>
```

## Available Render Props

| Render Prop  | Type                      | Description                                                      |
| ------------ | ------------------------- | ---------------------------------------------------------------- |
| `isActive`   | `boolean`                 | Indicates whether the component is currently in an active state. |
| `value`      | `string`                  | The current value managed by the component.                      |
| `onChange`   | `(value: string) => void` | Callback used to update the component’s value.                   |

```



CompoundComponents.mdx

```
# Compound Components

This document describes the **compound components API** exposed by this component.
For a full explanation of how compound components work, see the [Compound Components Reference](./compound-component-reference).

The compound components pattern allows you to compose complex UIs declaratively using a set of related subcomponents under a shared parent context. The parent manages state and behavior, while the subcomponents consume shared context and render themselves accordingly.

Use this reference to understand **which subcomponents are available**, their types, and their purpose.

---

## Usage

This component supports the compound components pattern by exposing a set of subcomponents. Compose your UI by nesting them inside the parent component.

```tsx
<Component>
  <Component.Label />
  <Component.Input />
  <Component.HelperText />
</Component>
```

## Available Subcomponents

| Subcomponent             | Type       | Description                                         |
| ------------------------ | ---------- | --------------------------------------------------- |
| `Component.Label`        | `React.FC` | Renders the label for the component.                |
| `Component.Input`        | `React.FC` | Renders the main input element.                     |

```



ComponentOverrides.mdx

```
# Component Overrides

This document describes the **component overrides API** exposed by this component.
For a full explanation of how component overrides work, see the [component overrides refenrece](./component-overrides-reference).

The component overrides pattern allows you to customize specific parts of a component’s rendering by providing **custom content** or **render functions**. This pattern lets you change the markup or behavior of subcomponents without rewriting or wrapping the entire component.

Use this reference to understand **which keys can be overridden**, their types, and their purpose.

---

## Usage

This component supports overrides via the `componentOverrides` prop.

```tsx
<Component
  componentOverrides={{
    label: <CustomLabel />,
    input: (props) => <CustomInput {...props} />,
  }}
/>
```

## Available override keys
| Key            | Type                                | Description                         |
| -------------- | ----------------------------------- | ----------------------------------- |
| `label`        | `ReactNode \| (props) => ReactNode` | Override the component’s label.     |
| `input`        | `ReactNode \| (props) => ReactNode` | Override the main input element.    |

```

---

---

## Hooks

Each hook gets its own folder:

**HookName.stories.tsx (if it's responsible for building UI or if it makes sense to add it)**

```typescript
import type { Meta } from '@storybook/react';
import { useHookName } from './useHookName';

const meta = {
  title: 'Hooks/useHookName',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

// This file exists to enable <ArgTypes /> generation
```

**Guidelines:**

- Create `.stories.tsx` even if no visual render is needed
- This enables automatic type documentation

**Usage.mdx**

**Template:**

```
# useHookName

A hook that [description].

## When to Use

Use this hook when you need to [use case].

**Example use cases:**
- Fetching search results client-side
- Building custom UI components
- Implementing advanced filtering logic

## Usage

```javascript
import { useHookName } from 'library-name';

function MyComponent() {
  const { data, loading, error } = useHookName({
    apiKey: 'your-key',
    query: 'shoes',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

## useHookName Props

<ArgTypes of={HookNameStories} />

## useHookName Return Value

This hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `data` | `SearchResult[]` | Array of search results |
| `loading` | `boolean` | Whether data is being fetched |
| `error` | `Error \| null` | Error object if request failed |
| `refetch` | `() => void` | Function to refetch data |

## Examples (if more examples need to be convered)

```javascript
const { data, loading, error, refetch } = useHookName({ ... });

// Refetch on button click
<button onClick={refetch}>Refresh</button>
```

**Guidelines:**

- Include brief description of what the hook does
- Explain when/why to use this hook with example use cases
- Show complete working example
- Handle loading and error states in examples
- Document hook input props
- Document return values
- Include type information for all props and return values
- Add "Examples" section if additional usage patterns need to be covered
- Show how to use all returned values (data, loading, error, refetch, etc.)

## Basic concepts

UsagePatterns.mdx

```
# Usage Patterns

The library is designed to be flexible by default and customizable when needed. Instead of enforcing a single way of working, it supports multiple **usage patterns** that let you adapt components to different use cases, styling approaches, and rendering requirements.

Each pattern represents a different level of control—from simple configuration to fully customized rendering—allowing you to choose the approach that best fits your use case without unnecessary complexity.

Below are the supported usage and customization patterns.

---

## 1. `componentOverrides` Prop

The `componentOverrides` prop allows you to override specific parts of a component’s rendering logic by providing custom content or render functions. This pattern is useful when you want to customize how a component (or part of it) is rendered without rewriting or wrapping the entire component.

The overrides are defined using a generic TypeScript abstraction, making them strongly typed and predictable.

> **Note**  
> For each component that supports this pattern, its documentation includes a dedicated reference listing **all supported keys** that can be passed to the `componentOverrides` prop, along with their corresponding render props.

### Type Definition

```ts
type RenderPropsChildren<RenderProps> =
  | ((props: RenderProps) => ReactNode)
  | ReactNode;

interface ComponentOverrideProps<T> {
  reactNode?: RenderPropsChildren<T>;
}
```

### How It Works

`reactNode` allows you to:

Pass a static ReactNode to fully replace the rendered output, or

Provide a render function that receives the component’s internal render props and returns a ReactNode.

This enables both simple overrides (for example, custom markup) and advanced ones (such as conditional rendering based on internal state).

Example: 
<!-- Include example specific to the library -->


## 2. Render Props

The render props pattern allows you to customize a component’s rendering by passing a function as a child or prop. This function receives the component’s internal state and helpers, giving you full control over what gets rendered while the component continues to manage its own behavior.

This pattern is ideal when customization requires dynamic logic rather than simple structural overrides.

```tsx
<Component>
  {({ isActive, value, onChange }) => (
    <div>
      <span>Status: {isActive ? 'Active' : 'Inactive'}</span>
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )}
</Component>

```

### How It Works

The component exposes a set of render props (state, callbacks, and helpers).

You provide a function that receives these props and returns a ReactNode.

The component remains responsible for state management, accessibility, and behavior.

> **Note**  
> For each component that supports render props, its documentation clearly lists the available render props, including their types and intended usage.

Example:
<!-- Include example specific to the library -->


## 3. Compound Components

The compound components pattern exposes a set of related subcomponents that work together under a shared parent context. This allows you to compose complex UIs declaratively while keeping state and behavior centralized.

Instead of passing configuration or render functions, you structure your UI using predefined building blocks that communicate implicitly.

> **Note**  
> For each component that supports this pattern, its documentation lists all available compound subcomponents, along with their expected hierarchy and usage rules.

```
<Component>
  <Component.Label />
  <Component.Input />
  <Component.HelperText />
</Component>
```

### How It Works

The parent component provides context (state, actions, configuration).

Subcomponents subscribe to that context internally.

Composition defines behavior without requiring prop drilling.

Example: 
<!-- Include example specific to the library -->


<!-- Add any additional patterns that can be used -->
```

Shopify.mdx

```
### Shopify (Liquid)

```liquid
{% render 'library-component', settings: library_settings %}
```

<!-- Add details on how to use the library within Shopify -->

<!-- Add link to any existing docs for our connectors like https://docs.constructor.com/docs/integrating-with-constructor-platform-connectors-catalog-connectors-shopify-connector -->
```

Salesforce.mdx

```
<!-- Add details on how to use the library within Salesforce -->

<!-- Add link to any existing docs for our connectors like https://docs.constructor.com/docs/integrating-with-constructor-platform-connectors-catalog-connectors-salesforce-connector -->
```



---

## Utils

**Reference.mdx**

**Template:**

We'll keep all utils in this one file

```
# Utilities

Helper functions for common tasks.

---

## transformSearchResults

Transforms raw API response into component-compatible format.

**When to use:**
- When building custom components
- When using render props with custom data transformations

**Signature:**

```typescript
function transformSearchResults(
  response: ApiResponse
): SearchResult[]
```

**Parameters:**
- `response` (ApiResponse): Raw API response object

**Returns:**
- `SearchResult[]`: Array of transformed search results

**Usage:**

```javascript
import { transformSearchResults } from 'library-name/utils';

const results = transformSearchResults(apiResponse);
// Returns: [{ id: 1, title: "Product 1", ... }, ...]
```

---

## formatPrice

Formats price values with currency symbols.

**When to use:**
- When displaying prices in custom components
- When formatting currency values consistently

**Signature:**

```typescript
function formatPrice(
  price: number,
  currency: string = 'USD'
): string
```

**Parameters:**
- `price` (number): Price value to format
- `currency` (string, optional): Currency code. Defaults to 'USD'

**Returns:**
- `string`: Formatted price string with currency symbol

**Usage:**

```javascript
import { formatPrice } from 'library-name/utils';

formatPrice(19.99, 'USD'); // "$19.99"
formatPrice(29.99, 'EUR'); // "€29.99"
```
```

**Guidelines:**

- Include brief description of what each function does
- Explain when to use each utility with specific use cases
- Include function signature with TypeScript types
- Document all parameters with types and descriptions
- Document return value with type and description
- Provide copy-paste usage examples with import statements
- Show example output/results in code comments

---

##  Examples

**AdvancedUseCases.mdx**

**Template:**

Template depends on example and project.

**Guidelines:**

- Show complete, real-world examples
- Focus on patterns customers frequently request
- Include both JavaScript and CSS when needed
- Link to live CodeSandbox demos if applicable
- Focus on patterns customers frequently request

---

# Checklists

Use this checklist to verify documentation completeness for each OS UI library.

## README.md

1. Header

- [ ] Library name
- [ ] One-line description of what the library does
- [ ] NPM version and license badges
- [ ] Image/gif (if applicable)

2. Documentation

- [ ] Link to Storybook documentation

3. Table of Contents

- [ ] Table of contents with anchor links to all sections

4. Overview

- [ ] High-level purpose (1-2 sentences)
- [ ] Key capabilities list (4-6 bullet points)
- [ ] Link to Storybook for comprehensive docs

5. Installation & Quick Start

- [ ] Install via NPM (npm/yarn commands)
- [ ] Basic usage example with minimum code
- [ ] Only required props/parameters included
- [ ] Working CodeSandbox link

6. Integration Modes (if applicable)

- [ ] All supported integration modes documented
- [ ] Minimal examples (1-3 lines if possible)
- [ ] Link to detailed guides in Storybook

7. Customization

- [ ] Simple customization example (e.g., CSS)
- [ ] Link to comprehensive customization docs in Storybook

8. Troubleshooting (if applicable)

- [ ] Table format with common issues and solutions
- [ ] Specific, actionable solutions
- [ ] Link to GitHub issues for additional help

9. Resources (if applicable)

- [ ] Links to Storybook, JS Client, REST API Docs, and other relevant resources

10. Contributing

- [ ] Basic contribution steps (fork, install, test, submit PR)

11. License

- [ ] License information

---

## Storybook

**Section 1: Getting Started**

- Introduction.mdx
    - [ ] Library name with link to GitHub
    - [ ] Brief description of what library does
    - [ ] Prerequisites (Node.js version, React version, API key requirements)
    - [ ] Navigation tile/link to Quickstart.mdx
    - [ ] Navigation tiles/links to Components section
    - [ ] Navigation tiles/links to Hooks section (if applicable)
- Quickstart.mdx
    - [ ] Step-by-step installation instructions (npm/yarn)
    - [ ] Basic setup example with minimal code
    - [ ] Code is copy-paste ready
    - [ ] Links to next steps (explore props/components)
    - [ ] Support contact information

**Section 2: Components**

For each exported component:

- ComponentName.stories.tsx
    - [ ] Multiple story variants (basic, customized, edge cases)
    - [ ] Realistic prop values (not foo/bar/baz)
    - [ ] Each story focused on one concept
    - [ ] Consistent pattern across all stories
- ComponentName.mdx
    - [ ] Brief description of component
    - [ ] Interactive Canvas example at top
    - [ ] Link to fullscreen view
    - [ ] Props Reference using `<ArgTypes of={ComponentNameStories} />`
    - [ ] Additional tables/references if needed for nested props
    - [ ] Examples/Variations section
    - [ ] "See Also" links to related sections (if applicable)

**Section 3: Hooks**

For each exported hook:

- HookName.stories.tsx
    - [ ] Created even if no visual render (enables ArgTypes generation)
- Usage.mdx
    - [ ] Brief description of what hook does
    - [ ] "When to Use" section with example use cases
    - [ ] Complete working usage example with imports
    - [ ] Loading and error state handling in examples
    - [ ] "useHookName Props" section with `<ArgTypes of={HookNameStories} />`
    - [ ] "useHookName Return Value" section with table
    - [ ] Type information for all props and return values
    - [ ] "Examples" section if additional patterns needed
    - [ ] Shows usage of all returned values

**Section 4: Basic Concepts (if applicable)**

    - [ ] CorePrinciples.md or similar conceptual documentation
    - [ ] Create an mdx file for each integration type (Shopify, Salesforce, etc..)
    - [ ] Explanations of key architectural patterns
    - [ ] When/why to use different approaches

**Section 5: Utils**

- Reference.mdx
    - [ ] All exported utility functions documented
    - Each function includes:
        - [ ] Brief description
        - [ ] "When to use" with specific use cases
        - [ ] Function signature with TypeScript types
        - [ ] Parameters documented with types and descriptions
        - [ ] Return value documented with type and description
        - [ ] Usage example with import statement
        - [ ] Example output/results in code comments

**Section 6: Examples**

- AdvancedUseCases.mdx (if applicable)
    - [ ] 3-5 advanced use case examples
    - [ ] Complete, working code for each example
    - [ ] Focus on patterns customers frequently request
    - [ ] JavaScript and CSS included when needed
    - [ ] CodeSandbox links for complex examples
