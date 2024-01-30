import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

export default () => [
  {
    x: getWorkspaceCenterX() - 50 - 39,
    y: getWorkspaceHeight() * 0.8
  },
  {
    x: getWorkspaceCenterX() + 50,
    y: getWorkspaceHeight() * 0.8
  }
];
