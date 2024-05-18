import { ChangeEvent, useMemo } from "react";
import { Cog } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ids } from "@/constants";
import { store } from "@/store";
import { locationPlaceholder, setLocation, toggleControls } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { stateToJSON } from "@/utils";
import { default as ExportAction } from "./export-button";
import { default as GridSwitch } from "./grid-switch";

const onCogClick = () => store.dispatch(toggleControls());

const Operations: React.FC<ISTKProps> = ({
  options: { showGridSwitch = true, exportButtonText, operationTriggerIcon, locationInputPlaceholder } = {},
  events,
  ...props
}) => {
  const location = useSelector((state: any) => state.editor.location);

  const inputPlaceholder = useMemo(() => locationInputPlaceholder ?? locationPlaceholder, [locationInputPlaceholder]);

  const styles = props.styles?.operations;

  const OperationTriggerIcon = operationTriggerIcon ?? Cog;

  const onLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.dispatch(setLocation(e.target.value));
  };

  const onExportJson = () => {
    const json = stateToJSON();
    if (events?.onExport) {
      events?.onExport(json);
    } else {
      console.log(json);
      sessionStorage.setItem("stk-data", JSON.stringify(json));
      navigator.clipboard.writeText(JSON.stringify(json));
    }
  };

  return (
    <div
      id={ids.operationBar}
      className={twMerge(
        "w-full flex justify-between items-center gap-6 bg-black/5 pl-5 md:pl-[3.25rem] pr-5 p-2",
        styles?.root?.className
      )}
      style={styles?.root?.properties}
    >
      <input
        id={ids.location}
        className={twMerge(
          "bg-transparent font-bold outline-none text-xl sm:text-[22px] lg:text-[24px]",
          location === inputPlaceholder && "opacity-60",
          styles?.input?.className
        )}
        value={location}
        placeholder={inputPlaceholder}
        style={styles?.input?.properties}
        onChange={onLocationChange}
      />
      <div className="flex justify-between items-center gap-5">
        {showGridSwitch && <GridSwitch className="mr-2" />}
        <ExportAction text={exportButtonText} onExport={onExportJson} styles={props.styles} />
        <OperationTriggerIcon
          id={ids.operationTrigger}
          size={35}
          className={twMerge(
            "cursor-pointer transform hover:rotate-90 transition-all duration-300",
            styles?.trigger?.className
          )}
          style={styles?.trigger?.properties}
          onClick={onCogClick}
        />
      </div>
    </div>
  );
};

export default Operations;
