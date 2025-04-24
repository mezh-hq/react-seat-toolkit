import { Plane } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { toggleAirplaneMode } from "@/store/reducers/editor";
import type { ISTKProps } from "@/types";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../../core";

const toggleAirPlaneMode = () => store.dispatch(toggleAirplaneMode());

export const AirplaneMode = (props: Pick<ISTKProps, "styles" | "options">) => {
  const airplaneMode = useSelector((state: any) => state.editor.airplaneMode);

  return (
    <Tooltip>
      <TooltipTrigger
        className={props.styles?.core?.tooltip?.trigger?.className}
        style={props.styles?.core?.tooltip?.trigger?.properties}
      >
        <Button
          variant={airplaneMode ? "primary" : "secondary"}
          className={twMerge("w-8 h-8 p-2", props.styles?.airplaneControl?.button?.className)}
          onClick={toggleAirPlaneMode}
          style={props.styles?.airplaneControl?.button?.properties}
        >
          <Plane size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={15}
        className={props.styles?.core?.tooltip?.content?.className}
        style={props.styles?.core?.tooltip?.content?.properties}
      >
        {airplaneMode ? "Disable" : "Enable"} Airplane Mode
      </TooltipContent>
    </Tooltip>
  );
};
