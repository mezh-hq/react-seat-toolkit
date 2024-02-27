import { v4 as uuidV4 } from "uuid";
import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

export default () => [
  {
    id: uuidV4(),
    x: getWorkspaceCenterX() - 39 - 39,
    y: getWorkspaceHeight() * 0.79
  },
  {
    id: uuidV4(),
    x: getWorkspaceCenterX() + 48,
    y: getWorkspaceHeight() * 0.79
  }
];
