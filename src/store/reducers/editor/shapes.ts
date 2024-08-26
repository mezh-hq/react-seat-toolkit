import { v4 as uuidV4 } from "uuid";
import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

export default () => [
  {
    id: uuidV4(),
    x: getWorkspaceCenterX() - 600,
    y: getWorkspaceHeight() * 0.18,
    width: 1150,
    height: 100,
    rx: 10,
    name: "RectangleHorizontal"
  }
];
