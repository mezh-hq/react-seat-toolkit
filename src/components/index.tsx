import { twMerge } from "tailwind-merge";
import { useDesignerEvents, useInteractions, useToast, useUserEvents, useVirtualization } from "@/hooks";
import { type ISTKProps } from "@/types";
import { default as Controls } from "./controls";
import { default as Operations } from "./operations";
import { default as Toolbar } from "./toolbar";
import { Cursor, default as Workspace } from "./workspace";

export * from "./core";

const Designer: React.FC<ISTKProps> = (props) => {
  useDesignerEvents(props);
  useInteractions();
  useVirtualization(props.options?.virtualize);
  return (
    <>
      <div
        className={twMerge(
          "bg-white text-black h-full min-h-dvh flex overflow-x-hidden",
          props.styles?.root?.className
        )}
        style={props?.styles?.root?.properties}
      >
        <Toolbar {...props} />
        <div
          className={twMerge("h-full flex flex-col flex-1 relative", props.styles?.workspace?.container?.className)}
          style={props.styles?.workspace?.container?.properties}
        >
          <Operations {...props} />
          <Workspace {...props} />
          <Controls options={props.options} styles={props.styles} />
        </div>
      </div>
      <Cursor />
    </>
  );
};

const User: React.FC<ISTKProps> = (props) => {
  useUserEvents(props);
  return (
    <div
      className={twMerge(
        "bg-white text-black h-full min-h-screen flex flex-col relative",
        props.styles?.root?.className
      )}
      style={props?.styles?.root?.properties}
    >
      <Workspace {...props} />
    </div>
  );
};

const Core = (props: ISTKProps) => {
  useToast(props.plugins?.toast);
  if (props.mode === "designer") {
    return <Designer {...props} />;
  }
  return <User {...props} />;
};

export default Core;
