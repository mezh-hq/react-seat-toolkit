import { Circle, Eraser, Hand, MousePointer2, SquareEqual, Type } from "lucide-react";
import { twMerge } from "tailwind-merge";

export enum Tool {
  Select = "Select",
  Eraser = "Eraser",
  Seat = "Seat",
  Booth = "Booth",
  Text = "Text",
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
    icon: Eraser,
    shortcut: "E",
    description: "Click on an element to delete it"
  },
  [Tool.Seat]: {
    icon: Circle,
    iconCursor: (props: any) => <Circle {...props} size={34} strokeWidth={1.5} />,
    shortcut: "S",
    crosshairs: true,
    description: "Click anywhere to place a seat"
  },
  [Tool.Booth]: {
    icon: SquareEqual,
    iconCursor: (props: any) => <SquareEqual {...props} size={50} strokeWidth={1} />,
    shortcut: "B",
    description: "Click anywhere to place a booth"
  },
  [Tool.Text]: {
    icon: Type,
    shortcut: "T",
    description: "Click anywhere to place text"
  },
  [Tool.Pan]: {
    icon: Hand,
    shortcut: "P",
    description: "Click and drag to pan the workspace"
  }
};
