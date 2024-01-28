import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { store } from "@/store";
import { clearCursor, hideCursor, setCursor, showCursor } from "@/store/reducers/global";
import { selectTool } from "@/store/reducers/toolbar";
import { tools } from "./data";

const ToolBar = () => {
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);

  const onEscape = useCallback((event) => {
    if (event.key === "Escape") {
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
    store.dispatch(selectTool(tool));
    store.dispatch(setCursor(icon));
  };

  const onHover = () => {
    store.dispatch(hideCursor());
  };

  const onLeave = () => {
    store.dispatch(showCursor());
  };

  return (
    <div
      className="h-full min-h-screen flex flex-col gap-6  [&>*:last-child]:[&>*:last-child]:hidden bg-black/5"
      onMouseOver={onHover}
      onMouseOut={onLeave}
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
            onClick={() => onToolClick(key, value.icon)}
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
