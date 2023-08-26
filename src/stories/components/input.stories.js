import { BsSearch } from "react-icons/bs";
import { Input } from "@/components";

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
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Text = {
  args: {
    placeholder: "Name"
  },
  argTypes
};

export const Password = {
  args: {
    placeholder: "Password",
    type: "password"
  },
  argTypes
};

export const WithPrefixIcon = {
  args: {
    placeholder: "Search",
    prefixIcon: BsSearch({ size: 20, className: "text-gray-400" })
  },
  argTypes
};
