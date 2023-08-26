import { Badge } from "@/components";

const argTypes = {
  children: {
    description: "Any JSX child / children to be passed into the button"
  },
  className: {
    description:
      "Any additional CSS classes to be passed into the badge. Existing classes will be overwritten in case of conflict",
    type: "string"
  }
};

export default {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Default = {
  args: {
    children: "1st Place"
  },
  argTypes
};
