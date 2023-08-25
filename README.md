<br/>

<br/>

<p align="center">
  <img src="https://github.com/sliit-foss/bashaway-official/assets/73662613/c15f7a94-592b-410f-b581-c98d25a9ca42" width="420" alt="Bashaway Logo"/>
</p>

<br/>

<p align="center">
  <a aria-label="SLIIT FOSS logo" href="https://sliitfoss.org">
    <img src="https://img.shields.io/badge/Made_by_the_SLIIT_FOSS_Community-blue">
  </a>
  <a aria-label="License" href="https://github.com/sliit-foss/bashaway-ui/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
  <a aria-label="CI Deploy" href="https://github.com/sliit-foss/bashaway-ui/actions/workflows/release.yml">
    <img alt="" src="https://github.com/sliit-foss/bashaway-ui/actions/workflows/release.yml/badge.svg">
  </a>
</p>

<br/>

The official design system for Bashaway 2023

## Using components

Run `pnpm install @sliit-foss/bashaway-ui` to install all dependencies <br/> <br/>
Example usage

```js
import { Button, Bashaway } from "@sliit-foss/bashaway-ui"

---or---

import { Button } from  "@sliit-foss/bashaway-ui/components"
import { Bashaway } from  "@sliit-foss/bashaway-ui/icons"

....
  <>
    <Bashaway/>
    <Button>Click Me!</Button/>
  </>
...
```

## Getting started

- Run `pnpm install` to install all dependencies
- Run `pnpm storybooks` to start the storybooks dev server
- Run `pnpm build-storybook` to build the project for a web release
- Run `pnpm build` to build the project for a package release

## Commit messages

- We follow conventional commits during our development workflow as a good practice. More information can be found at their official [documentation](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#examples)
- Refer the [commitlint.config.js](https://github.com/sliit-foss/bashaway-ui/blob/main/commitlint.config.cjs) file for a full list of supported commit message prefixes

## Additional tools

- This project is bootstrapped with [Lefthook](https://evilmartians.com/opensource/lefthook), [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/). Please make good use of them.

<br/>
