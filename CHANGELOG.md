Changelog

# v2.1.1 [2024-08-07]

## Patch Release

### Fixes
- Fixes an issue where the styles of the category and section selector were not being applied correctly.

# v2.1.0 [2024-08-07]

## Minor Release

### Features
- Adds 2 new actions, `actions.selectElement` and `actions.getState` to select an element and retrieve the updated state respectively.
- Exposes the `store` object which is the Redux store used by the toolkit to manage its state.

# v2.0.0 [2024-07-31]

## Patch with Breaking Changes

### Fixes 
- Styling conflicts with other design systems by scoping the Tailwind base styles

### Breaking Changes
- Wraps the toolkit with a div with the class name "stk-core" to enable scoping of the toolkit styles. An additional property is added to the style prop under `core` to allow customization of the core div.

---

# v1.0.0 [2024-06-18]

## Initial Stable Release