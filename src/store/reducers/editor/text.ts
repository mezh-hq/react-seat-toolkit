import { v4 as uuidV4 } from "uuid";
import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

export default () => [
  {
    id: uuidV4(),
    x: getWorkspaceCenterX() - 58,
    y: getWorkspaceHeight() * 0.27,
    label: "STAGE",
    fontSize: 35,
    fontWeight: 200,
    letterSpacing: 5
  }
];
