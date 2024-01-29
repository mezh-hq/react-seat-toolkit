import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { ids } from "@/constants";
import { store } from "@/store";
import { clearCursor, setCursor } from "@/store/reducers/editor";
import { clearTool, selectTool } from "@/store/reducers/toolbar";
import { tools } from "./data";

const ToolBar = () => {
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);

  const onEscape = useCallback((event) => {
    if (event.key === "Escape") {
      store.dispatch(clearTool());
      store.dispatch(clearCursor());
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, []);

  const onToolClick = (tool, icon) => {
    try {
      store.dispatch(selectTool(tool));
      store.dispatch(setCursor(icon));
    } catch (_) {}
  };

  return (
    <div
      id={ids.toolbar}
      className="h-full min-h-[88.5vh] flex flex-col gap-6 border-t pt-5 border-black [&>*:last-child]:[&>*:last-child]:hidden bg-black/5"
    >
      {Object.entries(tools).map(([key, value], index) => {
        const Icon = value.icon;
        return (
          <div
            key={index}
            className={twMerge(
              "relative hover:bg-white transition-all duration-300 !cursor-pointer",
              selectedTool === key && "bg-white/80"
            )}
            onClick={() => onToolClick(key, value.iconCursor ?? value.icon)}
          >
            <Tooltip>
              <TooltipTrigger className="p-3.5 px-[1rem] rounded-md">
                <Icon
                  size={20}
                  className={twMerge(
                    "pointer-events-none",
                    selectedTool === key && "text-blue-600 transition-all duration-300"
                  )}
                />
              </TooltipTrigger>
              <TooltipContent align="start" alignOffset={30} sideOffset={-39} className="flex gap-3 ml-8">
                {key}
              </TooltipContent>
            </Tooltip>
            <div className="bg-black h-1 w-1 mx-auto left-[45%] opacity-10 absolute bottom-0 transform translate-y-3.5 rotate-[-25deg]" />
          </div>
        );
      })}
    </div>
  );
};

export default ToolBar;
