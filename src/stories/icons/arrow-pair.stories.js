import { ArrowPair as ArrowPairIcon } from "@/icons";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root svg element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "h-[19px] w-[18px] text-black/50" }
    }
  }
};

export default {
  title: "Icons/Arrow Pair",
  component: ArrowPairIcon,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const ArrowPair = {
  argTypes
};
