import { Provider } from "react-redux";
import {
  Controls,
  Cursor,
  EventHandlers,
  Footer,
  Operations,
  Sections,
  Toolbar,
  TooltipProvider,
  Workspace
} from "@/components";
import { useInteractions } from "@/hooks";
import { store } from "@/store";

export const SeatDesigner = () => {
  useInteractions();
  return (
    <Provider store={store}>
      <TooltipProvider>
        <div className="h-full flex flex-col">
          <Operations />
          <Sections />
          <div className="h-full flex relative">
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
