import SeatToolkit from "@mezh-hq/react-seat-toolkit";
import "@mezh-hq/react-seat-toolkit/styles";

function App() {
  return (
    <SeatToolkit
      mode="designer"
      events={{
        onSeatClick: (seat) => {
          console.log(seat);
        },
        onSectionClick: (section) => {
          console.log(section);
        }
      }}
      styles={{
        root: {
          className: "w-screen h-screen"
        }
      }}
    />
  );
}

export default App;
