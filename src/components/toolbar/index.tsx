import { useCallback, useEffect } from "react";
import { DraftingCompass } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components";
import { default as DockHandler } from "@/components/workspace/dock/handler";
import { Tool, dataAttributes, ids } from "@/constants";
import { store } from "@/store";
import { clearCursor, setCursor, setSelectedPolylineId, showControls } from "@/store/reducers/editor";
import { clearTool, selectSubTool, selectTool } from "@/store/reducers/toolbar";
import { ISTKProps } from "@/types";
import { fallible } from "@/utils";
import { selectFirstShape } from "../controls/shapes";
import { tools } from "./data";

const ToolBar: React.FC<ISTKProps> = (props) => {
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);
  const selectedSubTool = useSelector((state: any) => state.toolbar.selectedSubTool);
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
      if (selectedSubTool) {
        const subTool = tools[selectedTool].subTools?.find((tool) => tool.name === selectedSubTool);
        store.dispatch(setCursor(subTool.iconCursor ?? subTool.icon));
      } else if (selectedTool && selectedTool !== Tool.Shape) {
        store.dispatch(setCursor(tools[selectedTool].iconCursor ?? tools[selectedTool].icon));
      }
    });
  }, [selectedTool, selectedSubTool]);

  const onToolClick = (tool, isSubtoolClick: boolean) => {
    if (isSubtoolClick) return;
    store.dispatch(selectTool(tool));
    if ([Tool.Image, Tool.Shape].includes(tool)) {
      store.dispatch(showControls());
      if (tool === Tool.Shape) selectFirstShape({ options: props.options });
    }
    if (tool !== Tool.Pen && selectedPolylineId) {
      store.dispatch(setSelectedPolylineId(null));
    }
  };

  const onSubToolClick = (tool) => {
    store.dispatch(selectSubTool(tool.name));
  };

  return (
    <div
      id={ids.toolbar}
      className={twMerge("border-r border-gray-200 bg-white", styles?.root?.className)}
      style={styles?.root?.properties}
    >
      <div className="m-[.875rem] p-1">
        <DraftingCompass className="w-5 h-5" />
      </div>
      <hr className="!border-gray-200" />
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
                onClick={(e) =>
                  onToolClick(key, (e.target as HTMLElement)?.getAttribute(dataAttributes.subtool) === "true")
                }
              >
                <Tooltip>
                  <TooltipTrigger
                    className={twMerge(
                      "rounded-md w-8 h-8 flex justify-center items-center",
                      props?.styles?.core?.tooltip?.trigger?.className
                    )}
                    style={props?.styles?.core?.tooltip?.trigger?.properties}
                  >
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
                    className={twMerge(
                      "flex gap-3 ml-8",
                      props?.styles?.core?.tooltip?.content?.className,
                      styles?.tool?.label?.className
                    )}
                    style={{ ...props?.styles?.core?.tooltip?.content?.properties, ...styles?.tool?.label?.properties }}
                  >
                    {key}
                  </TooltipContent>
                </Tooltip>
                {(value as any).subTools?.length && (
                  <Popover>
                    <PopoverTrigger className="rounded-md absolute inset-0" />
                    <PopoverContent
                      align="start"
                      alignOffset={25}
                      sideOffset={-34}
                      className="bg-white w-auto p-0 ml-8 items-center justify-center flex flex-col shadow-none"
                    >
                      <PopoverClose className="hover:bg-gray-100 rounded-md p-2 focus:outline-none cursor-pointer">
                        <Icon
                          size={18}
                          className={twMerge(
                            "pointer-events-none transition-all duration-300",
                            styles?.tool?.icon?.className
                          )}
                          style={styles?.tool?.icon?.properties}
                        />
                      </PopoverClose>
                      {(value as any).subTools?.map((tool) => {
                        const SubIcon = tool.icon;
                        return (
                          <PopoverClose
                            key={tool.name}
                            onClick={() => onSubToolClick(tool)}
                            className="hover:bg-gray-100 rounded-md p-2 focus:outline-none cursor-pointer"
                            {...{ [dataAttributes.subtool]: true }}
                          >
                            <SubIcon
                              size={18}
                              className={twMerge(
                                "pointer-events-none transition-all duration-300 ",
                                styles?.tool?.icon?.className
                              )}
                              style={styles?.tool?.icon?.properties}
                            />
                          </PopoverClose>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            );
          })}
        </div>
        <div className="px-3 py-6 sticky bottom-0 bg-white">
          <DockHandler />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
