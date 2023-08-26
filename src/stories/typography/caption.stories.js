import { Caption as CaptionComponent } from "@/components/typography";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "text-[14px] font-medium text-center lg:text-start" }
    }
  },
  children: {
    description: "The text to be rendered",
    type: "string"
  }
};

export default {
  title: "Typography/Caption",
  component: CaptionComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Caption = {
  argTypes,
  args: {
    children: "I'm a caption"
  }
};
