Changelog

# v3.2.4 [2024-12-26]

## Patch Release

### Fixes 
- Fixed square seat placement issue


# v3.2.3 [2024-12-25]

## Patch Release

### Fixes 
- Fixed free seating section selector color

# v3.2.2 [2024-12-25]

## Patch Release

### Fixes 
- Fixed an issue when there is no visibility offset

# v3.2.1 [2024-12-18]

## Patch Release

### Fixes 
- Updated performance when rendering large layouts

---

# v3.2.0 [2024-12-07]

## Minor Release

### Features 
- Added shift key support to maintain aspect ratio during resize

---

# v3.1.1 [2024-12-07]

## Patch Release

### Fixes 
- Fixed an issue where the image object lock attribute was not included in the data exported from the toolkit

---

# v3.1.0 [2024-12-05]

## Minor Release

### Features 
- Adds a new event handler named `onImageHover` which is applicable in User mode

---

# v3.0.1 [2024-12-05]

## Patch Release

### Fixes 
- Fixed an issue where the custom selected seat icon is not visible
- Removed a few unused types from custom styles

---

# v3.0.0 [2024-08-27]

## Major Release

### Features 
- Complete UI overhaul with a new design system
- Adds support for element rotation
- Adds support for passing external shapes into the toolkit

---

# v2.1.1 [2024-08-07]

## Patch Release

### Fixes
- Fixes an issue where the styles of the category and section selector were not being applied correctly.

---

# v2.1.0 [2024-08-07]

## Minor Release

### Features
- Adds 2 new actions, `actions.selectElement` and `actions.getState` to select an element and retrieve the updated state respectively.
- Exposes the `store` object which is the Redux store used by the toolkit to manage its state.

---

# v2.0.0 [2024-07-31]

## Patch with Breaking Changes

### Fixes 
- Styling conflicts with other design systems by scoping the Tailwind base styles

### Breaking Changes
- Wraps the toolkit with a div with the class name "stk-core" to enable scoping of the toolkit styles. An additional property is added to the style prop under `core` to allow customization of the core div.

---

# v1.0.0 [2024-06-18]

## Initial Stable Release