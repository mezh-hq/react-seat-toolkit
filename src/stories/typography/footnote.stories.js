import { Footnote as FootnoteComponent } from "@/components/typography";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "text-[15px] lg:text-[16px] text-center lg:text-start" }
    }
  },
  children: {
    description: "The text to be rendered",
    type: "string"
  }
};

export default {
  title: "Typography/Footnote",
  component: FootnoteComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Footnote = {
  argTypes,
  args: {
    children: "I'm a footnote"
  }
};
