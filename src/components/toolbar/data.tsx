import {
  CaseSensitive,
  Circle,
  Codesandbox,
  GripHorizontal,
  Highlighter,
  ImagePlus,
  MousePointer2,
  PenTool,
  Pentagon
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export enum Tool {
  Select = "Select",
  Eraser = "Eraser",
  Seat = "Seat",
  Booth = "Booth",
  Pen = "Pen",
  Text = "Text",
  Shape = "Shapes",
  Image = "Image",
  Pan = "Pan"
}

export const tools = {
  [Tool.Select]: {
    icon: ({ className, ...props }: any) => (
      <MousePointer2 {...props} className={twMerge(className, "rotate-[15deg]")} />
    ),
    iconCursor: ({ className, ...props }: any) => (
      <MousePointer2
        {...props}
        className={twMerge(className, "translate-x-[-30%] translate-y-[-17%] rotate-[15deg]")}
      />
    ),
    shortcut: "V",
    description: "Select and move objects"
  },
  [Tool.Eraser]: {
    icon: Highlighter,
    shortcut: "E",
    description: "Click on an element to delete it"
  },
  [Tool.Seat]: {
    icon: Circle,
    iconCursor: (props: any) => <Circle {...props} size={35} strokeWidth={1.5} />,
    shortcut: "S",
    crosshairs: true,
    description: "Click anywhere to place a seat"
  },
  [Tool.Booth]: {
    icon: Codesandbox,
    iconCursor: (props: any) => <Codesandbox {...props} size={52} strokeWidth={1} />,
    shortcut: "B",
    description: "Click anywhere to place a booth"
  },
  [Tool.Pen]: {
    icon: PenTool,
    iconCursor: (props: any) => (
      <PenTool {...props} className={twMerge(props.className, "translate-x-[-15%] translate-y-[5%] rotate-[15deg]")} />
    ),
    shortcut: "P",
    description: "Click anywhere to start drawing a shape"
  },
  [Tool.Text]: {
    icon: CaseSensitive,
    shortcut: "T",
    description: "Click anywhere to place text"
  },
  [Tool.Shape]: {
    icon: Pentagon,
    shortcut: "C",
    description: "Click anywhere to place a chosen shape from the library"
  },
  [Tool.Image]: {
    icon: ImagePlus,
    shortcut: "I",
    description: "Upload an image to the workspace"
  },
  [Tool.Pan]: {
    icon: GripHorizontal,
    shortcut: "P",
    description: "Click and drag to pan the workspace"
  }
};
