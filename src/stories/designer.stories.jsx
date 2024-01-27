import SeatDesigner from "@/index";

export default {
  title: "Designer",
  component: SeatDesigner,
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {}
};

export const Default = {
  render: () => <SeatDesigner />
};
