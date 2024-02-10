import SeatToolkit from "@/index";

export default {
  title: "Designer",
  component: SeatToolkit,
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {}
};

export const Default = {
  render: () => <SeatToolkit />
};
