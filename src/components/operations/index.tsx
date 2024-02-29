import { Braces, Cog, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ids } from "@/constants";
import { useBreakpoint } from "@/hooks";
import { store } from "@/store";
import { locationPlaceholder, setLocation, toggleControls } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { stateToJSON } from "@/utils";
import { Body, Button, IconButton } from "../core";
import { default as GridSwitch } from "./grid-switch";

const onCogClick = () => store.dispatch(toggleControls());

const Operations: React.FC<ISTKProps> = ({
  options: { showGridSwitch = true, exportButtonText = "Export JSON", operationTriggerIcon } = {},
  events,
  ...props
}) => {
  const { md } = useBreakpoint();

  const location = useSelector((state: any) => state.editor.location);

  const styles = props.styles?.operations;

  const coreStyles = props.styles?.core;

  const OperationTriggerIcon = operationTriggerIcon ?? Cog;

  const onLocationChange = (e) => {
    const location = e.target.innerText;
    if (!location) {
      document.getElementById("stk-location-name").innerText = locationPlaceholder;
      return store.dispatch(setLocation(locationPlaceholder));
    }
    store.dispatch(setLocation(location));
  };

  const onExportJson = () => {
    const json = stateToJSON();
    if (events?.onExport) {
      events?.onExport(json);
    } else {
      console.log(json);
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
      <Body
        id={ids.location}
        contentEditable="true"
        suppressContentEditableWarning={true}
        className={twMerge(
          "text-xl font-bold outline-none",
          location === locationPlaceholder && "opacity-60",
          styles?.input?.className
        )}
        style={styles?.input?.properties}
        onInput={onLocationChange}
      >
        {locationPlaceholder}
      </Body>
      <div className="flex justify-between items-center gap-5">
        {showGridSwitch && <GridSwitch className="mr-2" />}
        {md ? (
          <>
            <Button
              className={twMerge("py-[0.35rem]", coreStyles?.button?.className)}
              style={coreStyles?.button?.properties}
            >
              Preview
            </Button>
            <Button
              className={twMerge("py-[0.35rem]", coreStyles?.button?.className)}
              style={coreStyles?.button?.properties}
              onClick={onExportJson}
            >
              {exportButtonText}
            </Button>
          </>
        ) : (
          <>
            <IconButton
              icon={<Eye />}
              label="Preview"
              className={coreStyles?.button?.className}
              style={coreStyles?.button?.properties}
            />
            <IconButton
              icon={<Braces />}
              label={exportButtonText}
              onClick={onExportJson}
              className={coreStyles?.button?.className}
              style={coreStyles?.button?.properties}
            />
          </>
        )}
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
