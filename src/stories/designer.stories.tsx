import SeatToolkit from "@/index";

export default {
  title: "Designer Mode",
  component: SeatToolkit,
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {}
};

export const Default = {
  render: () => <SeatToolkit mode={"designer"} />
};

export const Hydrated = {
  render: () => {
    const saved = sessionStorage.getItem("stk-data");
    const data = saved ? JSON.parse(saved) : undefined;
    return <SeatToolkit mode={"designer"} data={data} />;
  }
};
