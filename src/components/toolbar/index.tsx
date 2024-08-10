import { useCallback, useEffect } from "react";
import { DraftingCompass, PanelBottomClose, PanelBottomOpen } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { ids } from "@/constants";
import { store } from "@/store";
import { clearCursor, setCursor, setSelectedPolylineId, showControls } from "@/store/reducers/editor";
import { clearTool, selectTool, toggleDock } from "@/store/reducers/toolbar";
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
      className={twMerge("border-r border-border bg-white", styles?.root?.className)}
      style={styles?.root?.properties}
    >
      <div className="m-[.875rem] p-1">
        <DraftingCompass className="w-5 h-5" />
      </div>
      <hr />
      <div className="overflow-y-auto h-[calc(100%-3.5rem)] flex flex-col">
        <div className="grow">
          {Object.entries(tools).map(([key, value]) => {
            const Icon = value.icon;
            return (
              <div
                key={key}
                className={twMerge(
                  "rounded-md relative bg-transparent text-slate-400 hover:bg-slate-50 transition-all duration-300 !cursor-pointer mx-3 my-4",
                  selectedTool === key && "bg-slate-100 text-blue-500",
                  styles?.tool?.root?.className
                )}
                style={styles?.tool?.root?.properties}
                onClick={() => onToolClick(key)}
              >
                <Tooltip>
                  <TooltipTrigger className="rounded-md w-8 h-8 flex justify-center items-center">
                    <Icon
                      size={18}
                      className={twMerge(
                        "pointer-events-none transition-all duration-300",
                        styles?.tool?.icon?.className
                      )}
                      style={styles?.tool?.icon?.properties}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    align="start"
                    alignOffset={25}
                    sideOffset={-30}
                    className={twMerge("flex gap-3 ml-8", styles?.tool?.label?.className)}
                    style={styles?.tool?.label?.properties}
                  >
                    {key}
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </div>
        <DockTrigger />
      </div>
    </div>
  );
};

function DockTrigger(): JSX.Element {
  const dock = useSelector((state: any) => state.toolbar.dock);

  return (
    <div className="mx-3 my-6 sticky bottom-0">
      <div
        className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash")}
        role="button"
        onClick={() => store.dispatch(toggleDock(undefined))}
      >
        {dock ? <PanelBottomClose size={16} /> : <PanelBottomOpen size={16} />}
      </div>
    </div>
  );
}

export default ToolBar;
