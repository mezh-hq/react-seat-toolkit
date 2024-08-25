import { v4 as uuidV4 } from "uuid";
import { getWorkspaceCenterX, getWorkspaceHeight } from "@/utils";

const gap = 50;

export default () => [
  ...[...Array(10).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.48,
    label: p + 1
  })),
  ...[...Array(10).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.48,
    label: p + 1
  })),
  ...[...Array(7).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.58,
    label: p + 1
  })),
  ...[...Array(7).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.58,
    label: p + 1
  })),
  ...[...Array(5).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() - gap * (p + 1),
    y: getWorkspaceHeight() * 0.68,
    label: p + 1
  })),
  ...[...Array(5).keys()].map((p) => ({
    id: uuidV4(),
    x: getWorkspaceCenterX() + gap * (p + 1),
    y: getWorkspaceHeight() * 0.68,
    label: p + 1
  }))
];
