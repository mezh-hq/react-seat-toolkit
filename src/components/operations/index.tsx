import { ChangeEvent, useMemo } from "react";
import { Settings } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ids } from "@/constants";
import { store } from "@/store";
import { locationPlaceholder, setLocation, toggleControls } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { IconButton } from "../core";
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

  const OperationTriggerIcon = operationTriggerIcon ?? Settings;

  const onLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.dispatch(setLocation(e.target.value));
  };

  return (
    <div
      id={ids.operationBar}
      className={twMerge(
        "w-full flex justify-between items-center gap-6 bg-white px-5 py-2 border-b border-gray-200 z-10",
        styles?.root?.className
      )}
      style={styles?.root?.properties}
    >
      <input
        id={ids.location}
        className={twMerge(
          "w-full bg-transparent font-medium outline-none text-ellipsis",
          location === inputPlaceholder && "opacity-60",
          styles?.input?.className
        )}
        value={location}
        placeholder={inputPlaceholder}
        style={styles?.input?.properties}
        onChange={onLocationChange}
      />
      <div className="flex justify-between items-center gap-2 shrink-0">
        {showGridSwitch && <GridSwitch />}
        <ExportAction text={exportButtonText} onExport={events?.onExport} styles={props.styles} />
        <IconButton
          id={ids.operationTrigger}
          className={twMerge("w-10", styles?.trigger?.className)}
          style={styles?.trigger?.properties}
          icon={<OperationTriggerIcon className="w-5 h-5" />}
          variant="secondary"
          onClick={onCogClick}
        />
      </div>
    </div>
  );
};

export default Operations;
