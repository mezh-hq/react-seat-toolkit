import { AnimatedSwitcher as SwitcherComponent, Title } from "@/components";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to be passed into the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "w-full h-full" }
    }
  },
  component: {
    description: "The component to be rendered",
    type: "object"
  },
  alternateComponent: {
    description: "The alternate component to be rendered",
    type: "JSX",
    table: {
      defaultValue: { summary: false }
    }
  },
  show: {
    description: "Shows the primary component when true, and the alternate component when false",
    type: "boolean",
    table: {
      defaultValue: { summary: false }
    }
  }
};

export default {
  title: "Components/AnimatedSwitcher",
  component: SwitcherComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes
};

export const AnimatedSwitcher = {
  args: {
    component: Title({ children: "I'm component 1." }),
    alternateComponent: Title({ children: "I'm component 2" }),
    show: true
  },
  argTypes
};
