import { Provider } from "react-redux";
import { Cursor, Editor, Navbar, Toolbar, TooltipProvider } from "@/components";
import { store } from "@/store";

export const SeatDesigner = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <div className="flex flex-col">
          <Navbar />
          <div className="w-full flex">
            <Toolbar />
            <Editor />
          </div>
        </div>
      </TooltipProvider>
      <Cursor />
    </Provider>
  );
};

export default SeatDesigner;
