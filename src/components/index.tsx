import { twMerge } from "tailwind-merge";
import { useEvents, useInteractions } from "@/hooks";
import { type ISTKProps, STKMode } from "@/types";
import { default as Controls } from "./controls";
import { default as Footer } from "./footer";
import { default as Operations } from "./operations";
import { default as Toolbar } from "./toolbar";
import { Cursor, default as Workspace } from "./workspace";

export * from "./core";

const Designer: React.FC<ISTKProps> = (props) => {
  useEvents();
  useInteractions();
  return (
    <>
      <div
        className={twMerge("h-full min-h-[85vh] flex flex-col", props.styles?.root?.className)}
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
  return (
    <div
      className={twMerge("h-full min-h-[85vh] flex flex-col relative", props.styles?.root?.className)}
      style={props?.styles?.root?.properties}
    >
      <Workspace {...props} />
    </div>
  );
};

const Core = (props: ISTKProps) => {
  if (props.mode === STKMode.Designer) {
    return <Designer {...props} />;
  }
  return <User {...props} />;
};

export default Core;
