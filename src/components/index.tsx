import { twMerge } from "tailwind-merge";
import { useDesignerEvents, useInteractions, useUserEvents } from "@/hooks";
import { type ISTKProps } from "@/types";
import { default as Controls } from "./controls";
import { default as Footer } from "./footer";
import { default as Operations } from "./operations";
import { default as Toolbar } from "./toolbar";
import { Cursor, default as Workspace } from "./workspace";

export * from "./core";

const Designer: React.FC<ISTKProps> = (props) => {
  useDesignerEvents(props);
  useInteractions();
  return (
    <>
      <div
        className={twMerge("bg-white h-full min-h-[85vh] flex flex-col", props.styles?.root?.className)}
        style={props?.styles?.root?.properties}
      >
        <Operations {...props} />
        <div
          className={twMerge("h-full flex relative", props.styles?.workspace?.container?.className)}
          style={props.styles?.workspace?.container?.properties}
        >
          <Toolbar {...props} />
          <Workspace {...props} />
          <Controls />
        </div>
      </div>
      <Footer {...props} />
      <Cursor />
    </>
  );
};

const User: React.FC<ISTKProps> = (props) => {
  useUserEvents(props);
  return (
    <div
      className={twMerge("bg-white h-full min-h-[85vh] flex flex-col relative", props.styles?.root?.className)}
      style={props?.styles?.root?.properties}
    >
      <Workspace {...props} />
    </div>
  );
};

const Core = (props: ISTKProps) => {
  if (props.mode === "designer") {
    return <Designer {...props} />;
  }
  return <User {...props} />;
};

export default Core;
