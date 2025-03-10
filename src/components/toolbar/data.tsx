import { CaseSensitive, Circle, Image, MousePointer2, Move, PenTool, Pentagon, Sparkles, Square } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Tool } from "@/constants";

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
    icon: Sparkles,
    shortcut: "E",
    description: "Click on an element to delete it"
  },
  [Tool.Seat]: {
    icon: Circle,
    iconCursor: (props: any) => <Circle {...props} size={35} strokeWidth={1.5} />,
    shortcut: "S",
    crosshairs: true,
    description: "Click anywhere to place a seat",
    subTools: [
      {
        name: "Square",
        icon: Square,
        iconCursor: (props: any) => <Square {...props} size={38} strokeWidth={1.5} />
      }
    ]
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
    icon: Image,
    shortcut: "I",
    description: "Upload an image to the workspace"
  },
  [Tool.Pan]: {
    icon: Move,
    shortcut: "P",
    description: "Click and drag to pan the workspace"
  }
};
