import { Dropdown as DropdownComponent } from "@/components";

const argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" },
    description: "Changes the look of the input",
    table: {
      defaultValue: { summary: "primary" }
    }
  },
  placeholder: {
    description: "The placeholder text to be displayed in the input",
    type: "string"
  },
  prefixIcon: {
    description: "An icon to be displayed in the input before the text",
    type: "object"
  },
  className: {
    description:
      "Any additional CSS classes to be passed into the input. Existing classes will be overwritten in case of conflict",
    type: "string"
  }
};

export default {
  title: "Components/Dropdown",
  component: DropdownComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Dropdown = {
  args: {
    label: "Select favourite",
    options: [
      { label: "Apple", key: "apple" },
      { label: "Banana", key: "banana" },
      { label: "Orange", key: "orange" },
      { label: "Mango", key: "mango" }
    ]
  },
  argTypes
};
