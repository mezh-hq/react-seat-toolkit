import { Provider } from "react-redux";
import { Controls, Cursor, EventHandlers, Operations, Toolbar, TooltipProvider, Workspace } from "@/components";
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
      </TooltipProvider>
      <Cursor />
      <EventHandlers />
    </Provider>
  );
};

export default SeatDesigner;
