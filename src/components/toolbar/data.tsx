import { Circle, Eraser, Hand, MousePointer2, SquareEqual, Type } from "lucide-react";

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
    icon: MousePointer2,
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
    iconCursor: (props: any) => <Circle {...props} strokeWidth={2} fill="white" />,
    shortcut: "S",
    crosshairs: true,
    description: "Click anywhere to place a seat"
  },
  [Tool.Booth]: {
    icon: SquareEqual,
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
