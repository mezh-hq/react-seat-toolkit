import { Provider } from "react-redux";
import { Controls, Cursor, Footer, Operations, Toolbar, TooltipProvider, Workspace } from "@/components";
import { useEvents, useInteractions } from "@/hooks";
import { store } from "@/store";

export const SeatToolkit = () => {
  return (
    <Provider store={store}>
      <Designer />
    </Provider>
  );
};

const Designer = () => {
  useEvents();
  useInteractions();
  return (
    <>
      <TooltipProvider>
        <div className="h-full flex flex-col">
          <Operations />
          <div className="h-full flex relative">
            <Toolbar />
            <Workspace />
            <Controls />
          </div>
        </div>
        <Footer />
      </TooltipProvider>
      <Cursor />
    </>
  );
};

export default SeatToolkit;
