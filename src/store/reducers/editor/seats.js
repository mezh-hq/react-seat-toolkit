import { v4 as uuidV4 } from "uuid";
import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

const gap = 50;

export default () => [
  ...[...Array(10).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.42
  })),
  ...[...Array(10).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.42
  })),
  ...[...Array(7).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.52
  })),
  ...[...Array(7).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.52
  })),
  ...[...Array(5).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.62
  })),
  ...[...Array(5).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.62
  }))
];
