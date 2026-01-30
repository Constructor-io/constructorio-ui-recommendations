# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Constructor Recommendations UI is a React library that provides components for fetching and rendering product recommendations powered by Constructor.io. It offers both React components and a vanilla JavaScript bundle for framework-agnostic usage.

## Common Commands

```bash
# Development
npm run dev              # Start Storybook on port 6006
npm run storybook-docs-dev  # Storybook docs mode on port 6007

# Testing
npm run test             # Run all Jest tests
npm run test -- --watch  # Run tests in watch mode
npm run test -- path/to/file.test.tsx  # Run a single test file
npm run test-storybook   # Run Storybook interaction tests

# Linting and Types
npm run lint             # ESLint on src directory
npm run check-types      # TypeScript type checking

# Build
npm run compile          # Full build (ESM + CJS + Vite bundle)
npm run build-storybook  # Build static Storybook docs
```

## Architecture

### Provider Pattern
The library uses React Context for configuration and client management:
- `CioRecommendationProvider` - Context provider that initializes the Constructor.io client
- `CioRecommendations` - Main component wrapping the provider with a carousel UI
- `useRecommendationResults` - Core hook for fetching recommendations with status tracking (`IDLE`, `FETCHING`, `SUCCESS`, `ERROR`)
- `useCioClient` - Hook for Constructor.io client initialization

### Data Flow
1. User provides `apiKey` and `podId` to `CioRecommendations`
2. `useCioClient` initializes the Constructor.io client
3. `useRecommendationResults` fetches recommendations via the client
4. Response is transformed via `transformers.ts` to normalize API data (snake_case → camelCase)
5. Components render using `Carousel` from `constructorio-ui-components`

### Module Exports
- **ESM:** `lib/mjs/index.js`
- **CJS:** `lib/cjs/index.js` (import via `constructorio-ui-recommendations/cjs`)
- **Bundled:** `dist/constructorio-ui-recommendations-bundled.js` (vanilla JS with CSS injection)

### Key Files
- `src/types.ts` - TypeScript interfaces for `Item`, `Pod`, `RecommendationsData`, and component props
- `src/utils/transformers.ts` - API response transformation utilities
- `src/utils/itemFieldGetters.ts` - Functions to extract price, images, swatches from API items

## Testing Structure

Tests live in `spec/` mirroring `src/` structure:
- `spec/components/` - Component tests
- `spec/hooks/` - Hook tests
- `spec/utils/` - Utility tests
- `spec/testUtils.jsx` - Shared test utilities

Jest runs two projects:
- `client` (jsdom) - Default for all tests
- `server` (node) - Files matching `*.server.test.(js|jsx)`

## Peer Dependencies

Required packages that consumers must install:
- `@constructor-io/constructorio-client-javascript` (^2.67.1)
- `@constructor-io/constructorio-ui-components` (^1.0.1)
- `react` and `react-dom` (>=16.12.0)

## Styling

- Starter styles are in `src/styles.css`, scoped to `.cio-recommendations`
- Styles are opt-in: consumers must explicitly import `constructorio-ui-recommendations/styles.css`
- The bundled version can auto-inject CSS via `includeCSS: true` option

## Documentation Standards

When writing or updating documentation (Storybook stories, MDX docs, README), follow `guideline.md` which defines:
- README structure: Header, Documentation link, TOC, Overview, Installation, Integration Modes, Customization, Troubleshooting, Resources
- Storybook structure: `src/stories/` with getting-started/, components/, hooks/, basic-concepts/, utils/
- Code examples must be complete, minimal, realistic, and copy-paste ready
- Use tables for props, return values, and troubleshooting
- Each component needs `.stories.tsx` (interactive examples) and `.mdx` (documentation with Props Reference)
- Each hook needs `Usage.mdx` with "When to Use", usage example, props table, and return value table
