import { v4 as uuidV4 } from "uuid";
import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

export default () => [
  {
    id: uuidV4(),
    x: getWorkspaceCenterX() - 45 - 39,
    y: getWorkspaceHeight() * 0.84
  },
  {
    id: uuidV4(),
    x: getWorkspaceCenterX() + 45,
    y: getWorkspaceHeight() * 0.84
  }
];
