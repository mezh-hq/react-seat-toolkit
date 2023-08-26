import { Title2 as Title2Component } from "@/components/typography";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "text-[25px] lg:text-[30px] text-start" }
    }
  },
  children: {
    description: "The text to be rendered",
    type: "string"
  }
};

export default {
  title: "Typography/Title2",
  component: Title2Component,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Title2 = {
  argTypes,
  args: {
    children: "I'm a smaller title"
  }
};
