import { Tooltip, TooltipContent, TooltipTrigger } from "../../components";
import { tools } from "./data";

const ToolBar = () => {
  return (
    <div className="h-full min-h-screen flex flex-col gap-6  [&>*:last-child]:[&>*:last-child]:hidden bg-black/5">
      {Object.entries(tools).map(([key, value], index) => {
        const Icon = value.icon;
        return (
          <div key={index} className="relative hover:bg-white transition-all duration-300">
            <Tooltip>
              <TooltipTrigger className="p-3.5 px-[1rem] rounded-md">
                <Icon size={20} className="pointer-events-none" />
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
