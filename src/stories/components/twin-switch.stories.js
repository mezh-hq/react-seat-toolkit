import { TwinSwitch } from "@/components";

const argTypes = {
  values: {
    description: "An array of 2 values to be toggled between",
    type: "array"
  },
  onChange: {
    description: "A callback function that will be called with the selected value when the value changes",
    type: "function",
    table: {
      category: "Events"
    }
  },
  className: {
    description:
      "Any additional CSS classes to be passed into the badge. Existing classes will be overwritten in case of conflict",
    type: "string"
  },
  handleClassName: {
    description:
      "Any additional CSS classes to be passed into the handle. Existing classes will be overwritten in case of conflict",
    type: "string"
  }
};

export default {
  title: "Components/TwinSwitch",
  component: TwinSwitch,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Default = {
  args: {
    values: ["ROUND 01", "FINAL"]
  },
  argTypes
};
