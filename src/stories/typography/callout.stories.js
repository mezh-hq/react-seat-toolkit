import { Callout as CalloutComponent } from "@/components/typography";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "text-[16px] sm:text-[18px] lg:text-[19px] text-center lg:text-start" }
    }
  },
  children: {
    description: "The text to be rendered",
    type: "string"
  }
};

export default {
  title: "Typography/Callout",
  component: CalloutComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Callout = {
  argTypes,
  args: {
    children: "I'm a callout"
  }
};
