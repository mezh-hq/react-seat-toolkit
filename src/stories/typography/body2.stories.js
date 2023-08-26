import { Body2 as Body2Component } from "@/components/typography";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "text-[20px] sm:text-[22px] lg:text-[24px] text-center lg:text-start" }
    }
  },
  children: {
    description: "The text to be rendered",
    type: "string"
  }
};

export default {
  title: "Typography/Body2",
  component: Body2Component,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Body2 = {
  argTypes,
  args: {
    children: "I'm a smaller body text"
  }
};
