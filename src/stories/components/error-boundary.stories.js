import ErroredComponent from "./error-boundary";

const argTypes = {
  className: {
    description:
      "Any additional CSS classes to the root element. Existing classes will be overwritten in case of conflict",
    type: "string",
    table: {
      defaultValue: { summary: "w-full min-h-screen flex flex-col justify-center items-center font-inter" }
    }
  }
};
export default {
  title: "Components/Error Boundary",
  component: ErroredComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
};

export const ErrorBoundary = {
  argTypes,
  args: {
    className: "min-h-0"
  }
};
