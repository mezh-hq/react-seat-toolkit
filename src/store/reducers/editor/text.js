import { v4 as uuidV4 } from "uuid";
import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

export default () => [
  {
    id: uuidV4(),
    x: getWorkspaceCenterX() - 50,
    y: getWorkspaceHeight() * 0.25,
    label: "STAGE",
    fontSize: 35,
    fontWeight: 200
  }
];
