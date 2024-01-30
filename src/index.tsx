import { Provider } from "react-redux";
import { Controls, Cursor, EventHandlers, Footer, Operations, Toolbar, TooltipProvider, Workspace } from "@/components";
import { store } from "@/store";

export const SeatDesigner = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <div className="flex flex-col">
          <Operations />
          <div className="flex relative">
            <Toolbar />
            <Workspace />
            <Controls />
          </div>
        </div>
        <Footer />
      </TooltipProvider>
      <Cursor />
      <EventHandlers />
    </Provider>
  );
};

export default SeatDesigner;
