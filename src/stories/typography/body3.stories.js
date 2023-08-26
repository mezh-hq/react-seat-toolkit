import { Body3 as Body3Component } from "@/components/typography";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "text-[18px] lg:text-[22px] text-start font-bold" }
    }
  },
  children: {
    description: "The text to be rendered",
    type: "string"
  }
};

export default {
  title: "Typography/Body3",
  component: Body3Component,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Body3 = {
  argTypes,
  args: {
    children: "I'm an even smaller body text"
  }
};
