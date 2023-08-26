import { Times as TimesIcon } from "@/icons";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root svg element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "h-[15px] w-[15px] text-black" }
    }
  }
};

export default {
  title: "Icons/Times",
  component: TimesIcon,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Times = {
  argTypes
};
