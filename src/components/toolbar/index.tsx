import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { ids } from "@/constants";
import { store } from "@/store";
import { clearCursor, setCursor, setSelectedPolylineId, showControls } from "@/store/reducers/editor";
import { clearTool, selectTool } from "@/store/reducers/toolbar";
import { ISTKProps } from "@/types";
import { fallible } from "@/utils";
import { selectFirstShape } from "../controls/shapes";
import { Tool, tools } from "./data";

const ToolBar: React.FC<ISTKProps> = (props) => {
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);
  const selectedPolylineId = store.getState().editor.selectedPolylineId;

  const styles = props.styles?.toolbar;

  const onEscape = useCallback(
    (event) => {
      if (event.key === "Escape") {
        if (selectedTool === Tool.Pen) {
          store.dispatch(selectTool(Tool.Select));
        } else {
          store.dispatch(clearTool());
          store.dispatch(clearCursor());
        }
        store.dispatch(setSelectedPolylineId(null));
      }
    },
    [selectedTool]
  );

  useEffect(() => {
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [selectedTool]);

  useEffect(() => {
    fallible(() => {
      if (selectedTool && selectedTool !== Tool.Shape) {
        store.dispatch(setCursor(tools[selectedTool].iconCursor ?? tools[selectedTool].icon));
      }
    });
  }, [selectedTool]);

  const onToolClick = (tool) => {
    store.dispatch(selectTool(tool));
    if ([Tool.Image, Tool.Shape].includes(tool)) {
      store.dispatch(showControls());
      if (tool === Tool.Shape) selectFirstShape();
    }
    if (tool !== Tool.Pen && selectedPolylineId) {
      store.dispatch(setSelectedPolylineId(null));
    }
  };

  return (
    <div
      id={ids.toolbar}
      className={twMerge(
        "h-full flex flex-col gap-5 border-t pt-5 border-black [&>*:last-child]:[&>*:last-child]:hidden bg-black/5",
        styles?.root?.className
      )}
      style={styles?.root?.properties}
    >
      {Object.entries(tools).map(([key, value]) => {
        const Icon = value.icon;
        return (
          <div
            key={key}
            className={twMerge(
              "relative hover:bg-white transition-all duration-300 !cursor-pointer",
              selectedTool === key && "bg-white/80",
              styles?.tool?.root?.className
            )}
            style={styles?.tool?.root?.properties}
            onClick={() => onToolClick(key)}
          >
            <Tooltip>
              <TooltipTrigger className="p-3.5 px-[1rem] rounded-md">
                <Icon
                  size={20}
                  className={twMerge(
                    "pointer-events-none",
                    selectedTool === key && "text-blue-600 transition-all duration-300",
                    styles?.tool?.icon?.className
                  )}
                  style={styles?.tool?.icon?.properties}
                />
              </TooltipTrigger>
              <TooltipContent
                align="start"
                alignOffset={30}
                sideOffset={-39}
                className={twMerge("flex gap-3 ml-8", styles?.tool?.label?.className)}
                style={styles?.tool?.label?.properties}
              >
                {key}
              </TooltipContent>
            </Tooltip>
            <div
              className={twMerge(
                "bg-black h-1 w-1 mx-auto left-[45%] opacity-10 absolute bottom-0 transform translate-y-[0.75rem] rotate-[-25deg]",
                styles?.divider?.className
              )}
              style={styles?.divider?.properties}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ToolBar;
