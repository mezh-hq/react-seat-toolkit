import { v4 as uuidV4 } from "uuid";
import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

export default () => [
  {
    id: uuidV4(),
    x: getWorkspaceCenterX() - 550,
    y: getWorkspaceHeight() * 0.18,
    width: 1100,
    height: 100,
    rx: 10,
    name: "RectangleHorizontal"
  }
];
