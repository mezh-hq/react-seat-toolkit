# Custom Fields Feature

This document describes how to use custom fields in React Seat Toolkit to add additional data to seats, seat categories, and sections.

## Overview

Custom fields allow you to extend seats, categories, and sections with additional data beyond the built-in properties. This is useful for scenarios like:

- Adding ticket pricing information to seats or categories
- Marking accessibility features
- Adding capacity limits to sections
- Including descriptive metadata
- Any other custom data your application needs

## Configuration

Custom fields are configured through the `options.customFields` property when initializing the SeatToolkit component:

```tsx
import SeatToolkit from "@mezh-hq/react-seat-toolkit";
import { ICustomFieldDefinition } from "@mezh-hq/react-seat-toolkit/types";

const seatCustomFields: ICustomFieldDefinition[] = [
  {
    name: "price",
    label: "Ticket Price",
    type: "number",
    required: true,
    placeholder: "Enter price"
  },
  {
    name: "accessibility",
    label: "Wheelchair Accessible",
    type: "checkbox"
  },
  {
    name: "view",
    label: "View Quality",
    type: "select",
    options: ["Excellent", "Good", "Fair", "Limited"],
    placeholder: "Select view quality"
  }
];

<SeatToolkit
  mode="designer"
  data={...}
  options={{
    customFields: {
      seat: seatCustomFields,
      category: categoryCustomFields,
      section: sectionCustomFields
    }
  }}
/>
```

## Field Types

Custom fields support the following types:

### text
Text input field for string values.

```typescript
{
  name: "description",
  label: "Description",
  type: "text",
  placeholder: "Enter description",
  required: false
}
```

### number
Numeric input field for integer or decimal values.

```typescript
{
  name: "price",
  label: "Price",
  type: "number",
  placeholder: "Enter price",
  required: true
}
```

### select
Dropdown selection from predefined options.

```typescript
{
  name: "category",
  label: "Category",
  type: "select",
  options: ["Option 1", "Option 2", "Option 3"],
  placeholder: "Select an option"
}
```

### checkbox
Boolean toggle for yes/no values.

```typescript
{
  name: "enabled",
  label: "Enabled",
  type: "checkbox"
}
```

## Field Definition Interface

```typescript
interface ICustomFieldDefinition {
  name: string;              // Unique identifier for the field
  label: string;             // Display label in the UI
  type: CustomFieldType;     // Field type: "text" | "number" | "select" | "checkbox"
  options?: string[];        // Required for "select" type
  required?: boolean;        // Whether the field is required
  placeholder?: string;      // Placeholder text for input fields
  defaultValue?: any;        // Default value for the field
}
```

## Usage in Designer Mode

When custom fields are configured:

1. **For Seats**: When you select a seat, a "Custom Fields" section appears in the settings panel showing all configured fields.

2. **For Categories**: In the category manager (accessed via the Settings icon), each category has a new icon button to edit custom fields in a popover.

3. **For Sections**: In the section manager (when editing polylines), each section has a similar icon button to edit custom fields.

## Data Structure

Custom fields are stored in a `customFields` property on each entity:

```typescript
// Seat with custom fields
{
  id: "seat-1",
  x: 100,
  y: 100,
  label: "A1",
  category: "cat-vip",
  customFields: {
    price: 150,
    accessibility: true,
    view: "Excellent"
  }
}

// Category with custom fields
{
  id: "cat-vip",
  name: "VIP",
  color: "#FFD700",
  textColor: "#000000",
  customFields: {
    basePrice: 200,
    description: "VIP section with the best views"
  }
}

// Section with custom fields
{
  id: "sec-1",
  name: "Section A",
  color: "#FF0000",
  stroke: "#000000",
  customFields: {
    capacity: 100,
    location: "Upper deck",
    premium: true
  }
}
```

## Export and Import

Custom fields are automatically included when:

- **Exporting**: The `onExport` event or "Export JSON" button includes all custom fields
- **Importing**: When loading data via the `data` prop, custom fields are preserved and restored

Example export:

```typescript
const handleExport = (data: ISTKData) => {
  console.log(data);
  // data.seats[0].customFields contains the custom field values
  // data.categories[0].customFields contains category custom fields
  // data.sections[0].customFields contains section custom fields
};

<SeatToolkit
  mode="designer"
  events={{
    onExport: handleExport
  }}
  options={{
    customFields: { ... }
  }}
/>
```

## Example

See the Storybook examples:
- `Designer/Custom Fields` - Blank canvas with custom fields enabled
- `Designer/Custom Fields Import` - Pre-populated data with custom fields

## Best Practices

1. **Keep field names simple**: Use clear, descriptive names without spaces
2. **Provide clear labels**: Make labels user-friendly for administrators
3. **Use appropriate types**: Choose the field type that best represents your data
4. **Set defaults**: Provide sensible default values when appropriate
5. **Mark required fields**: Use the `required` flag for critical data
6. **Validate on save**: Implement your own validation in the `onExport` handler if needed

## TypeScript Support

All custom field interfaces are exported from the main package:

```typescript
import {
  ICustomFieldDefinition,
  CustomFieldType,
  ISeat,
  ISeatCategory,
  ISection
} from "@mezh-hq/react-seat-toolkit/types";
```
