import SeatToolkit from "@/index";
import { STKMode } from "@/types";

export default {
  title: "User Mode",
  component: SeatToolkit,
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {}
};

export const Default = {
  render: () => (
    <SeatToolkit
      mode={STKMode.User}
      data={{
        seats: [
          {
            id: "1",
            x: 200,
            y: 200,
            label: "A1"
          },
          {
            id: "2",
            x: 300,
            y: 200,
            label: "A2"
          }
        ],
        shapes: [],
        text: [],
        booths: []
      }}
      events={{
        onSeatClick: (seat) => console.log(seat)
      }}
    />
  )
};
