import { Title as TitleComponent } from "@/components/typography";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "text-[30px] lg:text-[32px] text-center font-bold lg:text-start tracking-[-2px]" }
    }
  },
  children: {
    description: "The text to be rendered",
    type: "string"
  }
};

export default {
  title: "Typography/Title",
  component: TitleComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const Title = {
  argTypes,
  args: {
    children: "I'm a title"
  }
};
