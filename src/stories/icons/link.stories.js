import { Link as LinkIcon } from "@/icons";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root svg element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "text-black md:mt-0.5 pl-1.5 animated-chevron" }
    }
  }
};

export default {
  title: "Icons/Link",
  component: LinkIcon,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Link = {
  argTypes
};
