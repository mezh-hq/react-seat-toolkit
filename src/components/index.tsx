import { STKMode } from "@/constants";
import { useEvents, useInteractions } from "@/hooks";
import type { ISTKProps } from "@/types";
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
      <div className="h-full flex flex-col">
        <Operations />
        <div className="h-full flex relative">
          <Toolbar />
          <Workspace {...props} />
          <Controls />
        </div>
      </div>
      <Footer />
      <Cursor />
    </>
  );
};

const User: React.FC<ISTKProps> = (props) => {
  return (
    <div className="h-full flex flex-col relative">
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
