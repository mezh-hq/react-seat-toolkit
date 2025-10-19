# GitHub Copilot Custom Instructions

## Project Overview

React Seat Toolkit is a React UI library for designing and rendering seat layouts. It provides both designer and user modes for creating and interacting with seat arrangements.

## Technology Stack

- **Runtime**: Bun
- **Language**: TypeScript with React (JSX)
- **UI Libraries**: Radix UI components, Lucide React icons
- **State Management**: Redux Toolkit with react-redux
- **Styling**: Tailwind CSS with custom configuration
- **Build Tools**: esbuild for bundling, TypeScript for types
- **Development**: Storybook for component development
- **Code Quality**: ESLint, Prettier, Lefthook

## Code Style and Linting

- Follow the ESLint configuration in `.eslintrc`
- Use Prettier for code formatting as configured in `.prettierrc`
- Print width: 120 characters
- No trailing commas
- Import order matters - follow this order:
  1. React imports
  2. React-related packages
  3. Redux-related packages
  4. Third-party modules
  5. Internal imports with `@/` alias
  6. Relative imports
- Run `bun lint` before committing to ensure code quality
- Run `bun format` to format code consistently

## TypeScript Configuration

- Base URL is `./src`
- Use path alias `@/*` for imports from src directory (e.g., `import { Component } from "@/components/Component"`)
- JSX is configured as `react-jsx`
- Use TypeScript for all new files
- Disable `@typescript-eslint/no-explicit-any` is allowed per project config
- React prop-types are not required (using TypeScript instead)

## Building and Testing

- **Install dependencies**: `bun install`
- **Development**: `bun storybook` to start Storybook dev server on port 6006
- **Build library**: `bun build` (builds ESM, CJS, and slim versions)
- **Build types**: Automatically runs after build via `postbuild` script
- **Build CSS**: Automatically runs after build, using Tailwind
- **Build Storybook**: `bun build-storybook` for web release
- **Linting**: `bun lint` (auto-fixes issues)
- **Formatting**: `bun format`
- Note: The project currently has `echo "Error: no test specified" && exit 1` for tests, so no test suite exists yet

## Project Structure

- `/src` - Source code
  - `/actions` - Redux actions
  - `/components` - React components
  - `/constants` - Constants and configuration
  - `/hooks` - Custom React hooks
  - `/store` - Redux store and reducers
  - `/stories` - Storybook stories
  - `/styles` - CSS and Tailwind styles
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions
- `/examples` - Example implementations
- `/dist` - Built output (generated, not committed)
- `/.storybook` - Storybook configuration

## Dependencies

### Core Libraries
- Use `@interactjs` for drag-and-drop interactions
- Use `@radix-ui` components for UI primitives (popover, select, switch, tooltip)
- Use `d3` for data visualization and transformations
- Use `lodash` for utility functions
- Use `lucide-react` for icons
- Use `@reduxjs/toolkit` and `react-redux` for state management
- Use `uuid` for generating unique identifiers
- Use `class-variance-authority` and `tailwind-merge` for styling utilities

### Build-time Libraries
- Don't add new dependencies unless absolutely necessary
- Peer dependencies require React >= 18.0.0

## Commit Messages

- Follow conventional commits format
- Refer to `commitlint.config.js` for supported prefixes
- Use semantic commit types (feat, fix, docs, style, refactor, test, chore, etc.)

## Pull Request Guidelines

- Label PRs appropriately
- Add clear descriptions
- Include screenshots/GIFs for UI changes
- Update documentation for features or bug fixes

## Security and Best Practices

- Never commit secrets or API keys to the repository
- Validate all external inputs
- Follow React best practices and hooks rules
- Use functional components with hooks (no class components)
- Avoid using `any` type when possible, but it's allowed per project config if needed

## Additional Notes

- The library exports multiple formats: ESM (`dist/index.mjs`), CJS (`dist/index.cjs`), and slim version
- The slim version excludes some Radix UI and utility dependencies
- Styles are exported separately as `@mezh-hq/react-seat-toolkit/styles`
- For Next.js projects, dynamic imports may be needed to avoid SSR issues
- The project uses path aliases for cleaner imports (e.g., `@/components` instead of `../../components`)
